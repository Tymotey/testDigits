import { createStore, createLogger } from "vuex";
import ajax from "./modules/ajax";
import drawer from "./modules/drawer";
import user from "./modules/user";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
    modules: {
        ajax,
        drawer,
        user,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
