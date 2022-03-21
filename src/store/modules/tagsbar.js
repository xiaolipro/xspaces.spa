const state = {
  visitedViews: [],
  chachedViews: [],
};
const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some((x) => x.path === view.path)) return;

    // add to visited view array
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-title",
      })
    );
  },
  ADD_CHACHED_VIEW: (state, view) => {
    if (state.chachedViews.some((x) => x.path === view.path)) return;
    if (!view.meta.isCached) return;

    state.chachedViews.push(view);
  },
  DEL_ALL_CACHED_VIEW: (state) => {
    state.chachedViews = [];
  },
};
const actions = {
  addVisitedView({ commit }, view) {
    commit("ADD_VISITED_VIEW", view);
  },
  addCachedView({ commit }, view) {
    commit("ADD_CACHED_VIEW", view);
  },
  delAllCachedView({ commit, state }) {
    return new Promise((resolve) => {
      commit("DEL_ALL_CACHED_VIEW");
      resolve([...state.chachedViews]);
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
