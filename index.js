const server = require('./api/server.js');
require('dotenv').config()

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

// heroku looks for node [file name] on a start: scripts
// testing
// the reason messageOfTheDay is not displaying is 
// the .env file is ignored on gitHub.
