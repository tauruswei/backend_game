import store from "@/store/index";
import router from "@/router/index";
import { ElMessage,ElMessageBox, ElNotification } from "element-plus"
import { userApi, chainApi } from '@/api/request';
// 相关依赖
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig} from '@wagmi/core'
import Web3 from 'web3'
//选择网络
import { bsc, bscTestnet } from '@wagmi/core/chains'

const projectId = '483982dc7c196e9361f90187f38d28c5' // 输入你在 https://cloud.walletconnect.com/  申请的projectId
const CHAINID = process.env.VUE_APP_CHAINID;
let web3;
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

export class Web3ModalManager {
    constructor() {
        this.account = null;
        this.network = null;
        this.web3modal = null;
        this.ethereumClient = null;
    }
    isCurrentAccount() {
        if(!store.state.metaMask) return;
        if (!store.state.user.account || store.state.user.account.toLowerCase() != store.state.metaMask.account.toLowerCase()) {
            ElMessageBox.confirm(
                'Not the current account,would you like to update the wallet address?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(() => {
                    router.push("/setting/profile")
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
        }
        if (!store.state.user.account) return false;
        return store.state.user.account.toLowerCase() == store.state.metaMask.account.toLowerCase();
    }
    isCurrentChain() {
        if (store.state.metaMask.chainID != CHAINID) {
            ElMessage.err("Not the same chain!")
            return false;
        } else {
            return true
        }
    }
    toHex(num) {
        if (typeof num !== "number") return;
        return '0x' + (num * 1000000000000000000).toString(16);
    }
    isAvailable() {
        let ret = false;
        if (!store.state.metaMask) {
            ElMessage.error("please connect wallet")
            return false;
        } else {
            ret = true;
        }
        if (!this.isCurrentChain()) return false;
        if (this.isCurrentAccount()) ret = true;
        else ret = false;
        return ret;
    }
    initModal = () => {
        const chains = [bsc, bscTestnet]

        const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
        const wagmiConfig = createConfig({
            autoConnect: true,
            connectors: w3mConnectors({
                projectId,
                version: 2,
                chains
            }),
            publicClient
        })

        const ethereumClient = new EthereumClient(wagmiConfig, chains)
        const web3modal = new Web3Modal({
            projectId: projectId,
            defaultChain: bscTestnet,
            explorerRecommendedWalletIds: 'NONE',
            explorerExcludedWalletIds: 'ALL',
            enableNetworkView: false,
            enableExplorer: false,
            themeMode: 'light',
            mobileWallets: [],
            tokenContracts: {
                1: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
                97: '0x21c571BF05b9CE69458541f6f8ce491332158603'
            },
            desktopWallets: [
            ],
        }, ethereumClient)

        web3modal.subscribeModal(newState => console.log(newState))
        this.web3modal = web3modal;
        this.ethereumClient = ethereumClient;
        let provider = window.ethereum;
        web3 = new Web3(provider);
    }
    disconnect(){
        this.ethereumClient.disconnect();
    }
    getContract(abi, address) {
        let contract = new web3.eth.Contract(abi, address);
        return contract
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
                ElNotification({ type: "success", message: "get blindbox successfully" })
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