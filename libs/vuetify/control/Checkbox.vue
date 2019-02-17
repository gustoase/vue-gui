<template>
    <div>
        <slot name="meta"></slot>
        <v-checkbox :value="value" :label="label"></v-checkbox>
    </div>
</template>

<script>
    export default {
        name: "Checkbox",
        props: ['value', 'label']
    }
</script>
