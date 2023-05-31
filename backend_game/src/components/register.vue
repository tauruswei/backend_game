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
          <el-input v-model="form.email" placeholder="enter your email" clearable />
        </el-form-item>
        <el-form-item label="verify code" prop="code">
          <el-row :gutter="10" style="width:100%">
            <el-col :span="18">
              <el-input v-model="form.code" type="text" placeholder="enter your verify code" clearable />
            </el-col>
            <el-col :span="6">
              <el-button @click="getVerifyCode" type="primary" :disabled="btndisabled" plain>{{!btndisabled?'send': ''}}
                <count-down-time v-if="btndisabled" :limit="time"></count-down-time>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Nick name" prop="name">
          <el-input v-model="form.name" placeholder="enter your nick name" clearable />
        </el-form-item>
        <el-form-item label="password" prop="passwd">
          <el-input v-model="form.passwd" type="password" placeholder="enter your password" show-password clearable />
        </el-form-item>
        <!--<el-form-item label="type">
          <el-select v-model="form.userType" placeholder="select" style="width: 100%" clearable>
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" class="w-100 shadow" @click="doRegister()">Sign Up</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: 60px; font-size: 14px"><span class="text-muted">Has account？</span><a href="/login">Sign In</a></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import { AppHelper } from "@/utils/helper";
import { loadingHelper } from "@/utils/loading";
import { ElNotification, ElMessage } from "element-plus";
import CountDownTime from "@/components/count-down-time.vue"
const store = useStore();
const router = useRouter();
const roleList = ref([{ id: 0, name: 'channel leader' }, { id: 1, name: 'club boss' }, { id: 2, name: 'user' }]);//0-渠道商 1-俱乐部老板 2 普通用户
const formRef = ref(null);
const form = ref({
  email: "",
  name: "",
  passwd: "",
  userType: 2,
  code: "",
  inviteId: AppHelper.getURLParam('id'),
});
const rules = ref({});
const time = ref(0)
const btndisabled = ref(false)
rules.value.email = [
  { required: true, message: "Email is required", trigger: "blur" },
  {
    type: 'email',
    message: 'Please input correct email address',
    trigger: ['blur', 'change'],
  },
  {
    validator: function (rule, value, callback) {
      if (value) {
        userApi.checkedName(value).then(res => {
          if (res.code == 0 && !res.data) callback();
          else callback(new Error("this email has been used,please use another one"));
        })
      }
    },
    trigger: "blur",
  },
];
rules.value.name = [
  { required: true, message: "Nick name is required", trigger: "blur" },
  { min: 2, max: 64, message: "The length between 2 and 64 character", trigger: "blur" },
  {
    required: true,
    pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){1,64}$/,
    message: "Begin with a letter, and use letters, numbers and the underscore(_)",
    trigger: "blur",
  },
];
rules.value.passwd = [
  { required: true, message: "Password is required", trigger: "blur" },
  { min: 8, max: 64, message: "The length between 8 and 64 character", trigger: "blur" },
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: "Contains at least two types of numbers, uppercase and lowercase letters, and special characters",
    trigger: "blur",
  }
];
rules.value.code = [{ required: true, message: "Verify code is required", trigger: "blur" }];
function getVerifyCode() {
  formRef.value.validateField(['email'], (valid) => {
    if (valid) {
      loadingHelper.show()
      userApi.code({ email: form.value.email }).then(res => {
        if (res.code == 0) {
          ElNotification({
            type: "success",
            message: "send successfully!",
          });
          btndisabled.value = true;
          time.value = res.data;
          loadingHelper.hide()
        }
      })
    }
  })
}
function doRegister() {
  formRef.value.validate((valid) => {
    if (valid) {
      loadingHelper.show();
      userApi.signup(form.value).then((res) => {
        if (res.code == 0 && res.msg == "success") {
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
    email: form.value.email,
    passwd: form.value.passwd,
  };
  userApi.login(data).then((res) => {
    if (res.code == 0 && res.msg == "success") {
      store.commit("setUser", { name: res.data.userName, account: res.data.walletAddress, id: res.data.userId });
      store.commit("setRole", res.data.userType);
      store.commit("setToken", res.data.token);
      router.push({
        path: "/plat/dashboard",
      });
    }
    loadingHelper.hide();
  });
}
</script>
