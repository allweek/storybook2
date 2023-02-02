const _vue = require("@storybook/vue3");
const _addons = require("@storybook/addons");

const withI18n = function withI18n() {
    return _addons.makeDecorator({
        name: 'withI18n',
        parameterName: 'withI18n',
        wrapper: (storyFn, context) => {
            _vue.app.config.globalProperties.$t = (arg) => arg;
            return storyFn(context);
        }
    });
};

export default withI18n;