<template>
  <div class="docker">
    <div class="docker__itme" v-for="itme in dockerList" :key="itme.icon">
      <router-link :to="itme.path">
        <div class="iconfont" v-html="itme.icon"></div>
        <div class="docker__title">{{ itme.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const itmeIndex = ref(0);
    const dockerList = [
      {
        icon: "&#xe7c6;",
        text: "首页",
        path: "/home",
      },
      {
        icon: "&#xe7d8;",
        text: "购物车",
        path: "/carList",
      },
      {
        icon: "&#xe7b3;",
        text: "订单",
        path: "/orderList",
      },
      {
        icon: "&#xe78b;",
        text: "我的",
        path: "/login",
      },
    ];

    return {
      dockerList,
      itmeIndex,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";
.docker {
  display: flex;
  position: fixed;
  box-sizing: border-box;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-fbgColor;
  background-color: #ffffff;
  // color: $content-fontcolor;
  &__itme {
    flex: 1;
    text-align: center;

    a {
      color: #333333;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5); //横向纵向分别缩50%
    transform-origin: center top; //缩放中心
  }
}
</style>
