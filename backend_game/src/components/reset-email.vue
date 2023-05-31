<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="enter your email" clearable />
      </el-form-item>
      <el-form-item label="verify code" prop="code">
        <el-row :gutter="10" style="width:100%">
          <el-col :span="20">
            <el-input v-model="form.code" placeholder="enter your verify code" clearable />
          </el-col>
          <el-col :span="4">
            <el-button @click="getVerifyCode" type="primary" :disabled="btndisabled" plain>{{!btndisabled?'send': ''}}
                <count-down-time v-if="btndisabled" :limit="time" @change="()=>{btndisabled = false}"></count-down-time>
              </el-button>
          </el-col>
        </el-row>
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
const store = useStore();
const router = useRouter();
const formRef = ref(null);
const form = ref({
  email: "",
  code: ""
});
const rules = ref({});
const time = ref(0)
const btndisabled = ref(false)
rules.value.email = [{ required: true, message: "email is required", trigger: "blur" },
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
}];
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
function submit() {
  formRef.value.validate((valid) => {
    if (valid) {
      loadingHelper.show();
      let param = {
        email: form.value.email,
        code: form.value.code,
        userId: store.state.user.id,
      }
      userApi.email(param).then((res) => {
        if (res.code == 200 && res.msg == "success") {
          ElNotification({
            type: "success",
            message: "The email has been changed successfully!"
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
