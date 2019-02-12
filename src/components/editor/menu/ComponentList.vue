<template>
	<v-item-group>
		<v-container grid-list-md>
			<v-layout wrap>
				<v-list>
					<draggable
							:list="components"
							:options="{group:{name:'editor',pull:'clone',put:false}, sort: false}"
							:clone="clone"
					>
						<v-list-tile v-for="item in components" :key="genUniqueKey(item)">
							<v-list-tile-action>
								<v-icon>open_with</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title v-text="item.component"></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</draggable>
				</v-list>
			</v-layout>
		</v-container>
	</v-item-group>
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
				components: []
			}
		},
		methods: {
			clone(element) {
				return JSON.parse(JSON.stringify(element));
			},
		},
		computed: {
			...mapGetters([
				'components_list',
			])
		},
		mounted() {
			this.components = this.components_list;
		}
	}
</script>

<style scoped>

</style>
