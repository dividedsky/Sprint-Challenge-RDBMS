exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(() => knex('actions').insert([
      { description: 'rowValue1', notes: 'these are some notes. notes notes notes.', project_id: 1 },
      { description: 'rowValue2', notes: 'these are some notes. notes notes notes.', project_id: 1 },
      { description: 'rowValue3', notes: 'these are some notes. notes notes notes.', project_id: 2 },
      { description: 'rowValue4', notes: 'these are some notes. notes notes notes.', project_id: 4 },
      { description: 'rowValue5', notes: 'these are some notes. notes notes notes.', project_id: 3 },
      { description: 'rowValue6', notes: 'these are some notes. notes notes notes.', project_id: 6 },
      { description: 'rowValue7', notes: 'these are some notes. notes notes notes.', project_id: 3 },
    ]));
};
