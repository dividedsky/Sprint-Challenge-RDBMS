const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).send('sanity check. api is running');
});

module.exports = server;
