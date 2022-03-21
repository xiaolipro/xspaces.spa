<template>
  <div class="nav-bar-wrapper">
    <div class="left-container">
      <hamburger
        class="hamburger"
        :isActive="!sidebar.collapse"
        @toggle="handleHamburgerToggle"
      ></hamburger>
      <breadcrumb class="breadcrumb"></breadcrumb>
    </div>

    <div class="right-container">
      <template v-if="device !== 'mobile'">
        <header-search class="right-item" />
        <size-select class="right-item" />
        <avatar class="right-item" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "../NavBar/components/Breadcrumb.vue";
import Hamburger from "../NavBar/components/Hamburger.vue";
import SizeSelect from "../NavBar/components/SizeSelect.vue";
import HeaderSearch from "../NavBar/components/HeaderSearch.vue";
import Avatar from "../NavBar/components/Avatar.vue";

export default {
  name: "NavBar",
  components: {
    Breadcrumb,
    Hamburger,
    SizeSelect,
    HeaderSearch,
    Avatar,
  },
  computed: {
    ...mapGetters(["sidebar", "device"]),
  },
  methods: {
    handleHamburgerToggle() {
      this.$store.dispatch("layout/toggleSideBar");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar-wrapper {
  position: relative;
  overflow: hidden;
  height: $base-nav-bar-height;
  padding: 0 12px;
  background: #fff;
  box-shadow: 0 1px 4px $base-border-color;
  .left-container {
    float: left;
    height: 100%;
    .hamburger {
      float: left;
      line-height: $base-nav-bar-height;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .breadcrumb {
      float: left;
    }
  }
  .right-container {
    float: right;
    height: 100%;
    line-height: $base-nav-bar-height;

    &:focus {
      outline: none;
    }

    .right-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
