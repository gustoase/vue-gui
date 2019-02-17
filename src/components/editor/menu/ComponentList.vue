<template>
	<v-expansion-panel>
		<v-expansion-panel-content
				v-for="(dir, name) in components" :key="genUniqueKey(dir)">
			<div slot="header" class="title">{{$t(getAliasDir(name))}}</div>
			<v-list>
				<draggable
						:list="dir"
						:options="{group:{name:'editor',pull:'clone',put:false}, sort: false}"
						:clone="clone"
				>
					<v-list-tile v-for="item in dir" :key="genUniqueKey(item)">
						<v-list-tile-action>
							<v-icon>open_with</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title v-text="item.component"></v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</draggable>
			</v-list>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>
	import draggable from 'vuedraggable'
	import { mapGetters } from 'vuex';

	export default {
		name: "List",
		components:{
			draggable
		},
		data() {
			return {
				// список доступных компонентов
				components: [],
			}
		},
		methods: {
			clone(element) {
				return JSON.parse(JSON.stringify(element));
			},
			getAliasDir(name) {
				return this.config_alias_dirs[name];
			}
		},
		computed: {
			...mapGetters([
				'components_list',
				'config_alias_dirs'
			])
		},
		watch: {
			components_list(components) {
				this.components = components;
			}
		},
		mounted() {
			this.components = this.components_list;
		}
	}
</script>

<style scoped>

</style>
