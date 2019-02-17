<template>
    <v-dialog persistent v-model="is_open" width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                Новая страница
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                    ref="name"
                                    label="Название"
                                    required
                                    :error-messages="error_messages"
                                    v-model="name"
                                    :rules="[rules.required]"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$emit('closeModal')">
                    Отмена
                </v-btn>
                <v-btn color="primary" @click="createPage">
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ModalCreatePage",
        props: {
            is_open: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                name: '',
                error_messages: [],
                rules: {
                    required: value => !!value || 'Укажите название страницы.',
                }
            }
        },
        methods: {
            createPage() {
                if (this.$refs.name.validate()) {
                    this.error_messages = [];
                    this.$emit('createPage', this.name);
                    this.name = '';
                } else {
                    this.error_messages.push('Укажите название страницы.')
                }
            }
        }
    }
</script>

<style scoped>

</style>
