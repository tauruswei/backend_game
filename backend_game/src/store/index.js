import { createStore } from "vuex";

const store = createStore({
    state: {
        token: "",
        user: null,
        role: null,
        roles:[{id:0,name:"admin"},{id:1,name:"user"}],
        metaMask:null,
        balance:{busd:0,cosd:0},
        time:null,
        abi: {},
        cancelTokenArr: []
    },
    mutations: {
        setToken(state, token) {
            // 第一个参数为 state 用于变更状态 登录
            sessionStorage.setItem("TOKEN", token);
            state.token = token;
        },
        removeToken(state) {
            // 退出登录
            sessionStorage.removeItem("TOKEN");
            state.token = "";
        },
        setUser(state, user) {
            state.user = user;
        },
        setRole(state, role) {
            state.role = role;
        },
        setTime(state, time) {
            state.time = time;
        },
        setRoles(state, roles) {
            state.roles = roles;
        },
        setMetaMask(state,metaMask){
            state.metaMask = metaMask;
        },
        setBalance(state,balance){
            state.balance = balance;
        },
        setABI(state,abi){
            state.abi = abi;
        },
        pushRequestToken(state, payload) {
            state.cancelTokenArr.push(payload.cancelToken)
        },
        clearRequestToken({ cancelTokenArr }) {
            cancelTokenArr.forEach(item => {
                item('路由跳转取消请求')
            })
            cancelTokenArr = []
        }
    },
    actions: {},
    modules: {},
});

//解决刷新状态刷新空值问题
if (sessionStorage.getItem("store")) {
    store.state.token = JSON.parse(sessionStorage.getItem("store")).token;
    store.state.user = JSON.parse(sessionStorage.getItem("store")).user;
    store.state.metaMask = JSON.parse(sessionStorage.getItem("store")).metaMask;
    store.state.abi = JSON.parse(sessionStorage.getItem("store")).abi;
    store.state.balance = JSON.parse(sessionStorage.getItem("store")).balance;
    store.state.role = parseInt(JSON.parse(sessionStorage.getItem("store")).role);
    store.state.roles = JSON.parse(sessionStorage.getItem("store")).roles;
}
//在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("store", JSON.stringify(store.state));
});
export default store;