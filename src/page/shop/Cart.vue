<template>
  <div class="mask" v-if="showCart" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <div class="product__header__all">
          <span
            class="product__header__icon iconfont"
            v-html="allChecked ? '&#xe618;' : '&#xe619;'"
            @click="setCartItemsChecked(shopId)"
          ></span>
          全选
        </div>
        <div class="product__header__clear">
          <span @click="cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe618;' : '&#xe619;'"
            @click="changeCartItmeChecked(shopId, item._id)"
          ></div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus iconfont"
              @click="changeCartItemInfo(shopId, item._id, item, -1)"
              >&#xe780;</span
            >
            {{ item?.count || 0 }}
            <span
              class="product__number__plus iconfont"
              @click="changeCartItemInfo(shopId, item._id, item, 1)"
              >&#xe781;</span
            >
          </div>
        </div>
      </template>
    </div>

    <div class="check">
      <div class="check__icon">
        <img
          src="../../assets/img/avatar.jpg"
          alt=""
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ totalNum }}</div>
      </div>
      <div class="check__info">
        总计:<span class="check__info__price">&yen;{{ totalPrice }}</span>
      </div>
      <div class="check__btn">
        <router-link to="/orderCreation">去结算</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useCommonCartEffect } from "./commonCartEffect";

//购物车逻辑
const useCartEffect = (shopId) => {
  const { changeCartItemInfo } = useCommonCartEffect();

  const store = useStore();
  const cartList = store.state.cartList;
  //计算数量
  const totalNum = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        count += product.count;
      }
    }
    return count;
  });
  //计算总价
  const totalPrice = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.check) {
          count += product.count * product.price;
        }
      }
    }
    return count.toFixed(2);
  });
  //全选按钮
  const allChecked = computed(() => {
    const productList = cartList[shopId];
    let result = true;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.count > 0 && !product.check) {
          result = false;
        }
      }
    }
    return result;
  });
  const setCartItemsChecked = (shopId) => {
    store.commit("setCartItemsChecked", { shopId });
  };
  //是否选中
  const changeCartItmeChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", {
      shopId,
      productId,
    });
  };
  //清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit("cleanCartProducts", {
      shopId,
    });
  };
  //
  const productList = computed(() => {
    const productList = cartList[shopId] || [];
    return productList;
  });
  return {
    totalNum,
    totalPrice,
    productList,
    changeCartItemInfo,
    changeCartItmeChecked,
    cleanCartProducts,
    allChecked,
    setCartItemsChecked,
  };
};
//展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    console.log("111");
    showCart.value = !showCart.value;
  };
  return {
    showCart,
    handleCartShowChange,
  };
};

export default {
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    //
    const { showCart, handleCartShowChange } = toggleCartEffect();
    //计算购物车数量和总价
    const {
      totalNum,
      totalPrice,
      productList,
      changeCartItemInfo,
      changeCartItmeChecked,
      cleanCartProducts,
      allChecked,
      setCartItemsChecked,
    } = useCartEffect(shopId);
    productList;
    return {
      totalNum,
      totalPrice,
      productList,
      shopId,
      changeCartItemInfo,
      changeCartItmeChecked,
      cleanCartProducts,
      allChecked,
      setCartItemsChecked,
      showCart,
      handleCartShowChange,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #fff;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background-color: #fff;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 0.01rem solid #f1f1f1;
    font-size: 0.14rem;
    color: #333333;
    &__all {
      flex: 1;
    }
    &__icon {
      margin: 0 0.08rem 0 0.18rem;
      color: #0091ff;
      font-size: 0.2rem;
      vertical-align: top;
    }
    &__clear {
      flex: 1;
      margin-right: 0.16rem;
      text-align: right;
      // text-align: right;
      // line-height: 16px;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__checked {
      color: #0091ff;
      font-size: 0.2rem;
      line-height: 0.46rem;
      margin-right: 0.2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0 0;
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
.check {
  height: 0.49rem;
  border-top: 0.01rem solid #f1f1f1;
  display: flex;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      top: 0.05rem;
      left: 0.48rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: #e93b3b;
      text-align: center;
      border-radius: 50%;
      font-size: 0.12rem;
      color: #fff;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: #333;
    font-size: 0.14rem;
    &__price {
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  &__btn {
    a {
        color: #FFF;
        text-decoration: none;
    }
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    color: #fff;
    font-size: 0.14rem;
  }
}
</style>
