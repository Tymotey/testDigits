const state = () => ({
    page: 0,
    perPage: 10,
    list: [],
});

const getters = {
    getProjects: (state) => {
        return state.list;
    },
};

const actions = {};

const mutations = {
    resetProjects(state) {
        state.page = 0;
        state.perPage = 10;
        state.list = [];
    },
    async setProjectsFromUrl(state) {
        let data = [];

        state.list = data;
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
