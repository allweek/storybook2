import Input from './input.vue';

export default {
    component: Input
};

const Template = (args) => ({
    components: { Input },
    setup() {
        console.log(args)
        return { args };
    },
    template: '<Input v-bind="args" />',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = { backgroundColor: '#ff003b'};