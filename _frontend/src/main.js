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
router.beforeEach(async (to, from) => {
    // Do logout logic - doing here because of store variable!
    if (to.path === "/user/logout") {
        let userToken = store.getters["user/getUserToken"];

        if (userToken !== false) {
            const $q = useQuasar();
            let requestUrl = await store.dispatch(
                "ajax/getFullApiWithActionUrl",
                "logout"
            );

            let dismissThis = $q.notify({
                type: "ongoing",
                color: "green-4",
                textColor: "white",
                icon: "fa-solid fa-check",
                message: "Logging out...",
            });
            await axios
                .get(requestUrl, {
                    headers: {
                        Authorization: `Bearer ` + userToken,
                        Accept: "application/json",
                    },
                })
                .then(async (response) => {
                    await store.commit("user/setUserLoggedOut");

                    dismissThis();
                    $q.notify({
                        color: "green-4",
                        timeout: 1000,
                        progress: true,
                        textColor: "white",
                        icon: "fa-solid fa-check",
                        message: "You are logged out.",
                        actions: [
                            {
                                label: "To home",
                                color: "yellow",
                                handler: () => {
                                    router.push("/");
                                },
                            },
                        ],
                    });
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                })
                .catch((err) => {
                    console.log(err);
                    dismissThis();
                    $q.notify({
                        color: "red-5",
                        textColor: "white",
                        icon: "fa-solid fa-triangle-exclamation",
                        message:
                            err.response?.data?.message || "Error loggin out",
                    });
                });
        }
    } else {
        // If page need authentication and user is not logged in
        if (to.meta.requiresAuth && !store.getters["user/isUserLogged"]) {
            return {
                path: "/user/login",
                query: { redirect: to.fullPath },
            };
        }
    }
});

// QUASAR
// --QUASAR style
import "quasar/src/css/index.sass";
import { Quasar, useQuasar } from "quasar";
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
