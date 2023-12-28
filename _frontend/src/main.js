import { createApp } from "vue";
import { returnRequestResult } from "./functions";
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
    let userId = store.getters["user/getUserId"];
    let userRole = store.getters["user/getUserRole"];

    // If page need authentication and user is not logged in
    if (to.meta.requiresAuth && !store.getters["user/isUserLogged"]) {
        return {
            path: "/user/login",
            query: { redirect: to.fullPath },
        };
    }

    if (to.meta.requireAdmin && userRole !== "admin") {
        return {
            path: "/",
        };
    }

    // If route needs admin or creator to modify it
    if (to.meta.requireCreator) {
        let actionName = to.fullPath.split("/");
        actionName = actionName[1] + "s";

        let resourceId = 0;
        switch (actionName) {
            case "projects":
                resourceId = to.params.projectId;
                break;
            case "tasks":
                resourceId = to.params.taskId;
                break;
        }

        if (resourceId !== 0) {
            let url = await store.dispatch("ajax/getFullApiWithActionUrl", {
                action: actionName + "/" + resourceId,
                urlAdd: "creatorOnly=true",
            });

            let creator = await returnRequestResult(url, {
                store: store,
            });

            if (creator !== false) {
                creator = creator.data.createdBy;
                if (
                    userRole === "admin" ||
                    (userRole === "user" && creator === userId)
                ) {
                } else {
                    return {
                        path: "/404",
                    };
                }
            } else {
                return {
                    path: "/404",
                };
            }
        } else {
            return {
                path: "/404",
            };
        }
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
