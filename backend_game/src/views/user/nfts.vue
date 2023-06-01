<template>
  <div>
    <ul class="nav nav-pills nav-pills-warning nav-pills-icons justify-content-center" role="tablist">
      <li class="nav-item" @click="handleClick(0)">
        <a class="nav-link" :class="activeName==0?' active':''" href="javascript:void(0);" role="tablist">
          <i class="fa fa-fire"></i> Active
        </a>
      </li>
      <li class="nav-item" @click="handleClick(1)">
        <a class="nav-link" :class="activeName==1?' active':''" href="javascript:void(0);" role="tablist">
          <i class="fa fa-clock-o"></i> Using
        </a>
      </li>
      <li class="nav-item" @click="handleClick(2)">
        <a class="nav-link" :class="activeName==2?' active':''" href="javascript:void(0);" role="tablist">
          <i class="fa fa-ban"></i> Used
        </a>
      </li>
      <li class="nav-item" @click="handleClick('buy')">
        <a class="nav-link" :class="activeName=='buy'?' active':''" href="javascript:void(0);" role="tablist">
          <i class="fa fa-gift"></i> Buy
        </a>
      </li>
    </ul>
    <div class="card">
      <page-title :option="title" v-if="activeName !=='buy'"></page-title>
      <div class="card-body" v-if="activeName == 0">
        <dynamic-table :data="tableData" :header="tableHeader" :preNum="pageNum * pageSize - pageSize" :operations="operations" @commands="view"></dynamic-table>
        <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="pageNum" @current-change="handlePageChange" :page-size="pageSize" />

      </div>
      <div class="card-body" v-if="activeName == 1||activeName == 2">
        <dynamic-table :data="tableData" :header="tableHeader1" :preNum="pageNum * pageSize - pageSize" :operations="operations1" @commands="view"></dynamic-table>
        <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="pageNum" @current-change="handlePageChange" :page-size="pageSize" />

      </div>
    </div>
    <template v-if="activeName =='buy'">
      <div class="card card-pricing card-raised">
        <div class="card-body">
          <h6 class="card-category">Get a NFT in the blind box</h6>
          <div class="card-icon icon-rose">
            <i class="fa fa-gift"></i>
          </div>
          <h3 class="card-title">20 USDT</h3>
          <span style="text-decoration:line-through!important;">99 USDT</span>
          <p class="card-description">
            Each blind box contains a NFT, which may be one of the
            <a target="_blank" href="https://chessofstars.io/nftlist">NFTs here</a>.
          </p>
          <button class="btn btn-rose btn-round" @click="getCard()">Try your luck</button>
        </div>
      </div>
    </template>
    <!--View NFT on Blockchain-->
    <el-dialog v-model="visible" title="View NFT on Blockchain" width="800px" destroy-on-close>
      <div class="card ">
        <div class="card-header card-header-info card-header-icon">
          <div class="card-icon">
            <i class="fa fa-ticket"></i>
          </div>
          <h4 class="card-title">View NFT on Blockchain</h4>
        </div>
        <div class="card-body ">
          <div class="row">
            <div class="col-md-4">
              <el-image :src="rowData.src" style="width:200px"></el-image>
            </div>
            <div class="col-md-8 ml-auto mr-auto">
              <el-row :gutter="10" v-if="rowData.status == 0">
                <el-col :span="16">use it for game?</el-col>
                <el-col :span="8" style="text-align: right;">
                  <el-button @click="updataStatus(rowData)" round>No</el-button>
                  <el-button type="primary" @click="updataStatus(rowData)" round>Yes</el-button>
                </el-col>
              </el-row>
              <div class="table-responsive table-sales">
                <table class="table">
                  <tbody>
                    <template v-for="(item,key) in rowData">
                      <tr v-if="key !='src'&&key !='status'" :key="key">
                        <td style="text-transform: capitalize;">{{ key.replace(/\_/g," ")+":" }}</td>
                        <td>{{ item }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--View NFT on Blockchain-->
    <el-dialog v-model="visible1" title="Get a NFT in the blind box" width="400px" destroy-on-close>
      <el-row>
        <el-col :span="4">USDT</el-col>
        <el-col :span="20">
          <el-input-number v-model.number="amount" controls-position="right" :step="20" :min="20" :max="100000" placeholder="`set amount" @change="translate('usdt')" style="width:100%" clearable></el-input-number>
        </el-col>
        <el-col :span="4" style="margin-top:10px;">NFT</el-col>
        <el-col :span="20" style="margin-top:10px;">
          <el-input-number v-model.number="amount1" controls-position="right" :step="1" :min="1" :max="100000" placeholder="`set amount" @change="translate('nft')" style="width:100%" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="margin-top:15px">
          <el-button type="primary" @click="nftApprove()" style="width:100%" :disabled="disabled">
            <el-tag size="small">1</el-tag>&nbsp;Approve Spending
          </el-button>
        </el-col>
        <el-col :span="24" style="margin-top:15px;">
          <el-button type="success" @click="nftSwap()" style="width:100%" :disabled="!disabled">
            <el-tag size="small">2</el-tag>&nbsp;Buy
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { nftApi, userApi } from "@/api/request";
import { chainApi } from "@/api/request";
import blindBox from "@/abi/blindBox.json";
import busdToken from "@/abi/busdtoken.json";
import nftToken from "@/abi/nft.json";
import PageTitle from "@/components/page-title.vue";
import DynamicTable from "@/components/dynamic-table.vue";
import { loadingHelper } from "@/utils/loading";
import { DateHelper } from "@/utils/helper";
import { CONTRACTS, MetaMask, ASSETTYPE, TXTYPE, savaAfterTranscation } from "@/utils/meta-mask";
import { ElMessage, ElNotification } from "element-plus";
const store = useStore()
const TYPES = reactive({ buy: 0, used: 1, expire: 2 })
let activeName = ref(0);
let title = ref({ type: "warning", title: "NFTs", desc: "All NFTs for points competitions which come from blind boxes" })
let tableData = ref([])
let tableHeader = ref(["id", "NFT_type", "blockchain", "minted_at", "game_chances"])
let tableHeader1 = ref(["id", "NFT_type", "blockchain", "minted_at", "run_out_time"])
let operations = ref([{ id: 1, type: 'success', icon: "fa fa-external-link", name: "View NFT on Blockchain", event: 'view' },
{ id: 2, type: 'primary', icon: "fa fa-gamepad", name: "use it for game", event: 'updataStatus' },])
let operations1 = ref([{ id: 1, type: 'success', icon: "fa fa-external-link", name: "View NFT on Blockchain", event: 'view' },])
let visible = ref(false);
let visible1 = ref(false);
let rowData = ref({});
let pageNum = ref(1); let total = ref(1);
let pageSize = ref(10);
let blockChain = ref('Binance Smart Chain')
const address = ref({
  channelAddress: "",
  clubAddress: "",
  userAddress: ""
})
const amount = ref(20);
const amount1 = ref(1);
const metaMask = new MetaMask();
const disabled = ref(false)
const nftParam = ref({})
function view(data) {
  if (data.command == "view") {
    visible.value = true;
    queryRow(data.data);
  }
}
function query() {
  let data = {
    pageSize: pageSize.value,
    pageNo: pageNum.value,
    status: activeName.value,
    userId: store.state.user.id
  }
  nftApi.list(data).then((res) => {
    if (res.data.list) {
      tableData.value = res.data.list.map(i => {
        let item = {
          id: i.id,
          Token_ID: i.tokenId,
          tx_id: i.txId,
          NFT_type: i.nftType,
          blockchain: i.blockChain,
          minted_at: DateHelper.toString(i.mintedAt),
          run_out_time: DateHelper.toString(i.runOutTime),
          game_chances: i.gameChances,
          src: `https://cosd1.s3.amazonaws.com/${i.nftType}.png'`
        }
        return item
      });
      total.value = res.data.total;
    }
  })
}
function queryRow(data) {
  let res = [data].map(i => {
    return {
      NFT_type: i.NFT_type,
      game_chances: i.game_chances,
      blockchain: i.blockchain,
      Token_ID: i.Token_ID,
      contract_address: CONTRACTS['blindbox'].address,
      minted_at: i.minted_at,
      src: i.src,
      status: activeName.value
    }
  });
  rowData.value = res[0];
}
function handleClick(tab) {
  activeName.value = tab;
  if (tab == 'buy') return
  pageNum.value = 1;
  query();
}
function handlePageChange(val) {
  pageNum.value = val;
  query();
}
function translate(type) {
  let rate = 20;
  if (type == 'usdt') {
    amount1.value = parseInt(amount.value / rate);
  } else if (type == 'nft') {
    amount.value = amount1.value * rate;
  }
}
function isEmpty() {
  if (!amount.value) {
    ElMessage.error("amount is required!")
  }
  return amount.value ? false : true;
}
//随机获取
function getCard() {
  if (!metaMask.isAvailable()) return;
  userApi.wallet(store.state.user.id).then(res => {
    if (res.code == 0) {
      address.value = res.data;
      disabled.value = false;
      visible1.value = true;
    }
  });
}
function nftApprove() {
  if (!metaMask.isAvailable()) return;
  if (isEmpty()) return;
  let data = { from: store.state.metaMask.account, address: CONTRACTS['blindbox'].address, money: amount.value, abi: blindBox, club: address.value.clubAddress, channel: address.value.channelAddress }
  loadingHelper.show()
  metaMask.approveByContract({ ...data, abiApprove: busdToken, approveAddress: CONTRACTS["busd"].address }).then(() => {
    disabled.value = true;
    loadingHelper.hide();
  }).catch(err => {
    loadingHelper.hide();
  })
}
function nftSwap() {
  if (!metaMask.isAvailable()) return;
  if (isEmpty()) return;
  let data = { from: store.state.metaMask.account, address: CONTRACTS['blindbox'].address, money: amount.value, abi: blindBox, club: address.value.clubAddress, channel: address.value.channelAddress }
  loadingHelper.show()
  metaMask.nftBlindBoxByContract(data).then((res) => {
    visible1.value = false;
    nftParam.value = {
      "txId": res.transactionHash,
      "transType": TXTYPE.usdt,
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.nft,
      "fromAmount": amount.value,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.nft,
      "toAmount": amount.value,
      "nftVo": {
        "tokenId": res.events.DrawCardEvent.returnValues.cardId,
        "attr1": "",
        "attr2": ""
      },
      "blockNumber": res.blockNumber
    }
    rowData.value.blockchain = blockChain.value;
    rowData.value.contract_address = CONTRACTS['blindbox'].address;
    let tokenid = res.events.DrawCardEvent.returnValues.cardId;
    nftInfo(tokenid)
    rowData.value.Token_ID = tokenid;
    loadingHelper.hide()
  }).catch(err => {
    console.log(err)
    loadingHelper.hide();
  })
}
function nftInfo(id) {
  if (!metaMask.isAvailable()) return;
  let param = {
    abi: nftToken,
    from: store.state.metaMask.account,
    address: CONTRACTS['nft'].address,
    tokenId: id
  }
  metaMask.getNFTInfoByContract(param).then(res => {
    visible.value = true;
    rowData.value.src = res.uri;
    rowData.value.game_chances = res.chances;
    rowData.value.nft_type = res.number;
    nftParam.value.nftVo.attr1 = res.number
    nftParam.value.nftVo.attr2 = res.chances
    savaAfterTranscation(nftParam.value);
  })
}
function updataStatus(row) {
  let data = {
    "tokenId": row.Token_ID,
    "status": 1
  }
  loadingHelper.show()
  nftApi.status(data).then(res => {
    if (res.code == 0) {
      ElNotification({
        type: "success",
        message: "use it successfully"
      })
      rowData.value.status = 1
      loadingHelper.hide()
    }
  })
}
onMounted(() => {
  query();
})
</script>