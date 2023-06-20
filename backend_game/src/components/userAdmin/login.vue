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
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="enter your email" clearable />
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
        <el-col :span="24" style="margin-top:40px">
          <span class="text-muted">No account？</span><a href="/register">Sign Up</a>
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
import PasswordCont from "@/components/userAdmin/reset-password.vue";
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
const visible = ref(false);
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
  }, {
    validator: function (rule, value, callback) {
      if (value) {
        userApi.checkEmail(value).then(res => {
          if (res.code == 0 && !res.data) callback();
          else callback(new Error("this email is not registed"));
        })
      }
    },
    trigger: "blur",
  }
];
rules.value.password = [
  { required: true, message: "Password is required", trigger: "blur" },
  { min: 8, max: 64, message: "The length between 8 and 64 character", trigger: "blur" },
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: "Contains at least two types of numbers, uppercase and lowercase letters, and special characters",
    trigger: "blur",
  }
];
function doLogin() {
  loadingHelper.show();
  formRef.value.validate((valid) => {
    if (valid) {
      let data = {
        email: form.value.email,
        passwd: encryptAES(form.value.password),
      };
      userApi.login(data).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          store.commit("setUser", { name: res.data.userName, account: res.data.walletAddress, id: res.data.userId });
          store.commit("setRole", res.data.userType);
          store.commit("setToken", res.data.token);
          getABI()
        }
      });
    }else{
      loadingHelper.hide();
    }
  });
}
function getABI(){
  let data = {
    network:"bsc"
  }
  userApi.abi(data).then(res=>{
    if(res.code == 0){
      store.commit("setABI",{...res.data});
      router.push("/plat");
    }
    loadingHelper.hide();
  })
}
</script>
