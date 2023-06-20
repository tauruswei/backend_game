<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item label="Username" prop="username">
        <el-input v-model="form.username" placeholder="enter your username" clearable :disabled="btndisabled"/>
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
import { userApi } from "@/api/request";
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
const emit = defineEmits(['close'])
const formRef = ref(null);
const form = ref({
  username: "",
  password: "",
  rpassword: "",
});
const rules = ref({});
const time = ref(0)
rules.value.username = [
  { required: true, message: "username is required", trigger: "blur" },
  {
    type: 'username',
    message: 'Please input correct username address',
    trigger: ['blur', 'change'],
  },{
  validator: function (rule, value, callback) {
    if (value) {
      userApi.checkUser(value).then(res => {
        if (res.code == 0 && !res.data) callback();
        else callback(new Error("this username is not registed"));
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
        username: form.value.username,
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
</script>
