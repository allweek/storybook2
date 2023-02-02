import SbSelect from "./select";


export default {
    component: SbSelect
};

const Template = (args) => ({
    components: { SbSelect },
    setup() {
        const alertValue = (value => {
            alert(value)
        });
        return { args, alertValue };
    },
    template: `
      <SbSelect
        :options="[232,323,32324,4]"
        @input="alertValue"
      />
    `
});

export const Default = Template.bind({});
