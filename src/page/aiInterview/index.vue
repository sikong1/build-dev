<template>
  <div class="ai-page">
    <!-- 顶部品牌区 -->
    <div class="hero">
      <div class="hero-badge">
        <span class="dot"></span>
        AI 面试官助手 · powered by GLM-4-Flash
      </div>
      <h1>想了解候选人郭鹏伟？<br />直接问我。</h1>
      <p class="subtitle">
        基于他的简历画像与 {{ articleCount || "" }} 篇技术文章知识库，实时检索作答。
        无需登录，点下方问题或直接输入你的问题。
      </p>
    </div>

    <!-- 推荐问题 -->
    <div class="suggestions" v-if="messages.length <= 1">
      <div class="suggestion-card" v-for="(item, i) in suggestions" :key="i" @click="quickAsk(item.q)">
        <span class="s-icon">{{ item.icon }}</span>
        <span>{{ item.q }}</span>
      </div>
    </div>

    <!-- 对话区 -->
    <div class="chat-body" ref="bodyRef" @scroll="onScroll">
      <div class="empty-tip" v-if="messages.length === 0">
        <div class="robot">🤖</div>
        <p>我是郭鹏伟的 AI 面试助手</p>
        <p class="tip-sub">你可以问我：他的技术栈、项目经历、AI 相关积累、优劣势……</p>
      </div>

      <div class="msg-row" v-for="(m, i) in messages" :key="i" :class="m.role">
        <div class="avatar" :class="m.role">{{ m.role === 'user' ? '你' : 'AI' }}</div>
        <div class="bubble" :class="m.role">
          <!-- AI 回答用 markdown 渲染 -->
          <div class="md" v-if="m.role === 'ai'" v-html="renderMd(m.content)"></div>
          <div v-else>{{ m.content }}</div>
          <span class="cursor" v-if="m.role === 'ai' && m.streaming"></span>
          <span class="stopped-tag" v-if="m.role === 'ai' && m.stopped">· 已停止</span>
        </div>
      </div>

      <div class="msg-row ai" v-if="errorMsg">
        <div class="avatar ai">!</div>
        <div class="bubble ai error">{{ errorMsg }}</div>
      </div>
    </div>

    <!-- 输入区 -->
    <div class="input-bar">
      <el-input
        v-model="question"
        placeholder="例如：他在 AI 大模型方面有哪些项目经验？"
        size="large"
        :disabled="sending"
        @keyup.enter="send"
      >
        <template #append>
          <el-button v-if="sending" @click="stop" class="stop-btn">停止</el-button>
          <el-button v-else @click="send" class="send-btn">发送</el-button>
        </template>
      </el-input>
      <p class="hint">回答由 GLM-4-Flash 生成，基于候选人知识库检索，可能不完美，仅供参考</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AiInterview"
}
</script>

<script setup>
import { ref, nextTick, watch, onMounted } from "vue"
import { marked } from "marked"

const messages = ref([])
const question = ref("")
const sending = ref(false)
const errorMsg = ref("")
const articleCount = ref("")
const bodyRef = ref(null)
// 滚动跟随状态：默认跟随底部；用户上翻时暂停，滚回底部自动恢复
const stickToBottom = ref(true)
// AbortController：用于停止大模型输出
let abortCtrl = null

const suggestions = [
  { icon: "👋", q: "介绍一下候选人郭鹏伟" },
  { icon: "🛠️", q: "他的技术栈是什么？有哪些核心技能？" },
  { icon: "🤖", q: "他在 AI / 大模型方面有哪些项目经验？" },
  { icon: "⚖️", q: "他的优势和不足分别是什么？" }
]

// markdown 渲染（marked 默认配置，不引入额外高亮依赖）
function renderMd(text) {
  return marked.parse(text || "")
}

// 内容更新时：仅在用户处于底部时自动滚到底（用户上翻则暂停跟随）
// 注意：必须监听 content 拼接串而非 messages 数组本身——
// 流式是修改数组内元素的属性，浅监听 watch 不会触发
watch(
  () => messages.value.map(m => m.content).join("|"),
  () => {
    if (stickToBottom.value) {
      nextTick(() => {
        bodyRef.value && (bodyRef.value.scrollTop = bodyRef.value.scrollHeight)
      })
    }
  }
)

// 监听滚动：用户手动上翻 → 暂停跟随；滚回底部附近 → 恢复跟随
function onScroll() {
  const el = bodyRef.value
  if (!el) return
  stickToBottom.value = el.scrollHeight - el.scrollTop - el.clientHeight < 60
}

// 快捷提问
function quickAsk(q) {
  question.value = q
  send()
}

// SSE 流式发送
async function send() {
  const q = question.value.trim()
  if (!q || sending.value) return

  // 用户主动发送：视为想看到新内容，恢复自动跟随并滚到底
  stickToBottom.value = true

  messages.value.push({ role: "user", content: q })
  messages.value.push({ role: "ai", content: "", streaming: true })
  question.value = ""
  sending.value = true
  errorMsg.value = ""

  try {
    // 创建本次请求的 abort 控制器，供「停止」按钮中断
    abortCtrl = new AbortController()
    const resp = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
      signal: abortCtrl.signal
    })

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({ error: `HTTP ${resp.status}` }))
      throw new Error(errData.error || "请求失败")
    }
    if (!resp.body) throw new Error("浏览器不支持流式响应")

    const reader = resp.body.getReader()
    const decoder = new TextDecoder()
    let buf = ""
    const aiMsg = messages.value[messages.value.length - 1]

    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      buf += decoder.decode(value, { stream: true })

      let idx
      while ((idx = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, idx).trim()
        buf = buf.slice(idx + 1)
        if (!line.startsWith("data:")) continue
        const payload = line.slice(5).trim()
        if (payload === "[DONE]") continue
        try {
          const obj = JSON.parse(payload)
          if (obj.type === "message" && obj.content) {
            aiMsg.content += obj.content
          } else if (obj.type === "error") {
            errorMsg.value = obj.content
          }
        } catch (e) { /* 忽略 */ }
      }
    }

    aiMsg.streaming = false
    if (!aiMsg.content.trim()) {
      aiMsg.content = "（未获得有效回答，请稍后重试）"
    }
  } catch (err) {
    // 用户点击「停止」：AbortError 属正常中断，静默处理
    if (err && err.name === "AbortError") {
      const aiMsg = messages.value[messages.value.length - 1]
      if (aiMsg && aiMsg.streaming) aiMsg.streaming = false
    } else {
      errorMsg.value = err.message
      const aiMsg = messages.value[messages.value.length - 1]
      if (aiMsg && aiMsg.streaming) aiMsg.streaming = false
    }
  } finally {
    sending.value = false
    abortCtrl = null
  }
}

// 停止大模型输出：中断 SSE 连接，后端监听到断开会自动取消智谱上游流
function stop() {
  if (abortCtrl) {
    abortCtrl.abort()
    abortCtrl = null
  }
  const last = messages.value[messages.value.length - 1]
  if (last && last.role === "ai") {
    last.streaming = false
    last.stopped = true
  }
  sending.value = false
}

onMounted(async () => {
  // 获取文章数用于副标题展示（失败静默）
  try {
    const r = await fetch("/api/articles/getData")
    const d = await r.json()
    if (d.status === 200) articleCount.value = d.data.length
  } catch (e) { /* noop */ }
})
</script>

<style lang="scss" scoped>
.ai-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
}

/* 品牌区 */
.hero {
  text-align: center;
  padding: 24px 0 8px;

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #fff;
    background: linear-gradient(135deg, #409eff, #7c4dff);
    padding: 6px 16px;
    border-radius: 20px;
    box-shadow: 0 4px 14px rgba(64, 158, 255, 0.3);

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #67c23a;
      animation: pulse 1.5s infinite;
    }
  }

  h1 {
    font-size: 32px;
    margin: 16px 0 8px;
    background: linear-gradient(90deg, #303133, #409eff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    color: #909399;
    font-size: 14px;
    margin: 0;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* 推荐问题 */
.suggestions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 16px 0;

  .suggestion-card {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    color: #606266;
    transition: all 0.2s;

    &:hover {
      border-color: #409eff;
      color: #409eff;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(64, 158, 255, 0.12);
    }

    .s-icon { font-size: 18px; }
  }
}

/* 对话区 */
.chat-body {
  flex: 1;
  min-height: 0; /* 关键：允许 flex 收缩，内容超高时触发内部滚动而非撑高页面 */
  overflow-y: auto;
  padding: 12px 4px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;

  .empty-tip {
    margin: auto;
    text-align: center;
    color: #909399;

    .robot { font-size: 48px; }
    p { margin: 6px 0; }
    .tip-sub { font-size: 13px; color: #c0c4cc; }
  }
}

.msg-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;

  &.user {
    flex-direction: row-reverse;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #fff;
    flex-shrink: 0;

    &.user {
      background: #409eff;
    }
    &.ai {
      background: linear-gradient(135deg, #7c4dff, #409eff);
    }
  }

  .bubble {
    max-width: 78%;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.7;
    word-break: break-word;

    &.user {
      background: #409eff;
      color: #fff;
      border-top-right-radius: 4px;
    }
    &.ai {
      background: #fff;
      border: 1px solid #e4e7ed;
      border-top-left-radius: 4px;
      color: #303133;
    }
    &.error {
      background: #fef0f0;
      border-color: #fde2e2;
      color: #f56c6c;
    }

    .cursor {
      display: inline-block;
      width: 8px;
      height: 16px;
      background: #409eff;
      margin-left: 2px;
      vertical-align: text-bottom;
      animation: blink 0.8s infinite;
    }

    .md {
      :deep(pre) {
        background: #1e1e1e;
        color: #d4d4d4;
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
        font-size: 13px;
        margin: 8px 0;
      }
      :deep(code) {
        background: #f4f4f5;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 13px;
      }
      :deep(pre code) {
        background: transparent;
        padding: 0;
      }
      :deep(ul), :deep(ol) {
        padding-left: 20px;
        margin: 6px 0;
      }
      :deep(h1), :deep(h2), :deep(h3) {
        margin: 10px 0 6px;
        font-size: 16px;
      }
      :deep(a) {
        color: #409eff;
      }
      :deep(table) {
        border-collapse: collapse;
        margin: 8px 0;
        th, td {
          border: 1px solid #e4e7ed;
          padding: 6px 10px;
        }
      }
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* 输入区 */
.input-bar {
  padding: 12px 0 0;

  .send-btn {
    background: linear-gradient(135deg, #409eff, #7c4dff);
    color: #fff;
    border: none;
  }

  .stop-btn {
    background: #f56c6c;
    color: #fff;
    border: none;
  }

  .stopped-tag {
    font-size: 12px;
    color: #c0c4cc;
    margin-left: 4px;
  }

  .hint {
    font-size: 12px;
    color: #c0c4cc;
    text-align: center;
    margin: 6px 0 0;
  }
}
</style>
