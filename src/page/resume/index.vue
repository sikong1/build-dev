<template>
  <div class="resume-container">
    <!-- 基本信息 -->
    <div class="header-section">
      <div class="personal-info">
        <h1>{{ resumeData.name }}</h1>
        <div class="contact-info">
          <p>📱 {{ resumeData.phone }} | 📧 {{ resumeData.email }}</p>
          <p>🎂 {{ resumeData.age }} | 🏠 {{ resumeData.hometown }}</p>
        </div>
      </div>
    </div>

    <!-- 教育背景 -->
    <SectionTitle title="教育背景" />
    <div class="education-section">
      <div
        v-for="(edu, index) in resumeData.education"
        :key="index"
        class="education-item"
      >
        <h3>{{ edu.school }}</h3>
        <div class="edu-details">
          <span>{{ edu.duration }}</span>
          <span>{{ edu.degree }}</span>
        </div>
      </div>
    </div>

    <!-- 专业技能 -->
    <SectionTitle title="专业技能" />
    <div class="skills-section">
      <ul class="skill-list">
        <li v-for="(skill, index) in resumeData.skills" :key="index">
          {{ skill }}
        </li>
      </ul>
    </div>

    <!-- 工作经历 -->
    <SectionTitle title="工作经历" />
    <div class="work-section">
      <div
        v-for="(work, index) in resumeData.workExperience"
        :key="index"
        class="work-item"
      >
        <h3>
          {{ work.company }} <span class="position">{{ work.position }}</span>
        </h3>
        <div class="work-details">
          <span class="duration">{{ work.duration }}</span>
        </div>
        <ul class="responsibilities">
          <li
            v-for="(desc, i) in work.responsibilities"
            :key="i"
            v-html="desc"
          ></li>
        </ul>
      </div>
    </div>

    <!-- 项目经历 -->
    <SectionTitle title="项目经历" />
    <div class="project-section">
      <div
        v-for="(project, index) in resumeData.projects"
        :key="index"
        class="project-item"
      >
        <h3>{{ project.title }}</h3>
        <div class="project-meta">
          <span class="tech-stack">{{ project.techStack.join(" | ") }}</span>
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            class="project-link"
            >项目链接</a
          >
        </div>
        <div class="project-desc">
          <h4>项目简介：</h4>
          <p>{{ project.description }}</p>
        </div>
        <div class="project-responsibility">
          <h4>责任描述：</h4>
          <ul>
            <li
              v-for="(resp, i) in project.responsibilities"
              :key="i"
              v-html="resp"
            ></li>
          </ul>
        </div>
        <div class="project-achievement" v-if="project.achievement">
          <h4>项目成果：</h4>
          <p>{{ project.achievement }}</p>
        </div>
      </div>
    </div>

    <!-- 自我评价 -->
    <SectionTitle title="自我评价" />
    <div class="self-evaluation">
      <ul>
        <li v-for="(item, index) in resumeData.selfEvaluation" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumePage"
}
</script>

<script setup>
import { ref } from "vue"
import SectionTitle from "./SectionTitle.vue"

const resumeData = ref({
  name: "郭鹏伟",
  phone: "187-7061-7978",
  email: "guopengwei1999@163.com",
  age: "25岁",
  hometown: "江西吉安",

  education: [
    {
      school: "九江职业技术学院",
      duration: "2018.9 - 2021.7",
      degree: "软件技术（大专）"
    },
    {
      school: "福建师范大学",
      duration: "2024.1 - 2027.7",
      degree: "本科（在读）"
    }
  ],

  skills: [
    "掌握 HTML5、CSS3、JS(ES6+)、TS 等前端基础知识，能够编写结构良好、易维护的代码",
    "掌握 sass、less 等 css 预处理器，能够编写结构清晰、易读、易维护的层级样式结构",
    "精通 Vue.js 框架，深入理解其核心原理；熟悉 React技术栈",
    "具备使用 vue+ts，有使用ts+vue3开发的经验",
    "能够基于uni-app进行小程序/APP/H5的开发",
    "熟悉 Element-ui、iview、vant、uview、bootstrap 等 UI 组件库的使用，可结合前端主流框架完成单页面应用的组件化开发",
    "熟悉 Echarts.js的各种图表运用、WebGis、高德地图，能够快速构建可视化数据大屏",
    "熟悉 Linux/Nginx 运维，掌握环境部署及配置管理",
    "熟悉 Git 的使用，能够有效地进行版本控制和团队协作",
    "注重代码质量，推行 ESLint/Prettier 规范，主导 Code Review 及内部风格指南编写",
    "了解 webpack、vite 前端模块化构建工具",
    "了解 nodejs、mysql，能够基于 express 框架编写简单接口"
  ],

  workExperience: [
    {
      company: "西安微智创想信息科技有限公司",
      position: "前端开发工程师",
      duration: "2021.1 - 2022.3",
      responsibilities: [
        "基于 HTML5/CSS3 等开发经验参与项目研发和技术研究工作",
        "负责相关产品的需求以及前端程序的实现，提供合理的前端架构。改进和优化开发工具、开发流程、和开发框架",
        "与产品、后台开发人员保持良好沟通，能快速理解、消化各方需求，并落实为具体的开发工作"
      ]
    },
    {
      company: "福建国科信息科技有限公司",
      position: "前端开发工程师",
      duration: "2022.4 - 2023.9",
      responsibilities: [
        "负责对 UI 的原型图进行还原，组件封装、业务逻辑化、模块重构",
        "解决业务遇到的痛点和难点，基于sonar代码进行review",
        "负责但不限于 Web 页面开发、Web App 开发、H5 开发、小程序开发等相关前端研发工作",
        "个人获得年度最佳新员工奖",
        "统筹3人团队任务分配与敏捷开发流程"
      ]
    },
    {
      company: "厦门北郡科技有限公司",
      position: "前端开发工程师",
      duration: "2023.9 - 2025.1",
      responsibilities: [
        "负责定期进行技术支持和解答组件相关问题，开发并维护通用型组件库，收集并修复用户反馈中的组件问题，并确保组件在不同环境下的稳定性和可靠性",
        "移动端组件库适配Harmony Next操作系统",
        "负责构建高质量的通用型主题编辑器组件npm包，并编写详细的使用文档和示例代码，同时为使用方提供全面的技术支持，包括文档说明、示例演示以及针对实际问题的逐步解决方案",
        "主导低代码平台，移动端的演示页面、组件库、脚手架 兼容 Vue3和Vue2"
      ]
    }
  ],

  projects: [
    {
      title: "主题编辑器（npm 包）",
      techStack: ["Vue2", "CubeDesignWeb", "Webpack"],
      description:
        "主题编辑器能够将组件库的组件样式进行修改并能实时观察当前样式状态，能导入json主题配置、下载组件样式sass文件和主题编辑器的json配置文件，使页面主题修改起来更便捷",
      responsibilities: [
        "结合原型生成json数据结构，参考设计文档定义组件的入参、处理逻辑、返回数据结构等规范，实现页面构建",
        "实现了 iframe 样式与编辑器展示效果的实时通信功能",
        "集成打包工具，使主题编辑器能够以script方式引入并使用",
        "通过优化样式渲染逻辑，提升了样式渲染效率，并有效缓解了首次渲染多个模块时的页面卡顿问题",
        "撰写详细的开发者文档和相关代码示例，帮助开发者快速理解并使用我们的主题编辑器"
      ],
      achievement:
        "完成设计与实现，并将其应用于组件库的官方文档和示例项目中，确保优雅、高效地集成到各种页面布局和交互场景中，为用户提供更优质的体验，同时为开发者提供清晰的代码示例和使用指导，支持持续更新和改进"
    },
    {
      title:
        "项目二：移动端组件库(cube-design-mobile)-兼容Harmony Next操作系统",
      description:
        "随着鸿蒙系统用户逐渐增加，公司希望通过提升组件库的鸿蒙兼容性来扩大市场覆盖。然而，部分组件在鸿蒙环境下无法正常渲染或存在交互问题，影响了用户体验。主要原因在于鸿蒙系统与现有组件的渲染机制和交互逻辑存在差异；",
      techStack: ["Vue2", "webpack", "uniapp", "ArkTs"],
      responsibilities: [
        "制定鸿蒙兼容性优化方案：分析鸿蒙系统的渲染机制，确定适配关键点，分阶段优化核心组件，并持续跟踪调优；",
        "开发 UST 插件与 API 替换方案：针对鸿蒙环境下的组件适配问题，采用 API 替换及 UST（ArkUI 组件库）插件开发方式，确保组件功能完整性；",
        "优化与测试：对 86 个组件进行了适配，修复了渲染异常、交互失效等问题，并持续关注 Uniapp 官方升级动态，以优化适配方案；",
        "提升用户体验：通过优化后，组件在鸿蒙系统中的兼容性显著提升，为公司在鸿蒙生态市场的拓展奠定了基础；"
      ],
      // achievement: ""
    },
    {
      title: "项目三：国科数字化门户",
      description:
        "企业数字化门户平台为员工打造直观易用的内置式员工入口，简化工作流程和信息获取过程，让员工能够快速了解公司产品、服务和解决方案，从而显著提升用户体验和满意度；",
      techStack: [
        "Vue3",
        "Pinia",
        "Vue-Router",
        "Axios",
        "ElementUI",
        "uniapp"
      ],
      responsibilities: [
        "从0到1完成系统架构设计，支撑三端（APP/小程序/H5）稳定运行",
        "解决反馈模块大文件上传慢和卡顿问题；",
        "编写骨架屏指令，并把包发布至gitlab，使开发效率大大提升；",
        "配合后端实现单点登录、打通对公司内部系统的免登录流程；",
        "使用骨架屏、打包优化、路由懒加载来优化首页加载过慢问题；",
        "解决h5和微信小程序兼容性问题：ios底部小黑条、统一了时间格式处理逻辑、图片裁剪上传华为云OBS；"
      ],
      achievement:
        "成功开发并上线了公司的数字化门户网站，该网站具备良好的用户界面和用户体验；"
    },
    {
      title: "项目四：湖里城市大脑一期：共享单车",
      description: `湖里区城管局为进一步落实共享单车按要求规整且不聚堆停放的日常管理工作及车企考核工作，当下融合AI智能+大数据分析先进技术，且以人工抽样抽查数据准确性和车企规范落实性为辅助，双管齐下，开展专项治理，总量调控，督促车企落实管理，优化市容环境，为市民出行提供便利；`,
      techStack: [
        "Vue3",
        "Pinia",
        "Vue-Router",
        "Axios",
        "ElementUI",
        "WebGis"
      ],
      responsibilities: [
        "可视化设计：选择合适的可视化图表类型，并设计出美观、易理解的页面；",
        "确保前端开发任务按计划时间、保持高质量且完整量地完成，确保项目需求的及时交付;",
        "封装通用组件、全局适配、通用hook，封装打点、聚合、热力图方法，代码review进行优化；",
        "使用自定义指令实现特殊动画效果；"
      ],
      achievement:
        "通过结合共享单车三家运营公司推送的数据、第三方采集公司抽样采集数据及数字湖里汇集的其它共享单车事件数据这三类数据，共享单车平台展现了四个能力：智能发现、自动预警、自动上报、自动考核，扩大了考核覆盖面、减少人工成本、提高行政处置效率，考核公正化、透明化；"
    },
    {
      title: "项目五：泉州市产教融合平台（大屏）",
      description: `泉州市产教融合平台为更好的了解泉州市整体的产业、院校、人才之间的关系，通过地图更可查看当前入驻企业和产教融合企业；`,
      techStack: ["Vue2", "Vuex", "Vue-Router", "Axios", "ElementUI"],
      responsibilities: [
        "开发任务：产业监测模块、院校监测模块、人才监测模块、七大库监测模块；",
        "中间地图全局封装、实现地图打点和点击的交互效果；",
        "封装全局宽高等比例适配效果；",
        "可视化设计：选择合适的可视化图表类型，并设计出美观、易理解的页面；"
      ],
      achievement: "https://screen.qzcjrh.cn"
    },
    {
      title: "项目六：河狸学途国科教学平台",
      description:
        "河狸学途产教融合平台拥有校企运营系统、学习系统、评测系统、就业系统、项目分发系统、数据分析系统等功能模块，为学生提供从专业入门、学习测评、项目实训到实习就业的全流程闭环服务；",
      techStack: ["Vue2", "Vuex", "Vue-Router", "Axios", "ElementUI", "uniapp"],
      responsibilities: [
        "开发任务：确保前端开发任务按计划时间、保持高质量且完整量地完成，确保项目需求的及时交付；",
        "负责分支管理、代码合并、部署协调以及自动化打包等上线部署任务；"
      ],
      achievement: "https://edu.goktech.cn"
    }
  ],

  selfEvaluation: [
    "热爱技术，自学能力强，持续关注前沿技术发展",
    "具备良好的沟通能力和团队协作精神",
    "注重代码质量，坚持编写可维护的代码",
    "定期进行技术总结并分享至个人网站"
  ]
})
</script>

<style scoped>
.resume-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  line-height: 1.6;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-info {
  color: #666;
  margin-top: 1rem;
}

.skill-list {
  columns: 2;
  list-style-type: square;
  padding-left: 1.5rem;
}

.work-item,
.project-item {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

.project-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

.responsibilities li {
  position: relative;
  padding-left: 1.2rem;
}

.responsibilities li::before {
  content: "◆";
  position: absolute;
  left: 0;
  color: #2c3e50;
}

.tech-stack {
  color: #666;
  font-size: 0.9em;
}

.self-evaluation ul {
  padding-left: 1.5rem;
  list-style-type: "☆ ";
}
</style>
