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
  db('projects as p')
    .join('actions as a', 'a.project_id', 'p.id')
    .where({ 'p.id': req.params.id })
    .then((project) => {
      if (!project.length) {
        res.status(400).json({ error: 'invalid project id' });
      } else {
        res.status(200).json(project);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error retrieving the project: ${err}` });
    });
});


module.exports = router;
