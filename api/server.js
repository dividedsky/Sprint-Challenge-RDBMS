const express = require('express');
const projectsRouter = require('../projects/projectsRouter');
const actionsRouter = require('../actions/actionsRouter');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('sanity check. api is running');
});

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

module.exports = server;
