<template>
  <el-dialog :model-value="visible" @close="closeDialog" :title="title" destroy-on-close>
    <el-form :model="form" ref="formRef" label-width="96px">
      <el-form-item label="Vlog Title" prop="title" required>
        <el-input v-model="form.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="Platform" prop="plat" required>
        <el-input v-model="form.plat" placeholder="example: Youtobe" clearable></el-input>
      </el-form-item>
      <el-form-item label="Cover Link" prop="cover" required>
        <el-input v-model="form.cover" clearable></el-input>
      </el-form-item>
      <el-form-item label="Vlog Link" prop="vlog" required>
        <el-input v-model="form.vlog" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog()">cancel</el-button>
      <el-button type="primary" @click="submit">submit</el-button>
    </template>
  </el-dialog>
</template> 
  <script setup>
import { ref,watch } from "vue"
import { blogApi } from "@/api/request";
import Tinymce from "@/components/tinymce/tinymce.vue";
import CropeImg from "@/components/crope-img.vue"
import { loadingHelper } from "@/utils/loading";
const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: 'New Vlog' },
  data: { type: Object, default: () => null }
})
const emit = defineEmits(["update:visible", "refresh"]);
const type = ref("add")
const formRef = ref(null)
const form = ref({
  title: "",
  plat: "",
  cover: "",
  vlog: ""
})
watch(() => props.data, (val) => {
  if (val) {
    form.value = val;
    type.value = "edit";
  } else {
    reset();
    type.value = "add"
  }
}, { immediate: true })

function submit() {
  loadingHelper.show()
  formRef.value.validate((valid) => {
    if (valid) {
      if (type.value == 'add') {
        blogApi.add(form.value).then((res) => {
          if (res.code == 0) {
            ElNotification({
              type: "success",
              message: "Successed",
            });
          }
        })
      } else {
        blogApi.edit(form.value).then((res) => {
          if (res.code == 0) {
            ElNotification({
              type: "success",
              message: "Successed",
            });
          }
        })
      }
      loadingHelper.hide()
      reset();
      closeDialog()
      refresh()
    }else{
      loadingHelper.hide()
    }
  })
}
function refreh() {
  emit("refresh")
}
function closeDialog() {
  emit("update:visible", false)
}
function reset() {
  form.value = {
    title: "",
    plat: "",
    cover: "",
    vlog: ""
  }
}
  </script>