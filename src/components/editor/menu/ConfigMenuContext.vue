<template>
    <v-menu
            v-model="menu_config.is_show"
            :close-on-content-click="false"
            :position-x="menu_config.x"
            :position-y="menu_config.y"
            transition="scale-transition"
            absolute
            offset-y
    >
        <v-card>
            <div class="body-2 pa-1 text-md-center">{{ $t('configuration') }}</div>

            <v-divider></v-divider>

            <v-list>
                <v-list-tile
                    v-for="(conf, name) in config"
                    :key="genUniqueKey(conf)"
                >
                    <v-list-tile-title>{{$t(conf.label)}}</v-list-tile-title>
                    <v-list-tile-action>
                        <component
                                :is="conf.control"
                                v-bind="conf.params"
                                v-model="user_config[name]"
                        ></component>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
    export default {
        name: "ConfigMenuContext",
        props: {
            menu_config: {
                type: Object,
                default() {
                    return {
                        is_show: false,
                        x: 0,
                        y: 0,
                    };
                }
            },
            config: Object,
            item: Object
        },
        data() {
            return {
                user_config: {}
            }
        },
        watch: {
            user_config: {
                handler: function () {
                    // нужна проверка что колбек выполняется в момент открытого окна,
                    // иначе при обновлении дерева вызовется
                    if (this.menu_config.is_show) {
                        this.item.config = this.user_config;
                    }
                },
                deep: true
            },
            'menu_config.is_show': function (is_show) {
                // при закрытии меню, обновняем конфиг дерева
                if (is_show===false) {
                    this.$nextTick(() => {
                        this.$emit('updateConfig', this.user_config);
                    });
                }
            }
        },
        created() {
            // выгружаем конфиг контрола в дефолтный конфиг контрола
            for (let name in this.config) {
                this.$set(this.user_config, name, this.config[name].value)
            }
        }
    }
</script>
