<template>
    <v-card-title>
        <slot name="meta"></slot>
        {{title}}
        <slot></slot>
    </v-card-title>
</template>

<script>
    export default {
        name: "CardTitle",
        props:['title']
    }
</script>
