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
    name: "PageEditTask",
    components: {
        FormComponent
    },
    props: {
        taskId: {
            type: String,
        },
    },
    data() {
        return {
            formFields: fields,
            task: {}
        }
    },
    mounted: async function () {
        await this.getTaskData();
    },
    methods: {
        async getTaskData() {
            await doRequest(
                "tasks/" + this.taskId,
                async (response) => {
                    if (response.status === 200) {
                        this.task = response.data.data;
                    }
                    else {
                        this.task = {}
                    }
                },
                null,
                {
                    method: 'get',
                    loader: { messageLoading: 'Getting task data...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        },
        async onSubmit(data, onSuccess = () => { }, onError = () => { }) {
            let postData = {
                ...data
            }

            await doRequest(
                "tasks/" + this.taskId,
                async (response) => {
                    if (response.data === '') {
                        this.$q.notify(
                            getNotificationSettings(
                                "positive",
                                'Task saved.'
                            )
                        )
                        onSuccess()
                        this.$router.push('/')
                    }
                    else {
                        this.$q.notify(
                            getNotificationSettings(
                                "negative",
                                'Cannot save task. Try again later.'
                            )
                        )
                        onError();
                    }
                },
                null,
                {
                    method: 'put',
                    postData: postData,
                    loader: { messageLoading: 'Saving task...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        }
    },
}
</script>