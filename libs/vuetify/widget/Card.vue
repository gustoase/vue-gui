<template>
    <v-card :width="width">
        <slot name="meta"></slot>
        <slot></slot>
    </v-card>
</template>

<script>
    export default {
        name: "Card",
        props: ['width']
    }
</script>
