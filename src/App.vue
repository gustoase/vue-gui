<template>
	<v-app>
		<v-navigation-drawer app right permanent>
			<v-tabs
					color="primary"
					dark
					grow
					height="64px"
					slider-color="yellow"
					class="top-taps"
			>
				<v-tab v-for="tab in tabs" :key="tab.icon" ripple>
					{{tab.title}}
				</v-tab>
				<v-tab-item v-for="tab in tabs" :key="tab.icon">
					<v-expansion-panel expand>
						<v-expansion-panel-content >
							<div slot="header">{{tab.title}}</div>
							<component v-bind:is="tab.component"></component>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-tab-item>
			</v-tabs>
		</v-navigation-drawer>
		<v-toolbar app color="primary">
			<span class="logo-text">VUi</span>
			<input class="project-name-input" type="text" placeholder="Название проекта">
			<v-spacer></v-spacer>
			<v-tooltip bottom v-if="active_page_id">
				<v-btn slot="activator" fab small color="white" :to="{ name: 'editor', params: { id: active_page_id } }">
					<v-icon >developer_board</v-icon>
				</v-btn>
				<span>Редактор</span>
			</v-tooltip>
			<v-tooltip bottom v-if="active_page_id">
				<v-btn slot="activator" fab small color="white" :to="{ name: 'preview', params: { id: active_page_id } }">
					<v-icon>airplay</v-icon>
				</v-btn>
				<span>Превью</span>
			</v-tooltip>
			<v-tooltip bottom v-if="active_page_id">
				<v-btn slot="activator" fab small color="white" :to="{ name: 'preview', params: { id: active_page_id } }">
					<v-icon>developer_mode</v-icon>
				</v-btn>
				<span>JSON</span>
			</v-tooltip>
		</v-toolbar>
		<v-content>
			<v-tabs
					dark
					color="cyan"
					show-arrows
					height="30px"
			>
				<v-tabs-slider color="yellow"></v-tabs-slider>

				<v-tab :to="{ name: 'editor', params: { id: 1 }}">
					Page1
				</v-tab>
				<v-tab :to="{ name: 'editor', params: { id: 2 }}">
					Page2
				</v-tab>
			</v-tabs>
			<v-container class="main-content" fluid fill-height>
				<v-layout>
					<router-view></router-view>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import ComponentList from '@/components/editor/menu/ComponentList';

import { mapMutations, mapGetters } from 'vuex';

export default {
	name: 'App',
	components: {
		ComponentList
	},
	data() {
		return {
			tabs: [
				{
					title:     'Компоненты',
					icon:      'widgets',
					component: ComponentList
				},
				{
					title: 'Страницы',
					icon:  'dvr',
					component: ComponentList
				}
			]
		}
	},
	computed: {
		...mapGetters([
			'active_page_id'
		])
	},
	methods: {
		...mapMutations([
			'setActivePage'
		]),
	}
}
</script>

<style lang="less" scoped>
	.project-name-input {
		color: #dcdcdc;
		font-size: 20px;
		border: 0;
		height: 56px;
		width: 400px;
		background: transparent;
		outline: none;
	}
	.project-name-input::placeholder {
		color: #dcdcdc;
	}

	.logo-text {
		font-size: 26px;
		color: white;
		font-weight: bold;
		margin-right: 20px;
	}
	.editor {
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
</style>
