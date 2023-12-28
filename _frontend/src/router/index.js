import PageHome from "../components/pages/PageHome.vue";
import Page404 from "../components/pages/Page404.vue";
// User
import PageLogin from "../components/pages/user/PageLogin.vue";
import PageLogout from "../components/pages/user/PageLogout.vue";
import PageUserEdit from "../components/pages/user/PageEdit.vue";
// Projects
import PageProjectAdd from "../components/pages/project/PageAdd.vue";
import PageProjectEdit from "../components/pages/project/PageEdit.vue";
// Tasks
import PageTaskAdd from "../components/pages/task/PageAdd.vue";
import PageTaskEdit from "../components/pages/task/PageEdit.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: PageHome,
    },
    {
        path: "/404",
        name: "404",
        component: Page404,
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
                path: "profile/:userId",
                component: PageUserEdit,
                meta: { requiresAuth: true, requireAdmin: true },
                props: (route) => ({
                    userId: route.params.userId,
                }),
            },
            {
                path: "profile",
                component: PageUserEdit,
                meta: { requiresAuth: true },
                props: (route) => ({
                    userId: "profile",
                }),
            },
        ],
    },
    {
        path: "/project",
        children: [
            // TODO: Can be improved to be done in 1 element
            {
                path: "add",
                component: PageProjectAdd,
                meta: { requiresAuth: true },
            },
            {
                path: "edit/:projectId",
                component: PageProjectEdit,
                meta: { requiresAuth: true, requireCreator: true },
                props: (route) => ({ projectId: route.params.projectId }),
            },
        ],
    },
    {
        path: "/task",
        children: [
            // TODO: Can be improved to be done in 1 element
            {
                path: "add",
                component: PageTaskAdd,
                meta: { requiresAuth: true },
            },
            {
                path: "edit/:taskId",
                component: PageTaskEdit,
                meta: { requiresAuth: true, requireCreator: true },
                props: (route) => ({ taskId: route.params.taskId }),
            },
        ],
    },
];

export default routes;
