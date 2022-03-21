import { getList } from "@/api/rbac/menu";
import { routes as staticRoutes } from "@/router";
import { menus2Routes } from "../handlers/route.handler";

/**
 * @author antinew 2357729423@qq.com
 * @description Route status manager
 * @date 2022-01-09 15:15:55
 */
const state = {
  routes: [],
};
const mutations = {
  addRoutes: (state, routes) => {
    state.routes = staticRoutes.concat(routes);
  },
};
const actions = {
  async getRoutes({ commit }) {
    const { data } = await getList();
    const routes = menus2Routes(data);
    commit("addRoutes", routes);
    return routes;
  },
};

export default {
  state,
  mutations,
  actions,
};
