<template>
	<fieldset>
		<slot name="meta"></slot>
		<slot></slot>
	</fieldset>
</template>

<script>
	export default {
		name: 'Fieldset'
	}
</script>
