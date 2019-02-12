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
            :move="onMove"
    >
        <component
                :is="getComponent(item)"
                v-bind="{...item.params, ...item.config}"
                v-for="(item, i) in items"
                :key="parentIndex+'.'+i"
                :data-level="parentIndex+'.'+i"
                class="drag-component"
        >
            <div slot="meta" class="drag-component-name" @click="menu($event, item)">
                <v-icon v-if="isSettings(item.component)" small>settings</v-icon>
                {{item.component}}
                <ConfigMenuContext
                        v-if="isSettings(item.component)"
                        :menu_config="item.meta.menu"
                        :config="getConfigComponent(item.component)"
                        :item="item"
                        @updateConfig="updateConfig"
                />
            </div>
            <Block
                    v-if="item.is_nested && item.children"
                    :items="item.children"
                    :parent-index="parentIndex+'.'+i"
                    @update="onChildUpdate"
            >
            </Block>
        </component>
    </Draggable>
</template>

<script>
    import Draggable from 'vuedraggable'
    import ConfigMenuContext from './menu/ConfigMenuContext';

    import config from '@/components/libs/b2b/config';

    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'Block',
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
            onMove({draggedContext, relatedContext}) {
                return;
                let parent = relatedContext.element || relatedContext.component.item;
                let item = draggedContext.element;
                if (
                    parent.hasOwnProperty('allowed_child')
                    && parent.allowed_child > 0
                    && parent.allowed_child.indexOf(item.component) === -1
                ) {
                    return false;
                }
            },
            getConfigComponent(component_name) {
                return config[component_name] || {}
            },
            isSettings(component_name) {
                return Boolean(config[component_name]);
            },
            updateConfig() {
                this.$emit('update');
            },
            getComponent(item) {
                return this.active_lib+'_'+item.component;
            }
        },
        computed: {
            ...mapGetters([
                'components_instances',
                'active_lib'
            ])
        }
    };
</script>

<style lang="less">
    .main-component {
        width: 100%;
        min-height: 100%;
    }

    .drag-component{
        border: 1px solid #DDDDDD;
        border-radius: 2px;
        padding: 30px 14px 0;
        background-color: #FFF;
        box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.1);

        &-name {
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
