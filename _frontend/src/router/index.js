import PageHome from "../components/pages/PageHome.vue";
// User
import PageLogin from "../components/pages/user/PageLogin.vue";
import PageLogout from "../components/pages/user/PageLogout.vue";
import PageProfile from "../components/pages/user/PageProfile.vue";
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
            // TODO: Can be improved to be done in 1 element
            {
                path: "add",
                component: PageProjectAdd,
                meta: { requiresAuth: true },
            },
            {
                path: "edit/:projectId",
                component: PageProjectEdit,
                meta: { requiresAuth: true },
                props: (route) => ({ projectId: route.params.projectId }),
            },
            {
                path: "delete/:projectId",
                component: PageHome,
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: true },
                props: (route) => ({ taskId: route.params.taskId }),
            },
            {
                path: "delete/:taskId",
                component: PageHome,
                meta: { requiresAuth: true },
            },
        ],
    },
];

export default routes;
