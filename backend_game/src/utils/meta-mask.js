import MetaMaskSDK from '@metamask/sdk';
import MetaMaskOnboarding from '@metamask/onboarding'
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3'
import store from "../store/index";
import router from "../router/index";
import { messageHelper } from "@/utils/message-box";
import { chainApi, userApi } from '@/api/request';
import { ElNotification } from 'element-plus';
let option = {
  injectProvider: false,
  communicationLayerPreference: 'webrtc',
  preferDesktop: true
}
export const TXTYPE = { buy: 0, stake: { defi: 1, sl: 2, club: 3 }, evic: 7, evic1: 8, unstake: { defi: 4, sl: 5, club: 6 }, blindbox: 9, nft: 10 }
export const ASSETTYPE = { usdt: 0, cosd: 1, nft: 2, evic: 3, sl: 4 }
export const POOL = { defi: 1, sl: 2, club: 3 }
const MMSDK = new MetaMaskSDK(option);
const ethereum = MMSDK.getProvider();
const web3 = new Web3(ethereum)
function toHex(num) {
  let hex = '0x' + num.toString(16);
  return hex
}
export class MetaMask {
  constructor() {
    this.provider = null;
    this.enabled = false;
    this.account = null;
    this.chainId = null;
    this.url = null;
  }
  async getProvider() {
    this.provider = await detectEthereumProvider()
  }
  disconnect() {
    this.enabled = false;
    this.account = null;
    this.chainId = null;
    this.url = null;
    store.commit("setMetaMask", null)
  }
  async connectMetaMask() {
    if (!window.ethereum) {
      messageHelper.error(`Please install Metamask Wallet at <a href="https://metamask.io/">metamask.io</a>.`, true, 4000);
      return
    }
    if (!this.isMetaMaskInstalled()) {
      // 判断是否安装MetaMask扩展工具
      const forwarderOrigin = window.location.origin
      const onboarding = new MetaMaskOnboarding({
        forwarderOrigin
      })
      onboarding.startOnboarding()
      return
    }
    await this.getProvider()
    if (!this.provider) {
      messageHelper.error(`Please install Metamask Wallet at <a href="https://metamask.io/">metamask.io</a>.`, true, 4000);
      return
    }
    if (this.provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }

    const CHAINID = toHex(store.state.abi.chainId)
    this.chainId = await ethereum.request({ method: 'eth_chainId' })
    if (this.chainId !== CHAINID) {
      let isChecked = await this.checkNetwork();
      console.log("checkednetwork", isChecked)
      if (!isChecked) return;
      this.chainId = this.toHex(store.state.abi.chainId)
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts && accounts.length) this.account = accounts[0];
    if (this.account) {
      await chainApi.getWalletUrl(this.chainId).then(res => {
        if (res.code == 0) {
          this.url = res.data;
          store.commit("setMetaMask", { chainID: this.chainId, account: this.account, url: res.data });
          this.isCurrentAccount()
        }
      })
    } else {
      this.disconnect()
    }
  }
  isMetaMaskInstalled() {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  async isMetaMaskConnected() {
    try {
      this.enabled = await ethereum.enable()
    } catch (error) {
      console.log("enable", error)
    }
  }
  //检测网络并添加
  async checkNetwork() {
    let isAdd = false;
    let isSwitch = await this.switchNetwork();
    console.log('isSwitch', isSwitch)
    if (isSwitch == 4902) {
      isAdd = await this.addNetwork();
    }
    console.log('isAdd', isAdd)
    return isSwitch === true ? true : false
  }
  async switchNetwork() {
    const CHAINID = toHex(store.state.abi.chainId)
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAINID }], // chainId must be in hexadecimal numbers
      }).then(res => {
        console.log(res)
      })
      return true;
    } catch (error) {
      if (error.code === 4902) {
        console.log("no network")
        return 4902
      } else if (error.code === 4001) {
        messageHelper.error('Sorry you need to switch to the right network, please try again!');
        return false
      } else {
        return false
      }
    }
  }
  async addNetwork() {
    try {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: store.state.abi.networkName,
            chainId: toHex(store.state.abi.chainId),
            rpcUrls: [...store.state.abi.rpcUrls],
            blockExplorerUrls: [store.state.abi.explorer],
            nativeCurrency: {
              name: store.state.abi?.nativeCurrency,
              symbol: store.state.abi?.nativeCurrency,
              decimals: 18
            },
          },
        ],
      }).then(res => {
        console.log(res)
      })
      console.log("add network success")
      return true
    } catch (error) {
      console.log(error)
      console.log("cancel")
      return false
    }
  }
  async isCurrentChain(id) {
    const CHAINID = toHex(store.state.abi.chainId)
    if (id != CHAINID) {
      let res = await this.checkNetwork();
      console.log("isbsc", res)
      return res;
    } else {
      return true
    }
  }
  isCurrentAccount() {
    if (!store.state.user?.account) {
      this.noBoundAddressTips();
      return false;
    }
    if (store.state.user.account.toLowerCase() != store.state.metaMask?.account.toLowerCase()) {
      this.currentAccountTips()
      return false;
    }
    return store.state.user.account.toLowerCase() == store.state.metaMask?.account.toLowerCase();
  }
  currentAccountTips() {
    messageHelper.show('The wallet address you connected is inconsistent with the wallet address bounded to user,would you like to update the wallet address?',
      'Warning', () => {
        router.push("/setting/profile")
      })
  }
  noBoundAddressTips() {
    messageHelper.show('Would you like to bind the current wallet address to your account?',
      'Warning', () => {
        let data = {
          name: store.state.user.name,
          userId: store.state.user.id,
          walletAddress: store.state.metaMask?.account
        }
        userApi.update(data).then(res => {
          if (res.code == 0) {
            let user = store.state.user;
            store.commit("setUser", { ...user, account: store.state.metaMask?.account });
            ElNotification({
              type: 'success',
              message: "Bind successfully!"
            })
          }
        })
      })
  }
  isAvailable() {
    let ret = false;
    if (!this.isMetaMaskInstalled()) {
      messageHelper.error(`Please install Metamask Wallet at <a href="https://metamask.io/">metamask.io</a>.`, true, 4000)
      return false;
    }
    if (!store.state.metaMask) {
      messageHelper.error("please connect wallet")
      return false;
    } else {
      ret = true;
    }
    if (!this.isCurrentChain(store.state.metaMask?.chainID)) return false;
    if (this.isCurrentAccount()) ret = true;
    else {
      ret = false;
    }
    return ret;
  }
  //ETH转账
  sendTransaction(param) {
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: param.from, // The user's active address.
            to: param.to, // Required except during contract publications.
            value: param.value * Math.pow(10, 18), // Only required to send ether to the recipient from the initiating external account.
            gasPrice: param.price ? param.price : null, // Customizable by the user during MetaMask confirmation.
            gas: param.gas ? param.gas : null, // Customizable by the user during MetaMask confirmation.
            chainId: param.chainID,
            data: param.data ? param.data : null
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error(error));
  }
  //添加代币
  watchAsset(param) {
    ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: param.address,
            symbol: param.symbol,
            decimals: 18,
            image: param.image ? param.image : '',
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log(success)
          console.log(param.symbol + ' successfully added to wallet!');
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch((error) => console.error(error));
  }
  async getBalance(account) {
    let balance = await web3.eth.getBalance(account);
    return balance / Math.pow(10, 18);
  }
  getContract(abi, address) {
    let contract = new web3.eth.Contract(abi, address);
    return contract
  }
  toHex(num) {
    return web3.utils.toHex(num + '000000000000000000');
  }
  //直接转账充币地址
  async transferByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.buyToken(this.toHex(param.amount)).send({
        from: param.from
      }).then(res => {
        console.log(res)
        ElNotification({ type: "success", message: "transcation successfully\nIf the balance is not refreshed, manually refresh later" })
        resolve(res)
      }).catch(err => {
        reject(err)
        console.log(err)
        ElMessage.error(err)
      })
    })
  }
  //查询代币余额
  async getBalanceByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let balance = await myContract.methods.balanceOf(param.from).call()
    return (param.key && param.key == 'nft') ? balance : (balance / Math.pow(10, 18));
  }
  async getMarketBalanceByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let balance = await myContract.methods.balanceOf(param.baddress).call()
    return balance / Math.pow(10, 18)
  }
  async getRewardByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let reward = await myContract.methods.stakingReward(param.from).call()
    return reward / Math.pow(10, 18);
  }
  async getRewardRateByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let rewardRate = await myContract.methods.rewardRateInit().call()
    return rewardRate + "%";
  }
  async getClubStatusByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let status = await myContract.methods.isClub(param.from).call()
    return status;
  }
  async getStakeStartTimeByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let time = await myContract.methods.stakingStartTime().call()
    return time;
  }
  //累计购买数量
  async getCOSDHasBuyByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let balance = await myContract.methods.cumulativePurchase(param.from).call()
    return balance / Math.pow(10, 18);
  }
  //查询授权余额
  async getAllowanceByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let allowance = await myContract.methods.allowance(param.from, param.to).call()
    return allowance / Math.pow(10, 18);
  }
  //授权
  async approveByContract(param) {
    const myContract = this.getContract(param.abiApprove, param.approveAddress);
    return new Promise((resolve, reject) => {
      myContract.methods.approve(param.address, this.toHex(param.amount)).send({ from: param.from })
        .then(res => {
          ElNotification({ type: "success", message: `You've authorized ${param.amount} usdt for purchasing, please click buy to proceed.` })
          resolve(res)
        }).catch(err => {
          ElMessage.error(err)
          reject(err)
        })
    })
  }
  //质押：先approve再stake
  async stakingByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.stake(this.toHex(param.amount)).send({
        from: param.from
      }).then(res => {
        ElNotification({ type: "success", message: "Stake successfully\nIf the balance is not refreshed, manually refresh later" })
        console.log(res)
        resolve(res)
      }).catch(err => {
        ElMessage.error(!err.status ? "Stake failed" : err)
        console.log(err)
        reject(err)
      })
    })
  }
  //unstake:defi unstake之后可领取奖励
  async unStakingByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.unStake(this.toHex(param.amount)).send({
        from: param.from
      }).then(res => {
        ElNotification({ type: "success", message: "Unstake successfully\nIf the balance is not refreshed, manually refresh later" })
        resolve(res)
      }).catch(err => {
        ElMessage.error(err)
        reject(err)
      })
    })
  }
  async claimRewardByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.claimReward().send({
        from: param.from
      }).then(res => {
        ElNotification({ type: "success", message: "Claim rewards successfully" })
        resolve(res)
      }).catch(err => {
        console.log(err)
        ElMessage.error(err)
        reject(err)
      })
    })
  }
  //nft
  async nftBlindBoxByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.drawCard(this.toHex(param.amount), param.club, param.channel).send({
        from: param.from
      }).then(res => {
        ElNotification({ type: "success", message: "You have successfully purchased the NFT blind box, It will take a few minutes,you can refresh later" })
        resolve(res)
      }).catch(err => {
        console.log(err)
        ElMessage.error(err)
        reject(err)
      })
    })
  }
  async getNFTInfoByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let info = await myContract.methods.getNFT(param.tokenId).call();
    return info;
  }
  async transferEvicByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.transfer(param.from, this.toHex(param.amount)).send({
        from: param.from
      }).then(res => {
        console.log(res)
        ElNotification({ type: "success", message: "it will take a few minutes,please refresh later" })
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
        ElMessage.error(err)
      })
    })
  }
  async addNFTToWalletByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.addNFT(param.tokenId).send({
        from: param.from
      }).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
}
export const savaAfterTranscation = (param) => {
  chainApi.save(param).then(res => {
    console.log(res)
    console.log("saved")
  }).catch((err) => {
    console.log(err)
  })
}
