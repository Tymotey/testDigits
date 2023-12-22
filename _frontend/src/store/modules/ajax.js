const state = () => ({
    serverUrl: "http://127.0.0.1:8000/",
    apiUrl: "api/",
    apiVersionUrl: "v1/",
    actions: {
        login: "login",
        logout: "logout",
    },
});

const getters = {};

const actions = {
    getFullApiWithActionUrl: ({ state }, action = "") => {
        if (action !== "") {
            let urlAdd =
                ["login", "logout"].indexOf(action) !== -1
                    ? state.apiUrl
                    : state.apiUrl + state.apiVersionUrl;
            return state.serverUrl + urlAdd + state.actions[action];
        } else {
            return false;
        }
    },
};

const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {},
};
