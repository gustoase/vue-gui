<template lang="html">
    <component
            :is="getComponent(item)"
            v-bind="{...item.params, ...item.config}"
    >
        <PreviewBlock
                v-if="item.is_nested && item.children"
                v-for="leaf in item.children"
                :key="genUniqueKey(leaf)"
                :item="leaf"
        >
        </PreviewBlock>
    </component>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'PreviewBlock',
        props: ['item'],
        components: {
        },
        methods: {
            getComponent(item) {
                return this.active_lib+'_'+item.component;
            },
        },
        computed: {
            ...mapGetters([
                'active_lib',
            ])
        }
    };
</script>

<style lang="less">
</style>
