import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send('Hello');
});

app.listen(5000, function () {
  console.log('Dev app listening on port 5000!');
});