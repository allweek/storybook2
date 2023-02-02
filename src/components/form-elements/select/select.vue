<template>
  <div
    class="form__field-box"
    :class="fieldboxClassChange"
  >
    <label
      v-if="label"
      class="form__field-label"
      :for="name"
    >
      {{ label }}
    </label>
    <div
      class="form__field-wrap"
      :class="classTheme"
    >
      <v-select :id="name"
                :value="modelValue"
                :options="options"
                :placeholder="placeholder"
                :label="selectorLabel"
                :reduce="reduce"
                :item-text="name"
                :clearable="clearable"
                :disabled="disabled"
                :hidden="hidden"
                class="custom-select "
                :class="addClass"
                @option:selected="onSelect"
      />
    </div>
  </div>
  <div
    v-if="errorMsg?.length"
    class="form__field-msg">
    {{errorMsg}}
  </div>
</template>

<script>
import vSelect from 'vue-select';
import "vue-select/src/scss/vue-select.scss";

export default {
  name: "SbSelect",

  emits: ['input'],

  components: {
    vSelect
  },
  props: {
    modelValue: {
      type: [ String, Number ],
      required: false,
    },

    label: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },

    isValid: {
      type: Boolean || Object,
      default: null
    },

    color: {
      type: String,
      default: 'white'
    },

    errorMsg: {
      type: String,
      default: ""
    },

    options: {
      type: Array,
    },

    selectorLabel: {
      default: 'label',
      type: String
    },

    reduce: {
      default: option => option.value,
      type: Function
    },

    clearable: {
      type: Boolean,
      default: true,
    },

    hidden: {
      type: Boolean,
      default: false
    },

    addClass: {
      type: String,
      default: ''
    }
  },

  methods: {
    onSelect(value) {
      this.$emit('input', value);
    }
  },

  computed: {
    errorProcessed() {
      let resultMsg = this.errorMsg;

      if (Array.isArray(this.errorMsg)) {
        resultMsg = this.errorMsg.join('. \n');
      }

      return !(this.isValid || this.isValid === null) || resultMsg;
    },

    classTheme() {
      return 'form__field-wrap--' + this.color
    },

    isSuccess() {
      return this.isValid === true && !this.errorMsg && this.modelValue !== '' && this.modelValue !== null && !this.disabled;
    },

    fieldboxClassChange() {
      return {
        'success': this.isSuccess,
        'error': this.errorProcessed,
        'form__field-box--dark': this.color === 'dark',
        'visually-hidden': this.hidden
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./select.scss";

.form__field-box {
  position: relative;
  &.error {
    .custom-select {
      box-shadow: 0 0 0 1px #ff4218;
    }
  }
}
</style>