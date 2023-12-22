import { createStore, createLogger } from "vuex";
import ajax from "./modules/ajax";
import drawer from "./modules/drawer";
import user from "./modules/user";
import VuexPersistence from "vuex-persist";

const debug = process.env.NODE_ENV !== "production";
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default createStore({
    modules: {
        ajax,
        drawer,
        user,
    },
    strict: debug,
    // plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],
    plugins: debug ? [createLogger()] : [],
});
