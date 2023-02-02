<template>
  <Input
    :type="type"
    :class="classesComputed"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    :disabled="disabled"
    :hidden="hidden"
    :style="style"
    @input="onInput"
  />
  <pre>{{games}}</pre>
</template>

<script>
import {computed, reactive, ref} from "vue";
import {onMounted} from "vue";
import {useStore} from "vuex";
import Input from "@alexnsk89/input/input";


export default {
  name: "InputWithStore",
  components: {Input},
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
    // size: {
    //   type: String,
    //   validator: function (value) {
    //     return ['small', 'medium', 'large'].indexOf(value) !== -1;
    //   },
    // },
  },

  emits: ['input'],

  setup(props, { emit }) {
    const store = useStore();

    props = reactive(props);

    const games = ref([]);

    onMounted(async () => {
      games.value = await store.dispatch('gamelist/loadGames');
    });

    return {
      games,

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
 @import "./input-with-store.scss";
</style>