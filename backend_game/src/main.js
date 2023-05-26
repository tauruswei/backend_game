import store from "./store";
import router from "./router";
import App from "./App.vue";
import { createApp } from "vue";
import 'font-awesome/css/font-awesome.min.css'
import installElementPlus from "./plugins/element";
//import "./assets/font/iconfont.css";
require("../mock/index.js");

const app = createApp(App);
installElementPlus(app);
app.use(store).use(router).mount("#app");
app.config.errorHandler = (err, vm, info) => {
    console.log(err)
}
app.config.warnHandler = (msg, instance, trace) => {
    console.log(msg)
}

