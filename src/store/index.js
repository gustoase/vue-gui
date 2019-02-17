import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        active_project_id: null,
        active_project_name: null,
        project_list: [],
        active_lib: 'vuetify',
        active_page_id: null,
        active_page_index: null,
        lib_load: false, // загружена ли внешняя библиотека для работы в редакторе
        libs: {}, // любая директория из /libs
        pages: [],
        server_error: '',
        current_locale: 'ru',
        locales: ['ru', 'en']
    },
    mutations,
    getters,
    actions
});

export default store
