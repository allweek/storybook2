import InputGroup from './input-group.vue';
import withI18n from "../../../decorators/withI18n";

export default {
    component: InputGroup,
    decorators: [withI18n()]
};

const Template = (args) => ({
    components: { InputGroup },
    setup() {
      return { args }
    },
    template: '<InputGroup v-bind="args" />',
});


//👇 Each story then reuses that template
export const Default = Template.bind({});