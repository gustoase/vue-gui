<template>
    <div>
        <modal-create-page
                :is_open="is_open_create_page"
                @createPage="createPage"
                @closeModal="is_open_create_page = false"
        />
        <v-tabs dark show-arrows height="30px">
            <v-tooltip bottom>
                <v-btn slot="activator" fab small class="page-add-btn" @click="is_open_create_page = true">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <span>{{$t('add_page')}}</span>
            </v-tooltip>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="page in pages" :key="page._id" :to="{ name: 'editor', params: { id: page._id }}">
                {{page.name}}
            </v-tab>
        </v-tabs>
    </div>
</template>

<script>
    import ModalCreatePage from '@/components/editor/ModalCreatePage';

    import { mapMutations, mapGetters,mapState } from 'vuex';

    export default {
        name: "PageNavigator",
        components: {
            ModalCreatePage
        },
        data() {
            return {
                is_open_create_page: false
            }
        },
        computed: {
            ...mapGetters([
                'pages'
            ]),
            ...mapState([
                'active_project_id',
                'auth_user',
                'active_page_index',
            ]),
        },
        sockets: {
            loadPage: function (data) {
                console.log('server loadPage', data)
            }
        },
        methods: {
            ...mapMutations([
                'createNewPage'
            ]),
            createPage(name) {
                this.createNewPage(name);

                this.$socket.emit('createPage', {
                    project_id: this.active_project_id,
                    name: name,
                    tree: [{
                        component: 'Div',
                        is_nested: true,
                        params: {},
                        children: []
                    }]
                });

                this.is_open_create_page = false;
                let page_index = this.pages.length;
                this.$router.push({ name: 'editor', params: { id: this.pages[page_index-1].id }});
            }
        }
    }
</script>

<style scoped lang="less">
    .page-add-btn {
        width: 17px !important;
        height: 17px !important;
    }
</style>
