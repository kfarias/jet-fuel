exports.seed = function(knex, Promise) {
  return knex('links').del()
    .then(() => knex('folders').del())
    .then(() =>  {
      return Promise.all([
        knex('folders').insert({
          title: 'Misc'
        }, 'id')
        .then(folder => {
          return knex('links').insert([
            { longUrl: 'http://www.cnn.com',
              visits: 0,
              folder_id: folder[0]
            },
            { longUrl: 'http://www.facebook.com',
              visits: 5,
              folder_id: folder[0]
            },
            { longUrl: 'http://www.espn.com',
              visits: 2,
              folder_id: folder[0]
            }
          ])
        }),
        knex('folders').insert({
          title: 'Travel'
        }, 'id')
        .then(folder => {
          return knex('links').insert([
            { longUrl: 'http://www.kayak.com',
              visits: 1,
              folder_id: folder[0]
            },
            { longUrl: 'http://www.tripadvisor.com',
              visits: 3,
              folder_id: folder[0]
            },
            { longUrl: 'http://www.lonelyplanet.com',
              visits: 6,
              folder_id: folder[0]
            }
          ])
        })
      ]); // end Promise.all
    });
};
