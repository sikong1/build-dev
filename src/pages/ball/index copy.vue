<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2022-11-17 23:35:28
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2022-12-07 10:48:27
 * @FilePath: \snow-vue\src\pages\ball\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box" :style="{ '--size': size || '100px', '--shadowWidth': Shadow(1.5), '--shadowHeight': Shadow(0.5), '--moveY': moveY, '--ballSize': Shadow(3.5) }">
    <div class="ball">
      <div class="ball-item red"></div>
      <div class="ball-shadow"></div>
    </div>
    <div class="ball g">
      <div class="ball-item green"></div>
      <div class="ball-shadow"></div>
    </div>
    <div class="ball b">
      <div class="ball-item blue"></div>
      <div class="ball-shadow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BallItem',

  props: {
    size: {
      type: String
    },
    moveY: {
      type: String,
      default: '-350px'
    }
  },

  data() {
    return {
    };
  },

  computed: {
    Shadow() {
      return (val) => {
        return (Number(this.size.split('px')[0]) || 100) * val + 'px'
      }
    }
  },

  mounted() {
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ball {
  width: var(--ballSize);
  height: var(--ballSize);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ball-item {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: linear-gradient(#e55, #b00);
    animation: move 500ms infinite alternate;
  }

  .red {
    background: linear-gradient(rgb(209, 112, 112), rgb(176, 30, 30));
  }

  .green {
    background: linear-gradient(rgb(146, 198, 146), rgb(81, 191, 81));
  }

  .blue {
    background: linear-gradient(rgb(92, 92, 177), rgb(34, 34, 169));
  }

  @keyframes move {
    from {
      transform: translateY(100);
    }

    to {
      transform: translateY(var(--moveY));
    }
  }

  .ball-shadow {
    width: var(--shadowWidth);
    height: var(--shadowHeight);
    background-color: #000;
    border-radius: 100%;
    margin-top: -30px;
    animation: shadowMove 500ms infinite alternate;
  }

  @keyframes shadowMove {
    from {
      opacity: 0.2;
      transform: scale(0.75);
    }

    to {
      opacity: 0.05;
      transform: scale(1);
    }
  }
}

.g {

  .ball-item,
  .ball-shadow {
    animation-delay: 50ms;
  }
}

.b {

  .ball-item,
  .ball-shadow {
    animation-delay: 100ms;
  }
}
</style>