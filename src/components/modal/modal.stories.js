import SbModal from './modal';
import SbButton from "../form-elements/button/button";


export default {
    component: SbModal
};

const Template = (args) => ({
    components: { SbModal, SbButton },
    setup() {
        return { args };
    },
    template: `
      <SbModal v-bind="args" modal-name="notify" :force-open="true">
          <template #title>Title</template>
          <template #closer>x</template>
          <template #default>
            <div class="sb-modal__text">Notification text</div>
            <div class="confirm-modal__btns">
              <SbButton><span>CONTINUE</span></SbButton>
              <SbButton><span>CANCEL</span></SbButton>
            </div>
          </template>
      </SbModal>
    `
});

export const Default = Template.bind({});
