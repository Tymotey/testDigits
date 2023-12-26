import { createStore, createLogger } from "vuex";
import ajax from "./modules/ajax";
import drawer from "./modules/drawer";
import user from "./modules/user";
import projects from "./modules/projects";
import VuexPersistence from "vuex-persist";

// TODO: switch off
const debug = process.env.NODE_ENV !== "production";
// save store to localstorage to make persistant after page reload
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default createStore({
    modules: {
        ajax,
        drawer,
        user,
        projects,
    },
    strict: debug,
    plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],
});
