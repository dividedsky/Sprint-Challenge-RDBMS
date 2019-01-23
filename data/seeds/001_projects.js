exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(() => knex('projects').insert([
      { name: 'some test project6', description: 'this is just a test project la la la ' },
      { name: 'some test project 7', description: 'lorem ipsum what have you' },
      { name: 'some test project 4', description: 'lormium what have you' },
      { name: 'some test project 5', description: 'lorem s what have you' },
      { name: 'some test project 42', description: 'there must be some way to automate this?' },
    ]));
};
