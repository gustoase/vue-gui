import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import Fieldset from '@/components/libs/b2b/grid/Fieldset';
// import Row from '@/components/libs/b2b/grid/Row';
// import Col from '@/components/libs/b2b/grid/Col';
// import Div from '@/components/libs/b2b/grid/Div';
// import Input from '@/components/libs/b2b/control/Input';

function findPageById(pages, id) {
    id = Number(id);
    for (let i=0; i < pages.length; i++) {
        if (pages[i].id === id) {
            return {
                index: i,
                page: pages[i]
            };
        }
    }
    return null;
}

export default new Vuex.Store({
    state: {
        active_lib: 'b2b',
        active_page_id: null,
        active_page_index: null,
        pages: [
            {
                id: 1,
                title: '',
                tree: [
                    {
                        component: 'Div',
                        is_nested: true,
                        params: {
                            class: "main-component",
                        },
                        children: [
                            {
                                component: 'Fieldset',
                                is_nested: true,
                                meta: {
                                    menu: {
                                        is_show: false,
                                        x: 0,
                                        y: 0,
                                    }
                                },
                                params: {},
                                config: {},
                                allowed_child: [
                                    'Row'
                                ],
                                children: [
                                    {
                                        component: 'Row',
                                        is_nested: true,
                                        meta: {
                                            menu: {
                                                is_show: false,
                                                x: 0,
                                                y: 0,
                                            }
                                        },
                                        params: {},
                                        config: {},
                                        children: [
                                            {
                                                component: 'Col',
                                                is_nested: true,
                                                meta: {
                                                    menu: {
                                                        is_show: false,
                                                        x: 0,
                                                        y: 0,
                                                    }
                                                },
                                                params: {},
                                                config: {},
                                                children: []
                                            },
                                            {
                                                component: 'Col',
                                                is_nested: true,
                                                meta: {
                                                    menu: {
                                                        is_show: false,
                                                        x: 0,
                                                        y: 0,
                                                    }
                                                },
                                                params: {},
                                                config: {},
                                                children: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: '',
                tree: [
                    {
                        component: 'Div',
                        is_nested: true,
                        params: {
                            class: "main-component",
                        },
                        children: [
                            {
                                component: 'Fieldset',
                                is_nested: true,
                                meta: {
                                    menu: {
                                        is_show: false,
                                        x: 0,
                                        y: 0,
                                    }
                                },
                                params: {},
                                config: {},
                                allowed_child: [
                                    'Row'
                                ],
                                children: [
                                    {
                                        component: 'Row',
                                        is_nested: true,
                                        meta: {
                                            menu: {
                                                is_show: false,
                                                x: 0,
                                                y: 0,
                                            }
                                        },
                                        params: {},
                                        config: {},
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        components_instances: {},
        components: [
            {
                component: 'Fieldset',
                is_nested: true,
                meta: {
                    menu: {
                        is_show: false,
                        x: 0,
                        y: 0,
                    }
                },
                params: {},
                config: {},
                allowed_child: [
                    'Row'
                ],
                children: []
            },
            {
                component: 'Row',
                is_nested: true,
                meta: {
                    menu: {
                        is_show: false,
                        x: 0,
                        y: 0,
                    }
                },
                params: {},
                config: {},
                children: []
            },
            {
                component: 'Col',
                is_nested: true,
                meta: {
                    menu: {
                        is_show: false,
                        x: 0,
                        y: 0,
                    }
                },
                params: {},
                config: {},
                children: []
            },
            {
                component: 'Input',
                is_nested: false,
                meta: {
                    menu: {
                        is_show: false,
                        x: 0,
                        y: 0,
                    }
                },
                params: {},
                config: {},
            }
        ]
    },
    mutations: {
        updateTree(state, new_tree) {
            if (state.active_page_id) {
                state.pages[state.active_page_index].tree = JSON.parse(JSON.stringify(new_tree));
                console.log('store updated for page id:', state.active_page_id);
            } else {
                console.warn('store not updated, empty active_page_id');
            }
        },
        setActivePage(state, id) {
           state.active_page_id = id;
           const page = findPageById(state.pages, id);
           if (!page) {
               console.log('not found page', id);
               return;
           }
           state.active_page_index = page.index;
           console.log('setActivePage:', id)
        },
        loadTree(state) {
            if (state.active_page_id) {
                return state.pages[state.active_page_index].tree;
            } else {
                console.warn('loadTree fail, empty active_page_id');
            }
        }
    },
    actions: {
        delItem({commit}, data) {
            commit('updateList', data);
        }
    },
    getters: {
        tree: state => {
            if (state.active_page_index !== null) {
                return state.pages[state.active_page_index].tree;
            }
            return null;
        },
        components_instances: state => {
            return state.components_instances;
        },
        components_list: state => {
            return state.components;
        },
        active_page_id: state => {
            return state.active_page_id;
        },
        active_lib: state => {
            return state.active_lib;
        }
    }
})
