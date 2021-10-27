const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser')
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

passport.use(new LocalStrategy( (username, password, done) => {
  console.log('i am in the method');
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

app.get('/api/getUsers', async (req, res) => {

  const results = await client.query('SELECT * FROM users');

  const obj = {rows: results.rows.length};
  res.send(obj);
});

app.post('/api/login', (req, res, next) => {
  
  passport.authenticate('local', (err, user, info) => {
    
    if (err) { 
      return next(err); 
    }
    
    if (!user) { 
      return res.status(401).send('Authentication Error');
    }
    
    return res.send(user);

  })(req, res, next);
});

app.get('*/main.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web', 'dist', 'main.js'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
