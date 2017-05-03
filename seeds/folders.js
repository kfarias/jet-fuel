
exports.seed = function(knex, Promise) {
  return knex('links').del()
    .then(() => knex('folders').del())
    .then(() =>  {
      return Promise.all([
        knex('folders').insert({
          title: 'Folder One'
        }, 'id')
        .then(folder => {
          return knex('links').insert([
            { longUrl: 'http://www.amazon.com',
              shortUrl: '',
              visits: 0,
              folder_id: folder[0]
            }
          ])
        })
      ]); // end Promise.all
    });
};
