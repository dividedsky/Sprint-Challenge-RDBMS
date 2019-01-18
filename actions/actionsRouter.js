const express = require('express');
const db = require('../config/dbConfig');

const router = express.Router();

router.post('/', (req, res) => {
  const { description, project_id } = req.body;
  if (!description || !project_id) {
    res.status(400).json({ error: 'an action must have a description and a project_id!' });
  } else {
    // check for valid project id
    db('projects').where({ id: project_id })
      .then((id) => {
        if (!id.length) {
          res.status(400).json({ error: 'invalid project id' });
        } else {
          // valid project id
          db('actions').insert(req.body)
            .then((newId) => {
              res.status(200).json(newId);
            })
            .catch((err) => {
              res.status(500).json({ error: `there was an error adding the action: ${err}` });
            });
        }
      });
  }
});

module.exports = router;
