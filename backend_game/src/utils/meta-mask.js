import MetaMaskSDK from '@metamask/sdk';
import MetaMaskOnboarding from '@metamask/onboarding'
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3'
import store from "@/store/index";
import router from "@/router/index";
import { messageHelper } from "@/utils/message-box";
import { chainApi } from '@/api/request';
let option = {
  injectProvider: false,
  communicationLayerPreference: 'webrtc',
}
const CHAINID = "0x61";
export const CONTRACTS = {
  sl: { address: "0x2795bA76b7f6665669FcBE3dA0B5e4e5FBdA634c", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },
  club: { address: "0x285B0B99C8182F344d57A4FbDa665BDe4Ff32fd3", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },
  cosd: { address: "0x21c571BF05b9CE69458541f6f8ce491332158603", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },
  busd: { address: "0x401084C7F44f4e2d2945F37bcad2406c24edE223", owner: "0x65B7F91FB4bDa26f712087E9152862D93b34c51d" },
  buycosd: { address: "0x8ae240779f6c8D0f3fEEEc37b4509c36d089730E", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },//0xD95bbD3D7e1348827Ae5A432AA3382deC0cE9c24
  defi: { address: "0x2964b20A8874A80787630c4D3d962740003c79E5", owner: "0xccb233A8269726c51265cff07fDC84110F5F3F4c" },
  blindbox: { address: "0x7d6f6F4edBAEd3A427F20d15A81F488D65c9d0Aa", owner: "" },
  nft: { address: "0x92BB51D54e0f2865199158A840227CFaC22d55bf", owner: "" },
  evic: { address: "0xccb233A8269726c51265cff07fDC84110F5F3F4c", owner: "" }
}
export const TXTYPE = { buy: 0, stake: { defi: 1, sl: 2, club: 3 }, evic: 7, evic1: 8, unstake: { defi: 4, sl: 5, club: 6 }, blindbox: 9, nft: 10 }
export const ASSETTYPE = { usdt: 0, cosd: 1, nft: 2, evic: 3, sl: 4 }
export const POOL = { defi: 1, sl: 2, club: 3 }
const provider = await detectEthereumProvider();
const MMSDK = new MetaMaskSDK(option);
const ethereum = MMSDK.getProvider();
const web3 = new Web3(provider)
provider.on('chainChanged', (chainId) => {
  if (!store.state.user) return;
  console.log(chainId)
  if (store.state.metaMask) {
    chainApi.getWalletUrl(chainId).then(res => {
      if (res.code == 0) {
        store.commit("setMetaMask", { account: store.state.user.account, chainID: chainId, url: res.data });
      }
    })
    ElMessage.success("You have changed the chain!")
  }
})
provider.on('connect', (accounts) => {
  console.log('connect', accounts)
})
provider.on('accountsChanged', (accounts) => {
  console.log('accountsChanged', accounts);
  if (!store.state.user) return;
  if (!accounts.length) store.commit("setMetaMask", null);
  else {
    if (store.state.metaMask) {
      store.commit("setMetaMask", { chainID: store.state.metaMask.chainID, url: store.state.metaMask.url, account: accounts[0] });
      if(!isCurrentAccount()) currentAccountTips()
    }
  }
})
provider.on('message', message => {
  console.log('message', message)
})
provider.on('disconnect', () => {
  console.log('disconnect')
  store.commit("setMetaMask", null)
  //window.location.reload()
})
function isCurrentAccount() {
  if (!store.state.user.account) return false;
  return store.state.user.account.toLowerCase() == store.state.metaMask.account.toLowerCase();
}
function currentAccountTips() {
  messageHelper.show('The wallet address you connected is inconsistent with the wallet address bounded to user,would you like to update the wallet address?',
    'Warning', () => {
      router.push("/setting/profile")
    })
}
export class MetaMask {
  constructor() {
    this.provider = provider;
  }
  isCurrentChain(id) {
    if (id != CHAINID) {
      ElMessage.error("Currently, Binance Smart Chain is only supported. Please switch to the Binance Smart Chain Mainnet network!")
      return false;
    } else {
      return true
    }
  }
  isAvailable() {
    let ret = false;
    if (!store.state.metaMask) {
      ElMessage.error("please connect wallet")
      return false;
    } else {
      ret = true;
    }
    if (!this.isCurrentChain(store.state.metaMask.chainID)) return false;
    if (isCurrentAccount()) ret = true;
    else {
      ret = false;
      currentAccountTips()
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
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      });
      const chainID = await provider.request({ method: 'eth_chainId' });
      const account = accounts[0];
      if (account) {
        chainApi.getWalletUrl(chainID).then(res => {
          if (res.code == 0) {
            store.commit("setMetaMask", { chainID: chainID, account: account, url: res.data });
            ElMessage.success('Connected!')
            isAvailable()
          }
        })
      }
      else {
        store.commit("setMetaMask", null);
      }
      return true;
    } catch (error) {
      console.log(error)
      store.commit("setMetaMask", null);
      return false
    }
  }
  isMetaMaskInstalled() {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask)
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
          console.log('COSD1 successfully added to wallet!');
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
      myContract.methods.buyToken(this.toHex(param.money)).send({
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
  async getClubStatusByContract(param) {
    const myContract = this.getContract(param.abi, param.address);
    let status = await myContract.methods.isClub(param.from).call()
    return status;
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
    let balance = await myContract.methods.allowance(param.from, param.to).call()
    return balance;
  }
  //授权
  async approveByContract(param) {
    const myContract = this.getContract(param.abiApprove, param.approveAddress);
    return new Promise((resolve, reject) => {
      myContract.methods.approve(param.address, this.toHex(param.money)).send({ from: param.from })
        .then(res => {
          ElNotification({ type: "success", message: "Approve successfully" })
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
        ElNotification({ type: "success", message: "Stake successfully\nIf the balance is not refreshed, manually refresh later" })
        console.log(res)
        resolve(res)
      }).catch(err => {
        ElMessage.error(!err.status ? "stake failed" : err)
        console.log(err)
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
        ElNotification({ type: "success", message: "unstake successfully\nIf the balance is not refreshed, manually refresh later" })
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
        ElNotification({ type: "success", message: "claim rewards successfully" })
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
      myContract.methods.drawCard(this.toHex(param.money), param.club, param.channel).send({
        from: param.from
      }).then(res => {
        ElNotification({ type: "success", message: "get blindbox successfully！It will take a few minutes,you can refresh later" })
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
      myContract.methods.transfer(param.to, this.toHex(param.money)).send({
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
}
export const savaAfterTranscation = (param) => {
  chainApi.save(param).then(res => {
    console.log(res)
    console.log("saved")
  }).catch((err) => {
    console.log(err)
  })
}
