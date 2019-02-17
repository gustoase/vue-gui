<template>
	<fieldset>
		<slot name="meta"></slot>
		<legend v-if="legend">{{legend}}</legend>
		<slot></slot>
	</fieldset>
</template>

<script>
	export default {
		name: 'Fieldset',
		props: ['legend']
	}
</script>
