<template>
  <button type="button" :class="classesComputed" @click="onClick" :style="style"><slot/></button>
</template>

<script>
import { reactive, computed } from 'vue';


export default {
  name: 'Button',

  props: {
    classes: {
      type: Array,
      default: () => [],
    },

    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);

    return {
      classesComputed: computed(() => ({
        'sb-btn': true,
        ...props?.classes
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      onClick() {
        emit('click');
      }
    }
  },
};
</script>

<style lang="scss">
  @import "./button.scss";
</style>
