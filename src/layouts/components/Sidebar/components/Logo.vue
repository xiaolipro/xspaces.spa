<template>
  <div class="sidebar-logo-wrapper" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-if="!collapse" class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { title } from "@/config";
export default {
  name: "SideMenuLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      logo: "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png",
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-wrapper {
  position: relative;
  width: 100%;
  height: $base-logo-height;
  line-height: $base-logo-height;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  /* &.collapse {
  } */
  & .sidebar-logo-link {
    display: inline-block;
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: $base-logo-height;
      font-size: $base-font-size-big;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  // 必须写后面，不然会被覆盖
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
