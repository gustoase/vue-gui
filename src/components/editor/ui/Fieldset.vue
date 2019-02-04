<template>
	<fieldset>
		<slot name="drop"></slot>
		<slot></slot>
	</fieldset>
</template>

<script>
	export default {
		name: 'Fieldset'
	}
</script>