<template>
    <div class="form-grp">
        <slot name="meta"></slot>
        <label class="label-ctrl" v-if="label">{{label}}</label>
        <label class="label-ctrl-hid" v-else>hidden label</label>
        <div class="form-field">
            <input class="form-ctrl" type="text" :value="value">
        </div>
        <small class="form-desc" v-if="description">{{description}}</small>
    </div>
</template>

<script>
    export default {
        name: "Input",
        props: ['value', 'label', 'description']
    }
</script>
