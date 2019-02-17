<template>
	<v-app>
		<NavigationDrawer v-if="is_show_editor"/>
		<v-toolbar app color="primary">
			<span class="logo-text" @click="$router.push({name: 'welcome'})">VUi</span>

			<input v-if="!active_project_id" class="project-name-input" type="text" v-model="project_name" :placeholder="$t('project_name')">
			<span class="project-name" v-else>{{active_project_name}}</span>
			<v-btn fab small @click="createNewProject">
				<v-icon>add</v-icon>
			</v-btn>

			<v-tooltip bottom v-if="is_show_editor">
				<v-btn slot="activator" fab small color="white" :to="{ name: 'editor', params: { id: active_page_id } }">
					<v-icon >developer_board</v-icon>
				</v-btn>
				<span>{{$t('editor')}}</span>
			</v-tooltip>
			<v-tooltip bottom v-if="is_show_editor">
				<v-btn slot="activator" fab small color="white" :to="{ name: 'preview', params: { id: active_page_id } }">
					<v-icon>airplay</v-icon>
				</v-btn>
				<span>{{$t('preview')}}</span>
			</v-tooltip>
			<v-tooltip bottom v-if="is_show_editor">
				<v-btn slot="activator" fab small color="white" @click="is_show_source = true">
					<v-icon>developer_mode</v-icon>
				</v-btn>
				<span>JSON</span>
			</v-tooltip>
			<v-spacer></v-spacer>
			<LocaleMenu/>
		</v-toolbar>
		<v-content>
			<PageNavigator/>
			<v-alert
					:value="server_error"
					dismissible
					type="error"
			>
				{{server_error}}
			</v-alert>
			<ModalShowSource
					:is_open="is_show_source"
					@closeModal="is_show_source = false"/>
			<v-container class="main-content" fluid fill-height>
				<v-layout>
					<router-view></router-view>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>

	import NavigationDrawer from '@/components/NavigationDrawer';
	import PageNavigator from '@/components/PageNavigator';
	import ModalShowSource from '@/components/editor/ModalShowSource';
	import LocaleMenu from '@/components/LocaleMenu';

	import { mapMutations, mapState } from 'vuex';

	export default {
		name: 'App',
		components: {
			NavigationDrawer,
			PageNavigator,
			ModalShowSource,
			LocaleMenu
		},
		computed: {
			...mapState([
				'active_project_id',
				'active_project_name',
				'active_page_id',
				'server_error'
			]),
			is_show_editor() {
				return this.active_page_id && this.active_project_id;
			}
		},
		methods: {
			...mapMutations([
				'setActiveProjectId',
				'createProject',
				'loadProject'
			]),
			createNewProject() {
				this.$socket.emit('createProject', {
					name: this.project_name
				});
			}
		},
		data() {
			return {
				is_show_source: false,
				project_name: ''
			}
		},
		mounted() {
			this.$socket.emit('loadListProject');
		}
	}
</script>

<style lang="less" scoped>
	.project-name {
		width: 300px;

		&-input {
			color: #dcdcdc;
			font-size: 20px;
			border: 0;
			height: 56px;
			width: 400px;
			background: transparent;
			outline: none;
		}
	}

	.project-name-input::placeholder {
		color: #dcdcdc;
	}

	.logo-text {
		font-size: 26px;
		color: white;
		font-weight: bold;
		margin-right: 20px;
		cursor: pointer;
	}
	.editor-id {
		padding: 10px;
		background-color: white;
		box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2);
	}

	.main-content {
		padding: 0;
	}

	.v-toolbar__content {
		.v-btn--active {
			/*background-color: red !important;*/
		}
	}
	.page-add-btn {
		width: 17px;
		height: 17px;
	}
</style>
