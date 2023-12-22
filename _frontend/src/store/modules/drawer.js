const state = () => ({
    drawerStatus: false,
});

const getters = {
    drawerStatus: (state) => {
        return state.drawerStatus;
    },
};

const actions = {
    openDrawer({ state, commit }) {
        commit("openDrawer");
    },
    closeDrawer({ state, commit }) {
        commit("closeDrawer");
    },
    toggleDrawer({ state, commit }) {
        commit("toggleDrawer");
    },
};

const mutations = {
    openDrawer(state) {
        state.drawerStatus = true;
    },
    closeDrawer(state) {
        state.drawerStatus = false;
    },
    toggleDrawer(state) {
        state.drawerStatus = !state.drawerStatus;
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
