<template>
    <div>
        <slot name="meta"></slot>
        <v-text-field :label="label" :value="value"></v-text-field>
    </div>
</template>

<script>
    export default {
        name: "TextField",
        props: ['value', 'label']
    }
</script>
