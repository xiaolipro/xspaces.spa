<template>
  <div class="app-main-wrapper">
    <router-view :key="routePath" class="view-container" v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cacheds" :max="keepAliveMaxNum">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <footer v-show="copyright" class="footer-copyright">
      Copyright
      <svg-icon name="copyright" />
      {{ copyright }}
    </footer>
  </div>
</template>

<script>
import { copyright, keepAliveMaxNum } from "@/config";
export default {
  name: "AppMain",
  data() {
    return {
      copyright,
      keepAliveMaxNum,
    };
  },
  computed: {
    cacheds() {
      return this.$store.state.tagsbar.cacheds;
    },
    routePath() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;

  .view-container {
    margin: $base-padding;
    min-height: $base-app-main-height;
  }

  .footer-copyright {
    min-height: 55px;
    line-height: 55px;
    text-align: center;
    font-size: $base-font-size-small;
    color: rgba(0, 0, 0, 0.45);
    border-top: 1px dashed $base-border-color;
  }
}
</style>
