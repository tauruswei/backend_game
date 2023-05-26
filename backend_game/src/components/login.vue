<template>
  <div class="login-bg">
    <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
      <img :src="require('../assets/img/logo.png')" />
      <span class="wtext-l">Chess Of Stars</span>
    </div>
    <div class="login-box">
      <h3 class="title-des wtext-xl">Welcome !</h3>
      <p class="text-muted"><small>have a nice time^^</small></p>
      <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form" style="padding-top: 40px">
        <el-form-item label="email" prop="email">
          <el-input v-model="form.email" placeholder="enter your email"  clearable/>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="enter your password" show-password  clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100 shadow" @click="doLogin()">Sign In</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: 60px; font-size: 14px"><span class="text-muted">Hasn't account？</span><a href="/register">Sign Up</a></div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { userApi } from "../api/request";
import { loadingHelper } from "@/utils/loading";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref(null);
    const form = ref({
      email: "",
      password: "",
    });
    const rules = ref({});
    rules.value.email = [
      { required: true, message: "Email is required", trigger: "blur" },
      {
        type: 'email',
        message: 'Please input correct email address',
        trigger: ['blur', 'change'],
      },
    ];
    rules.value.password = [{ required: true, message: "Password is required", trigger: "blur" }];
    function doLogin() {
      formRef.value.validate((valid) => {
        if (valid) {
          loadingHelper.show();
          let data = {
            userName: form.value.email,
            userPassword: form.value.password,
          };
          userApi.login(data).then((res) => {
            if (res.code == 200 && res.msg == "success") {
              store.commit("setUser", res.data.user);
              store.commit("setRole", res.data.user.role);
              store.commit("setToken", res.data.token);
              console.log(res)
              ElMessage({
                type: "success",
                message: "succeeded"
              })
              router.push({
                path: "/plat/dashboard",
              });

            }
            loadingHelper.hide();
          });
        }
      });
    }
    return {
      form,
      doLogin,
      formRef,
      rules
    };
  },
};
</script>
