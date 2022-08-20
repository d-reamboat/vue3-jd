<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      :to="`/shop/${itme._id}`"
      v-for="itme in nearbyList"
      :key="itme._id"
      :itme="itme"
    >
      <ShopInfo :itme="itme" :showBorder="true"></ShopInfo>
    </router-link>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { get } from "../services/request";
import ShopInfo from "./ShopInfo.vue";

//附近商店
const useNearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result?.errno === 0 && result?.data?.length) {
      console.log(result.data);
      nearbyList.value = result.data;
    } else {
      console.log("请求失败");
    }
    // console.log(result);
  };

  return {
    getNearbyList,
    nearbyList,
  };
};
export default {
  setup() {
    const { getNearbyList, nearbyList } = useNearbyListEffect();
    getNearbyList();
    return {
      nearbyList,
      getNearbyList,
    };
  },
  components: { ShopInfo },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.nearby {
  a{
    text-decoration: none;
  }
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
}
</style>
