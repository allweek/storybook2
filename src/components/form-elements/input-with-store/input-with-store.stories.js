import InputWithStore from './input-with-store.vue';
import withStore from "../../../decorators/withStore";
import store from "../../../store/index";

export default {
    component: InputWithStore,
    decorators: [withStore(store)]
};

const Template = (args) => ({
    components: { InputWithStore },
    setup() {
        return { args };
    },
    template: '<InputWithStore v-bind="args" />',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});