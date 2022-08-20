<template>
  <div class="nearby__itme">
    <img class="nearby__itme__img" :src="itme.imgUrl" alt="" />
    <div
      :class="{
        'nearby__content': true,
        'nearby__content--border': showBorder ? true : false,
      }"
    >
      <div class="nearby__content__title">{{ itme.name }}</div>
      <div class="nearby__content__tags">
        <span class="nearby__content__tag">月售：{{ itme.sales }}</span>
        <span class="nearby__content__tag">起送：{{ itme.expressLimit }}</span>
        <span class="nearby__content__tag"
          >基础运费：{{ itme.expressPrice }}</span
        >
      </div>
      <p class="nearby__content__highlight">
        {{ itme.slogan }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itme",'showBorder'],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.nearby {

  &__itme {
    display: flex;
    padding-top: 0.12rem;
  }
  &__content {
    flex: 1;
    &--border {
      border-bottom: 1px solid $content-fbgColor;
    }

    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__tags {
      font-size: 0.13rem;
      margin: 0.08rem 0;
      color: $content-fontcolor;

    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      color: #e93b3b;
      font-size: 0.13rem;
    }
  }
}
.nearby__itme__img {
  height: 0.56rem;
  width: 0.56rem;
  margin-right: 0.16rem;
  border-radius: 0.56rem;
  overflow: hidden;
}
</style>
