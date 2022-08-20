<template>
  <div class="toast">{{toastShow}}</div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
    props:['toastShow'],
  setup() {
    
    return {};
  },
};
export const useToastEffect = () => {
  const showToast = ref(false);
  const toastShow = ref("");
  const changeToast = (message) => {
    showToast.value = true;
    toastShow.value = message;
    setTimeout(() => {
      showToast.value = false;
      toastShow.value = "";
    }, 2000);
  };
  return { showToast, toastShow, changeToast };
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color:#FFF
}
</style>
