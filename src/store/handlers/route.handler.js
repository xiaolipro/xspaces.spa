/**
 * @author antinew 2357729423@qq.com （不想保留author可删除）
 * @description 渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function menus2Routes(asyncRoutes) {
  if (!asyncRoutes) return;
  return asyncRoutes.filter((route) => {
    if (isEmptyRoute(route)) return;
    if (route.component === "Layout") {
      route.component = () => Promise.resolve(require(`@/layouts`).default);
    } else if (route.component === "EmptyLayout") {
      route.component = () =>
        Promise.resolve(require("@/layouts/EmptyLayout").default);
    } else {
      const index = route.component.indexOf("views");
      const path =
        index > -1 ? route.component.slice(index) : `views/${route.component}`;
      route.component = () => Promise.resolve(require(`@/${path}`).default);
    }
    route.children = menus2Routes(route.children);
    return route;
  });
}

function isEmptyRoute(route) {
  if (route.component.indexOf("Layout") === -1) return false;
  if (route.children && route.children.length === 0) return true;
  let res = true;
  for (let i = 0; i < route.children.length; i++) {
    const el = route.children[i];
    if (!isEmptyRoute(el)) {
      res = false;
      break;
    }
  }
  return res;
}
