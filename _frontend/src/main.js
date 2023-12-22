import { createApp } from "vue";
import App from "./App.vue";
// Plugins
import axios from "axios";
import store from "./store";

// Style
import "./assets/style/custom.scss";

// Routers
import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !store.getters["user/isUserLogged"]) {
        return {
            path: "/user/login",
            query: { redirect: to.fullPath },
        };
    }
});

// QUASAR
// --QUASAR style
import "quasar/src/css/index.sass";
import { Quasar } from "quasar";
import quasarIconSet from "quasar/icon-set/svg-fontawesome-v6";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
// --QUASAR plugins
import { Notify } from "quasar";

const app = createApp(App);
app.use(Quasar, {
    plugins: { Notify },
    iconSet: quasarIconSet,
});
app.use(store);
app.use(router);
app.provide("axios", axios);
app.mount("#app");
