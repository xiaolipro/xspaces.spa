import { createStore } from "vuex";
import getters from "./getters";

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  // app: {state:..}
  modules[moduleName] = { namespaced: true, ...value.default };
  return modules;
}, {});

export default createStore({
  modules,
  getters,
});
