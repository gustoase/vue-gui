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
					<v-tooltip bottom>
						<v-icon slot="activator">{{tab.icon}}</v-icon>
						<span>{{tab.title}}</span>
					</v-tooltip>
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
			<v-btn
					flat
					href="https://github.com/vuetifyjs/vuetify/releases/latest"
					target="_blank"
			>
				<span class="mr-2">Latest Release</span>
			</v-btn>
		</v-toolbar>
		<v-content>
			<v-container fluid fill-height>
				<v-layout class="main-content">
					<Container/>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import Container from '@/components/Container';
import TabElements from '@/components/editor/elements/List';

export default {
	name:       'App',
	components: {
		Container,
		TabElements
	},
	data() {
		return {
			tabs: [
				{
					title:     'Компоненты',
					icon:      'widgets',
					component: TabElements
				},
				{
					title: 'Страницы',
					icon:  'dvr',
					component: TabElements
				}
			]
		}
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

	.drop {
		flex-basis: 100%;
		-webkit-box-flex: 0;
		-ms-flex-positive: 0;
		flex-grow: 0;
		max-width: 100%;
	}
</style>
