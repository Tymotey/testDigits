const defaultData = { id: false, name: "", email: "", token: false };

const state = () => ({
    userLogged: false,
    userData: { ...defaultData },
});

const getters = {
    isUserLogged: (state) => {
        return state.userLogged;
    },
    getUserData: (state) => {
        return state.userData;
    },
    getUserId: (state) => {
        return state.userData.id;
    },
    getUserToken: (state) => {
        return state.userData.token;
    },
};

const actions = {
    doLoginUser({ commit }, data) {
        commit("setUserLoggedIn", data);
        commit("projects/resetAllData", null, { root: true }); // reset store projects state
    },
    doLogoutUser({ commit }) {
        commit("setUserLoggedOut");
    },
};

const mutations = {
    setUserLoggedIn(state, data) {
        if (data.success === true) {
            if (data.token && data.user) {
                state.userData.token = data.token;
                state.userData.id = data.user.id;
                state.userData.name = data.user.name;
                state.userData.email = data.user.email;
                state.userLogged = true;
            }
        }
    },
    setUserLoggedOut(state) {
        state.userLogged = false;
        state.userData = { ...defaultData };
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
