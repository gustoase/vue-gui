<template>
    <div class="form-grp">
        <slot name="meta"></slot>
        <label class="label-ctrl-hid">Имя</label>
        <div class="form-field">
            <input class="form-ctrl" type="text" :value="value">
        </div>
        <small class="form-desc">Описание опционально.</small>
    </div>
</template>

<script>
    export default {
        name: "Input",
        props: ['value']
    }
</script>
