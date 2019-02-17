<template>
    <v-card-actions>
        <slot name="meta"></slot>
        <slot></slot>
    </v-card-actions>
</template>

<script>
    export default {
        name: "CardActions"
    }
</script>
