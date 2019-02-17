<template>
    <div>
        <slot name="meta"></slot>
        <input class="btn" :class="[color]" type="button" :value="value">
    </div>
</template>

<script>
    export default {
        name: "Button",
        props: {
            value: {
                type: String,
                default: 'Текст'
            },
            color: {
                type: String,
                default: 'btn-primary'
            }
        }
    }
</script>
