<template>
    <v-container>
        <slot name="meta"></slot>
        <slot></slot>
    </v-container>
</template>

<script>
    export default {
        name: "Container"
    }
</script>
