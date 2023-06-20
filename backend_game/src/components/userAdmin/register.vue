<template>
  <div class="login-bg">
    <div class="logo" style="position: relative; z-index: 9; padding-left: 20px; text-align: left">
      <img :src="require('@/assets/img/logo.webp')" />
      <span class="wtext-l">Chess Of Stars</span>
    </div>
    <div class="login-box" style="margin-top:10px">
      <h3 class="title-des wtext-xl">Play & Earn,</h3>
      <p class="text-muted"><small>register your own account^^</small></p>
      <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form" style="padding-top: 40px">
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="enter your email" clearable :disabled="btndisabled" />
        </el-form-item>
        <el-form-item label="Verify code" prop="code">
          <el-row :gutter="10" style="width:100%">
            <el-col :span="16">
              <el-input v-model="form.code" type="text" placeholder="enter your verify code" clearable />
            </el-col>
            <el-col :span="8">
              <count-down-time :email="form.email" @send="setDisabled"></count-down-time>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Nick name" prop="name">
          <el-input v-model="form.name" placeholder="enter your nick name" clearable />
        </el-form-item>
        <el-form-item label="Password" prop="passwd">
          <el-input v-model="form.passwd" type="password" placeholder="enter your password" show-password clearable />
        </el-form-item>
        <el-form-item label="Repeat password" prop="rpassword">
          <el-input v-model="form.rpassword" type="password" placeholder="enter your password again" show-password clearable />
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
      <div style="margin-top: 60px; font-size: 14px"><span class="text-muted">Already have an account？</span><a href="/login">Sign In</a></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import { AppHelper } from "@/utils/helper";
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
import CountDownTime from "@/components/count-down-time.vue"
import { ElMessageBox, ElNotification } from "element-plus";
const store = useStore();
const router = useRouter();
const roleList = ref([{ id: 0, name: 'channel leader' }, { id: 1, name: 'club boss' }, { id: 2, name: 'user' }]);//0-渠道商 1-俱乐部老板 2 普通用户
const formRef = ref(null);
let id = AppHelper.getURLParam('id');
console.log(id)
const form = ref({
  email: "",
  name: "",
  passwd: "",
  userType: 2,
  code: "",
  rpassword: "",
  inviterId: id ? id : null,
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
        userApi.checkEmail(value).then(res => {
          if (res.data) callback();
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
  {
    validator: function (rule, value, callback) {
      if (value) {
        userApi.checkUser(value).then(res => {
          if (res.code == 0 && !res.data) callback();
          else callback(new Error("this nick name has been used,please use another one"));
        })
      }
    },
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
rules.value.rpassword = [
  { required: true, message: "password is required", trigger: "blur" },
  { min: 8, max: 64, message: "The length between 8 and 64 character", trigger: "blur" },
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: "Contains at least two types of numbers, uppercase and lowercase letters, and special characters",
    trigger: "blur",
  },
  {
    validator: function (rule, value, callback) {
      if (value != form.value.passwd) {
        callback(new Error("The passwords are inconsistent, please re-enter "));
      } else {
        //校验通过
        callback();
      }
    },
    trigger: "blur",
  },
];
function doRegister() {
  loadingHelper.show();
  formRef.value.validate((valid) => {
    if (valid) {
      let data = {
        email: form.value.email,
        name: form.value.name,
        passwd: encryptAES(form.value.passwd),
        userType: form.value.userType,
        code: form.value.code,
        inviterId: form.value.inviterId
      }
      userApi.signup(data).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          formRef.value.resetFields();
          loadingHelper.hide();
          ElMessageBox.confirm(
            'Sign up successfully!Do you want to redirected to login now?',
            'Success',
            {
              confirmButtonText: 'Yes',
              cancelButtonText: 'Cancel',
              type: 'success',
            }
          )
            .then(() => {
              router.push('/login')
            })
            .catch(() => {
              console.log('cancel')
            })
        }
        
      });
    }else{
      loadingHelper.hide();
    }
  });
}
function setDisabled(disabled) {
  btndisabled.value = disabled
}
</script>
