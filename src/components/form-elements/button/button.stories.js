import Button from './button.vue';

export default {
    component: Button
};

const Template = (args) => ({
    components: { Button },
    setup() {
        return { args };
    },
    template: '<Button v-bind="args">Btn slot text</Button>',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});