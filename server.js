const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
  .then(folders => {
    response.status(200).json(folders)
  })
  .catch(error => {
    console.error('error:', error);
  });
})

app.get('/api/v1/folders/:id', (request, response) => {
  database('folders').where('id', request.params.id).select()
    .then(folders => {
      response.status(200).json(folders)
    })
    .catch(error => {
      console.error('error: ', error);
    })
})

app.get('/api/v1/links', (request, response) => {
  database('links').select()
    .then(links => {
      response.status(200).json(links)
    })
    .catch(error => {
      console.error('error:', error);
    });
})

app.get('/api/v1/folders/:id/links', (request, response) => {
  database('links').where('folder_id', request.params.id).select()
    .then(folders => {
      response.status(200).json(folders)
    })
    .catch(error => {
      console.error('error:', error);
    });
})

app.get('/jet.fuel/:id', (request, response) => {
  database('links').where('id', request.params.id).increment('visits', 1)
   .then(() => database('links').where('id', request.params.id).select())
   .then(links => {
     response.redirect(`http://${links[0].longUrl}`);
   })
   .catch(error => console.error('error: ', error))
})

app.post('/api/v1/folders', (request, response) => {
  const folder = request.body;

  database('folders').insert(folder, 'id')
    .then(folder => {
      response.status(201).json({ id: folder[0] })
    })
    .catch(error => {
      console.error('error:', error);
    });
})

app.post('/api/v1/links', (request, response) => {
  const link = request.body;

  database('links').insert(link, 'id')
    .then(link => {
      response.status(201).json({ id: link[0] })
    })
    .catch(error => {
      console.error('error:', error);
    });
})

app.listen(3000)

module.exports = app
