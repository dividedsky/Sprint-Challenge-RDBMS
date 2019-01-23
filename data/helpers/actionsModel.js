const db = require('../../config/dbConfig');

module.exports = {
  addAction: action => db('actions').insert(action),
  getActions: () => db('actions'),
  getAction: id => db('actions').where({ id }).first(),
  deleteAction: id => db('actions').where({ id }).del(),
  updateAction: (id, changes) => db('actions').where({ id }).update(changes),
  addProject: project => db('projects').insert(project),
  getProjects: () => db('projects'),
  getProject: id => db('projects').where({ id }).first(),
  getProjectActions: id => db('actions').where({ project_id: id }),

};
