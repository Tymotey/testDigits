import PageHome from "../components/pages/PageHome.vue";
import PageLogin from "../components/pages/user/PageLogin.vue";
import PageLogout from "../components/pages/user/PageLogout.vue";
import PageProfile from "../components/pages/user/PageProfile.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: PageHome,
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
                component: PageLogout,
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
