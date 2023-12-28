<template>
    <div id="parent" class="fit row no-wrap justify-center items-center content-center">
        <div style="width: 400px;">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="userName" label="Username or email" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please type username']" />

                <q-input filled type="password" v-model="userPass" label="Password" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please write password']" />

                <div>
                    <q-btn label="Submit" type="submit" color="primary" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { getNotificationSettings, doRequest } from '../../../functions'

export default {
    data() {
        return {
            userName: ref(null),
            userPass: ref(null),
        }
    },
    methods: {
        async onSubmit() {
            await doRequest(
                "login",
                async (response) => {
                    await this.$store.dispatch("user/doLoginUser", response.data);

                    const redirectAfterLogin = () => {
                        const urlParams = new URLSearchParams(window.location.search);
                        const redirect = urlParams.get('redirect');

                        if (redirect !== null && redirect !== '/user/logout') {
                            this.$router.push(redirect)
                        }
                        else {
                            this.$router.push('/')
                        }
                    }
                    this.$q.notify(
                        getNotificationSettings(
                            'positive',
                            'You are logged in.',
                            {
                                actions: [
                                    { label: 'To home', color: 'yellow', handler: () => { this.$router.push('/'); } }
                                ]
                            }
                        )
                    )
                    setTimeout(() => {
                        redirectAfterLogin()
                    }, 2000)
                },
                null,
                {
                    method: 'post',
                    postData: {
                        email: this.userName,
                        password: this.userPass,
                        appName: 'testApp'
                    },
                    loader: { messageLoading: 'Logging in' },
                    store: this.$store,
                    q: this.$q
                }
            );
        },
        onReset() {
            this.userName = '';
            this.userPass = '';
        }
    },
}
</script>