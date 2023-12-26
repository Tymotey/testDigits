const state = () => ({
    page: 1,
    perPage: 10,
    lastPage: 1,
    active: 0,
    projects: [],
});

const getters = {
    getPage: (state) => {
        return state.page;
    },
    getPerPage: (state) => {
        return state.perPage;
    },
    getLastPage: (state) => {
        return state.lastPage;
    },
    getActiveProject: (state) => {
        return state.active;
    },
    getProjects: (state) => {
        return state.projects;
    },
    hasProjects: (state) => {
        return state.projects.length > 0;
    },
};

const actions = {
    setAllData({ state, commit }, data) {
        if (data.meta !== undefined) {
            if (data.meta["current_page"] !== undefined)
                commit("setPage", data.meta["current_page"]);
            if (data.meta["per_page"] !== undefined)
                commit("setPerPage", data.meta["per_page"]);
            if (data.meta["last_page"] !== undefined)
                commit("setLastPage", data.meta["last_page"]);
        }
        if (data.data !== undefined && data.data.length > 0) {
            commit("setProjects", data.data);
        }
    },
    setProjects({ state, commit }, data) {
        commit("setProjects", data);
    },
    setPage({ state, commit }, data) {
        commit("setPage", data);
    },
    setPerPage({ state, commit }, data) {
        commit("setPerPage", data);
    },
    setActive({ state, commit }, data) {
        commit("setActive", data);
    },
    resetAllData({ state, commit }) {
        commit("resetAllData");
    },
    resetProjects({ state, commit }) {
        commit("resetProjects");
    },
};

const mutations = {
    resetAllData(state) {
        state.page = 1;
        state.perPage = 10;
        state.lastPage = 1;
        state.active = 0;
        state.projects = [];
    },
    resetProjects(state) {
        state.projects = [];
    },
    setPage(state, page) {
        state.page = page;
    },
    setPerPage(state, perPage) {
        state.perPage = perPage;
    },
    setLastPage(state, lastPage) {
        state.lastPage = lastPage;
    },
    setActive(state, active) {
        state.active = active;
    },
    setProjects(state, data) {
        state.projects = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {},
};
