<template lang="html">
	<v-flex editor rtype md12 fill-height>
		<vddl-list :list="tree"
				   effect-allowed="move"
				   :drop="handleDrop"
				   :external-sources="true">
			<list v-for="(item, index) in tree"
				  :key="item.id+index"
				  :item="item"
				  :list="tree"
				  :index="index"
				  paren-index="0"
				  :selected="handleSelected"
				  :selected-item="selectedItem">
			</list>
		</vddl-list>
	</v-flex>
</template>

<script>
	import list from './editor/nested-list.vue';
	import { mapGetters, mapMutations, mapActions } from 'vuex';
	export default {
		data() {
			return {
				selectedItem: null,
			};
		},
		methods: {
			...mapActions([
				'inserItem',
				'delItem'
			]),
			handleDrop(draggable) {
				this.inserItem({
					parent_level: 0,
					event: draggable
				});
			},
			handleSelected(item) {
				this.selectedItem = item;
			}
		},
		components: {
			list
		},
		computed: {
			...mapGetters([
				'tree',
			])
		},
	};
</script>

<style lang="less">
	.vddl-placeholder {
		width: 100%;
		min-height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #eee;
		padding: 0 15px;
		background: #f5f5f5;
	}
	.new-elements .vddl-dragging-source {
		display: block;
	}
	.selected{
		background: #f9f9f9;
	}
	.selected-item .panel__body {
		line-height: 40px;
	}
	.panel__body {
		border: 1px dotted;
		padding: 5px;
		width: 100%;
		min-height: 40px;
	}

	.main-drop-list {
		width: 100%;
		height: 100%;
	}
</style>