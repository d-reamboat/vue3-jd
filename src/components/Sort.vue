<template>
  <div class="icons">
    <div class="icons__itme" v-for="(itme, index) in sortList" :key="index">
      <img :src="itme.imgUrl" class="icons__itme__img" />
      <p class="icons__itme__desc">{{ itme.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const sortList = [
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
      {
        imgUrl: require("../assets/img/icons1.png"),
        text: "超市便利",
      },
    ];
    return {
      sortList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";

.icons {
  display: flex;
  flex-wrap: wrap;
  &__itme {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
</style>
