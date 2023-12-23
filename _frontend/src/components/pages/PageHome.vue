<template>
    Homepage tasks
</template>
<script>
import { doRequestList } from '../../functions'
import { useStore } from 'vuex'

export default {
    async setup() {
        const store = useStore()
        let projects = false

        if (store.getters["user/isUserLogged"]) {
            await doRequestList('projects', (response) => {
                let apiProjects = response.data.data
            }, () => { }, { show: true })
        }

        if (projects !== false) {

        }
    }
}
</script>