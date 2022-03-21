<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(route, idx) in breadcrumbs"
          :key="route.path"
        >
          <span
            v-if="
              route.redirect === 'noRedirect' || idx === breadcrumbs.length - 1
            "
            class="no-redirect-crumbs"
            >{{ route.meta.title }}</span
          >
          <a v-else @click.prevent="handleLink(route)">
            {{ route.meta.title }}</a
          >
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
const pathToRegexp = require("path-to-regexp");

export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbs: [],
    };
  },
  watch: {
    $route(route) {
      // if go to the redirect page, then do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) return;
      this.updBreadcrumb();
    },
  },
  created() {
    // init hock
    this.updBreadcrumb();
  },
  methods: {
    updBreadcrumb() {
      // only show routes with meta.title
      let matcheds = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      // console.log(this.$route.matched);

      if (!this.isDashboard(matcheds[0])) {
        matcheds = [
          {
            path: "/dashboard",
            meta: {
              title: "Dashboard",
            },
          },
        ].concat(matcheds);
      }
      // console.log(matcheds);

      // todo: undefined not equals false, so not defined is default true
      this.breadcrumbs = matcheds.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      if (!route) return false;
      return route.path === "/dashboard" || route.redirect === "/dashboard";
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;

      /** Fill the parameters into the route
       * var url = '/user/:id/:name'
         var data = {id: 10001, name: 'bob'}
         console.log(pathToRegexp.compile(url)(data))
         > /user/10001/bob
       */
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(route) {
      const { redirect, path } = route;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  .el-breadcrumb {
    display: inline-block;
    font-size: $base-font-size-default;
    // line-height: $base-nav-bar-height;
    padding: calc(($base-nav-bar-height - $base-font-size-default) / 2) 0px;
    margin-left: 8px;
    .no-redirect-crumbs {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>
