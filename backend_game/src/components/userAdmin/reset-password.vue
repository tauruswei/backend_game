<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="enter your email" clearable :disabled="btndisabled"/>
      </el-form-item>
      <el-form-item label="Verify code" prop="code">
        <el-row :gutter="10" style="width:100%">
          <el-col :span="18">
            <el-input v-model="form.code" type="text" placeholder="enter your verify code" clearable />
          </el-col>
          <el-col :span="6">
            <count-down-time :email="form.email" @send="setDisabled"></count-down-time>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="New Password" prop="password">
        <el-input v-model="form.password" type="password" placeholder="enter your password" show-password clearable />
      </el-form-item>
      <el-form-item label="New Password again" prop="rpassword">
        <el-input v-model="form.rpassword" type="password" placeholder="enter your password again" show-password clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-100" @click="submit()">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
import CountDownTime from "@/components/count-down-time.vue"
const emit = defineEmits(['close'])
const router = useRouter();
const formRef = ref(null);
const form = ref({
  email: "",
  code: "",
  password: "",
  rpassword: "",
});
const rules = ref({});
const time = ref(0)
const btndisabled = ref(false)
rules.value.email = [
  { required: true, message: "email is required", trigger: "blur" },
  {
    type: 'email',
    message: 'Please input correct email address',
    trigger: ['blur', 'change'],
  },{
  validator: function (rule, value, callback) {
    if (value) {
      userApi.checkEmail(value).then(res => {
        if (res.code == 0 && !res.data) callback();
        else callback(new Error("this email is not registed"));
      })
    }
  },
  trigger: "blur",
}];
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
      if (value != form.value.password) {
        callback(new Error("The passwords are inconsistent, please re-enter "));
      } else {
        //校验通过
        callback();
      }
    },
    trigger: "blur",
  },
];
function submit() {
  loadingHelper.show();
  formRef.value.validate((valid) => {
    if (valid) {
      let param = {
        email: form.value.email,
        code: form.value.code,
        newPasswd: encryptAES(form.value.password)
      }
      userApi.reset(param).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          ElNotification({
            type: "success",
            message: "successed"
          })
          emit("close")
        }
        loadingHelper.hide();
      })
    }else{
      loadingHelper.hide();
    }
  });
}
function setDisabled(disabled){
  btndisabled.value = disabled
}
</script>
