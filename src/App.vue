<template>
  <div>
    <SbInputWithStore/>
    <AppInput />
    <Modal
      force-open="true"
      modal-name="notification"
    >
      sdfadsfsafasfs
    </Modal>
    <SbButton>dsfdas</SbButton>
    <SbSelect
      :options="[232,323,32324,4]"
      placeholder="placeholder"
      @input="alert(33)"
    />

    <SbTabs container-class="nav-tabs" title="TABS TITLE">
      <SbTab
        :index="0"
        title="TOP WINNERS"
        className="nav-tabs-item_link"
      >
        Tab1 text
      </SbTab>
      <SbTab
        :index="1"
        title="LATEST WINNERS"
        className="nav-tabs-item_link"
      >
        Tab2 text
      </SbTab>
    </SbTabs>
  </div>
</template>

<script>


import AppInput from "@/components/form-elements/input/input";
import Modal from "@/components/modal/modal";
import SbButton from "@/components/form-elements/button/button";
import SbSelect from "@/components/form-elements/select/select";
import SbTabs from "@/components/tabs/tabs";
import SbTab from "@/components/tabs/tab";
import SbInputWithStore from "@/components/form-elements/input-with-store/input-with-store";
export default {
  name: 'App',
  components: {
    SbInputWithStore,
    SbTab,
    SbTabs,
    SbSelect,
    SbButton,
    Modal,
    AppInput
  }
}
</script>

<style>

</style>
