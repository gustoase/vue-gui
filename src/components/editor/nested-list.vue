<template lang="html">
    <vddl-draggable
                    :draggable="item"
                    :index="index"
                    :disable-if="disable"
                    :selected="selectedEvent"
                    :wrapper="list"
                    :moved="handleMoved"
                    v-bind:class="{'selected': selectedItem === item}">
        <component :is="components[item.component]" :data-level="parenIndex+'.'+index" v-bind="item.params">
            <vddl-list
                    class="panel__body"
                    slot="drop"
                   :list="item.children"
                   :disable-if="disable"
                   :drop="handleDrop"
                   :external-sources="true">
                <list v-for="(col, number) in item.children"
                      :key="col.id+number+index"
                      :item="col"
                      :list="item.children"
                      :index="number"
                      :paren-index="parenIndex+'.'+index"
                      :selected="selectedEvent"
                      :selected-item="selectedItem"
                      :disable="disable">
                </list>
            </vddl-list>
        </component>
    </vddl-draggable>
</template>

<script>
    import { mapActions, mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'list',
        props: ['item', 'list', 'index', 'selected', 'selectedItem', 'disable', 'parenIndex'],
        data() {
            return {
                dragend: false
            }
        },
        methods: {
            ...mapActions([
                'inserItem',
                'delItem'
            ]),
            selectedEvent(item){
                if (typeof(this.selected) === 'function') {
                    this.selected(item);
                }
            },
            handleMoved({ index }) {
                this.delItem({
                    item_level: this.level,
                    index: index
                });
            },
            handleDrop(draggable) {
               this.inserItem({
                   parent_level: this.level,
                   event: draggable
               });
            },
            dragendHandler(event) {
                this.dragend = true
                // event.stopPropagation();
            },
        },
        computed: {
            ...mapGetters([
                'components'
            ]),
            level() {
                return this.parenIndex+'.'+this.index;
            }
        }
    };
</script>