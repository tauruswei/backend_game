import { get, post, del } from "@/utils/axios";
import { toQuery } from "@/utils/toquery";
export const userApi = {
  logout: (data) => post("/user/logout", data),
  login: (data) => post("/user/login", data),
  signup: (data) => post("/user/register", data),
  checkedName: (data) => post("/user/queryUserByEmail?email=" + data),
  roles: () => get("/role/selectList"),
  users: () => post("/user/list"),
  reset: (data) => post("/user/resetPasswd", data),
  password: (data) => post("/user/modifyPasswd", data),
  email: (data) => post("/user/modifyEmail", data),
  update: (data) => post("/user/updateUser", data),
  code: (data) => post("/user/sendCode", data),
  userById: (data) => post("/user/queryUserById", data),
  userByName: (data) => post("/user/queryUserByName", data),
  logs: (data) => get("/user/logs", data),
  profile: (data) => post("/user/getUserProfile", data),
  register: (data) => post("/user/createChannelLeader", data),
  wallet: (id) => post("/user/queryClubChannelAddress?userId=" + id),
  channel: (data) => post("/user/createChannelLeader",data)
};
export const chainApi = {
  transactions: (data) => post("/blockChain/call", data),
  save: (data) => post("/webTransaction/save", data)
}
export const evicsApi = {
  assets: (data) => post("/asset/queryUserAssets", data),
  data: (data) => post("/asset/queryUserAsset", data),
  withdraw: (data) => post("/webTransaction/withdrawEvic", data)
}
export const cosdApi = {
  buy: (data) => post("/cosd/purchaseCOSD", data),
  stakeForClub: (data) => post("/cosd/stakeForClub", data),
  stakeForDefi: (data) => post("/cosd/stakeForDefi", data),
  stakeForSL: (data) => post("/cosd/stakeForSL", data),
  unStakeForClub: (data) => post("/cosd/unStakeForClub", data),
  unStakeForDefi: (data) => post("/cosd/unStakeForDefi", data),
  unStakeForSL: (data) => post("/cosd/unStakeForSL", data)
}
export const nftApi = {
  list: (data) => post("/nft/queryNFTsByUserIdAndStatus", data),
}
export const gameApi = {
  increaseChesserPts: (data) => post("/game/increaseUserChesserPts", data),
  increaseMoney: (data) => post("/game/increaseUserMoney", data),
  rewards: (data) => get("/game/rewards", data)
}
export const blogApi = {
  list: (data) => get("/blog/list", data),
  del: (data) => del("/blog/delete", data),
  edit: (data) => post("/blog/update", data),
  add: (data) => post("/blog/add", data)
}
export const dashboardApi = {
  alldata: (data) => get("/dashboard/data", data),
}
