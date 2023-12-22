import Homepage from "../pages/PageHome.vue";
import PageLogin from "../pages/user/PageLogin.vue";
import PageLogout from "../pages/user/PageLogout.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Homepage,
    },
    {
        path: "/user",
        children: [
            {
                path: "login",
                component: PageLogin,
                meta: { requiresAuth: false },
            },
            {
                path: "logout",
                component: PageLogout,
                meta: { requiresAuth: true },
            },
        ],
    },
];

export default routes;
