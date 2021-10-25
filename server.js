const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.get('/test', async (req, res) => {

  const results = await client.query('SELECT * FROM users');

  const obj = {rows: results.rows.length};
  res.send(obj);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
