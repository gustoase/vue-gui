const getters = {
    tree: state => {
        console.log('load tree')
        if (state.active_page_index !== null) {
            return state.pages[state.active_page_index].tree;
        }
        return null;
    },
    pages: state => {
        return state.pages;
    },
    components_list: state => {
        if (state.lib_load) {
            return state.libs[state.active_lib].components
        }
        console.log('not found components, not set active lib');
        return [];
    },
    config_component: state => {
        if (state.lib_load) {
            return state.libs[state.active_lib].config
        }
        console.log('not found config, not set active lib');
        return {};
    },
    config_alias_dirs: state => {
        if (state.lib_load) {
            return state.libs[state.active_lib].alias_dirs
        }
        console.log('not found config, not set active lib');
        return {};
    },
    active_lib: state => {
        return state.active_lib;
    }
};

export default getters;
