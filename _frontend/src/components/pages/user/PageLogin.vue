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
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getNotificationSettings } from '../../../functions'

export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const $q = useQuasar()

        const userName = ref(null)
        const userPass = ref(null)

        return {
            userName,
            userPass,

            async onSubmit() {
                if (userName.value === null) {
                    $q.notify(getNotificationSettings('error', 'Please fill in username'))
                }
                else if (userPass.value === null) {
                    $q.notify(getNotificationSettings('error', 'Please fill in password'))
                }
                else {
                    let dismissThis = $q.notify(getNotificationSettings('ongoing', 'Logging in..'))

                    let requestUrl = await store.dispatch('ajax/getFullApiWithActionUrl', 'login');
                    await axios
                        .post(requestUrl, {
                            email: userName.value,
                            password: userPass.value,
                            appName: 'testApp'
                        })
                        .then(async (response) => {
                            await store.dispatch("user/doLoginUser", response.data);
                            dismissThis();

                            const redirectAfterLogin = () => {
                                const urlParams = new URLSearchParams(window.location.search);
                                const redirect = urlParams.get('redirect');

                                if (redirect !== null && redirect !== '/user/logout') {
                                    router.push(redirect)
                                }
                                else {
                                    router.push('/')
                                }
                            }

                            $q.notify(
                                getNotificationSettings(
                                    'positive',
                                    'You are logged in.',
                                    {
                                        actions: [
                                            { label: 'To home', color: 'yellow', handler: () => { router.push('/'); } }
                                        ]
                                    }
                                )
                            )
                            setTimeout(() => {
                                redirectAfterLogin()
                            }, 2000)
                        })
                        .catch((err) => {
                            console.log(err);
                            dismissThis();
                            $q.notify(
                                getNotificationSettings(
                                    'negative',
                                    err.response?.data?.message || 'Error loggin in',
                                    {
                                        actions: [
                                            { label: 'To home', color: 'yellow', handler: () => { router.push('/'); } }
                                        ]
                                    }
                                )
                            )
                        })
                }
            },

            onReset() {
                userName.value = null
                userPass.value = null
            }
        }
    }
}
</script>