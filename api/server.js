const express = require('express');
const helmet = require('helmet');

const Shoutouts = require('../data/shoutouts-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', async (req, res) => {
  try {
    const shouts = await Shoutouts.find('shoutouts');
    res.status(200).json({ messageOfTheDay: process.env.MOTD, shouts})
  } catch (error) {
    console.log('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve shouts'})
  }
})

// server.get('/', (req, res) => {
//   Shoutouts.find()
//   .then(shoutouts => {
//     res.status(200).json(shoutouts);
//   })
//   .catch (error => {
//     console.error('\nERROR', error);
//     res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
//   });
// });

server.post('/', (req, res) => {
  // try {
  //   const shout = await Shoutouts.add(req.body);
  //   res.status(201).json(shout)
  // } catch (error) {
  //   console.log('\nERROR', error);
  //   res.status(500).json({error: "Cannot add shoutout"})
  // }
  const newShout = {
    shout: req.body.shout
  }
  Shoutouts.add(newShout)
  .then(shoutout => {
    res.status(201).json(shoutout);
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot add the shoutout' });
  });
});

server.use((error, req, res, next) => {
  console.error(error.message);
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  res.status(error.statusCode).send(error.message);
})

module.exports = server;
