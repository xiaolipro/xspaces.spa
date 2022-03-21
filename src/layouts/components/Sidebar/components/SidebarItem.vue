<template>
  <div
    class="sidebar-item-wrapper"
    v-if="!route.hidden && (route.meta || route.path === '/')"
  >
    <!-- Leaf node -->
    <app-link v-if="isLeafNode(route)" :to="resolvePath(leaf.path)">
      <el-menu-item :index="resolvePath(leaf.path)">
        <svg-icon :name="leaf.meta.icon || `user`" />
        <template #title>
          <span class="title">{{ leaf.meta.title }}</span>
        </template>
      </el-menu-item>
    </app-link>

    <el-submenu v-else :index="resolvePath(route.path)">
      <template #title>
        <svg-icon :name="route.meta.icon || `user`" />
        <span class="title">{{ route.meta.title }}</span>
      </template>
      <!-- Recursive child node -->
      <sidebar-item
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :is-nested="true"
        :path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternalUri } from "@/utils/validates";
import AppLink from "./Link.vue";
// import MenuItem from "./MenuItem.vue";
export default {
  name: "SidebarItem",
  components: { AppLink },
  props: {
    route: {
      type: Object,
      required: true,
    },
    isNested: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 叶子节点
      leaf: null,
    };
  },
  methods: {
    isLeafNode(route) {
      const onlyChild = this.getOnlyChild(route);

      if (onlyChild && this.withoutOffspring(onlyChild)) {
        this.leaf = onlyChild;
        return true;
      }
      return false;
    },

    /**
     * @type {String} path
     * @description nested route for joined by path
     */
    resolvePath(subPath) {
      if (isExternalUri(this.path)) return this.path;
      if (isExternalUri(subPath)) return subPath;

      return path.resolve(this.path, subPath);
    },

    /**
     * @type {Object} route
     * @description no child, or no displayable child
     */
    withoutOffspring(route) {
      if (route.withoutChild) return true;
      if (!route.children) return true;

      const children = route.children.filter((item) => !item.hidden);
      return children.length === 0;
    },
    getOnlyChild(route) {
      let onlyChild = null;
      const children = route.children || [];

      const displayableArray = children.filter((item) => !item.hidden);

      // There really is only one child
      if (displayableArray.length === 1) {
        onlyChild = displayableArray[0];
      }

      // The route no children, displayed self
      if (displayableArray.length === 0) {
        // construct a fake child and tag it withoutChild
        onlyChild = { ...route, path: "", withoutChild: true };
      }

      return onlyChild;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  .svg-icon {
    margin-right: 15px;
  }
  .title {
    font: $base-menu-font;
    color: $base-menu-color;
  }
}
</style>
