import EventBus from "../utils/eventBus";
const _vue = require("@storybook/vue3");
const _addons = require("@storybook/addons");

const withBus = function withBus() {
    const eventBus = arguments?.[0] || EventBus;
    return _addons.makeDecorator({
        name: 'withBus',
        parameterName: 'withBus',
        wrapper: (storyFn, context) => {
            _vue.app.config.globalProperties.$bus = eventBus;
            return storyFn(context);
        }
    });
};

export default withBus;