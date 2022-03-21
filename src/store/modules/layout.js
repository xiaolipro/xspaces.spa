import variables from "@/styles/element/element-variables.scss";
import themeSettings from "@/config/theme.config.js";
import Cookies from "js-cookie";

const { fixedHeader, controlPanel, tabsBar, sidebarLogo, layout } =
  themeSettings;
const theme = JSON.parse(localStorage.getItem("app-theme")) || "";

const state = {
  sidebar: {
    collapse: Cookies.get("sidebar.collapse") === "true" || true,
    logo: sidebarLogo || true,
    withoutAnimation: false,
  },
  layout: theme.layout || layout,
  device: "desktop",
  size: Cookies.get("size") || "medium", // global size default is medium
  primaryColor: variables.primaryColor,
  controlPanel: controlPanel,
  tagsView: tabsBar,
  fixedHeader: fixedHeader,
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    const collapse = !state.sidebar.collapse;
    state.sidebar.collapse = collapse;
    state.sidebar.withoutAnimation = false; // toggle为人为触发事件，一定带动画的
    Cookies.set("sidebar.collapse", collapse);
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    Cookies.set("size", size);
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set("sidebar.collapse", true);
    state.sidebar.collapse = true;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  CHANGE_THEME: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  setSize({ commit }, size) {
    commit("SET_SIZE", size);
  },
  changeTheme({ commit }, data) {
    commit("CHANGE_THEME", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
