<template>
  <div class="hamburger-wrapper" @click="toggle">
    <svg-icon name="hamburger-left" :class="{ rotate180: isActive }"></svg-icon>
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
  },
};
</script>

<style scoped>
.hamburger-wrapper {
  padding: 0 15px;
}
</style>
