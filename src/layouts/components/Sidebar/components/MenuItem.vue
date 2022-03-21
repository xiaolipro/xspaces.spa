<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(props) {
    const { icon, title } = props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon name={icon} />);
    }

    if (title) {
      vnodes.push(<span v-slots:title>{title}</span>);
    }
    return vnodes;
  },
};
</script>
<style lang="scss" scoped>
.svg-icon {
  margin-right: 15px;
}
.title {
  font: $base-menu-font;
  color: $base-menu-color;
}
</style>
