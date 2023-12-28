<template>
    <q-form @submit="(e) => this.onSubmitForm(e)" class="q-gutter-md">
        <div v-for="field in fields">
            <q-select v-if="field.type === 'select'" :modelValue="values[field.model]" :label="field.label"
                :options="field.data.options" @update:modelValue="(newData) => { catchUpdate(field.model, newData) }"
                input-debounce="150" :rules="field.validation" :reactive-rules="true" map-options></q-select>

            <q-select v-if="field.type === 'ajaxSelect'" :modelValue="values[field.model]" :label="field.label"
                @update:modelValue="(newData) => { catchUpdate(field.model, newData) }" :options="this.tempOptions"
                map-options @filter="(val, update, abort) => { filterFn(val, update, abort, field); }" input-debounce="150"
                :rules="field.validation" :reactive-rules="true" use-input>
                <template v-slot:no-option>
                    <div>No results found</div>
                </template>
            </q-select>

            <q-input v-if="['text', 'number', 'email', 'password'].indexOf(field.type) !== -1" :type="field.type"
                :modelValue="values[field.model]" :label="field.label" :rules="field.validation"
                @update:modelValue="(newData) => { catchUpdate(field.model, newData) }" :hint="field?.hint" />
        </div>

        <div>
            <q-btn :label="labelSubmit" type="submit" color="primary" />
        </div>
    </q-form>
</template>
<script>
import { doRequest } from '../functions'

// TODO: if value predefined, label for ajax select is not ok
export default {
    name: "FormComponent",
    props: {
        labelSubmit: {
            type: String,
            default(rawProps) {
                return 'Submit'
            }
        },
        fields: {
            type: Object,
            default(rawProps) {
                return {}
            }
        },
        values: {
            type: Object,
            default(rawProps) {
                return {}
            }
        },
        onSubmit: {
            type: Function,
            default(rawProps) {
                () => { }
            }
        }
    },
    data() {
        return {
            tempOptions: [],
            options: []
        }
    },
    methods: {
        filterFn(val, update, abort, field) {
            if (val.length < 2) {
                abort()
                return
            }

            update(async () => {
                this.options = [];
                let controller = field.data?.collection || 'users'

                let urlAdd = 'forSelect=true&';
                if (controller === 'users') {
                    urlAdd += 'name[like]=' + val
                }
                else if (controller === 'projects') {
                    urlAdd += 'title[like]=' + val
                }

                await doRequest(
                    controller,
                    async (response) => {
                        this.tempOptions = response.data.data;
                    },
                    null,
                    {
                        urlAdd: urlAdd,
                        method: 'get',
                        loader: { messageLoading: 'Retrieving options...' },
                        store: this.$store,
                        q: this.$q
                    }
                );

                const needle = val.toLowerCase()
                this.options = needle !== undefined && needle !== "" ? this.tempOptions.filter((v) => {
                    return v.label.toLowerCase().indexOf(needle) > -1
                }) : this.tempOptions
            })
        },
        catchUpdate(model, data) {
            let savedData = data;
            if (typeof savedData === 'object') {
                savedData = data.value
            }

            this.values[model] = savedData;
        },
        async onSubmitForm(e) {
            e.preventDefault();
            await this.onSubmit(
                this.values,
                () => { },
                () => { }
            );
        }
    }
}
</script>