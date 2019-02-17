<template>
    <div>
        <slot name="meta"></slot>
        <v-textarea
                :label="label"
                :value="value"
                :hint="hint"
        ></v-textarea>
    </div>
</template>

<script>
    export default {
        name: "TextArea",
        props: ['value', 'label', 'hint']
    }
</script>
