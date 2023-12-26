<template>
    Leaving so soon?
</template>

<script>
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { doRequest, getNotificationSettings } from '../../../functions'

export default {
    async setup() {
        const router = useRouter()
        const store = useStore()
        const $q = useQuasar()

        let userToken = store.getters["user/getUserToken"];

        if (userToken !== false) {
            doRequest(
                'logout',
                async (response) => {
                    await store.dispatch("user/doLogoutUser");
                    $q.notify(
                        getNotificationSettings(
                            'positive',
                            'You are logged out.',
                            {
                                progress: true,
                                actions: [
                                    {
                                        label: "To home",
                                        color: "yellow",
                                        handler: () => {
                                            router.push("/");
                                        },
                                    },
                                ]
                            }
                        )
                    );
                    // TODO: reset projects/users
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                },
                null,
                { show: true, messageLoading: 'Logging out...', store: store, q: $q }
            )
        }

        return {}
    }
}
</script>