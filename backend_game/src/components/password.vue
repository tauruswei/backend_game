<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item label="Old Password" prop="oldPassword">
        <el-input v-model="form.oldPassword" placeholder="enter your old password" clearable />
      </el-form-item>
      <el-form-item label="New Password" prop="newPassword">
        <el-input v-model="form.password" type="password" placeholder="enter your password" show-password clearable />
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
import { ref, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { userApi } from "../api/request";
import { loadingHelper } from "@/utils/loading";
import { ElNotification } from "element-plus";
const emit = defineEmits(['close'])
const router = useRouter();
const formRef = ref(null);
const form = ref({
  oldPassword: "",
  newPassword: "",
  rpassword: "",
});
const rules = ref({});
rules.value.oldPassword = [{ required: true, message: "old password is required", trigger: "blur" }];
rules.value.newPassword = [
  { required: true, message: "new password is required", trigger: "blur" },
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
  formRef.value.validate((valid) => {
    if (valid) {
      loadingHelper.show();
      let param = {
        oldPassword: form.value.oldPassword,
        newPassword: form.value.newPassword,
      }
      userApi.password(param).then((res) => {
        if (res.code == 200 && res.msg == "success") {
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
    }
  });
}
</script>
