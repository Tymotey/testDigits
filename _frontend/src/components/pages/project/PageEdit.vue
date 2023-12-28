<template>
    <div id="parent_form" class="fit row no-wrap justify-center items-center content-center">
        <div id="parent_form_inner">
            <FormComponent :fields="formFields" :values="this.project" :onSubmit="this.onSubmit" />
        </div>
    </div>
</template>

<script>
import { doRequest, getNotificationSettings } from '../../../functions'
import FormComponent from '../../FormComponent.vue'
import { fields } from './fields'

export default {
    name: "PageEditProject",
    components: {
        FormComponent
    },
    props: {
        projectId: {
            type: String,
        },
    },
    data() {
        return {
            formFields: fields,
            project: {}
        }
    },
    mounted: async function () {
        await this.getProjectData();
    },
    methods: {
        async getProjectData() {
            await doRequest(
                "projects/" + this.projectId,
                async (response) => {
                    if (response.status === 200) {
                        this.project = response.data.data;
                    }
                    else {
                        this.project = {}
                    }
                },
                null,
                {
                    method: 'get',
                    loader: { messageLoading: 'Getting project data...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        },
        async onSubmit(data, onSuccess = () => { }, onError = () => { }) {
            let postData = {
                ...data
            }

            // TODO: Can be improved
            if (postData.id) delete postData.id;
            if (postData.assignedToData) delete postData.assignedToData;
            if (postData.tasks) delete postData.tasks;
            if (postData.createdAt) delete postData.createdAt;
            if (postData.updatedAt) delete postData.updatedAt;

            await doRequest(
                "projects/" + this.projectId,
                async (response) => {
                    console.log(response);
                    if (response.data === '') {
                        this.$q.notify(
                            getNotificationSettings(
                                "positive",
                                'Project saved.'
                            )
                        )
                        onSuccess()
                        this.$router.push('/')
                    }
                    else {
                        this.$q.notify(
                            getNotificationSettings(
                                "negative",
                                'Cannot save project. Try again later.'
                            )
                        )
                        onError();
                    }
                },
                null,
                {
                    method: 'put',
                    postData: postData,
                    loader: { messageLoading: 'Saving project...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        }
    },
}
</script>