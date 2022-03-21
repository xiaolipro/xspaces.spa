<template>
  <div class="avatar-wrapper">
    <el-dropdown trigger="click">
      <div class="el-dropdown-link">
        <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
        <div class="svg-container">
          <svg-icon name="down-arrow" />
        </div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled>个人中心</el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            <span style="display: block">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Avatar",
  computed: {
    ...mapState({
      avatar: (state) => state.user.avatar,
    }),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      const curPath = this.$route.fullPath;
      this.$router.push(`login?redirect=${curPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
$avatar-width: 40px;
$avatar-height: 40px;

.avatar-wrapper {
  display: flex;
  cursor: pointer;

  .user-avatar {
    margin: calc(($base-nav-bar-height - $avatar-height) / 2) 0;
    width: $avatar-width;
    height: $avatar-height;
    border-radius: 50%;
  }
  .svg-container {
    margin: calc(($base-nav-bar-height - $base-font-size-default) / 2) 0;
    font-size: $base-font-size-default;
    float: right;
  }
}
</style>
