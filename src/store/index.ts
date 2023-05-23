import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

interface State {
  [key: string]: any;
}

export const key: InjectionKey<Store<State>> = Symbol();

const modules: {
  [key: string]: { [key: string]: any };
} = {};
const files = require.context("./modules", false, /\.ts$/);
files.keys().forEach((key) => {
  modules[key.replace(/\.\/(.*)\.ts/, "$1")] = files(key).default || files(key);
});
console.log(modules);
export default createStore({
  modules,
});
