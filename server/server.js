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
      username: 'client1',
      password: 'password',
      email: 'admin@example.com',
    },
    {
      _id:2,
      username: 'client2',
      password: 'password',
      email:"client2@gmail.com"
    },
    {
      _id:3,
      username: 'test',
      password: 'password',
      email: 'test@example.com',
    }
  ];
    user.forEach(u => {
      if(u.email === req.body.oldEmail) {
        u.email = req.body.newEmail;
        return res.json({
          data: u,
          statusCode: 202
        });
      }
    });
    
  res.json({
    data: {},
    statusCode: 404
  });
});

app.post('/api/clients', (req, res) => {
  const clients = [
    {
      id: 1,
      username: "client1",
    },
    {
      id: 2,
      username: "client2",
    },
    {
      id: 3,
      username: "client3",
    },
    {
      id: 4,
      username: "client4",
    },
    {
      id: 5,
      username: "client5",
    },
    {
      id: 6,
      username: "client6",
    }
  ];
  const data = req.body;
  clients.forEach(value=> {
    if (value.username === data.user) {
      return res.json({status: 200})
    }
  })
  res.json({status: 404});
});

app.get('/api/user/:username', (req, res) => {
  const user = req.params;
  const clients = [
    {
      id: 1,
      username:"client1",
      email:"client1@gmail.com"
    },
    {
      id: 2,
      username:"client2",
      email:"client2@gmail.com"
    },
    {
      id: 3,
      username:"client3",
      email:"client3@gmail.com"
    },
    {
      id: 4,
      username:"client4",
      email:"client4@gmail.com"
    }
  ];
  clients.forEach( client=> {
    if(client.username === user.username) {
      return res.json({
        email: client.email,
        status: 200
      });
    }
  });
  res.json({
    email: '',
    status: 404
  })
});

app.post('api/user/update', (req, res)=>{
  console.log("=====req==", req);
  const data = req.body;
  console.log("===data==", data);
  res.json({
    message: "Update user's email succeed"
  }).sendStatus(400);
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
