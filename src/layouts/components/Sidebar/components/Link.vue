<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternalUri } from "@/utils/validates";
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    isExternal() {
      return isExternalUri(this.to);
    },
    type() {
      if (this.isExternal) {
        return "a";
      }
      return "router-link";
    },
  },
  methods: {
    linkProps(to) {
      if (!this.isExternal) return { to };
      return {
        href: to,
        target: "_blank",
        rel: "noopener",
      };
    },
  },
};
</script>

<style></style>
