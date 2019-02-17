export default {
    socket_loadProject({commit}, data) {
        commit('loadProject', data);
    },
    socket_loadListProject({commit}, data) {
        commit('loadListProject', data)
    },
    socket_createProject({commit}, data) {
       commit('createProject', data);
    },
    socket_loadProjectByPageId({commit}, data) {
       commit('loadProject', data);
    },
    socket_serverError({commit}, data) {
       commit('setServerError', data);
    }
}
