<template>
  <div>
    <ul :class="containerClass">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <a
          :class="index === selectedIndex? tab.props.className+'_active '+tab.props.className : tab.props.className"
          href="#"
          @click.prevent="selectedIndex = index"
          v-html="tab.props.title"
        >
        </a>
      </li>
    </ul>

    <slot/>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  provide,
  reactive,
  toRefs,
} from "vue";

const isTab = (node) => node.type.name === "Tab";
const isFragment = (node) =>
  typeof node.type === "symbol" && node.type.description === "Fragment";
const hasTabs = (node) =>
  node.children && node.children.length && node.children.some(isTab);
const isTabParent = (node) => isFragment(node) && hasTabs(node);

export default {
  name: "Tabs",

  props: {
    containerClass: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
      required: true
    }
  },

  setup(_, { slots }) {
    const state = reactive({
      selectedIndex: null,
      tabs: [],
      count: 0,
    });

    provide("TabsProvider", state);

    const selectTab = (i) => {
      state.selectedIndex = i;
    };

    const update = () => {
      if (slots.default) {
        state.tabs = slots
          .default()
          .filter((node) => isTab(node) || isTabParent(node))
          .flatMap((node) => (isTabParent(node) ? node.children : node));
      }
    };

    onBeforeMount(() => update());
    onBeforeUpdate(() => update());

    onMounted(() => {
      selectTab(0);
    });

    return { ...toRefs(state), selectTab };
  }
};
</script>

<style lang="scss" scoped>
  @import "./tabs.scss";
</style>
