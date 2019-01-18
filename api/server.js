const express = require('express');
const projectsRouter = require('../projects/projectsRouter');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('sanity check. api is running');
});

server.use('/projects', projectsRouter);

module.exports = server;
