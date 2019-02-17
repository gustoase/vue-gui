<template lang="html">
    <Draggable
            :list="items"
            class="drag-area"
            :options="{
                group:'editor',
                animation: 150,
                scroll: true,
                bubbleScroll: true,
                dragoverBubble: false
              }"
            @add="onUpdate"
    >
        <component
                :is="getComponent(item)"
                v-bind="{...item.params, ...item.config}"
                v-for="(item, i) in items"
                :key="parentIndex+'.'+i"
                :data-level="parentIndex+'.'+i"
                class="drag-component"
        >
            <div slot="meta">
                <div class="drag-component-name" @click="menu($event, item)">
                    <v-icon v-if="isSettings(item.component)" small>settings</v-icon>
                    {{item.component}}
                    <ConfigMenuContext
                            v-if="isSettings(item.component)"
                            :menu_config="item.meta.menu"
                            :config="getConfigComponent(item)"
                            :item="item"
                            @updateConfig="updateConfig"
                    />
                </div>
                <div class="drag-component-remove" @click="remove($event, i)">
                    <v-icon small>clear</v-icon>
                </div>
            </div>

            <DraggableBlock
                    v-if="item.is_nested && item.children"
                    :items="item.children"
                    :parent-index="parentIndex+'.'+i"
                    @update="onChildUpdate"
            >
            </DraggableBlock>
        </component>
    </Draggable>
</template>

<script>
    import Draggable from 'vuedraggable'
    import ConfigMenuContext from './menu/ConfigMenuContext';

    import { mapGetters } from 'vuex';
    export default {
        name: 'DraggableBlock',
        props: ['items', 'parentIndex'],
        components: {
            Draggable,
            ConfigMenuContext
        },
        data() {
            return {
                menu_config: {
                    show_menu: false
                }
            }
        },
        methods: {
            onUpdate(){
               this.$emit('update');
            },
            onChildUpdate(){
                this.$emit('update');
            },
            menu(e, item) {
                e.preventDefault();
                item.meta.menu.is_show = false;
                item.meta.menu.x = e.clientX;
                item.meta.menu.y = e.clientY;
                this.$nextTick(() => {
                    item.meta.menu.is_show = true;
                });
            },
            getConfigComponent(item) {
                console.log('getConfigComponent', this.config_component[item.component], item.config);
                if (!item.config) {
                    item.config = {};
                }
                if (!this.config_component[item.component]) {
                    return {};
                }

                for (let cfg_name in this.config_component[item.component]) {
                    if (!this.config_component[item.component].hasOwnProperty(cfg_name)) continue;
                    let default_value = this.config_component[item.component][cfg_name].value;

                    this.config_component[item.component][cfg_name].value =
                        typeof item.config[cfg_name] !== "undefined"
                            ? item.config[cfg_name]
                            : default_value;
                }

                return this.config_component[item.component];
            },
            isSettings(component_name) {
                return Boolean(this.config_component[component_name]);
            },
            updateConfig() {
                this.$emit('update');
            },
            getComponent(item) {
                return this.active_lib+'_'+item.component;
            },
            remove(e, index) {
                this.items.splice(index, 1);
                this.$emit('update');
            }
        },
        computed: {
            ...mapGetters([
                'active_lib',
                'config_component'
            ])
        }
    };
</script>

<style lang="less">
    .main-component {
        width: 100%;
        min-height: 100%;
    }

    .drag-component:hover div.drag-component-name {
        display: block;
    }
    .drag-component:hover .drag-component-remove {
        display: block;
    }

    .drag-component{
        position: relative;
        border: 1px dotted #DDDDDD;
        border-radius: 2px;
        padding: 30px 14px 2px;
        background-color: #FFF;
        /*box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.1);*/

        &-name {
            display: none;
            background-color: #F5F5F5;
            border: 1px solid #DDDDDD;
            border-radius: 4px 0 4px 0;
            color: #9DA0A4;
            content: "Column";
            font-size: 12px;
            font-weight: bold;
            left: -1px;
            padding: 3px;
            position: absolute;
            top: -1px;
            -moz-user-select: none;
            -khtml-user-select: none;
            user-select: none;
        }
        &-remove {
            display: none;
            cursor: pointer;
            background-color: #e6e6e6;
            border: 1px solid #DDDDDD;
            border-radius: 4px 0 4px 0;
            color: #9DA0A4;
            content: "Column";
            font-size: 12px;
            font-weight: bold;
            right: -1px;
            padding: 3px;
            position: absolute;
            top: -1px;
            -moz-user-select: none;
            -khtml-user-select: none;
            user-select: none;
        }
    }

    .drag-area {
        min-height: 60px;

        .row {
            margin-right: 0;
        }
    }

    .sortable-ghost {
        border: 1px dotted black;
    }

    .sortable-chosen {
        background-color: gray;
    }

    .sortable-drag {
        background-color: gray;
        opacity: 0.5%;
    }
</style>
