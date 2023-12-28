<template>
    Leaving so soon?
</template>

<script>
import { doRequest, getNotificationSettings } from '../../../functions'

export default {
    name: "PageLogoutComponent",
    async mounted() {

        let userToken = this.$store.getters["user/getUserToken"];

        if (userToken !== false) {
            doRequest(
                'logout',
                async (response) => {
                    await this.$store.dispatch("user/doLogoutUser");
                    this.$q.notify(
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
                                            this.$router.push("/");
                                        },
                                    },
                                ]
                            }
                        )
                    );
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 2000);
                },
                null,
                {
                    loader: { messageLoading: 'Logging out...' },
                    store: this.$store,
                    q: this.$q
                }
            )
        }

        return {}
    }
}
</script>