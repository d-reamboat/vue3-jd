<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab,
        }"
        v-for="item in categories"
        :key="item.tab"
        @click="categoryClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont">&#xe780;</span>
          {{cartList.shopId.productId.counter}}
          <span class="product__number__plus iconfont" @click="addItemToCart(shopId,productId,item)">&#xe781;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { get } from "../../services/request";
import { useRoute } from "vue-router";
import { watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";

//数据
const categories = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "sceckill" },
  { name: "新鲜商品", tab: "fruit" },
];

//和Tab切换有关的逻辑
const useTabEffect = () => {
  const currentTab = ref("all");
  const categoryClick = (tab) => {
    console.log(tab);
    currentTab.value = tab;
  };

  return {
    categoryClick,
    currentTab,
  };
};

//列表内容相关的逻辑
const useCurrentListEffect = (currentTab) => {
  const contentData = reactive({
    contentList: [],
  });
  const route = useRoute();
  const shopId = route.params.id;
  const getContentData = async () => {
    const result = await get(`api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      contentData.contentList = result.data;
    }
  };

  watchEffect(() => {
    getContentData();
  });

  return {
    contentData,
  };
};
//购买数量
const useCartEffect = () => {
  const store = useStore();
  const { cartList } = toRefs(store.state);
  return {
    cartList,
  };
};
export default {
  setup() {
    //点击分类
    const { categoryClick, currentTab } = useTabEffect();
    const { cartList } = useCartEffect();
    console.log(cartList);
    const { contentData } = useCurrentListEffect(currentTab);

    return {
      ...toRefs(contentData),
      categories,
      categoryClick,
      currentTab,
      cartList
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: 0.76rem;
  background: $search-bgColor;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: #333;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      line-height: 0.18rem;
      &__minus {
        position: relative;
        top: 0.02rem;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        position: relative;
        top: 0.02rem;
        color: $btn-bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
