import {
    createProject,
    createPage,
    findPageByIndex,
    findPageById,
    findProject,
    updateTree,
    findProjects,
    loadProjectByPageId
} from '../api/project'

module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('updateTree', function ({project_id, page_index, tree}) {
            updateTree(project_id, page_index, tree, (data) => {
                if (data.status) {
                    socket.emit('updatedTree', data.status);
                } else {
                    socket.emit('serverError', data.error);
                }
            })
        });
        socket.on('createPage', function ({project_id, name, tree}) {
            createPage(project_id, name, tree,(data) => {
                if (data.status) {
                    socket.emit('createPage', data.status);
                } else {
                    socket.emit('serverError', data.error);
                }
            })
        });
        socket.on('createProject', function ({name}) {
            if (!name) return;

            createProject(name, (data) => {
                if (data.status) {
                    socket.emit('createProject', data.project);
                } else {
                    socket.emit('serverError', data.error);
                }
            })
        });
        socket.on('loadTree', function ({project_id, page_index}) {
            findPageByIndex(project_id, page_index, (data) => {
                if (data.status) {
                    socket.emit('loadTree', {
                        project: data.project,
                        page: data.page,
                    });
                } else {
                    socket.emit('serverError', data.error);
                }
            })
        });
        socket.on('loadListProject', function () {
            findProjects((data) => {
                if (data.status) {
                    socket.emit('loadListProject', data.project_list);
                } else {
                    socket.emit('serverError', data.error);
                }
            })
        });
        socket.on('loadProject', function (project_id) {
            findProject(project_id, (data) => {
                if (data.status) {
                    socket.emit('loadProject', data.project);
                } else {
                    socket.emit('serverError', data.error);
                }
            })
        });
        socket.on('loadProjectByPageId', function ({page_id}) {
            loadProjectByPageId(page_id, (data) => {
                if (data.status) {
                    socket.emit('loadProjectByPageId', data.project);
                } else {
                    socket.emit('serverError', data.error);
                }
            })
        });
    });
};
