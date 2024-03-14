import { createApp } from "vue";
import "normalize.css";
import "@/assets/css/index.less";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import useLoginStore from "./stores/modules/login";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import useDirectives from "./directives";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, {
  locale: zhCn
});
app.use(pinia);
const loginStore = useLoginStore();
loginStore.loadLocalCacheAction();
app.use(router);
useDirectives(app)

app.mount("#app");
