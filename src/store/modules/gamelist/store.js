import {cacheHttp, http} from "@alexnsk89/utils-api/Api";
import Jsona from "jsona";

const state = () => ({
    games: [],
    gameGroups: [],
    lastWinners: [],
    uniqueLoadGamesRequests: {}
});

const getters = {
    gameList: (state) => {
        return state.games;
    },

    gameGroups: (state) => {
        return state.gameGroups;
    },

    gameById: (state) => (gameId) => {
        return state.games.find((g) => g.id == gameId);
    },

    gameByTitle: (state) =>
        (
            gameTitleNormalized,
            normalizer = (str) => str.replace(/[^a-zA-Z0-9- ]/g, "").replaceAll(' ', '-').toLowerCase()
        ) => {
        return state.games.find((g) => normalizer(g?.attributes?.title) === gameTitleNormalized)
    },

    gameListByTags: (state) => (tags = []) => {
        if (!tags || !tags.length ) {
            return [];
        }

        return state.games.filter(g => {
            const gameTags = [...g.attributes.tags];
            return tags.every((t) => {
                const result = gameTags.includes(t);
                return gameTags.includes(t);
            });
        });
    },

    lastWinners: (state) => {
        return state.lastWinners;
    },

    isSomeGamesLoading: (state) => {
        let isLoading = false;
        if (!state.uniqueLoadGamesRequests) {
            return false;
        }
        for (let url in state.uniqueLoadGamesRequests) {
            if (state.uniqueLoadGamesRequests?.[url]?.size > 0) {
                isLoading = true;
            }
        }
        return isLoading;
    }
}

const actions = {

    async loadGames({dispatch, commit, state, getters, rootGetters}, options = null) {
        const {filter, opt} = options || {};
        const {apiendpoint, clientId, auth} = rootGetters;
        const url = new URL('v2/casino/games', apiendpoint);
        const params = {
            clientId,
            ...(filter || {})
        };

        if (auth) {
            params.auth = auth;
        }

        const paramsJSON = JSON.stringify(params);
        if (state.uniqueLoadGamesRequests?.[url] && state.uniqueLoadGamesRequests?.[url].has(paramsJSON)) {
            console.log('duplicated request');
            return false;
        } else {
            commit('ADD_UNIQUE_REQUEST', {url, params: paramsJSON});
        }

        try {
            let requestAdapter = null;
            if (filter && filter?.filter?.group) {
                requestAdapter = http;
            } else {
                requestAdapter = cacheHttp();
            }

            const res = await requestAdapter.get(String(url), {params})
            const games = res.data.data;

            commit('DELETE_UNIQUE_REQUEST', {url, params: paramsJSON});
            if (!opt && opt?.rewriteStore !== false) {
                commit('SET_GAMES', games);
            }

            return games;
        } catch (err) {
            console.log(err);
            commit('DELETE_UNIQUE_REQUEST', {url, params: paramsJSON});
        }
    },

    setGames({state, commit}, games) {
        commit('SET_GAMES', games);
    },

    async loadGameGroups({dispatch, commit, getters, rootGetters}, filter) {
        const {apiendpoint, clientId} = rootGetters;
        const url = new URL('v2/groups', apiendpoint);
        const params = {
            clientId,
            ...(filter || {})
        };

        const paramsJSON = JSON.stringify(params);
        if (state.uniqueLoadGamesRequests?.[url] && state.uniqueLoadGamesRequests?.[url].has(paramsJSON)) {
            console.log('duplicated request');
            return false;
        } else {
            commit('ADD_UNIQUE_REQUEST', {url, params: paramsJSON});
        }

        try {
            const res = await cacheHttp().get(String(url), {params});
            const gameGroups = res.data.data;
            commit('DELETE_UNIQUE_REQUEST', {url, params: paramsJSON});
            commit('SET_GAME_GROUPS', gameGroups);
            return gameGroups;
        } catch (err) {
            console.log(err);
            commit('DELETE_UNIQUE_REQUEST', {url, params: paramsJSON});
        }
    },

    setGameGroups({state, commit}, gameGroups) {
        commit('SET_GAME_GROUPS', gameGroups);
    },

    async fetchPlayedGames({dispatch, commit, getters, rootGetters}, options = {}) {
        const {apiendpoint, clientId, auth} = rootGetters;
        const url = new URL('v2/casino/games/history', apiendpoint);
        const params = {
            clientId,
            auth,
            ...options,
        };

        try {
            const res = await http.get(String(url), {params});
            return res?.data?.data || [];
        } catch (err) {
            console.log(err);
        }
    },

    async fetchTopWinnings({dispatch, commit, getters, rootGetters}, options = {}) {
        const {apiendpoint, clientId, auth} = rootGetters;
        const url = new URL('v2/casino/winners/top', apiendpoint);
        const params = {
            clientId,
            auth,
            ...options,
        };

        try {
            const res = await http.get(String(url), {params});
            const dataFormatter = new Jsona();

            return dataFormatter.deserialize(res.data);
        } catch (err) {
            console.log(err);
        }
    },

    async fetchLastWinnings({dispatch, commit, getters, rootGetters}, options = {}) {
        const {apiendpoint, clientId, auth} = rootGetters;
        const url = new URL('v2/casino/winners/last', apiendpoint);

        const params = {
            clientId,
            auth,
            ...options,
        };

        try {
            const res = await http.get(String(url), {params});
            const dataFormatter = new Jsona();
            const formattedData = dataFormatter.deserialize(res?.data);
            commit('SET_LAST_WINNERS', formattedData);

            return formattedData;
        } catch (err) {
            console.log(err);
        }
    },

    async addGameToFavorite({dispatch, commit, getters, rootGetters}, gameId) {
        try {
            const {apiendpoint, clientId, auth} = rootGetters;
            const url = new URL('users/me/favorites', apiendpoint);
            const formData = new FormData();
            formData.append('type', 'casino_game');
            formData.append('id', gameId);

            const params = {
                clientId,
                auth,
            };

            console.log('addGameToFavorite', formData, params, gameId);

            const response = await http.post(String(url), formData, {params});

            commit('SET_GAME_FAVORITE_FLAG', {isFavorite: true, gameId});


            return true;

        } catch (e) {
            commit('SET_GAME_FAVORITE_FLAG', {isFavorite: false, gameId});

            dispatch('handleApiError', {...e}, {root: true});
            return false;
        }

    },
    async removeGameFromFavorite({dispatch, commit, getters, rootGetters}, gameId) {
        try {
            const {apiendpoint, clientId, auth} = rootGetters;
            const url = new URL('users/me/favorites', apiendpoint);

            const data = {
                'type': 'casino_game',
                'id': gameId,
            };

            const params = {
                clientId,
                auth,
            };

            const response = await http.delete(String(url), {data, params});

            commit('SET_GAME_FAVORITE_FLAG', {isFavorite: false, gameId});

            return true;

        } catch (e) {
            commit('SET_GAME_FAVORITE_FLAG', {isFavorite: true, gameId});
            dispatch('handleApiError', {...e}, {root: true});
            return false;
        }
    },

    setGameFavoriteFlag({state, dispatch, commit, getters, rootGetters}, {gameId, isFavorite}) {
        const gameIndex = state.games.findIndex((game) => {
            return gameId == game.id;
        });

        if (gameIndex === -1) return;

        const game = state.gameList[gameIndex];
        game.attributes.isFavorite = isFavorite;

        state.games.splice(gameIndex, 1, {...game});


        // this.setGames(this.gameList.map(game => {
        //     if (game !== undefined && (game.id).split('_')[0] === gameId.split('_')[0]) {
        //         game.attributes['is-favorite'] = flag;
        //     }
        //     return game;
        // }))
    }
}


const mutations = {
    SET_LAST_WINNERS(state, lastWinners) {
        state.lastWinners = lastWinners;
    },

    SET_GAMES(state, games) {
        state.games = games;
    },

    SET_GAME_GROUPS(state, gameGroups) {
        state.gameGroups = gameGroups;
    },

    SET_GAME_FAVORITE_FLAG(state, {gameId, isFavorite}) {
        const gameIndex = state.games.findIndex((game) => {
            return gameId == game.id;
        });

        if (gameIndex === -1) return;

        const game = state.games[gameIndex];
        game.attributes['is-favorite'] = isFavorite;

        state.games.splice(gameIndex, 1, {...game});
    },

    ADD_UNIQUE_REQUEST(state, payload) {
        const {url, params} = payload;
        if (!state.uniqueLoadGamesRequests[url]) {
            state.uniqueLoadGamesRequests[url] = new Set();
        }
        state.uniqueLoadGamesRequests[url].add(params);
    },

    DELETE_UNIQUE_REQUEST(state, payload) {
        const {url, params} = payload;
        state.uniqueLoadGamesRequests?.[url].delete(params);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}