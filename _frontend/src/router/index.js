import PageHome from "../components/pages/PageHome.vue";
// User
import PageLogin from "../components/pages/user/PageLogin.vue";
import PageLogout from "../components/pages/user/PageLogout.vue";
import PageProfile from "../components/pages/user/PageProfile.vue";
// Projects
import PageProjectAdd from "../components/pages/projects/PageAdd.vue";
import PageProjectEdit from "../components/pages/projects/PageEdit.vue";
// Tasks
import PageTaskAdd from "../components/pages/tasks/PageAdd.vue";
import PageTaskEdit from "../components/pages/tasks/PageEdit.vue";

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
                component: PageProjectAdd,
                meta: { requiresAuth: true },
            },
            {
                path: "edit",
                component: PageProjectEdit,
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
                component: PageTaskAdd,
                meta: { requiresAuth: true },
            },
            {
                path: "edit",
                component: PageTaskEdit,
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
