import SvgIcon from "@/components/SvgIcon"; // svg component

const req = require.context("./svg", true, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);

requireAll(req);

export default {
  install: function (Vue) {
    // register globally
    Vue.component("svg-icon", SvgIcon);
  },
};
