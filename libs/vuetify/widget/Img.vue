<template>
    <div>
        <slot name="meta"></slot>
        <v-img :src="src"></v-img>
    </div>
</template>

<script>
    export default {
        name: "Img",
        props: ['src']
    }
</script>
