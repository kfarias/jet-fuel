// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/jetfuel',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/jetfueltest',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/test/seeds'
    }
  }
};
