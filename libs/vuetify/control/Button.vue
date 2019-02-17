<template>
    <div>
        <slot name="meta"></slot>
        <v-btn :color="color">{{value}}</v-btn>
    </div>
</template>

<script>
    export default {
        name: "Button",
        props: {
            value: {
                type: String,
                default: 'Button'
            },
            color: {
                type: String,
                default: 'btn-primary'
            }
        }
    }
</script>
