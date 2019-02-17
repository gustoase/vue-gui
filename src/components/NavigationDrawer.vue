<template>
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
                {{$t(tab.title)}}
            </v-tab>
            <v-tab-item v-for="tab in tabs" :key="tab.icon">
                <component v-bind:is="tab.component"></component>
            </v-tab-item>
        </v-tabs>
    </v-navigation-drawer>
</template>

<script>
    import ComponentList from '@/components/editor/menu/ComponentList';

    export default {
        name: "NavigationDrawer",
        data() {
            return {
                tabs: [
                    {
                        title:     'components',
                        icon:      'widgets',
                        component: ComponentList
                    },
                    // {
                    //     title: 'Проекты',
                    //     icon:  'dvr',
                    //     component: ComponentList
                    // }
                ],
            }
        },
    }
</script>

<style scoped>

</style>
