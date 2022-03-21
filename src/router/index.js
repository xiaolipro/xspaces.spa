import { createRouter, createWebHashHistory } from "vue-router";

/* Layout */
import Layout from "@/layouts";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: false                  if set true, item will not show in the sidebar(default is false)
 * alwaysShow: false              if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", affix: true },
      },
    ],
  },
  {
    path: "/redirect/:path(.*)",
    component: () => import("@/views/Redirect"),
  },
  {
    path: "/about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/auth/login/index.vue"),
  },
  {
    path: "/401",
    component: () => import("../views/error/401"),
    meta: { title: "401", affix: true },
  },
  {
    path: "/403",
    component: () => import("../views/error/403"),
  },
  {
    path: "/404",
    component: () => import("../views/error/404"),
  },
];

const _createRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes,
  });
const router = _createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = _createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
