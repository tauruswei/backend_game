<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="enter your email" clearable />
      </el-form-item>
      <el-form-item label="verify code" prop="code">
        <el-row :gutter="10" style="width:100%">
          <el-col :span="20">
            <el-input v-model="form.code" type="text" placeholder="enter your verify code" clearable />
          </el-col>
          <el-col :span="4">
            <el-button @click="getVerifyCode" plain>send</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="New Password" prop="password">
        <el-input v-model="form.password" type="password" placeholder="enter your password" show-password clearable />
      </el-form-item>
      <el-form-item label="password" prop="rpassword">
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
  email: "",
  code:"",
  password: "",
  rpassword: "",
});
const rules = ref({});
rules.value.email = [{ required: true, message: "email is required", trigger: "blur" }];
rules.value.password = [{ required: true, message: "password is required", trigger: "blur" }];
rules.value.code = [{ required: true, message: "Verify code is required", trigger: "blur" }];
rules.value.rpasswd = [
  { required: true, message: "password is required", trigger: "blur" },
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
function getVerifyCode() {
  if (!form.value.email) {
    ElMessage.error("Email is required")
    return;
  }
  userApi.code({ email: form.value.email }).then(res => {
    if (res.code == 0) {
      ElNotification({
        type: "success",
        message: "send successfully!",
      });
    }
  })
}
function submit() {
  formRef.value.validate((valid) => {
    if (valid) {
      loadingHelper.show();
      let param = {
        email: form.value.email,
        code: form.value.code,
        newPasswd: form.value.password,
      }
      userApi.reset(param).then((res) => {
        if (res.code == 0 && res.msg == "success") {
          ElNotification({
            type: "success",
            message: "successed"
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
