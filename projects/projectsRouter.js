const express = require('express');
const db = require('../config/dbConfig');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, description, completed } = req.body;
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


module.exports = router;
