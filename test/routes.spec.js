const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp)

describe('server tests', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => {
      database.seed.run()
    })
    done();
  })

  afterEach((done) => {
    database.seed.run()
    done();
  })

  describe('Client Routes', () => {
    
  })

  describe('API Routes', () => {

  })
})
