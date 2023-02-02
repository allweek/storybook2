<template>
  <div v-if="isActive"
       :class="contentClass">
    <slot></slot>
  </div>
</template>

<script>
import {onBeforeMount, ref, inject, watch} from "vue";

export default {
  name: "Tab",
  props: {
    index: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: false
    },
    contentClass: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const isActive = ref(false);
    const tabs = inject("TabsProvider");

    watch(() => tabs.selectedIndex, () => {
      isActive.value = props.index === tabs.selectedIndex;
    });

    onBeforeMount(() => {
      isActive.value = props.index === tabs.selectedIndex;
    });
    return { isActive };
  },
};
</script>

<style lang="scss" scoped>
  @import "tabs";
</style>
