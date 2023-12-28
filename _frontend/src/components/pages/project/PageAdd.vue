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
    name: "PageAddProject",
    components: {
        FormComponent
    },
    data() {
        return {
            formFields: fields,
            project: {}
        }
    },
    methods: {
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
                "projects/",
                async (response) => {
                    if (response.data.data.id) {
                        this.$q.notify(
                            getNotificationSettings(
                                "positive",
                                'Project added.'
                            )
                        )
                        onSuccess()
                        await this.$store.dispatch('projects/setActive', response.data.data.id);
                        this.$router.push('/')
                    }
                    else {
                        this.$q.notify(
                            getNotificationSettings(
                                "negative",
                                'Cannot add project. Try again later.'
                            )
                        )
                        onError();
                    }
                },
                null,
                {
                    method: 'post',
                    postData: postData,
                    loader: { messageLoading: 'Adding project...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        }
    },
}
</script>