<template>
    <div
      v-if="showInDOM ? true : isOpen"
      class="sb-modal"
      :class="classes"
      @click="closeModal"
    >
        <div @click.stop class="sb-modal__dialog">
            <div class="sb-modal__header">
              <div class="sb-modal__title">
                <slot name="title" :title="title"></slot>
              </div>
              <button class="sb-modal__close" @click="closeModal">
                <slot name="closer" :closer="closer"></slot>
              </button>
            </div>

            <div class="sb-modal__content">
              <slot :msg="msg" :onConfirm="onConfirm" :onCancel="onCancel"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, ref} from "vue";
import EventBus from "@alexnsk89/utils-event-bus/eventBus";

export default {
    name: 'SbModal',
    props: {
      modalName: {
          type: String,
          required: true
      },
      addClass: {
          type: String,
          default: ''
      },
      forceOpen: {
        type: Boolean,
        default: false
      },

      //if false using v-if
      showInDOM: {
        type: Boolean,
        default: false
      }
    },

    setup(props) {
      const bus = EventBus;
      const isOpen = ref(props.forceOpen);
      const title = ref('');
      const msg = ref('');
      const closer =  ref('');
      const onConfirm = () => {};
      const onCancel = () => {};

      const closeModal = () => {
        isOpen.value = false;
        bus.$emit('close-modal-' + props.modalName);
      }

      bus.$on('open-modal-' + props.modalName, (opt) => {
        isOpen.value = true;

        if (opt?.title) {
          title.value = opt.title;
        }

        if (opt?.msg) {
          msg.value = opt.msg;
        }

        if (opt?.onConfirm) {
          onConfirm.value = opt.onConfirm;
        }

        if (opt?.onCancel) {
          onCancel.value = opt.onCancel;
        }
      });

      bus.$on('close-modal-' + props.modalName, () => {
        isOpen.value = false;
      });

      return {
        title,
        msg,
        closer,
        onConfirm,
        onCancel,
        closeModal,
        isOpen,
        props,

        classes: computed(() => ({
          'show': isOpen,
          [props.addClass]: !!props.addClass?.length
        }))
      }
    }
}
</script>

<style lang="scss">
  @import "./modal.scss";
</style>