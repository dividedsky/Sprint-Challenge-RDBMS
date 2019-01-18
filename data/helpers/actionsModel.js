const db = require('../../config/dbConfig');

module.exports = {
  addAction: action => db('actions').insert(action),
  getActions: () => db('actions'),
  getAction: id => db('actions').where({ id }).first(),
  deleteAction: id => db('actions').where({ id }).del(),
  updateAction: (id, changes) => db('actions').where({ id }).update(changes),

};
