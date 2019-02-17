<template lang="html">
	<v-flex editor rtype md12 fill-height>
		<PreviewBlock v-for="(item, index) in elements"
			:key="genUniqueKey(item)"
			:item="item"
			:index="index"
			:parent-index="index"
		>
		</PreviewBlock>
	</v-flex>
</template>

<script>
	import PreviewBlock from '@/components/editor/PreviewBlock';
	import { mapGetters, mapMutations } from 'vuex';

	export default {
		name: 'Preview',
		components: {
			PreviewBlock
		},
		data() {
			return {
				// дерево конструктора, где все компоненты собрали
				elements: []
			};
		},
		methods: {
			...mapMutations([
				'setActivePage',
				'loadComponents'
			]),
		},
		computed: {
			...mapGetters([
				'tree',
				'active_lib',
			])
		},
		beforeRouteUpdate (to, from, next) {
			this.setActivePage(to.params.id);
			if (!this.tree) {
				this.$router.push({name: 'index'})
			}
			this.elements = this.tree;
			next();
		},
		mounted() {
			console.log('container preview editor mounted');
			this.loadComponents();
			this.setActivePage(this.$route.params.id);
			if (!this.tree) {
				this.$router.push({name: 'index'})
			}
			this.elements = this.tree;
		}
	};
</script>

<style lang="less">
	.layout {
		background-color: white;

		.editor {
			padding: 10px;
		}
	}
</style>
