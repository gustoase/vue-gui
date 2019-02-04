<template>
    <component :is="component" :data-label="label" :data-i="i" v-bind="params">
        <drop slot="drop"
              class="dropcmp"
              :class="{ over }"
              ref="drop"
              @dragover="handlerDragover"
              @dragleave="handlerDragleave"
              @drop="(data, event) => {handleDrop(data, event, label, i)}"
              @dragstart="handleChildDragstart"
        >
            <Element
                    v-for="(node, k) in nodes"
                    :key="i+'.'+k"
                    :nodes="node.nodes"
                    :label="node.label"
                    :component="node.component"
                    :params="node.params"
                    :i="i+'.'+k"
            >
            </Element>
        </drop>
    </component>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        name: "Element",
        // props: {
        //     label: String,
        //     nodes: Array,
        //     component: Object,
        //     params: {},
        //     i: {
        //         type: String,
        //         default: '.'
        //     }
        // },
        props: ['label', 'nodes', 'component', 'params', 'i'],
        data() {
            return {
                over: false
            }
        },
        computed: {
            // ...mapGetters([
            //     'tree',
            // ]),
        },
        methods: {
            ...mapMutations([
                'addChild'
            ]),
            handleDrop(data, event, label, parent_level) {
                event.stopPropagation();
                console.log(data,event, label, parent_level);
                this.over = false;
                this.addChild({
                    component: {
                        component: data.cmp.component,
                        label: data.cmp.label,
                        // params: {
                        //     'data-ll': 1
                        // },
                        nodes: []
                    },
                    parent_level: parent_level,
                });
            },
            handleChildDragstart(data, event) {

                console.log(this.$refs.drop.clientHeight);
                event.stopPropagation();
            },

            handlerDragover(data, event) {
                this.over = true;

                event.stopPropagation();
            },
            handlerDragleave(data, event) {
                this.over = false;
                event.stopPropagation();
            },
            handlerMouseover(event) {
                this.over = true;
                event.stopPropagation();
            },
            handlerMouseout(event) {
                this.over = false;
                event.stopPropagation();
            }
        }
    }
</script>

<style>
    .dropcmp {
        width: 100%;
        min-height: 50px;
        border: 1px slategray;
    }
    .dropcmp.over {
        border: 1px dotted black;
    }
    .dropcmp .row {
        margin-right: 0 !important;
    }
</style>
