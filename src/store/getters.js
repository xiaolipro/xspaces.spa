export default {
  /* layout begin */
  sidebar: (state) => state.layout.sidebar,
  size: (state) => state.layout.size,
  device: (state) => state.layout.device,
  tagsView: (state) => state.layout.tagsView,
  fixedHeader: (state) => state.layout.fixedHeader,
  layout: (state) => state.layout.layout,
  /* layout end */

  /** route begin */
  routes: (state) => state.route.routes,
  /** route end */

  /* user begin */
  token: (state) => state.user.accessToken,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  /* user end */
};
