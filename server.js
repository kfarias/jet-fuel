const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set('port', process.env.PORT || 3000)
app.locals.title = 'JetFuel'

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
  response.send(file)
  });
});

app.listen(3000)
