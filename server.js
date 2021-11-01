const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser')
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { v4: uuidv4 } = require('uuid');

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

app.get('/api/friends', async (req,res) => {
  const friends = await getFriends(req.session.user.user_id);
  res.send(friends);
});

const getFriends = async (user_id) => {
  
  const results = await client.query('SELECT users.user_id, users.username, users.email FROM users INNER JOIN user_friends ON users.user_id = user_friends.friends_id WHERE user_friends.user_id = $1', [user_id]);
  return results.rows;
};

/** create a new account **/
app.post('/api/game', async (req, resp) => {
  const {players} = req.body;
  const userIds = players.map((player) => {
    return player.user.user_id;
  })
  .join(' ');
  const newId = uuidv4();
  const playerString = JSON.stringify({players});
  console.log(playerString);

  try {
    await client.query('INSERT INTO games (game_id, user_ids, state) VALUES ($1, $2, $3)', [
      newId,
      userIds,
      JSON.stringify({
        players
      })
    ]);
  }
  catch(err) {
    console.log(err);
  }

  resp.send({gameId: newId});
});

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

app.post('/api/friends', async (req, resp) => {

  const {friendIds} = req.body;
  const user = req.session.user;

  const toSave = friendIds.filter((id) => {
    return id !== user.user_id;
  });

  try {
    await client.query('BEGIN');
    const promises = toSave.map((anId) => {
      return client.query('INSERT INTO user_friends(user_id, friends_id) VALUES($1, $2)', [user.user_id, anId]);
    });

    await Promise.all(promises);
    await client.query('COMMIT');
  }
  catch (err) {
    console.log(`error: ${err}`);
    await client.query('ROLLBACK');
  }

  resp.send(OK);

});

/** Deletions **/
app.delete('/api/friends/:friendId', async (req, resp) => {

  const {friendId} = req.params;

  await client.query('DELETE FROM user_friends WHERE user_id = $1 AND friends_id = $2', [req.session.user.user_id, friendId]);

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
