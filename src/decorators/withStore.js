import { createStore } from 'vuex';

const _vue = require("@storybook/vue3");
const _addons = require("@storybook/addons");

const withVueRouter = function withVueRouter() {
    const store = arguments?.[0] || createStore({ state: {} });
    return _addons.makeDecorator({
        name: 'withStore',
        parameterName: 'withStore',
        wrapper: (storyFn, context) => {
            _vue.app.use(store);
            return storyFn(context);
        }
    });
};

export default withVueRouter;