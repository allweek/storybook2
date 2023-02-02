<template>
  <div
    class="sb-field-box"
    :class="fieldBoxClasses"
  >
    <label
      v-if="label"
      class="sb-field-label"
      :for="name"
    >
      {{ label }}
    </label>
    <div
      class="sb-field-wrap"
      :class="fieldWrapClasses"
    >
      <Input
        @input="onInput"
      />

      <span
        v-if="isSuccess"
        class="form__field-icn form__field-icn--succsess"
      >
        <img :src="require('../../../assets/img/input/success.svg')"
             :alt="$t('GENERAL.SUCCESS')">
      </span>
      <span
        v-else-if="errorProcessed"
        class="form__field-icn form__field-icn--error"
      >
        <img :src="require('../../../assets/img/input/alert.svg')"
              :alt="$t('GENERAL.ERROR')">
      </span>
<!--      <span-->
<!--        v-if="goNext"-->
<!--        class="form__field-icn form__field-icn&#45;&#45;go-next"-->
<!--        @click="$emit('goNext')"-->
<!--      >-->
<!--        <div class="icon-big_arrow go-next-icon"></div>-->
<!--      </span>-->
<!--      <span-->
<!--        v-if="verify"-->
<!--        class="form__field-icn form__field-icn&#45;&#45;verify"-->
<!--      >-->
<!--        <div class="icon-history verify-icon"></div>-->
<!--        <span class="verify-text">VERIFY</span>-->
<!--      </span>-->

      <span
        v-if="helpLabel?.length"
        class="form__field-icn form__field-icn--helpLabel"
      >
        <span class="helpLabel-text">{{ helpLabel }}</span>
      </span>

    </div>
    <div
      v-if="errorMsg?.length"
      class="form__field-msg"
      v-html="errorMsg"
    >
    </div>
  </div>
</template>

<script>
import Input from "@alexnsk89/input/input";
import {computed} from "vue";

export default {
  name: "InputGroup",

  extends: Input,

  components: {Input},

  props: {
    fieldBoxClasses: {
      type: Array,
      default: () => [],
    },

    label: {
      type: String,
      default: ''
    },

    fieldWrapClasses: {
      type: Array,
      default: () => [],
    },

    isValid: {
      type: Boolean || Object,
      default: null
    },

    errorMsg: {
      type: String,
      default: ''
    },

    helpLabel: {
      type: String,
      default: ''
    },

    showSuccessIcon: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    return {
      isSuccess: computed(() => {
        return props.showSuccessIcon && props.isValid === true && !props.errorMsg && props.value !== '' && !props.disabled;
      }),

      errorProcessed: computed(() => {
        let resultMsg = props.errorMsg;

        if (Array.isArray(props.errorMsg)) {
          resultMsg = props.errorMsg.join('. \n');
        }

        return !(props.isValid || props.isValid === null) || resultMsg;
      }),

      onInput() {
        emit('input');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./input-group.scss";
</style>