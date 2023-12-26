const state = () => ({
    serverUrl: "http://127.0.0.1:8000/",
    apiUrl: "api/",
    apiVersionUrl: "v1/",
    actions: {
        login: "login",
        logout: "logout",
        projects: "projects",
        tasks: "tasks",
    },
});

const getters = {};

const actions = {
    getFullApiWithActionUrl: (
        { state },
        params = { action: "", urlAdd: "" }
    ) => {
        if (params.action !== "") {
            let isUserActions =
                ["login", "logout"].indexOf(params.action) !== -1;

            // Add version for all actions except login/logout
            let versionAdd = isUserActions
                ? state.apiUrl
                : state.apiUrl + state.apiVersionUrl;

            // Add extra parameters to URL
            let extraUrl =
                params.urlAdd && params.urlAdd !== ""
                    ? "?" + params.urlAdd
                    : "";

            return (
                state.serverUrl +
                versionAdd +
                state.actions[params.action] +
                extraUrl
            );
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
