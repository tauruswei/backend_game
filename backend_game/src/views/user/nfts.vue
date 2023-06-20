<template>
  <div>
    <ul class="nav nav-pills nav-pills-warning nav-pills-icons justify-content-center" role="tablist">
      <li class="nav-item" @click="handleTabClick(TYPES.active)">
        <a class="nav-link" :class="activeName==TYPES.active?' active':''" href="javascript:void(0);" role="tablist">
          <i class="fa fa-fire"></i> Active
        </a>
      </li>
      <li class="nav-item" @click="handleTabClick(TYPES.using)">
        <a class="nav-link" :class="activeName==TYPES.using?' active':''" href="javascript:void(0);" role="tablist">
          <i class="fa fa-clock-o"></i> Using
        </a>
      </li>
      <li class="nav-item" @click="handleTabClick(TYPES.used)">
        <a class="nav-link" :class="activeName==TYPES.used?' active':''" href="javascript:void(0);" role="tablist">
          <i class="fa fa-ban"></i> Used
        </a>
      </li>
      <li class="nav-item" @click="handleTabClick(TYPES.buy)">
        <a class="nav-link" :class="activeName==TYPES.buy?' active':''" href="javascript:void(0);" role="tablist">
          <i class="fa fa-gift"></i> Buy
        </a>
      </li>
    </ul>
    <div class="card">
      <page-title :option="title" v-if="activeName !==TYPES.buy" @refresh="query()"></page-title>
      <div class="card-body" v-show="activeName == TYPES.active">
        <dynamic-table v-loading="loading" :data="tableData" :header="tableHeader" :preNum="pageNum * pageSize - pageSize" :operations="operations" @commands="handlerActions"></dynamic-table>
        <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :current-page="pageNum" @current-change="handlePageChange" @size-change="handleSizeChange" :page-size="pageSize" />

      </div>
      <div class="card-body" v-show="activeName == TYPES.using">
        <dynamic-table v-loading="loading" :data="tableData" :header="tableHeader" :preNum="pageNum * pageSize - pageSize" :operations="operations1" @commands="handlerActions"></dynamic-table>
        <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :current-page="pageNum" @current-change="handlePageChange" @size-change="handleSizeChange" :page-size="pageSize" />
      </div>
      <div class="card-body" v-show="activeName == TYPES.used">
        <dynamic-table v-loading="loading" :data="tableData" :header="tableHeader1" :preNum="pageNum * pageSize - pageSize" :operations="operations1" @commands="handlerActions"></dynamic-table>
        <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :current-page="pageNum" @current-change="handlePageChange" @size-change="handleSizeChange" :page-size="pageSize" />
      </div>
    </div>
    <div class="card card-pricing card-raised" v-show="activeName == TYPES.buy">
      <div class="card-body" style="background-color: #fcfcff;">
        <div>
          <el-image style="width:300px" :src="require('@/assets/img/blindbox.gif')"></el-image>
        </div>
        <h6 class="card-category">Get a NFT in the blind box</h6>
        <h3 class="card-title">20 USDT</h3>
        <span style="text-decoration:line-through!important;">99 USDT</span>
        <p class="card-description">
          Each blind box contains a NFT, which may be one of the
          <a target="_blank" href="https://chessofstars.io/nftlist">NFTs here</a>.
        </p>
        <button class="btn btn-primary btn-round" @click="getCard()">Try your luck</button>
      </div>
    </div>
    <!--View NFT on Blockchain-->
    <el-dialog v-model="visible" title="View NFT" width="800px" @close="handleSaveParamAfterTransfer(0)" :open-delay="delay" destroy-on-close>
      <div class="card ">
        <div class="card-header card-header-info card-header-icon">
          <div class="card-icon">
            <i class="fa fa-ticket"></i>
          </div>
          <h4 class="card-title">View NFT Infomation</h4>
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
                  <el-button type="primary" @click="isOnlyUpdateStatus?useNFTForGame(rowData):handleSaveParamAfterTransfer(1)" round>Yes</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="10" v-if="rowData?.status == 1">
                <el-col :span="16"><el-tag type="success">status:&nbsp;Using</el-tag></el-col>
              </el-row>
              <div class="table-responsive table-sales">
                <table class="table">
                  <tbody>
                      <tr>
                        <td>NFT type</td>
                        <td>{{ rowData?.NFT_type }} 
                          <a :href="$store.state.metaMask?`${$store.state.metaMask?.url}token/${rowData?.contract_address}?a=${rowData?.Token_ID}`:'javascript:void(0);'" :target="$store.state.metaMask?'_blank':null" title="View NFT on blockchain" class="btn btn-round btn-sm btn-info btn-just-icon"><i class="fa fa-external-link"></i></a>
                        </td>
                      </tr>
                      <tr>
                        <td>Game Chances</td>
                        <td>{{ rowData?.game_chances }}</td>
                      </tr>
                      <tr>
                        <td>Blockchain</td>
                        <td>{{ rowData?.blockchain }}</td>
                      </tr>
                      <tr title="You can add this NFT to your wallet manually. For example, go to NFTs tab in MetaMask, click Import NFTs, copy and paste the NFT contract address and token ID to the right fields to add NFT to your wallet.">
                        <td>Token ID</td>
                        <td>{{ rowData?.Token_ID }}&nbsp;&nbsp;<i class="fa fa-copy" @click="copy(rowData?.Token_ID)"></i></td>
                      </tr>
                      <tr title="You can add this NFT to your wallet manually. For example, go to NFTs tab in MetaMask, click Import NFTs, copy and paste the NFT contract address and token ID to the right fields to add NFT to your wallet.">
                        <td>Contract Address</td>
                        <td>{{ rowData?.contract_address }}&nbsp;&nbsp;<i class="fa fa-copy" @click="copy(rowData?.contract_address)"></i></td>
                      </tr>
                      <tr>
                        <td>Minted At</td>
                        <td>{{ rowData?.minted_at }}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--blind box-->
    <el-dialog v-model="visible1" title="Get a NFT in the blind box" width="400px" destroy-on-close>
      <el-row>
        <el-col :span="4">USDT</el-col>
        <el-col :span="20">
          <el-input-number v-model.number="amount" controls-position="right" :step="20" :min="20" :max="100000" placeholder="`set amount" disabled @change="translate('usdt')" style="width:100%" clearable></el-input-number>
        </el-col>
        <el-col :span="4" style="margin-top:10px;">NFT</el-col>
        <el-col :span="20" style="margin-top:10px;">
          <el-input-number v-model.number="amount1" controls-position="right" :step="1" :min="1" :max="100000" placeholder="`set amount" disabled @change="translate('nft')" style="width:100%" clearable></el-input-number>
        </el-col>
        <el-col :span="24" style="margin-top:15px">
          <div style="text-align: right;">
            <b style="display:inline-block;padding:0 10px;background: #fef1db;color:#ff9800;">Current approved allowance: {{ allowance['blindbox'] }}</b>
          </div>
          <el-button type="primary" @click="nftApprove()" style="width:100%" :disabled="disabled">
            <el-tag size="small">1</el-tag>&nbsp;Approve Spending
          </el-button>
        </el-col>
        <el-col :span="24" style="margin-top:15px;">
          <el-button type="success" @click="nftSwap($event)" style="width:100%" :disabled="allowance['blindbox'] >= amount?false:true">
            <el-tag size="small">2</el-tag>&nbsp;Buy
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance,onBeforeUnmount,onUnmounted } from "vue";
import { useStore } from "vuex";
import { nftApi, userApi } from "@/api/request";
import PageTitle from "@/components/page-title.vue";
import DynamicTable from "@/components/dynamic-table.vue";
import { loadingHelper } from "@/utils/loading";
import { DateHelper,AppHelper } from "@/utils/helper";
import { base64 } from "@/utils/base64";
import { copyClick } from '@/utils/copy';
import { ASSETTYPE, TXTYPE, savaAfterTranscation } from "@/utils/meta-mask";
import confetti from 'canvas-confetti';
import NFTTYPES from "@/data/nft-img-name.json";
const store = useStore()
const TYPES = ref({ buy: 3, used: 2, active: 0, using: 1 })
let activeName = ref(TYPES.value.active);
let title = ref({ type: "warning", title: "NFTs", desc: "All NFTs for points competitions which come from blind boxes" })
let tableData = ref([])
let tableHeader = ref(["id", "NFT_type", "blockchain", "minted_at", "game_chances"])
let tableHeader1 = ref(["id", "NFT_type", "blockchain", "minted_at", "run_out_time"])
let operations = ref([{ id: 1, type: 'success', icon: "fa fa-eye", name: "View NFT Info", event: 'view' },
{ id: 2, type: 'primary', icon: "fa fa-gamepad", name: "Use it for game", event: 'updateStatus' },])
let operations1 = ref([{ id: 1, type: 'success', icon: "fa fa-eye", name: "View NFT on Info", event: 'view' },])
let visible = ref(false);
let visible1 = ref(false);
let rowData = ref({});
let pageNum = ref(1); let total = ref(1);
let pageSize = ref(10);
let blockChain = ref('Binance Smart Chain')
let CONTRACTS = store.state.abi.contract;
let abis = ref({ blindbox: JSON.parse(base64.decode(CONTRACTS.blindbox.abi)), busd: JSON.parse(base64.decode(CONTRACTS.busd.abi)), nft: JSON.parse(base64.decode(CONTRACTS.nft.abi)) })
const allowance = ref({sl:0,club:0,defi:0,blindbox:0,buycosd:0})
const isOnlyUpdateStatus = ref(true);
const hasUpdated = ref(true);
const address = ref({ channelAddress: "", clubAddress: "", userAddress: "" });
const delay = ref(0);
const amount = ref(20);
const amount1 = ref(1);
const { proxy } = getCurrentInstance();
let metaMask = proxy.metaMask;
const disabled = ref(false)
const nftParam = ref({})
const loading = ref(false)
function handlerActions(data) {
  if (data.command == "view") {
    delay.value = 0
    isOnlyUpdateStatus.value = true;
    visible.value = true;
    setRowdata(data.data);
  }
  if (data.command == "updateStatus") {
    useNFTForGame(data.data)
  }
}

function query() {
  let data = {
    pageSize: pageSize.value,
    pageNo: pageNum.value,
    status: activeName.value,
    userId: store.state.user.id
  }
  loading.value = true
  nftApi.list(data).then((res) => {
    if (res.data.list) {
      tableData.value = res.data.list.map(i => {
        let info = NFTTYPES[i.nftType + ''];
        let item = {
          id: i.id,
          Token_ID: i.tokenId,
          tx_id: i.txId,
          NFT_type: info.type +' - '+ info.en_name,
          blockchain: i.blockChain,
          minted_at: DateHelper.toString(i.mintedAt * 1000),
          run_out_time: DateHelper.toString(i.runOutTime * 1000),
          game_chances: i.gameChances,
          src: `https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/card/` + info?.card_name
        }
        return item
      });
      total.value = res.data.total;
    }
    loading.value = false
  })
}
function setRowdata(data) {
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
function handleTabClick(tab) {
  activeName.value = tab;
  if (tab == TYPES.value.buy) return
  pageNum.value = 1;
  query();
}
function handlePageChange(val) {
  pageNum.value = val;
  query();
}
function handleSizeChange(val) {
  pageSize.value = val;
  query()
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
function getAllowance(key){
  let data = {
    abi: abis.value['busd'],
    address: CONTRACTS['busd'].address,
    from: store.state.metaMask?.account,
    to: CONTRACTS[key].address
  }
  metaMask.getAllowanceByContract(data).then(res=>{
    allowance.value[key] = res
  })
}
//随机获取
function getCard() {
  if (!metaMask.isAvailable()) return;
  visible1.value = true;
  userApi.wallet(store.state.user.id).then(res => {
    if (res.code == 0) {
      address.value = res.data;
      disabled.value = false;
      
    }
  });
}
function nftApprove() {
  if (!metaMask.isAvailable()) return;
  if (isEmpty()) return;
  let data = { from: store.state.metaMask?.account, address: CONTRACTS['blindbox'].address, amount: amount.value, abi: abis.value.blindbox, club: address.value.clubAddress, channel: address.value.channelAddress }
  if(!address.value.clubAddress) return;
  loadingHelper.show()
  metaMask.approveByContract({ ...data, abiApprove: abis.value.busd, approveAddress: CONTRACTS["busd"].address }).then(() => {
    disabled.value = true;
    getAllowance('blindbox')
    loadingHelper.hide();
  }).catch(err => {
    loadingHelper.hide();
  })
}
function nftSwap(event) {
  if (!metaMask.isAvailable()) return;
  if (isEmpty()) return;
  let data = { from: store.state.metaMask?.account, address: CONTRACTS['blindbox'].address, amount: amount.value, abi: abis.value.blindbox, club: address.value.clubAddress, channel: address.value.channelAddress }
  loadingHelper.show()
  metaMask.nftBlindBoxByContract(data).then((res) => {
    visible1.value = false;
    getAllowance('blindbox')
    delay.value = 1000
    animation(event, true)
    nftParam.value = {
      "txId": res.transactionHash,
      "transType": TXTYPE.blindbox,
      "fromUserId": store.state.user.id,
      "fromAssetType": ASSETTYPE.usdt,
      "fromAmount": amount.value,
      "toUserId": store.state.user.id,
      "toAssetType": ASSETTYPE.nft,
      "toAmount": amount1.value,
      "nftVo": {
        "tokenId": res.events.DrawCardEvent.returnValues.cardId,
        "attr1": "",
        "attr2": ""
      },
      "blockNumber": res.blockNumber
    }
    let tokenid = res.events.DrawCardEvent.returnValues.cardId;
    let nftparam = {
      from: store.state.metaMask?.account, 
      address: CONTRACTS['nft'].address,
      abi: abis.value.nft,
      tokenId: tokenid
    }
    getNFTnfoFromChain(tokenid)
    //addNFTToWallet(nftparam);
    loadingHelper.hide()
  }).catch(err => {
    console.log(err)
    loadingHelper.hide();
  })
}
function addNFTToWallet(param){
  metaMask.addNFTToWalletByContract(param).then(res=>{
    console.log("add to wallet")
  }).catch((err)=>{
    console.log(err)
  })
}
function getNFTnfoFromChain(id) {
  if (!metaMask.isAvailable()) return;
  let param = {
    abi: abis.value.nft,
    from: store.state.metaMask?.account,
    address: CONTRACTS['nft'].address,
    tokenId: id
  }
  metaMask.getNFTInfoByContract(param).then(res => {
    visible.value = true;
    let info = NFTTYPES[res.number + ''];
    rowData.value.src = `https://s3.ap-northeast-1.amazonaws.com/www.chessofstars.io/assets/img/card/` + info?.card_name;
    rowData.value.NFT_type = info.type +' - '+ info.en_name;
    rowData.value.game_chances = res.chances;
    rowData.value.status = 0;
    rowData.value.blockchain = blockChain.value;
    rowData.value.Token_ID = nftParam.value.nftVo.tokenId;
    rowData.value.contract_address = CONTRACTS['blindbox'].address;
    nftParam.value.nftVo.attr1 = res.number
    nftParam.value.nftVo.attr2 = res.chances
    isOnlyUpdateStatus.value = false;
    hasUpdated.value = false;

  })
}
async function handleSaveParamAfterTransfer(value) {
  if (!hasUpdated.value && !isOnlyUpdateStatus.value) {
    if (value) {
      nftParam.value.nftVo.status = value;
      ElMessageBox.confirm(
        'Do you want to use this nft for game?',
        'Info',
        {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'info',
        }
      )
        .then(() => {
          nftParam.value.nftVo.status = 1;
          rowData.value.status = 1;
        })
        .catch(() => {
          console.log('cancel')
          nftParam.value.nftVo.status = 0;
          rowData.value.status = 0;
        })
    }
    await savaAfterTranscation(nftParam.value)
    await query();
    hasUpdated.value = true;
    isOnlyUpdateStatus.value = true;
  }
}
function useNFTForGame(row) {
  ElMessageBox.confirm(
    'Do you want to use this nft for game?',
    'Info',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      type: 'info',
    }
  )
    .then(() => {
      updateNFTStatus(row)
    })
    .catch(() => {
      console.log('cancel')
    })
}
function updateNFTStatus(row) {
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
      query();
    }
  })
}
function animation(evt, hard) {
  let lastX = 0;
  const direction = Math.sign(lastX - evt.clientX);
  lastX = evt.clientX;
  const particleCount = hard ? r(122, 245) : r(2, 15);
  confetti({
    particleCount,
    gravity: 0.5,
    angle: r(90, 90 + direction * 30),
    spread: r(45, 80),
    origin: {
      x: evt.clientX / window.innerWidth,
      y: evt.clientY / window.innerHeight
    }
  });
}
function r(mi, ma) {
  return parseInt(Math.random() * (ma - mi) + mi);
}
function copy(val){
  copyClick(val)
}
onMounted(() => {
  query();
  activeName.value = AppHelper.getURLParam('active')||0;
  if (metaMask.isAvailable()) {
    getAllowance('blindbox')
  }
})

</script>
<style scoped>
.fa-copy{
  cursor: pointer;
  color:rgb(121, 121, 158)
}
</style>