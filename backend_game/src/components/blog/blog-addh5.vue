<template>
  <el-dialog :model-value="visible" width="80%" @close="closeDialog" :title="title" destroy-on-close>
    <el-form :model="form" ref="formRef" label-width="64px">
      <el-form-item label="Title" prop="title" required>
        <el-input v-model="form.title" clearable></el-input>
      </el-form-item>

      <el-form-item label="Author" prop="author" required>
        <el-input v-model="form.author" clearable></el-input>
      </el-form-item>
      <el-form-item label="Cover" prop="cover" required>
        <el-upload ref="uploadRef" action="#" :show-file-list="false" :on-change="handleImgSuccess" :auto-upload="false">
          <el-row v-if="imageUrl" :gutter="10">
            <el-col :span="8">
              <crope-img style="height:180px" :imageSrc="imageUrl" :viewMode="2" :aspectRatio="1.5" @updateImageSrc="handleImageSrc"></crope-img>
            </el-col>
            <el-col :span="8" v-if="imgPreview">
              <img :src="imgPreview" style="width:100%;border:1px solid #eee" />
            </el-col>
          </el-row>
          <el-button type="primary" size="small" v-else round>选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="Content" prop="content" required>
        <Tinymce v-model="form.content" @change="handleChange" width="100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog()">cancel</el-button>
      <el-button type="primary" @click="submit">submit</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { blogApi } from "@/api/request";
import Tinymce from "@/components/tinymce/tinymce.vue";
import CropeImg from "@/components/crope-img.vue"
import { loadingHelper } from "@/utils/loading";
const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: 'New Blog' },
  data: { type: Object, default: () => null }
})
const emit = defineEmits(["update:visible", "refresh"]);
const type = ref("add")
const formRef = ref(null)
const form = ref({
  title: "",
  author: "",
  content: "",
  cover: ""
})
const uploadRef = ref(null);
const imageUrl = ref(null)
const filename = ref("")
const imgPreview = ref();
watch(() => props.data, (val) => {
  if (val) {
    form.value = val;
    type.value = "edit";
  } else {
    reset();
    type.value = "add"
  }
}, { immediate: true })

function handleImgSuccess(file) {
  getImgUrl(file)
}
function getImgUrl(file) {
  filename.value = file.raw.name.split(".")[0];
  imageUrl.value = window.URL.createObjectURL(file.raw);
}
function handleImageSrc(url) {
  imgPreview.value = url;
  form.value.cover = base64ToFile(url, filename.value)
}
//base64图片转成文件流格式
function base64ToFile(data, fileName) {
  const dataArr = data.split(",");
  const byteString = atob(dataArr[1]);
  const options = {
    type: "image/jpeg",
    endings: "native"
  };
  const u8Arr = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    u8Arr[i] = byteString.charCodeAt(i);
  }
  let fileOfBlob = new File([u8Arr], fileName + ".jpg", options);//返回文件流
  return fileOfBlob
}
function handleChange(item) {
  form.value.content = item;
}
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
function closeDialog() {
  emit("update:visible", false)
}
function refreh() {
  emit("refresh")
}
function reset() {
  form.value = {
    title: "",
    author: "",
    content: "",
    cover: ""
  }
}
</script>