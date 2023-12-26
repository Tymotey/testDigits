<template>
    <div v-if="userIsLogged()" class="fit row no-wrap justify-start  content-stretch">
        <div class="col-xs-3 self-stretch" style="overflow: auto;">
            <div v-if="hasProjects()">
                <div class="fit row no-wrap justify-evenly items-center content-center">
                    <div>
                        Page: {{ this.$store.state.projects.page }} of {{ this.$store.state.projects.lastPage }}
                    </div>
                    <div>
                        Jump to:
                        <q-select :model-value="this.$store.state.projects.page" :options="pageOptions"
                            @update:model-value="(value) => { setValue(value); }" :options-dense="true" :dense="true"
                            :label="void 0" class="inlineSelect"></q-select>
                    </div>
                    <div>
                        Per page: <q-select :model-value="this.$store.state.projects.perPage"
                            @update:model-value="(value) => { setValue(value, 'perPage'); }" :options="perPageOptions"
                            :options-dense="true" :dense="true" :label="void 0" class="inlineSelect"></q-select>
                    </div>
                </div>
                <q-list padding class="menu-list">
                    <q-item clickable v-ripple v-for="project in this.$store.state.projects.projects"
                        :active="this.$store.state.projects.active === project.id" @click="this.changeProject(project)">
                        <q-item-section middle class="col-8">{{ project.title }}</q-item-section>
                        <q-item-section middle side class="col-4">
                            <q-btn-group spread flat>
                                <q-btn v-if="project.assignedTo === this.$store.getters['user/getUserId']" size="12px" dense
                                    icon="fa-solid fa-arrows-to-dot" @click="this.changeProject(project)">
                                    <q-tooltip class="bg-accent">Assigned to me</q-tooltip>
                                </q-btn>
                                <q-btn size="12px" dense icon="fa-solid fa-trash"
                                    @click="(e) => this.deleteProject(e, project)">
                                    <q-tooltip class="bg-accent">Delete Project</q-tooltip>
                                </q-btn>
                                <q-btn size="12px" dense icon="fa-solid fa-pen"
                                    @click="(e) => this.editProject(e, project)">
                                    <q-tooltip class="bg-accent">Edit Project</q-tooltip>
                                </q-btn>
                            </q-btn-group>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div v-else>No projects found.</div>
        </div>
        <div class="col-xs-9 self-stretch" style="overflow: auto; padding: 10px;">
            <div v-if="hasActiveProjects()">
                {{ this.$store.getters["projects/getActiveProject"] }}
            </div>
            <div v-else>Please select a project first.</div>
        </div>
    </div>
    <div v-else>
        Welcome.<br />
        To continue using app, please <a href="#" @click="goToLogin">login</a>
    </div>
</template>
<script>
import { doRequest } from '../../functions'

export default {
    async mounted() {
        if (this.userIsLogged()) {
            // this.$store.dispatch('projects/resetAllData');
            this.refreshData();

            this.timer = setInterval(() => {
                this.refreshData()
            }, 5000)
        }
    },
    unmounted() {
        clearInterval(this.timer)
    },
    data() {
        return {
            pageOptions: this.getOptions(),
            perPageOptions: this.getOptions('perPage'),
            timer: null,
        }
    },
    methods: {
        userIsLogged() {
            return this.$store.getters["user/isUserLogged"]
        },
        hasProjects() {
            return this.$store.getters["projects/hasProjects"]
        },
        hasActiveProjects() {
            return this.$store.getters["projects/getActiveProject"]
        },
        async changeProject(item) {
            await this.$store.dispatch('projects/setActive', item.id);
        },
        async deleteProject(e, item) {
            if (confirm('Do you want to delete project ' + item.title + '?')) {
                // Todo: delete this!!
            }
        },
        async editProject(e, item) {
            this.goToLogin(e, 'projects/edit/' + item.id)
        },
        getOptions(type = 'pages') {
            let options = [];

            if (type === "pages") {
                for (let i = 1; i <= this.$store.getters["projects/getLastPage"]; i++) {
                    options.push(i);
                }
            }
            else if (type === 'perPage') {
                options = [5, 10, 20, 50, 100]
            }

            return options;
        },
        async setValue(value, type = 'page') {
            if (type === "page") {
                await this.$store.dispatch('projects/setPage', value);
            }
            else if (type === 'perPage') {
                await this.$store.dispatch('projects/setPerPage', value);
            }

            this.refreshData();
        },
        goToLogin(e, link = "/user/login") {
            e.preventDefault();
            this.$router.push(link);
        },
        async refreshData() {
            await doRequest(
                "projects",
                async (response) => {
                    await this.$store.dispatch('projects/setAllData', response.data);
                },
                null,
                { urlAdd: 'includeTasks=true', loader: { show: true, messageLoading: 'Refreshing projects list' }, store: this.$store, q: this.$q }
            );
        }
    },
    //reactivity
    watch: {
        '$store.state.projects.perPage': async function (value) {
            await this.$store.dispatch('projects/setPage', 1);
        },
        '$store.state.projects.lastPage': function () {
            this.pageOptions = this.getOptions()
        },
    }
}
</script>

<style scoped lang="scss">
.inlineSelect {
    display: inline-block;
}
</style>
