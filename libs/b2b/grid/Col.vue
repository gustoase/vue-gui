<template>
	<div :class="col_size">
		<slot name="meta"></slot>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Col',
		props: {
			size: {
				type: Number,
				default: 6,
				validator: function (value) {
					return value <= 12
				}
			}
		},

		computed: {
			col_size() {
				return `col${this.size}`;
			}
		}
	}
</script>
