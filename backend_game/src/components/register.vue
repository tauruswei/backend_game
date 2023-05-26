<template>
  <div class="login-bg">
    <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
      <img :src="require('../assets/img/logo.png')" />
      <span class="wtext-l">Chess Of Stars</span>
    </div>
    <div class="login-box" style="margin-top:10px">
      <h3 class="title-des wtext-xl">Welcome !</h3>
      <p class="text-muted"><small>register your own account^^</small></p>
      <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form" style="padding-top: 40px">
        <el-form-item label="email" prop="email">
          <el-input v-model="form.email" placeholder="enter your email" clearable/>
        </el-form-item>
        <el-form-item label="verify code" prop="code">
          <el-row :gutter="10">
            <el-col :span="18">
              <el-input v-model="form.code" type="text" placeholder="enter your verify code"  clearable/>
            </el-col>
            <el-col :span="6">
              <el-button @click="getVerifyCode">send</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Nick name" prop="name">
          <el-input v-model="form.name" placeholder="enter your nick name"  clearable/>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="enter your password" show-password  clearable/>
        </el-form-item>
        <el-form-item label="type">
          <el-select v-model="form.userType" placeholder="select" style="width: 100%" clearable>
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100 shadow" @click="doRegister()">Sign Up</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: 60px; font-size: 14px"><span class="text-muted">Has account？</span><a href="/login">Sign In</a></div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { userApi } from "../api/request";
import { MetaMask } from "@/utils/meta-mask";
import { loadingHelper } from "@/utils/loading";
import { ElNotification,ElMessage } from "element-plus";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const roleList = ref([{id:0,name:'admin'},{id:1,name:'user'}]);
    const formRef = ref(null);
    const form = ref({
      email: "",
      name: "",
      password: "",
      userType: 1,
      code:""
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
    rules.value.name = [
      { required: true, message: "Nick name is required", trigger: "blur" },
      { min: 2, max: 64, message: "The length between 2 and 64 character", trigger: "blur" },
    ];
    rules.value.password = [{ required: true, message: "Password is required", trigger: "blur" }];
    rules.value.code = [{ required: true, message: "Verify code is required", trigger: "blur" }];
    function getVerifyCode(){
      if(!form.value.email){
        ElMessage.error("Email is required")
        return;
      }
      userApi.code({email:form.value.email}).then(res=>{
        if(res.code == 200) {
          ElNotification({
                type: "success",
                message: "send successfully!",
          });
        }
      })
    }
    function doRegister() {
      formRef.value.validate((valid) => {
        if (valid) {
          loadingHelper.show();
          userApi.login(form.value).then((res) => {
            if (res.code == 200 && res.msg == "success") {
              ElNotification({
                type: "success",
                message: "logging ...",
              });
              doLogin();
            }
            loadingHelper.hide();
          });
        }
      });
    }
    function doLogin() {
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
          router.push({
            path: "/plat/dashboard",
          });
        }
        loadingHelper.hide();
      });
    }
    return {
      form,
      doRegister,
      roleList,
      rules,
      formRef,
      getVerifyCode
    };
  },
};
</script>
