<template>
    <v-dialog persistent v-model="is_open" scrollable max-width="900">
        <v-card>
           <v-card-text>
               <vue-json-pretty :data="source"></vue-json-pretty>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$emit('closeModal')">
                    {{$t('close')}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapGetters } from 'vuex';
    import VueJsonPretty from 'vue-json-pretty'

    export default {
        name: "ModalShowSource",
        components: {
            VueJsonPretty
        },
        props: {
            is_open: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters([
                'tree',
            ]),
            source() {
                return this.tree ? this.tree[0].children : {};
            }
        }
    }
</script>

<style scoped>

</style>
