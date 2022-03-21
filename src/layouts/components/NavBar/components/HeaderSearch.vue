<template>
  <div class="header-search-wrapper">
    <el-autocomplete
      v-model="search"
      :fetch-suggestions="handleSearch"
      placeholder="Please input"
      @select="handleSelect"
    >
      <template #prefix>
        <svg-icon name="search" class="search-svg"></svg-icon>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from "fuse.js";
import path from "path";
export default {
  name: "HeaderSearch",
  data() {
    return {
      search: "",
      searchPool: [],
    };
  },
  computed: {
    routes() {
      return this.$store.getters.routes;
    },
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    searchPool(list) {
      this.initFuse(list);
    },
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    handleSearch(query, callback) {
      let res = this.searchPool;
      if (query !== "") {
        res = this.fuse.search(query).map((x) => x.item);
      }
      callback(res);
    },
    handleSelect() {},
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "title",
            weight: 0.7,
          },
          {
            name: "path",
            weight: 0.3,
          },
        ],
      });
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = "", prefixs = []) {
      let ans = [];
      for (const route of routes) {
        if (route.hidden) continue;

        const data = {
          path: path.resolve(basePath, route.path),
          title: [...prefixs],
        };

        // only push the routes with title
        if (route.meta && route.meta.title) {
          data.title = [...data.title, route.meta.title];
          data.value = data.title.join(" > ");

          // exclude router with redirect
          if (route.redirect !== "noRedirect") {
            ans.push(data);
          }
        }

        // recursive child routes
        if (route.children) {
          const res = this.generateRoutes(
            route.children,
            data.path,
            data.title
          );
          if (res.length) {
            ans = [...ans, ...res];
          }
        }
      }

      return ans;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-search-wrapper {
  .search-svg {
    margin-left: 3px;
    vertical-align: middle;
    font-size: $base-font-size-big;
  }
}
</style>
