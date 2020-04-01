'use strict';

const Promise = require('bluebird');
// custom logger
const log = require('./logger.js');
const express = require('express');

const app = express();

app.use(require('helmet')()); // use helmet
app.use(require('cors')()); // enable CORS
// serves all static files in /public
app.use(express.static(`${__dirname}/../public`));
const port = process.env.PORT || 8000;
const server = require('http').Server(app);

// boilerplate version
const version = `Express-Boilerplate v${require('../package.json').version}`;

// start server
server.listen(port, () => {
  log.info(version);
  log.info(`Listening on port ${port}`);
});

// 'body-parser' middleware for POST
const bodyParser = require('body-parser');
// create application/json parser
// const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({
//   extended: false,
// });

// parse various different custom JSON types as JSON

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST /login gets urlencoded bodies
app.post('/login', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  res.send(`welcome, ${req.body.username}`);
});

// POST /api/users gets JSON bodies
app.post('/api/users', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  // create user in req.body
});

// POST /api/deposit returns response
app.post('/api/deposit', (req, res) => {
  return res.json({responseStatus: 200})
});

app.get('/api/deposit', (req, res) => {
  return res.json({responseStatus: 200})
});

// POST /api/change-email
app.post('/api/change-email', (req, res) => {
  const user = [
    {
      _id:1,
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    },
    {
      _id:2,
      username: 'cs1',
      password: 'password',
      email: 'cs1@example.com',
    },
    {
      _id:3,
      username: 'test',
      password: 'password',
      email: 'test@example.com',
    }
  ];
  if (req.body.confirmEmail === req.body.newEmail) {
    user.map(v => {
      if(v.oldEmail === req.body.oldEmail) {
        v.email = req.data.email;
      }
      return v;
    });
    return res.json({
      status: 200,
      data: user,
    });
  }
  return res.json({
    status: 400,
    data: user,
  });
})

// ex. using 'node-fetch' to call JSON REST API
/*
const fetch = require('node-fetch');
// for all options see https://github.com/bitinn/node-fetch#options
const url = 'https://api.github.com/users/cktang88/repos';
const options = {
  method: 'GET',
  headers: {
    // spoof user-agent
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
  }
};

fetch(url, options)
  .then(res => {
    // meta
    console.log(res.ok);
    console.log(res.status);
    console.log(res.statusText);
    console.log(res.headers.raw());
    console.log(res.headers.get('content-type'));
    return res.json();
  })
  .then(json => {
    console.log(`User has ${json.length} repos`);
  })
  .catch(err => {
    // API call failed...
    log.error(err);
  });
*/
