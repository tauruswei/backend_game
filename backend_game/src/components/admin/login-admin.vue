<template>
  <div class="login-bg">
    <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
      <img :src="require('@/assets/img/logo.webp')" />
      <span class="wtext-l">Chess Of Stars</span>
    </div>
    <div class="login-box">
      <h3 class="title-des wtext-xl">Play & Earn,</h3>
      <p class="text-muted"><small>Enjoy the GameFi^^</small></p>
      <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form" style="padding-top: 40px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="enter your username" clearable />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="enter your password" show-password clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100 shadow" @click="doLogin()">Sign In</el-button>
        </el-form-item>
      </el-form>
      <el-row style="margin-top: 10px; font-size: 14px">
        <el-col :span="24" style="text-align: left;">
          <span @click="visible=true" style="color:#fff;font-size: 13px;cursor: pointer;">Forgot Password?</span>
        </el-col>
      </el-row>
    </div>
    <el-dialog v-model="visible" title="Forget Password" width="480px" destroy-on-close>
      <password-cont @close="visible = false"></password-cont>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import PasswordCont from "@/components/admin/reset-password-admin.vue";
import { loadingHelper } from "@/utils/loading";
const visible = ref(false);
const store = useStore();
const router = useRouter();
const formRef = ref(null);
const form = ref({
  username: "",
  password: "",
});
const rules = ref({});
rules.value.username = [
  { required: true, message: "Username is required", trigger: "blur" }
];
rules.value.password = [
  { required: true, message: "Password is required", trigger: "blur" },
  { min: 8, max: 64, message: "The length between 8 and 64 character", trigger: "blur" }
];
function doLogin() {
  loadingHelper.show();
  formRef.value.validate((valid) => {
    if (valid) {
      let data = {
        username: form.value.username,
        passwd: form.value.password,
      };
      userApi.login(data).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          store.commit("setUser", { name: res.data.userName, id: res.data.userId });
          store.commit("setRole", 3);
          store.commit("setToken", res.data.token);
          router.push("/admin");

        }
        loadingHelper.hide();
      });
    }else{
      loadingHelper.hide();
    }
  });
}
</script>
