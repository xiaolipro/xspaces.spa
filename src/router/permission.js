import { title, routesWhiteList } from "@/config";
import router from "./index";
import store from "@/store";
import { ElMessage } from "element-plus";
import { getAccessToken } from "@/store/handlers/token.handler";

import NProgress from "nprogress"; // progress bar

router.beforeEach(async (to, from, next) => {
  console.log("from:", from.path, " to:", to.path);
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const token = getAccessToken();
  if (token) {
    if (to.path === "/login") {
      ElMessage.warning("请勿重复登录");
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      return;
    }

    try {
      if (store.getters["routes"].length) {
        next();
        return;
      }
      // get user can accessible routes
      const routes = await store.dispatch("route/getRoutes");
      //dynamically add, vue router 4.0 removed addRoutes, so we have to use addRoute
      routes.forEach((route) => {
        if (!hasRoute(router.getRoutes(), route)) {
          router.addRoute(route);
        }
      });
      next({ ...to, replace: true });
    } catch (error) {
      // remove token and go to login page to re-login
      await store.dispatch("user/resetToken");
      ElMessage.error(
        JSON.stringify(error) === "{}" ? "Has Error" : error || "Has Error"
      );
      next(`/login?redirect=${to.path}`);
      NProgress.done();
      Promise.reject(error);
    }

    return;
  }

  /* has no token*/
  // in the free login whitelist, go directly
  if (routesWhiteList.indexOf(to.path) !== -1) {
    next();
    return;
  }
  // other pages that do not have permission to access are redirected to the login page.
  next(`/login?redirect=${to.path}`);
  NProgress.done();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

function hasRoute(routes, route) {
  return routes.find((x) => x.path === route.path);
}
