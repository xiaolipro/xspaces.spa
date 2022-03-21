<template>
  <div class="size-select-wrapper">
    <el-dropdown trigger="click" @command="resetSize">
      <div class="svg-container">
        <svg-icon name="size" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item of sizeOptions"
            :key="item.value"
            :disabled="size === item.value"
            :command="item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "SizeSelect",
  data() {
    return {
      sizeOptions: [
        { label: "Default", value: "default" },
        { label: "Medium", value: "medium" },
        { label: "Small", value: "small" },
        { label: "Mini", value: "mini" },
      ],
    };
  },
  computed: {
    size() {
      return this.$store.getters.size;
    },
  },
  methods: {
    resetSize(size) {
      this.$ELEMENT.size = size;
      console.log(size, this.$ELEMENT);
      this.$store.dispatch("app/setSize", size);
      this.refresh();
    },
    refresh() {
      this.$store.dispatch("tagsbar/delAllCachedView");

      const { fullPath } = this.$route;

      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + fullPath,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.size-select-wrapper {
  .svg-container {
    line-height: $base-nav-bar-height;
    font-size: 24px;
  }
}
</style>
