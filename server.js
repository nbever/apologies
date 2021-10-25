const express = require('express');
const app = express()
const port = 3000

const { Client } = require('pg');
const client = new Client({ssl: true});
client.connect();

app.get('/test', async (req, res) => {

  const obj = {who: 'me'};
  res.send(obj);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
