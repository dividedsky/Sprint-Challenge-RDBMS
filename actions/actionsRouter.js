const express = require('express');
const db = require('../config/dbConfig');
const helpers = require('../data/helpers/actionsModel');

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
          helpers.addAction(req.body)
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

router.get('/', (req, res) => {
  helpers.getActions()
    .then((list) => {
      res.status(200).json(list);
    })
    .catch(err => res.status(500).json({ error: `there was an error retrieving the actions: ${err}` }));
});

router.get('/:id', (req, res) => {
  helpers.getAction(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(400).json({ error: 'invalid action id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error retrieving the action: ${err}` });
    });
});

router.delete('/:id', (req, res) => {
  helpers.deleteAction(req.params.id)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: 'the action was deleted' });
      } else {
        res.status(400).json({ error: 'invalid action id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: `there was an error deleting the action: ${err}` });
    });
});

router.put('/:id', (req, res) => {
  // ensure valid id
  helpers.getAction(req.params.id)
    .then((action) => {
      if (action) {
        const changes = req.body;
        helpers.updateAction(req.params.id, changes)
          .then((count) => {
            if (count) {
              res.status(200).json({ message: 'the action has been updated' });
            } else {
              res.status(500).json({ message: 'there was an error updating the action' });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: `there was an error updating the action: ${err}` });
          });
      } else {
        res.status(400).json({ error: 'invalid action id' });
      }
    });
});
module.exports = router;
