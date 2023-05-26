<template>
  <div>
    <el-form ref="formRef" :rules="rules" label-position="top" label-width="100px" :model="form">
      <el-form-item label="Old Password" prop="oldPassword">
        <el-input v-model="form.oldPassword" placeholder="enter your old password"  clearable/>
      </el-form-item>
      <el-form-item label="New Password" prop="password">
        <el-input v-model="form.password" type="password" placeholder="enter your password" show-password  clearable/>
      </el-form-item>
      <el-form-item label="password" prop="rpassword">
        <el-input v-model="form.rpassword" type="password" placeholder="enter your password again" show-password  clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-100" @click="submit">Sure</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userApi } from "../api/request";
import { loadingHelper } from "@/utils/loading";
import { ElNotification } from "element-plus";
export default {
  name: "PasswordEdit",
  emits:['close'],
  setup({emit}) {
    const router = useRouter();
    const formRef = ref(null);
    const form = ref({
      email: "",
      password: "",
      rpassword: "",
    });
    const rules = ref({});
    rules.value.password = [{ required: true, message: "password is required", trigger: "blur" }];
    rules.value.rpasswd = [
      { required: true, message: "password is required", trigger: "blur" },
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
    function submit() {
      formRef.value.validate((valid) => {
        if (valid) {
            loadingHelper.show();
            let param ={
                email: form.value.email,
                password: form.value.password, 
            }
            userApi.password(param).then((res)=>{
                if(res.code==200&&res.msg=="success"){
                    ElNotification({
                        type:"success",
                        message:"successed"
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

    return {
      form,
      rules,
      formRef,
      submit
    };
  },
};
</script>
