import loadComponents from '@/loadComponents';

/**
 * Поиск страницы и ее данных по id
 * @param pages
 * @param id
 * @returns {*}
 */
function findPageById(pages, id) {
    for (let i=0; i < pages.length; i++) {
        if (pages[i]._id === id) {
            return {
                index: i,
                page: pages[i]
            };
        }
    }
    return null;
}

/**
 * Подготовить структуру компонента для редактора
 * @param list_components
 * @param config_components
 */
function buildComponentForEditor(list_components, config_components) {
    let result = {};
    for (let dir in list_components) {
        if (!list_components.hasOwnProperty(dir)) continue;
        result[dir] = [];
        for (let component_name in list_components[dir]) {
            if (!list_components[dir].hasOwnProperty(component_name)) continue;

            // предзагружаем дефолтые конфиги для компонента
            let default_config = {};
            if (config_components[component_name]['default_config']) {
                default_config = config_components[component_name].default_config;
                delete config_components[component_name].default_config
            }

            result[dir].push({
                lib_component: list_components[dir][component_name],
                component: component_name,
                meta: {
                    menu: {
                        is_show: false,
                        x: 0,
                        y: 0,
                    }
                },
                config: {
                    ...default_config
                },
                children: [],
                ...config_components[component_name]
            });
        }
    }
    return result;
}

const mutations = {
    updateTree(state, new_tree) {
        if (state.active_page_id && state.active_project_id) {
            new_tree = JSON.parse(JSON.stringify(new_tree));
            state.pages[state.active_page_index].tree = new_tree;
            console.log('store updated for page id:', state.active_page_id);
        } else {
            console.warn('store not updated, empty active_page_id or active_project_id');
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
    loadComponents(state) {
        if (state.active_lib) {
            if (state.lib_load) {
                console.log('loadComponents is cached');
                return;
            }
            console.log('loadComponents in state');
            const info = loadComponents(state.active_lib);
            if (!state.libs[state.active_lib]) {
                state.libs[state.active_lib] = {
                    config: {},
                    components: {},
                    alias_dirs: {},
                };
            }
            state.libs[state.active_lib].config = info.config.configurator;
            state.libs[state.active_lib].alias_dirs = info.config.alias_dirs;
            state.libs[state.active_lib].components = buildComponentForEditor(info.component_names, info.config.info);
            state.lib_load = true;
        } else {
            console.warn('loadTree fail, empty active_page_id');
        }
    },
    createNewPage(state, name) {
        if (!state.active_project_id) {
            alert('error create page, not found project');
            return;
        }
        state.pages.push({
            id: state.pages.length+1,
            name: name,
            tree: [{
                component: 'Div',
                is_nested: true,
                params: {},
                children: []
            }]
        });
    },
    setActiveProjectId(state, project_id) {
        state.active_project_id = project_id;
    },

    ////////////////////////////// socket mutations //////////////////////////
    loadProject(state, project) {
        state.active_project_id = project._id;
        state.active_project_name = project.name;
        state.pages = project.pages;
        if (project.pages.length > 0) {
            state.active_page_index = 0;
            state.active_page_id = project.pages[0]._id;
        }
    },
    loadListProject(state, project_list) {
        state.project_list = project_list;
    },
    createProject(state, project) {
        state.active_project_id = project._id;
        state.active_project_name = project.name;
        state.project_list.push(project)
    },
    setServerError(state, error) {
        state.server_error = error;
    }
};


export default mutations
