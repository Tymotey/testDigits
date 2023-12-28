<template>
    <div id="parent_form" class="fit row no-wrap justify-center items-start content-center">
        <div id="parent_form_inner">
            <FormComponent :fields="formFields" :values="this.user" :onSubmit="this.onSubmit" />
        </div>
    </div>
</template>

<script>
import { doRequest, getNotificationSettings } from '../../../functions'
import FormComponent from '../../FormComponent.vue'
import { fields } from './fields'

export default {
    name: "PageProfile",
    components: {
        FormComponent
    },
    props: {
        userId: {
            type: String,
        },
    },
    data() {
        return {
            formFields: fields,
            user: {}
        }
    },
    mounted: async function () {
        await this.getUserData();
    },
    methods: {
        async getUserData() {
            let link = "users/" + this.userId;
            if (this.userId === 'profile') {
                link = 'profile';
            }

            await doRequest(
                link,
                async (response) => {
                    if (response.status === 200) {
                        this.user = response.data.data;
                    }
                    else {
                        this.user = {}
                    }
                },
                null,
                {
                    method: 'get',
                    loader: { messageLoading: 'Getting user data...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        },
        async onSubmit(data, onSuccess = () => { }, onError = () => { }) {
            let postData = {
                ...data
            }

            if (data.password !== '' && data.confirmPassword !== '') {
                if (data.password !== data.confirmPassword) {
                    delete (data.password);
                    delete (data.confirmPassword);

                    this.$q.notify(
                        getNotificationSettings(
                            "negative",
                            'Passwords do not match.'
                        )
                    )
                }
                else {
                    this.$q.notify(
                        getNotificationSettings(
                            "positive",
                            'Password updated.'
                        )
                    )
                }
            }

            let userId = this.userId;
            if (userId === 'profile') {
                userId = this.$store.getters["user/getUserId"]
            }

            await doRequest(
                "users/" + userId,
                async (response) => {
                    if (response.data === '') {
                        this.$q.notify(
                            getNotificationSettings(
                                "positive",
                                'User saved.'
                            )
                        )
                        onSuccess()
                        this.$router.push('/')
                    }
                    else {
                        this.$q.notify(
                            getNotificationSettings(
                                "negative",
                                'Cannot save user. Try again later.'
                            )
                        )
                        onError();
                    }
                },
                null,
                {
                    method: 'put',
                    postData: postData,
                    loader: { messageLoading: 'Saving user data...' },
                    store: this.$store,
                    q: this.$q
                }
            );
        }
    },
}
</script>