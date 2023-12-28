<template>
    <div v-if="userIsLogged()" class="fit row wrap justify-start  content-stretch">
        <div class="col-xs-12 col-md-3 self-stretch" style="overflow: auto;">
            <div v-if="hasProjects()" id="projectListDiv">
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
                    <div>
                        <q-btn color="secondary" size="12px" dense icon="fa-solid fa-plus"
                            @click="(e) => { goToLink(e, 'project/add/'); }">
                            <q-tooltip class="bg-accent">Add project</q-tooltip>
                        </q-btn>
                    </div>
                </div>
                <q-list padding class="menu-list">
                    <q-item v-ripple v-for="project in this.$store.state.projects.projects"
                        :active="this.$store.state.projects.active === project.id"
                        :class="[project.status === 'new' ? 'bg-green-2' : 'null']">
                        <q-item-section middle class="col-8 cursor-pointer" @click="this.changeProject(project)">{{
                            project.title
                        }}</q-item-section>
                        <q-item-section middle side class="col-4">
                            <q-btn-group spread flat>
                                <q-btn v-if="project.assignedTo === this.$store.getters['user/getUserId']" color="secondary"
                                    size="12px" dense icon="fa-solid fa-arrows-to-dot" @click="this.changeProject(project)">
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
        <div class="col-xs-12 col-md-9 self-stretch" style="overflow: auto; padding: 10px;" id="projectPreviewDiv">
            <ProjectPreviewComponent />
        </div>
    </div>
    <div v-else>
        Welcome.<br />
        To continue using app, please <a href="#" @click="goToLink">login</a>
    </div>
</template>
<script>
import ProjectPreviewComponent from '../ProjectPreviewComponent.vue'
import { doRequest } from '../../functions'

export default {
    components: {
        ProjectPreviewComponent
    },
    async mounted() {
        if (this.userIsLogged()) {
            this.refreshData();

            this.timer = setInterval(() => {
                this.refreshData()
            }, 10000)
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
        async changeProject(item) {
            if (window.innerWidth < 1024) {
                document.getElementById("projectPreviewDiv").scrollIntoView({ behavior: 'smooth' });
            }
            await this.$store.dispatch('projects/setActive', item.id);
        },
        async deleteProject(e, item) {
            if (confirm('Do you want to delete project ' + item.title + '?')) {
                await doRequest(
                    "projects/" + item.id,
                    async (response) => {
                        this.refreshData()
                    },
                    null,
                    {
                        method: 'delete',
                        loader: { messageLoading: 'Deleting project' },
                        store: this.$store,
                        q: this.$q
                    }
                );
            }
        },
        async editProject(e, item) {
            this.goToLink(e, '/project/edit/' + item.id)
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
        goToLink(e, link = "/user/login") {
            e.preventDefault();
            this.$router.push(link);
        },
        async refreshData() {
            await doRequest(
                "projects",
                async (response) => {
                    // set response data to store project
                    await this.$store.dispatch('projects/setAllData', response.data);
                },
                null,
                {
                    loader: { messageLoading: 'Refreshing projects list' },
                    store: this.$store,
                    q: this.$q
                }
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
