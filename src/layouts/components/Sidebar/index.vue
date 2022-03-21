<template>
  <div class="sidebar-wrapper" :class="{ 'has-logo': sidebar.logo }">
    <sidebar-logo v-if="sidebar.logo" :collapse="sidebar.collapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="sidebar.collapse"
        :background-color="variables.menuBackgroundColor"
        :text-color="variables.menuTextColor"
        :unique-opened="false"
        :active-text-color="variables.activeMenuTextColor"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :route="route"
          :path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from "./components/Logo.vue";
import SidebarItem from "./components/SidebarItem.vue";
import variables from "@/styles/variables.scss";
import { mapGetters } from "vuex";

export default {
  name: "SideMenu",
  components: { SidebarItem, "sidebar-logo": Logo },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["routes", "sidebar"]),
    // routeList() {
    //   return this.routes.filter((x) => x.meta || x.path === "/");
    // },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s $base-left-menu-width ease-in-out,
      0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  .svg-icon {
    margin-right: 16px;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  // menu hover
  .submenu-title-noDropdown,
  .el-submenu__title {
    &:hover {
      background-color: $base-menu-background-active !important;
    }
  }

  .is-active > .el-submenu__title {
    color: $base-menu-color-active !important;
  }

  & .nest-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    min-width: $base-left-menu-width !important;
    background-color: $base-menu-background !important;

    &:hover {
      background-color: $base-menu-background-active !important;
    }
  }
}
</style>
