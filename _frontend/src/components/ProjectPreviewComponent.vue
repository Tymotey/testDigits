<template>
    <div v-if="this.hasProject()">
        <div id="scroll_top_div" @click="this.scrollToList()" class="text-center lt-md"><q-btn icon="fa-solid fa-arrow-up"
                flat dense /> Scroll top
        </div>
        <h2>{{ this.project?.title }}</h2>
        <div v-if="this.project.description !== ''">{{ this.project.description }}</div>
        <span>
            Created by: <strong>{{ this.project.createdByData.name }}</strong>
            Assigned to: <strong>{{ this.project.assignedToData.name }}</strong>
            Visibility: <strong>{{ this.getProjectVisibilityLabel() }}</strong>
            Status: <strong>{{ this.getProjectProgressLabel() }}</strong>
            &nbsp;&nbsp;
            <q-btn color="secondary" size="12px" dense icon="fa-solid fa-plus"
                @click="(e) => { goToLink(e, 'task/add/?projectId=' + this.project.id); }">
                <q-tooltip class="bg-accent">Add task</q-tooltip>
            </q-btn>
        </span>
        <div v-if="this.project?.tasks !== undefined && this.project?.tasks.length > 0">
            <draggable :list="this.project?.tasks" @move="onMoveCallback" @start="onMoveStart" @end="onMoveEnd"
                item-key="id">
                <template #item="{ task, index }">
                    <div
                        :class="['q-pa-sm', 'q-my-xs', 'fit', 'row', 'no-wrap', 'justify-start', 'items-center', 'content-start', (this.project?.tasks[index].status === 'done' ? 'bg-green-2' : '')]">
                        <div class="col-1" style="cursor: move;">
                            <q-icon name="fa-solid fa-bars" />
                        </div>
                        <div class="col-10">
                            <span class="text-weight-bold">{{ this.project?.tasks[index].title }}</span>
                            <br />
                            {{ this.project?.tasks[index].content }}
                        </div>
                        <div class="col-1 text-right">
                            <q-btn-group flat>
                                <q-btn
                                    v-if="this.project?.tasks[index].status === 'not-done' && isCurrentUserAssignedToTask(this.project?.tasks[index].assignedTo)"
                                    color="secondary" size="12px" dense icon="fa-solid fa-check"
                                    @click="async (e) => { await setTaskStatusValue('done', this.project?.tasks[index].id) }">
                                    <q-tooltip class="bg-accent">Mark complete</q-tooltip>
                                </q-btn>
                                <q-btn
                                    v-if="this.project?.tasks[index].status === 'done' && isCurrentUserAssignedToTask(this.project?.tasks[index].assignedTo)"
                                    color="secondary" size="12px" dense icon="fa-solid fa-xmark"
                                    @click="async (e) => { await setTaskStatusValue('not-done', this.project?.tasks[index].id) }">
                                    <q-tooltip class="bg-accent">Mark incomplete</q-tooltip>
                                </q-btn>
                                <q-btn v-if="userCanEditTask(this.project?.tasks[index].createdBy)" size="12px" dense
                                    icon="fa-solid fa-trash" @click="(e) => this.deleteTask(e, this.project?.tasks[index])">
                                    <q-tooltip class="bg-accent">Delete Task</q-tooltip>
                                </q-btn>
                                <q-btn v-if="userCanEditTask(this.project?.tasks[index].createdBy)" size="12px" dense
                                    icon="fa-solid fa-pen" @click="(e) => this.editTask(e, this.project?.tasks[index])">
                                    <q-tooltip class="bg-accent">Edit Task</q-tooltip>
                                </q-btn>
                            </q-btn-group>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
        <div v-else>No tasks found.</div>

    </div>
    <div v-else>Please select a project first.</div>
</template>

<script>
import { labelsStatusProject, labelsStatusTask, labelsVisibility } from '../functions/constants'
import { doRequest, getNotificationSettings } from '../functions'
import draggable from 'vuedraggable'

export default {
    name: "ProjectPreviewComponent",
    components: {
        draggable,
    },
    data() {
        return {
            activeNames: null,
            project: null,
            dragging: false
        }
    },
    async mounted() {
        if (this.$store.getters["projects/getActiveProject"] !== 0) {
            this.refreshData()
        }
    },
    methods: {
        isCurrentUserAssignedToTask(assignedId) {
            let userId = this.$store.getters["user/getUserId"];

            return userId === assignedId;
        },
        userCanEditTask(createdBy) {
            let userId = this.$store.getters["user/getUserId"];
            let userRole = this.$store.getters["user/getUserRole"];

            return userRole === 'admin' || (userRole === 'user' && userId === createdBy)
        },
        async onMoveEnd() {
            this.dragging = false;

            for (let i = 0; i < this.project.tasks.length; i++) {
                await doRequest(
                    "tasks/" + this.project.tasks[i].id,
                    async (response) => {

                    },
                    null,
                    {
                        method: 'put',
                        postData: {
                            sortBy: i,
                        },
                        loader: { show: false },
                        store: this.$store,
                        q: this.$q
                    }
                );
            }
        },
        async onMoveStart() {
            this.dragging = true;
        },
        async onMoveCallback(evt, originalEvent) {
        },
        scrollToList() {
            if (window.innerWidth < 1024) {
                document.getElementById("projectListDiv").scrollIntoView({ behavior: 'smooth' });
            }
        },
        hasProject() {
            return this.$store.getters["projects/getActiveProject"] !== 0 && this.project !== null
        },
        async deleteTask(e, item) {
            if (confirm('Do you want to delete task ' + item.title + '?')) {
                await doRequest(
                    "tasks/" + item.id,
                    async (response) => {
                        this.refreshData()
                    },
                    null,
                    {
                        method: 'delete',
                        loader: { messageLoading: 'Deleting task' },
                        store: this.$store,
                        q: this.$q
                    }
                );
            }
        },
        async editTask(e, item) {
            this.goToLink(e, '/task/edit/' + item.id)
        },
        goToLink(e, link = "/") {
            e.preventDefault();
            this.$router.push(link);
        },
        getProjectVisibilityLabel() {
            let index = null

            labelsVisibility.forEach((element, i) => {
                if (element.value === this.project?.visible) {
                    index = i
                }
            });

            if (index !== null) {
                return labelsVisibility[index].label
            }
            else {
                return '-';
            }
        },
        getProjectProgressLabel() {
            let index = null

            labelsStatusProject.forEach((element, i) => {
                if (element.value === this.project?.status) {
                    index = i
                }
            });

            if (index !== null) {
                return labelsStatusProject[index].label
            }
            else {
                return '-';
            }
        },
        getTaskStatusOptions() {
            return labelsStatusTask;
        },
        async setTaskStatusValue(value, id) {
            await doRequest(
                "tasks/" + id,
                async (response) => {
                    if (response.data === '') {
                        this.refreshData()
                    }
                    else {
                        this.$q.notify(
                            getNotificationSettings(
                                "negative",
                                'Cannot update status. Try again later.'
                            )
                        )
                    }
                },
                null,
                {
                    method: 'put',
                    postData: {
                        status: value,
                    },
                    loader: { messageLoading: 'Saving status...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        },
        async refreshData() {
            await doRequest(
                "projects/" + this.$store.getters["projects/getActiveProject"],
                async (response) => {
                    if (response.data) {
                        this.project = response.data.data;
                    }
                    else {
                        this.project = null
                    }
                },
                null,
                { urlAdd: 'includeTasks=true', loader: { messageLoading: 'Getting project data...' }, store: this.$store, q: this.$q }
            );
        }
    },
    watch: {
        '$store.state.projects.active': async function (value) {
            this.refreshData()
        }
    }
}
</script>

<style scoped lang="scss"></style>