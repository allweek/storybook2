<template>
  <input
    :type="type"
    :class="classesComputed"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    :disabled="disabled"
    :hidden="hidden"
    :style="style"
    @input="onInput"
  >
</template>

<script>
import {computed, reactive} from "vue";


export default {
  name: "Input",

  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    classes: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String || Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    },

    backgroundColor: {
      type: String,
    },
  },

  emits: ['input'],

  setup(props, { emit }) {
    props = reactive(props);

    return {
      classesComputed: computed(() => ({
        'sb-input': true,
        [`sb-input--${props?.size || 'medium'}`]: true,
        ...props?.classes
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),

      onInput() {
        emit('input');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "./input.scss";
</style>