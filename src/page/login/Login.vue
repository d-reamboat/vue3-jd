<template>
  <div class="wrapper">
    <img class="wrapper__img" src="../../assets/img/avatar.jpg" alt="" />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="用户名"
        v-model="inputPassword.username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入密码"
        type="password"
        v-model="inputPassword.password"
      />
    </div>
    <div class="wrapper__login-button" @click="handLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="showToast" :toastShow="toastShow"></Toast>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { post } from "../../services/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";

//登录
const useLoginEffect = (changeToast) => {
  const inputPassword = reactive({
    username: "",
    password: "",
  });
  const router = useRouter();
  const handLogin = async () => {
    try {
      const result = await post("/api/user/login", {
        username: inputPassword.username,
        password: inputPassword.password,
      });
      if (result?.errno === 0) {
        window.localStorage.setItem("token", "why"); //保存用户登录信息
        router.push({
          path: "/home",
        });
      } else {
        changeToast("登陆失败");
      }
    } catch (e) {
      changeToast("请求失败");
    }
  };
  return { handLogin, inputPassword };
};

//注册
const useRegisterEffect = () => {
  const router = useRouter();
  const handleRegisterClick = () => {
    router.push({
      path: "/register",
    });
  };
    return { handleRegisterClick };
};

export default {
  components: { Toast },
  setup() {
    const { showToast, toastShow, changeToast } = useToastEffect();
    const { handLogin, inputPassword } = useLoginEffect(changeToast);
    const { handleRegisterClick } = useRegisterEffect();

    return {
      handLogin,
      handleRegisterClick,
      inputPassword,
      showToast,
      toastShow,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    border-radius: 0.66rem;
    overflow: hidden;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    &__content {
      line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      background-color: #f9f9f9;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
    }
  }
  &__login-button {
    height: 0.48rem;
    line-height: 0.48rem;
    text-align: center;
    border-radius: 0.04rem;
    width: 2.95rem;
    background-color: #0091ff;
    margin: 0 auto 0.16rem;
    color: #ffffff;
    font-size: 0.16rem;
  }
  &__login-link {
    text-align: center;
    font-size: 14px;
    color: #777;
  }
}
</style>
