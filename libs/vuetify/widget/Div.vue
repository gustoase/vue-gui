<template>
    <div :class="[classes]">
        <slot name="meta"></slot>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Div",
        props: ['classes']
    }
</script>
