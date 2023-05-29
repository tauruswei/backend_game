import MetaMaskSDK from '@metamask/sdk';
import MetaMaskOnboarding from '@metamask/onboarding'
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3'
import store from "@/store/index";
import { ElMessage, ElNotification } from "element-plus"
import { userApi } from '@/api/request';
let option = {
  injectProvider: false,
  communicationLayerPreference: 'webrtc',
}
export const CONTRACTS = {
  sl: { address: "0x03E4a9feeE158200C7F532B23e7B6993bb39A981", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },
  club: { address: "0x285B0B99C8182F344d57A4FbDa665BDe4Ff32fd3", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },
  cosd: { address: "0x21c571BF05b9CE69458541f6f8ce491332158603", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },
  busd: { address: "0x401084C7F44f4e2d2945F37bcad2406c24edE223", owner: "0x65B7F91FB4bDa26f712087E9152862D93b34c51d" },
  buycosd: { address: "0xc65e7140d7FbBB86286C5eDe1c763B063703C610", owner: "0x3249F5fb49982A927A566b2b8Ad0CCf34d4f84CE" },//0xD95bbD3D7e1348827Ae5A432AA3382deC0cE9c24
  defi: { address: "0x548eEc700CDcb2bB899EB436CEb1b2ACF9984C75", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },
  blindbox: { address: "0xd319b75ECD766D2e41809351d4Fa387Bba7A9018", owner: "" },
  nft: { address: "0x3759B7Db9CaE0aac51B3712bcD70dEa89804973c", owner: "" },
  evic: { address: "0xccb233A8269726c51265cff07fDC84110F5F3F4c", owner: "" }
}
export const TXTYPE = { buy: 0, stake: { defi: 1, sl: 2, club: 3 }, evic: 7, unstake: { defi: 4, sl: 5, club: 6 }, blindbox: 9, nft: 10 }
export const ASSETTYPE = { usdt: 0, cosd: 1, nft: 2, evic: 3, sl: 4 }
export const POOL = { defi: 3, club: 2, sl: 1 }
const provider = await detectEthereumProvider();
const MMSDK = new MetaMaskSDK(option);
const ethereum = MMSDK.getProvider();
const web3 = new Web3(provider)
export class MetaMask {
  constructor() {
    this.provider = provider;
  }
  isAvailable() {
    let ret = false;
    if (!store.state.metaMask) {
      ElMessage.error("please connect wallet")
      return false;
    } else {
      return true;
    }
    if (this.connectMetaMask()) return ret = true;
    if (!this.isCurrentAccount()) {
      ElMessage.error("Not the current account, please switch to the current account")
    } else {
      ret = true
    }
    return ret;
  }
  async connectMetaMask() {
    if (!this.isMetaMaskInstalled()) {
      // 判断是否安装MetaMask扩展工具
      const forwarderOrigin = window.location.origin
      const onboarding = new MetaMaskOnboarding({
        forwarderOrigin
      })
      onboarding.startOnboarding()
      return
    }
    if (!provider) {
      ElMessage.error('Please install MetaMask!');
      return
    }
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const chainID = await window.ethereum.request({ method: 'eth_chainId' });
      const account = accounts[0];
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload()
      })
      window.ethereum.on('message', message => {
        console.log('message', message)
      })
      window.ethereum.on('disconnect', () => {
        store.commit("setMetaMask", null);
        window.location.reload()
      })
      if (account) {
        store.commit("setMetaMask", { chainID: chainID, account: account });
        ElMessage.success('connected success!')
        if (!store.state.user.account) userApi.update({ wallet: account, name: store.state.user.name }).then(res => {
          console.log("updated")
          store.commit('setUser', { ...store.state.user, account: account })
        })
      }
      else {
        store.commit("setMetaMask", null);
      }
      return true;
    } catch (error) {
      console.log(error)
      store.commit("setMetaMask", null);
      ElMessage.error(error)
      return false
    }
  }
  isMetaMaskInstalled() {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask)
  }
  isCurrentAccount() {
    return store.state.user.account.toLowerCase() == store.state.metaMask.account.toLowerCase();
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
    if (!this.isCurrentAccount()) {
      ElMessage.error("Not the current account, please switch to the current account")
      return;
    }
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
          console.log('COSD1 successfully added to wallet!');
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch(console.error);
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
      myContract.methods.buyToken(this.toHex(param.money)).send({
        from: param.from
      }).then(res => {
        console.log(res)
        ElNotification({ type: "success", message: "transcation successed" })
        resolve(res)
      }).catch(err => {
        reject(error)
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
  async getRewardByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let reward = await myContract.methods.stakingReward(param.from).call()
    return reward / Math.pow(10, 18);
  }
  async getClubStatusByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let status = await myContract.methods.isClub(param.from).call()
    return status;
  }
  //查询授权余额
  async getAllowanceByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let balance = await myContract.methods.allowance(param.from, param.to).call()
    return balance;
  }
  //授权
  async approveByContract(param) {
    const myContract = this.getContract(param.abiApprove, param.approveAddress);
    return new Promise((resolve, reject) => {
      myContract.methods.approve(param.address, this.toHex(param.money)).send({ from: param.from })
        .then(res => {
          ElNotification({ type: "success", message: "Approve successed" })
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
      myContract.methods.stake(this.toHex(param.money)).send({
        from: param.from
      }).then(res => {
        ElNotification({ type: "success", message: "Stake successed" })
        console.log(res)
        resolve(res)
      }).catch(err => {
        ElMessage.error(err)
        reject(err)
      })
    })
  }
  //unstake:defi unstake之后可领取奖励
  async unStakingByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.unStake(this.toHex(param.money)).send({
        from: param.from
      }).then(res => {
        ElNotification({ type: "success", message: "unstake successed" })
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
        ElNotification({ type: "success", message: "claim rewards successed" })
        resolve(res)
      }).catch(err => {
        ElMessage.error(err)
        reject(err)
      })
    })
  }
  //nft
  async nftBlindBoxByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.drawCard(this.toHex(param.money), param.club, param.channel).send({
        from: param.from
      }).then(res => {
        ElNotification({ type: "success", message: "successed" })
        resolve(res)
      }).catch(err => {
        ElMessage.error(err)
        reject(err)
      })
    })
  }
  async getNFTInfoByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.getNFT(param.tokenId).send({
        from: param.from
      }).then(res => {
        resolve(res)
      }).catch(err => {
        ElMessage.error(err)
        reject(err)
      })
    })
  }
  async transferEvicByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    return new Promise((resolve, reject) => {
      myContract.methods.transfer(param.to,this.toHex(param.money)).send({
        from: param.from
      }).then(res => {
        console.log(res)
        ElNotification({ type: "success", message: "transcation successed" })
        resolve(res)
      }).catch(err => {
        reject(error)
        ElMessage.error(err)
      })
    })
  }
}
export function savaAfterTranscation(param) {
  chainApi.save(param).then(res => {
    console.log("saved")
  })
}