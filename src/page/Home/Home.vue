<template>
  <div class="wrapper">
    <div class="position">
      <span class="iconfont position__icon">&#xe7f1;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe60d;</span>
    </div>
    <Search></Search>
    <Banner></Banner>
    <Sort></Sort>
    <div class="gap"></div>
    <Near></Near>
  </div>
    <NavBar></NavBar>
</template>

<script>
import Banner from "../../components/Banner.vue";
import Sort from "../../components/Sort.vue";
import Near from "../../components/Near.vue";
// import NavBar from "../../components/NavBar.vue";
import Search from "../../components/Search.vue";
import NavBar from "../../components/NavBar.vue";
export default {
  setup() {
    return {};
  },
  components: { Banner, Sort, Near, Search, NavBar },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
//中间内容部分
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.5rem;
  // background-color: bisque;
  padding: 0 0.18rem 0.1rem 0.18rem;
}
.position {
  overflow: hidden;
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  color: $content-fontcolor;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}

.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $content-fbgColor;
}

//底部导航栏
</style>
