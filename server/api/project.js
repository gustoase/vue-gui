import Project from '../models/project'
const ObjectId = require('mongoose').Types.ObjectId;

function createProject( name, callback) {
    const project = new Project({ name });
    project.save(err => {
        if (err) {
            callback({
                status: false,
                error: err
            });
        } else {
            callback ({
                status: true,
                project: project
            });
        }
    })
}

function findProject(_id,  callback) {
    Project.findOne({_id: new ObjectId(_id)}, (err, project) => {
        if (err) {
            callback({
                status: false,
                error: err
            });
        } else {
            callback({
                status: true,
                found: 1,
                project: project
            });
        }
    })
}

function findProjects(callback) {
    Project.find({}, (err, project_list) => {
        if (err) {
            callback({
                status: false,
                error: err
            });
        } else {
            console.log(project_list);
            callback({
                status: true,
                found: project_list.length,
                project_list: project_list
            });
        }
    })
}

function findPageById(project_id,  page_id, callback) {
    findProject(project_id,(data) => {
        if (data.status === true && data.found > 0) {
            for (let i=0; i < data.pages.length; i++) {
                if (data.pages[i].id === id) {
                    callback({
                        status: true,
                        found: 1,
                        page: data.pages[i]
                    })
                }
            }
        } else {
            callback({
                status: data.status,
                found: 0,
            });
        }
    })
}

function findPageByIndex(project_id,  index, callback) {
    findProject(project_id,  (data) => {
        if (data.status === true && data.project.pages && data.found > 0) {
            if (data.project.pages[index]) {
                callback({
                    status: true,
                    found: 1,
                    page: data.project.pages[index],
                    project: data.project
                })
            } else {
                callback({
                    status: true,
                    found: 0,
                });
            }
        } else {
            callback({
                status: data.status,
                found: 0,
            });
        }
    })
}

function createPage(project_id,  name, tree, callback) {
    findProject(project_id, (data) => {
        if (data.status === true && data.found > 0) {
            data.project.pages.push({
                name: name,
                _id: new ObjectId(),
                tree: tree
            });
            data.project.save((err, res) => {
                if (err) {
                    callback({
                        status: false,
                        error: err
                    });
                } else {
                    console.log('create page', res, callback)
                    callback ({
                        status: true
                    });
                }
            })
        } else {
            callback({
                status: true,
                found: 0,
            });
        }
    })
}

function updateTree(project_id, page_index, tree, callback) {
    findPageByIndex(project_id, page_index,(data) => {
        if (data.status === true && data.found > 0) {
            data.page.tree = tree;
            data.project.save((err, res) => {
                if (err) {
                    callback({
                        status: false,
                        error: err
                    });
                } else {
                    console.log('update tree', res);
                    callback ({
                        status: true
                    });
                }
            })
        } else {
            callback({
                status: true,
                found: 0,
            });
        }
    })
}

function loadProjectByPageId(page_id, callback) {
    Project.findOne({"pages":{"$elemMatch":{ _id: ObjectId(page_id)} }}, (err, project) => {
        if (err) {
            callback({
                status: false,
                error: err
            });
        } else {
            callback({
                status: true,
                found: 1,
                project: project
            });
        }
    })
}

module.exports.createProject = createProject;
module.exports.createPage = createPage;
module.exports.findPageByIndex = findPageByIndex;
module.exports.findPageById = findPageById;
module.exports.findProject = findProject;
module.exports.updateTree = updateTree;
module.exports.findProjects = findProjects;
module.exports.loadProjectByPageId = loadProjectByPageId;

