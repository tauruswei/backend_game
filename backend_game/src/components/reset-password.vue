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
            <el-button @click="getVerifyCode" type="primary" :disabled="btndisabled" plain>{{!btndisabled?'send': ''}}
                <count-down-time v-if="btndisabled" :limit="time"></count-down-time>
              </el-button>
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
        <el-button type="primary" class="w-100" @click="submit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router";
import { userApi } from "../api/request";
import { loadingHelper } from "@/utils/loading";
import { ElNotification } from "element-plus";
import CountDownTime from "@/components/count-down-time.vue"
const emit = defineEmits(['close'])
const router = useRouter();
const store = useStore()
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
rules.value.rpasswd = [
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
function submit() {
  formRef.value.validate((valid) => {
    if (valid) {
      loadingHelper.show();
      let param = {
        email: form.value.email,
        code: form.value.code,
        newPasswd: form.value.password,
        userId: store.state.user.id
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
