const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser')
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const SALT_ROUNDS = 10;
const OK = 'OK';

const app = express();

passport.use(new LocalStrategy( (username, password, done) => {

  const user = client.query('SELECT * FROM users where username = $1', [username], (err, results) => {

    if (results.rows.length !== 1) {
      done(null, false);
      return;
    }

    const user = results.rows[0];

    const valid = bcrypt.compareSync(password, results.rows[0].password);

    if (valid === true) {
      done(null, user);
      return;
    }

    done(null, false);
  });
}));

app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, resp, next) => {
  console.log(req.path);
  if (!req.path.startsWith('/api')) {
    next();
    return;
  }

  if (req.session.user === undefined) {
    resp.status(401).send('Unauthorized');
    return;
  }

  next();
});

const port = process.env.PORT || 3000;

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.use(express.static(path.resolve(__dirname, 'web', 'dist')));

/** list out users **/
app.get('/api/getUsers', async (req, res) => {

  const results = await client.query('SELECT * FROM users');

  const obj = {rows: results.rows.length};
  res.send(obj);
});

/** handle login **/
app.post('/open/login', (req, res, next) => {
  
  passport.authenticate('local', {session: true}, (err, user, info) => {
    
    if (err) { 
      return next(err); 
    }
    
    if (!user) { 
      return res.status(401).send('Authentication Error');
    }
    
    req.session.user = user;
    return res.send(user);

  })(req, res, next);
});

app.get('/api/findUsers/:searchTerm', async (req, resp) => {
  
  const searchTerm = req.params.searchTerm;

  const results = await client.query('SELECT * FROM users WHERE username LIKE $1 OR email LIKE $1', [searchTerm]);
  resp.send(results);
});

/** create a new account **/
app.post('/open/createAccount', async (req, resp) => {

  const {username, password, email} = req.body;
  const bPassword = bcrypt.hashSync(password, SALT_ROUNDS);

  try {
    await client.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, bPassword, email]);
  }
  catch (e) {
    resp.status(401).send(`Failed to create account: ${e}`);
  }

  resp.send(OK);
});

/** book keeping for serving static stuff **/
app.get('*/main.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web', 'dist', 'main.js'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
