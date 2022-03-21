<template>
  <div class="app-wrapper">
    <!-- 水平布局 -->
    <div
      v-if="layout === 'horizontal'"
      class="layout-horizontal"
      :class="{ fixed: header === 'fixed' }"
    >
      <top-menu />
      <tags-bar />
      <app-main />
      <control-panel />
    </div>
    <!-- 垂直布局 -->
    <div v-else class="layout-vertical" :class="verticalClass">
      <div
        v-if="device === 'mobile' && !sidebar.collapse"
        class="mask-bg"
        @click="handleCloseSidebar"
      />
      <side-bar class="sidebar-container" />
      <div class="main-container">
        <div :class="{ 'fixed-header': fixedHeader }">
          <nav-bar />
          <tags-bar v-if="tagsView" />
        </div>
        <app-main />
        <control-panel />
      </div>
    </div>
  </div>
</template>

<script>
import {
  AppMain,
  TopMenu,
  TagsBar,
  ControlPanel,
  NavBar,
  SideBar,
} from "./components";
import { mapGetters } from "vuex";
import resizeMixin from "./mixins/resizeHandler";
export default {
  name: "Layout",
  components: {
    AppMain,
    TopMenu,
    TagsBar,
    ControlPanel,
    NavBar,
    SideBar,
  },
  mixins: [resizeMixin],
  computed: {
    ...mapGetters([
      "tagsView",
      "layout",
      "sidebar",
      "device",
      "controlPanel",
      "tagsView",
      "fixedHeader",
    ]),
    verticalClass() {
      return {
        "close-sidebar": this.sidebar.collapse,
        "open-sidebar": !this.sidebar.collapse,
        mobile: this.device === "mobile",
        "without-animation": this.sidebar.withoutAnimation,
      };
    },
  },
  methods: {
    handleCloseSidebar() {
      this.$store.dispatch("layout/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .layout-horizontal {
  }

  .layout-vertical {
    .main-container {
      position: relative;
      margin-left: $base-left-menu-width;
      min-height: 100%;
      transition: $base-transition;
    }
    .sidebar-container {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      height: 100%;
      width: $base-left-menu-width !important;
      font-size: 0px;
      background-color: $base-menu-background;
      transition: width 0.28s;
    }

    // 收起sidebar
    &.close-sidebar {
      .sidebar-container {
        width: $base-left-menu-width-min !important;

        :deep .el-submenu {
          overflow: hidden;

          & > .el-submenu__title {
            padding: 0 !important;

            .svg-icon {
              margin-left: 20px;
            }

            .el-submenu__icon-arrow {
              display: none;
            }
          }
        }
        :deep .el-menu--collapse {
          .el-submenu {
            & > .el-submenu__title {
              .title {
                height: 0;
                width: 0;
                overflow: hidden;
                visibility: hidden;
                display: inline-block;
              }
            }
          }
        }
      }
      .main-container {
        margin-left: $base-left-menu-width-min;
      }
    }

    // 移动端下的布局
    &.mobile {
      .main-container {
        margin-left: 0px;
      }

      .sidebar-container {
        width: $base-left-menu-width-mobile !important;
        transition: transform 0.28s;
      }

      &.close-sidebar {
        .sidebar-container {
          pointer-events: none;
          transition-duration: 0.3s;
          transform: translate3d(-$base-left-menu-width-mobile, 0, 0);
        }
      }
    }

    // 不同设备切换不放过渡动画
    &.without-animation {
      .main-container,
      .sidebar-container {
        transition: none;
      }
    }

    .mask-bg {
      background: #000;
      opacity: 0.4;
      width: 100%;
      top: 0;
      height: 100%;
      position: absolute;
      z-index: $base-z-index - 1;
    }
  }
}
</style>
