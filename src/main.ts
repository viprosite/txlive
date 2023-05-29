import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import "@/styles/index.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store, key).use(router).use(ElementPlus).mount("#app");

import { stringReg, dateReg, moneyReg, numberReg } from "@/utils/regexp";
console.log(dateReg.birth("1910-12-12"));

console.log(numberReg.positive("1"));

// import { arrayMin } from "@/utils/functions/core/array";
// arrayMin
// console.log(parseInt);
