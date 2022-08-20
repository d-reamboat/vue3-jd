<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe662;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe600;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :itme="itmeData.itme" v-show="itmeData.itme.imgUrl"></ShopInfo>
    <Content :shopName="itmeData.name"></Content>
    <Cart></Cart>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import ShopInfo from "../../components/ShopInfo.vue";
import { get } from "../../services/request";
import Content from "./Content.vue";
import Cart from "./Cart.vue";

//请求商店
const useshopInfoEffect = () => {
  const route = useRoute();
  const itmeData = reactive({
    itme: {},
  });
  const getItmeData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      itmeData.itme = result.data;
    }
  };
  return {
    itmeData,
    getItmeData,
  };
};
//返回操作
const useBackRouterEffect = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
  return {
    handleBackClick,
  };
};
export default {
  setup() {
    //返回操作
    const { handleBackClick } = useBackRouterEffect();
    //请求商店
    const { itmeData, getItmeData } = useshopInfoEffect();
    getItmeData();

    return {
      itmeData,
      handleBackClick,
      getItmeData,
    };
  },
  components: { ShopInfo, Content, Cart },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.3rem;
  &__back {
    width: 0.3rem;
    font-size: 0.44rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: #b6b6b6;
      font-size: 0.18rem;
      padding-top: 0.01rem;
    }
    &__input {
      display: block;
      border: none;
      outline: none;
      background-color: none;
      height: 0.32rem;
      width: 100%;
      padding-right: 0.2rem;
      color: $content-fontcolor;
      font-size: 0.14rem;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
