<template lang="html">
	<v-flex editor rtype md12 fill-height>
		<Block v-for="(item, index) in elements"
			:key="genUniqueKey(item)"
			:items="item.children"
			:parent-index="index"
			@update="updateStore"
		>
		</Block>
	</v-flex>
</template>

<script>
	import Block from './editor/Block';
	import { mapGetters, mapMutations } from 'vuex';

	import loadComponents from '@/loadComponents';

	export default {
		components: {
			Block
		},
		data() {
			return {
				// дерево конструктора, где все компоненты собрали
				elements: []
			};
		},
		methods: {
			...mapMutations([
				'updateTree',
				'loadTree',
				'setActivePage'
			]),
			updateStore() {
				this.updateTree(this.elements)
			}
		},
		computed: {
			...mapGetters([
				'tree',
				'active_lib',
			])
		},
		beforeRouteUpdate (to, from, next) {
			this.setActivePage(to.params.id);
			this.loadTree();
			loadComponents(this.active_lib);
			this.elements = this.tree;
			next();
		},
		mounted() {
			loadComponents(this.active_lib);
			if (!this.tree) {
				this.setActivePage(this.$route.params.id);
				this.loadTree();
				this.elements = this.tree;
			}
		}
	};
</script>

<style lang="less">

</style>
