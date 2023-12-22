import PageHome from "../pages/PageHome.vue";
import Homepage from "../pages/PageHome.vue";
import PageLogin from "../pages/user/PageLogin.vue";
import PageProfile from "../pages/user/PageProfile.vue";

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
            },
            {
                path: "logout",
                component: {
                    beforeRouteEnter(to, from, next) {},
                },
                meta: { requiresAuth: true },
            },
            {
                path: "myProfile",
                component: PageProfile,
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: "/project",
        children: [
            {
                path: "add",
                component: PageHome,
                meta: { requiresAuth: true },
            },
            {
                path: "edit",
                component: PageHome,
                meta: { requiresAuth: true },
            },
            {
                path: "delete",
                component: PageHome,
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: "/task",
        children: [
            {
                path: "add",
                component: PageHome,
                meta: { requiresAuth: true },
            },
            {
                path: "edit",
                component: PageHome,
                meta: { requiresAuth: true },
            },
            {
                path: "delete",
                component: PageHome,
                meta: { requiresAuth: true },
            },
        ],
    },
];

export default routes;
