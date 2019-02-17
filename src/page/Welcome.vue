<template>
    <v-flex md12 fill-height>
        <v-flex tag="h1" class="headline">{{$t('welcome_title')}}</v-flex>
        <v-flex md4>
            <v-list>
                <v-list-tile
                        v-for="project in project_list"
                        :key="project._id"
                        @click="selectProject(project)"
                >
                    <v-list-tile-action>
                        <v-icon color="pink">star</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="project.name"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-flex>
    </v-flex>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "Welcome",
        computed: {
            ...mapState([
                'project_list',
                'active_page_index',
                'active_page_id',
                'active_project_id',
            ])
        },
        watch: {
            active_page_id() {
                this.$router.push({name: 'editor', params: {id: this.active_page_id}});
            }
        },
        methods: {
            ...mapMutations([
                'loadProject'
            ]),
            selectProject(project) {
                if (project._id === this.active_project_id && this.active_page_id) {
                    this.$router.push({name: 'editor', params: {id: this.active_page_id}});
                } else {
                    this.$socket.emit('loadProject', project._id);
                }
            }
        }
    }
</script>

<style scoped>

</style>
