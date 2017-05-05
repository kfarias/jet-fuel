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
    describe('GET /api/v1/folders', () => {
      it('should return all of the folders', (done) => {
        chai.request(server)
        .get('/api/v1/folders')
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(4)
          done()
        })
      })
    })
  })
})
