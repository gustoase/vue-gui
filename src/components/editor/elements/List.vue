<template>
	<v-item-group>
		<v-container grid-list-md>
			<v-layout wrap>
				<vddl-draggable
						v-for="item in components"
								:draggable="item"
								:copied="copied"
						:key="item.id"
								effect-allowed="copy">
					<v-flex xs12 md3>
						<v-tooltip top>
							<v-card slot="activator" class="d-flex align-center" height="57" width="57">
								<v-icon>{{item.icon}}</v-icon>
							</v-card>
							<span>label</span>
						</v-tooltip>
					</v-flex>
				</vddl-draggable>
			</v-layout>
		</v-container>
	</v-item-group>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: "List",
		data() {
			return {
				components: [
					{
						id: 91,
						component: 'Fieldset',
						icon: 'add_to_queue',
						params:{},
						children: []
					},
					{
						id: 92,
						component: 'Row',
						icon: 'call_to_action',
						params:{},
						children: []
					},
					{
						id: 93,
						component: 'Col',
						icon: 'featured_play_list',
						params:{},
						children: []
					},
					{
						id: 94,
						component: 'Input',
						icon: 'label',
						params:{},
						children: []
					}
				]
			}
		},
		computed: {
			...mapGetters([
			    'tree',
			]),
		},
		methods: {
			...mapActions([
				'inserItem',
				'delItem'
			]),
			handleMoved(index) {
				this.$store.dispatch('delItem', index);
			},
			handleDrop(draggable) {
				this.$store.dispatch('inserItem', draggable);
			},
			copied(item){
				item.id++;
			},
		},
	}
</script>

<style scoped>

</style>