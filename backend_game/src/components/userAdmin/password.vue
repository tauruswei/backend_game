<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item label="Old Password" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" placeholder="enter your old password" show-password clearable />
      </el-form-item>
      <el-form-item label="New Password" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" placeholder="enter your password" show-password clearable />
      </el-form-item>
      <el-form-item label="New Password Again" prop="rpassword">
        <el-input v-model="form.rpassword" type="password" placeholder="enter your password again" show-password clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-100" @click="submit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router";
import { userApi } from "@/api/request";
import { loadingHelper } from "@/utils/loading";
import { encryptAES } from "@/utils/crypto";
const emit = defineEmits(['close'])
const store = useStore();
const router = useRouter();
const formRef = ref(null);
const form = ref({
  oldPassword: "",
  newPassword: "",
  rpassword: "",
});
const rules = ref({});
rules.value.oldPassword = [
  { required: true, message: "old password is required", trigger: "blur" },
  { min: 8, max: 64, message: "The length between 8 and 64 character", trigger: "blur" }, 
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: "Contains at least two types of numbers, uppercase and lowercase letters, and special characters",
    trigger: "blur",
  }];
rules.value.newPassword = [
  { required: true, message: "new password is required", trigger: "blur" },
  { min: 8, max: 64, message: "The length between 8 and 64 character", trigger: "blur" }, 
  {
    required: true,
    pattern: /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*$/,
    message: "Contains at least two types of numbers, uppercase and lowercase letters, and special characters",
    trigger: "blur",
  },
  {
    validator: function (rule, value, callback) {
      if (value === form.value.oldPassword) {
        callback(new Error("new password cannot be repeated, please re-enter "));
      } else {
        //校验通过
        callback();
      }
    },
    trigger: "blur",
  },];
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
      if (value != form.value.newPassword) {
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
        oldPasswd: encryptAES(form.value.oldPassword),
        newPasswd: encryptAES(form.value.newPassword),
        userId: store.state.user.id
      }
      userApi.password(param).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          ElNotification({
            type: "success",
            message: "The password has been changed successfully!"
          })
          emit("close")
          router.push({
            path: "/login",
          });
        }
        loadingHelper.hide();
      })
    }else{
      loadingHelper.hide();
    }
  });
}
</script>
