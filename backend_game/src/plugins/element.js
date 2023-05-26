
import "../element-variables.scss";
import ElementPlus from "element-plus";
import zhcn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default (app) => {
  app.use(ElementPlus, { locale: zhcn });
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
};
