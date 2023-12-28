<template>
    <div id="parent_form" class="fit row no-wrap justify-center items-start content-center">
        <div id="parent_form_inner">
            <FormComponent :fields="formFields" :values="this.task" :onSubmit="this.onSubmit" />
        </div>
    </div>
</template>

<script>
import { doRequest, getNotificationSettings } from '../../../functions'
import FormComponent from '../../FormComponent.vue'
import { fields } from './fields'

export default {
    name: "PageAddTask",
    components: {
        FormComponent
    },
    data() {
        return {
            formFields: fields,
            task: {}
        }
    },
    mounted: async function () {
        let projectId = this.$route.query.projectId;

        if (projectId !== undefined) {
            this.task['projectId'] = projectId;
        }
    },
    methods: {
        async onSubmit(data, onSuccess = () => { }, onError = () => { }) {
            let postData = {
                ...data
            }

            // TODO: TEST USER

            await doRequest(
                "tasks/",
                async (response) => {
                    if (response.data.data.id) {
                        this.$q.notify(
                            getNotificationSettings(
                                "positive",
                                'Task added.'
                            )
                        )
                        onSuccess()
                        this.$router.push('/')
                    }
                    else {
                        this.$q.notify(
                            getNotificationSettings(
                                "negative",
                                'Cannot add task. Try again later.'
                            )
                        )
                        onError();
                    }
                },
                null,
                {
                    method: 'post',
                    postData: postData,
                    loader: { messageLoading: 'Adding task...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        }
    },
}
</script>