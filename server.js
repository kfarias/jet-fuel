const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

app.set('port', process.env.PORT || 3000)
app.locals.title = 'JetFuel'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.folders = [
  { id: 234234, name: 'social' }
]

app.locals.urls = [
  {longUrl: 'http://google.com', shortUrl: 'google', visits: 0, date: Date.now(), name:'All'}
]

app.post('/api/folders', (request, response) => {
  const { name } = request.body;
  const id = Date.now();
  app.locals.folders.push({ id, name })
  response.status(201).json({id, name})
})

app.post('/api/urls', (request, response) => {
  const { longUrl, shortUrl, visits, date, name } = request.body;
  app.locals.urls.push({longUrl, shortUrl, visits, date, name});
  response.status(201).json({longUrl, shortUrl, visits, date, name});
})

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
  response.send(file)
  });
});

app.get('/api/folders', (request, response) => {
  const folders = app.locals.folders;
  response.json(folders)
})

app.get('/api/urls', (request, response) => {
  const urls = app.locals.urls;
  response.json(urls)
})

app.listen(3000)
