import { useStore } from "vuex";

//购买数量
export const useCommonCartEffect = () => {
  const store = useStore();
  const cartList=store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo,num) => {
    store.commit("changeCartItemInfo", { shopId, productId, productInfo,num });
  };
  return {
    changeCartItemInfo,
    cartList
  };
};