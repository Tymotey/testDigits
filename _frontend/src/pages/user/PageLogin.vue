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
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'fa-solid fa-triangle-exclamation ',
                        message: 'Please fill in username'
                    })
                }
                else if (userPass.value === null) {
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'fa-solid fa-triangle-exclamation',
                        message: 'Please fill in password'
                    })
                }
                else {
                    let dismissThis = $q.notify({
                        type: 'ongoing',
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'fa-solid fa-check',
                        message: 'Logging in...'
                    })

                    let requestUrl = await store.dispatch('ajax/getFullApiWithActionUrl', 'login');
                    await axios
                        .post(requestUrl, {
                            email: userName.value,
                            password: userPass.value,
                            appName: 'testApp'
                        })
                        .then(async (response) => {
                            await store.commit('user/setUserLogged', response.data);
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

                            $q.notify({
                                color: 'green-4',
                                timeout: 1000,
                                progress: true,
                                textColor: 'white',
                                icon: 'fa-solid fa-check',
                                message: 'You are logged in.',
                                actions: [
                                    { label: 'To home', color: 'yellow', handler: () => { router.push('/'); } }
                                ]
                            })
                            setTimeout(() => {
                                redirectAfterLogin()
                            }, 2000)
                        })
                        .catch((err) => {
                            console.log(err);
                            dismissThis();
                            $q.notify({
                                color: 'red-5',
                                textColor: 'white',
                                icon: 'fa-solid fa-triangle-exclamation',
                                message: err.response?.data?.message || 'Error loggin in'
                            })
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