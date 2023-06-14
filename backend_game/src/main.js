import store from "./store/index";
import router from "./router/index";
import App from "./App.vue";
import { createApp } from "vue";
import 'font-awesome/css/font-awesome.min.css'
import { MetaMask } from "./utils/meta-mask";
//import installElementPlus from "./plugins/element";
//require("../mock/index.js");
const app = createApp(App);
//installElementPlus(app);
app.config.globalProperties.metaMask = new MetaMask();
app.use(store).use(router).mount("#app");

app.config.errorHandler = (err, vm, info) => {
    console.log(err,vm,info)
}
app.config.warnHandler = (msg, instance, trace) => {
    console.log(msg,instance,trace)
}

