const express = require('express');
const db = require('../config/dbConfig');

const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'the project must have a name' });
  } else {
    db('projects').insert(req.body)
      .then((id) => {
        res.status(200).json(id);
      })
      .catch((err) => {
        res.status(500).json({ error: `there was an error adding the project: ${err}` });
      });
  }
});

router.get('/:id', (req, res) => {
  /*
   *db('projects as p')
   *  .join('actions as a', 'a.project_id', 'p.id')
   *  .where({ 'p.id': req.params.id })
   *  .then((project) => {
   *    if (!project.length) {
   *      res.status(400).json({ error: 'invalid project id' });
   *    } else {
   *      res.status(200).json(project);
   *    }
   *  })
   *  .catch((err) => {
   *    res.status(500).json({ error: `there was an error retrieving the project: ${err}` });
   *  });
   */
  const project = db('projects')
    .where({ id: req.params.id }).first();

  const actions = db('actions')
    .select('id', 'description', 'notes', 'completed')
    .where({ project_id: req.params.id });

  Promise.all([project, actions])
    .then((output) => {
      let [project, actionsArr] = output;
      console.log(actionsArr);
      actionsArr = actionsArr.map(a => ({
        ...a,
        completed: a.completed !== 0,

      }));
      res.status(200).json({
        id: project.id,
        name: project.name,
        description: project.description,
        completed: project.completed,
        actions: actionsArr,
      });
    });
});


module.exports = router;
