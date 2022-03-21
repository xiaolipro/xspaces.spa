const routes = [
  {
    path: "/permission",
    component: "Layout",
    redirect: "/permission/index",
    alwaysShow: true,
    meta: {
      title: "权限",
      roles: ["admin", "editor"],
    },
    children: [
      {
        path: "page",
        component: "permission/page",
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"],
        },
      },
      {
        path: "directive",
        component: "views/permission/directive",
        name: "DirectivePermission",
        meta: {
          title: "指令权限",
        },
      },
      {
        path: "role",
        component: "views/permission/role",
        name: "RolePermission",
        meta: {
          title: "角色权限",
          roles: ["admin"],
        },
      },
    ],
  },

  {
    path: "/icon",
    component: "Layout",
    meta: { title: "图标", noCache: true },
    children: [
      {
        path: "index",
        component: "views/icons/index",
        name: "Icons",
        meta: { title: "图标", noCache: true },
      },
    ],
  },
  // {
  //   path: "/nested",
  //   component: "Layout",
  //   redirect: "/nested/menu1/menu1-1",
  //   name: "Nested",
  //   meta: {
  //     title: "Nested",
  //   },
  //   children: [
  //     {
  //       path: "menu1",
  //       component: "Layout",
  //       name: "Menu1",
  //       meta: { title: "Menu1" },
  //       redirect: "/nested/menu1/menu1-1",
  //       children: [
  //         {
  //           path: "menu1-1",
  //           component: "@/views/dashboard/index",
  //           name: "Menu1-1",
  //           meta: { title: "Menu1-1" },
  //         },
  //         {
  //           path: "menu1-2",
  //           component: "@/views/dashboard/index",
  //           name: "Menu1-2",
  //           redirect: "/nested/menu1/menu1-2/menu1-2-1",
  //           meta: { title: "Menu1-2" },
  //           children: [
  //             {
  //               path: "menu1-2-1",
  //               component: "@/views/dashboard/index",
  //               name: "Menu1-2-1",
  //               meta: { title: "Menu1-2-1" },
  //             },
  //             {
  //               path: "menu1-2-2",
  //               component: "@/views/dashboard/index",
  //               name: "Menu1-2-2",
  //               meta: { title: "Menu1-2-2" },
  //             },
  //           ],
  //         },
  //         {
  //           path: "menu1-3",
  //           component: "@/views/dashboard/index",
  //           name: "Menu1-3",
  //           meta: { title: "Menu1-3" },
  //         },
  //       ],
  //     },
  //     {
  //       path: "menu2",
  //       name: "Menu2",
  //       component: "@/views/dashboard/index",
  //       meta: { title: "Menu2" },
  //     },
  //   ],
  // },
];

module.exports = [
  {
    name: "getList",
    method: "get",
    response() {
      return {
        code: 200,
        message: "成功！",
        data: routes,
      };
    },
  },
];
