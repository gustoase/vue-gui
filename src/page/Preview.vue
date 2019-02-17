<template lang="html">
	<v-flex editor md12 fill-height>
		<PreviewBlock v-for="(item, index) in elements"
			:key="genUniqueKey(item)"
			:item="item"
			:index="index"
			:parent-index="index"
		>
		</PreviewBlock>
		<v-dialog
				v-model="is_load"
				hide-overlay
				persistent
				width="300"
		>
			<v-card color="primary" dark>
				<v-card-text>
					{{ $t('tree_loading') }}
					<v-progress-linear
							indeterminate
							color="white"
							class="mb-0"
					></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-flex>
</template>

<script>
	import PreviewBlock from '@/components/editor/PreviewBlock';
	import { mapGetters, mapMutations, mapState } from 'vuex';

	export default {
		name: 'Preview',
		components: {
			PreviewBlock
		},
		data() {
			return {
				elements: [],
				is_load: true
			};
		},
		methods: {
			...mapMutations([
				'setActivePage',
				'loadComponents'
			]),
			loadEditor() {
				this.loadComponents();
				this.setActivePage(this.$route.params.id);
				if (!this.tree) {
					if (!this.$route.params.id) {
						this.$router.push({name: 'welcome'})
						return;
					} else {
						this.$socket.emit('loadProjectByPageId', {
							page_id: this.$route.params.id
						});
					}
				}

				this.is_load = false;
				this.elements = this.tree;
			}
		},
		computed: {
			...mapGetters([
				'active_lib',
				'tree'
			]),
			...mapState([
				'active_project_id',
				'active_page_index',
				'active_page_id',
			])
		},
		watch: {
			active_page_index() {
				this.$router.push({name: 'preview', params: {id: this.active_page_id}});
				this.elements = this.tree;
				this.is_load = false;
			}
		},
		beforeRouteUpdate (to, from, next) {
			this.setActivePage(to.params.id);
			this.loadEditor();
			next();
		},
		mounted() {
			this.loadEditor();
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
