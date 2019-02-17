<template>
    <v-layout row wrap>
        <slot name="meta"></slot>
        <slot></slot>
    </v-layout>
</template>

<script>
    export default {
        name: "Layout"
    }
</script>
