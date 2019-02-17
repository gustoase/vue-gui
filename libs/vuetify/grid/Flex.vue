<template>
    <v-flex :class="flex_size">
        <slot name="meta"></slot>
        <slot></slot>
    </v-flex>
</template>

<script>
    export default {
        name: "Flex",
        props: {
            size: {
                type: Number,
                default: 6
            }
        },
        computed: {
            flex_size() {
                return `md${this.size}`;
            }
        }
    }
</script>
