<template>
    <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <div class="card">
              <div class="card-header card-header-icon card-header-warning">
                <div class="card-icon">
                  <i class="fa fa-user"></i>To Be Channel Leader
                </div>
                <h4 class="card-title"> -
                  <small class="category">Enter your wallet Address</small>
                </h4>
              </div>
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="bmd-label-floating">Wallet Adress</label>
                        <input type="text" class="form-control" v-model="walletAddress">
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-warning pull-right" @click="submit"><i class="fa fa-edit"></i>&nbsp;&nbsp;Submit</button>
                  <div class="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
</template>
<script setup>
import { userApi } from "@/api/request";
import { ElMessage, ElNotification } from "element-plus";

const walletAddress = ref("")
function submit(){
    if(!walletAddress.value) {
        ElMessage.error("Wallet address is required!")
        return;
    }
    userApi.channel(walletAddress.value).then(res=>{
        if(res.code == 200){
            ElNotification({
                type:"success",
                message:"Congratulations! You have been a channel leader"
            })
        }
    })
}
</script>