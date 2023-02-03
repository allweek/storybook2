const { state } = window?.__VUE_WORDPRESS__ || {};
import {createStore} from 'vuex'

const API_ENDPOINT = 'https://spacex.evenbetpoker.com/api/web/';

import {
    fetchItems,
    fetchSingle,
    fetchSingleById
} from './helpers/api';

import modulesFromPackage from "./helpers/getStoreModules";

export default createStore({
    state: {
        isAuth: false,
        activeGame: null,
        ...state
    },

    getters: {
        getActiveGame(state) {
          return state.activeGame;
        },

        getIsAuth: state => {
            return state.isAuth;
        },

        apiendpoint: state => {
            return state.apiendpoint || API_ENDPOINT;
        },

        clientId: state => {
            return state.clientId;
        },

        menu: state => ({ location }) => {
            return state.menus[location]
        },

        site: state => {
            return state.site;
        },

        page: state => {
            return state.site.page;
        },

        languages: state => {
            return state.languages;
        },

        languageObjects: state => {
            return state.languageObjects;
        },

        wpPromotions: state => {
            return state.wp_promotions;
        },

        singlePageBySlug: state => ({ type, slug, lang }) => {
            for (let id in state[type]) {
                if (decodeURI(state[type][id].slug) === slug && ('page_lang' in state[type][id].metadata && state[type][id].metadata?.page_lang === lang)) {
                    return state[type][id]
                }
            }
        },

        request: state => ({ type, params }) => {
            return state[type].requests.find(req => {
                if (Object.keys(req.params).length === Object.keys(params).length) {
                    return Object.keys(req.params).every(key => req.params[key] === params[key])
                }
                return false;
            })
        },
        totalPages: (state, getters) => ({ type, params }) => {
            let request = getters.request({ type, params })
            return request ? request.totalPages : 0
        },
        requestedItems: (state, getters) => ({ type, params }) => {
            let request = getters.request({ type, params })
            return request ? request.data.map(id => state[type][id]) : []
        },

        requestedPosts: (state, getters) => ({ type, params }) => {
            let request = getters.request({ type: 'posts', params })
            return request ? request.data.map(id => state['posts'][id]) : []
        },
        singleBySlug: state => ({ type, slug }) => {
            for (let id in state[type]) {
                if (decodeURI(state[type][id].slug) === slug) {
                    return state[type][id]
                }
            }
        },

        singleById: state => ({ type, id }) => {
            return state[type][id]
        },

        pages: state => {
            return state.pages;
        },
    },

    mutations: {
        SET_ACTIVE_GAME_ITEM(state, item){
            state.activeGame = item
        },

        SET_DOC_TITLE(state, title) {
            state.site.docTitle = title
        },

        ADD_ITEM(state, { type, item }) {
            if (item && type && ! state[type].hasOwnProperty(item.id)) {
                state[type][item.id] = item;
            }
        },
        ADD_REQUEST(state, { type, request }) {
            state[type].requests.push(request)
        },
        SET_LOADING(state, loading) {
            state.site.loading = loading
        },

        SET_SPORT_PREVIOUS_PAGE(state, previousPagePath) {
            state.site.sportPreviousPage = previousPagePath;
        },

        SET_CASINO_PREVIOUS_PAGE(state, previousPagePath) {
            state.site.casinoPreviousPage = previousPagePath;
        },

        SET_PAGE(state, page) {
            state.site.page = {...page};
        },

        CHANGE_ACTIVE_SITE_MODE(state, mode) {
            state.site.activeSiteMode = mode;
        },
        SET_TOGGLE_IS_DEMO(state, isDemo) {
            state.isDemo = isDemo;
        }
    },

    actions: {
        toggleIsDemo({commit}, isDemo){
          commit('SET_TOGGLE_IS_DEMO', isDemo)
        },
        getActiveGameItem({commit}, item){
            commit('SET_ACTIVE_GAME_ITEM', item)
        },

        updateDocTitle ({ state, commit }, { parts = [], sep = ' – ' }) {
            commit('SET_DOC_TITLE', parts.join(sep))
            document.title = state.site.docTitle
        },
        updatePage({commit}, page) {
            commit('SET_PAGE', page);
        },
    },

    modules: {
        ...modulesFromPackage,
        // 'RegisterStore': RegisterStore,
        // 'GameCategoriesStore': GameCategoriesStore,
        // 'UserStore': UserStore,
        // 'MoneyStore': MoneyStore,
        // 'AuthStore': AuthStore,
        // 'GameList': GameListStore,
        // 'GameProvidersStore': GameProvidersStore,
        // 'UserSessionsStore': UserSessionsStore,
        // 'PromoStore': PromoStore,
        // 'ApiErrorStore': ApiErrorStore,
        // 'TransactionsStore': TransactionsStore,
        // ...(state?.['websocket_enabled'] && state?.['ws_endpoint'] && {'SocketAuthStore': SocketAuthStore})
    }
})
