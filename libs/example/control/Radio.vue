<template>
    <div class="radio customcheck">
        <slot name="meta"></slot>
        <label>
            <input type="radio" name="radio" value="1">
            {{ label }}
        </label>
    </div>
</template>

<script>
    export default {
        name: "Radio",
        props: ['label']
    }
</script>
