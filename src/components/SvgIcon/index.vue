<template>
  <div
    v-if="isExternal"
    :style="externalIconStyle"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  ></div>
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { isExternalUri } from "@/utils/validates";
export default {
  name: "SvgIcon",
  props: {
    // icon name
    name: {
      type: String,
      required: true,
    },
    // icon class
    class: {
      type: String,
      default: "",
    },
  },
  computed: {
    isExternal() {
      return isExternalUri(this.name);
    },
    iconName() {
      return `#svg-icon-${this.name}`;
    },
    svgClass() {
      return ["svg-icon", this.class ? this.class : ""];
    },
    externalIconStyle() {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.name}) no-repeat 50% 50%`,
      };
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}

.rotate180 {
  transform: rotate(180deg);
}
</style>
