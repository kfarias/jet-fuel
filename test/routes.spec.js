process.env.NODE_ENV = 'test';

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp)

describe('', () => {
  beforeEach((done) => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run()
    })
    .then(() => {
      done()
    })

  })

  afterEach((done) => {
    database.migrate.rollback()
    .then(() => {
      done()
    })
  })

describe('API Routes', () => {
  describe('GET /api/v1/folders', () => {

    it('should return all of the folders', (done) => {
      chai.request(server)
      .get('/api/v1/folders')
      .end((err, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.length.should.equal(2)
        response.body[0].should.have.property('title')
        response.body[0].title.should.equal('Misc')

        done()
        })
      })

      it('should not return folders if route is wrong', (done) => {
        chai.request(server)
        .get('/sad')
        .end((err, response) => {
          response.should.have.status(404)
          done()
          })
        })

      it('should return folder with specific id', (done) => {
        chai.request(server)
        .get('/api/v1/folders/1')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(1)
          response.body[0].should.have.property('title')
          response.body[0].title.should.equal('Misc')

          done()
          })
        })

      it('should return specific links depending on the folder id', (done) => {
        chai.request(server)
        .get('/api/v1/folders/1/links')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(3)
          response.body[0].should.have.property('id')
          response.body[0].id.should.equal(1)
          response.body[0].should.have.property('longUrl')
          response.body[0].longUrl.should.equal('http://www.cnn.com')
          response.body[0].should.have.property('visits')
          response.body[0].visits.should.equal(0)
          response.body[0].should.have.property('folder_id')
          response.body[0].folder_id.should.equal(1)
          done()
          })
        })

  describe('POST /api/v1/folders', () => {
    it('should create a new folder', (done) => {
      chai.request(server)
      .post('/api/v1/folders')
      .send({
        title: 'New'
      })
      .end((err, response) => {
        response.should.have.status(201)
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        done()
          })
        })
      })
    })
  })

  describe('LINK Routes', () => {
    describe('GET /api/v1/links', () => {
      it('should return all of the links', (done) => {
        chai.request(server)
        .get('/api/v1/links')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(6)
          response.body[0].should.have.property('id')
          response.body[0].id.should.equal(1)
          response.body[0].should.have.property('longUrl')
          response.body[0].longUrl.should.equal('http://www.cnn.com')
          response.body[0].should.have.property('visits')
          response.body[0].visits.should.equal(0)
          response.body[0].should.have.property('folder_id')
          response.body[0].folder_id.should.equal(1)

          done()
          })
        })

        it('should not get links if route is wrong', (done) => {
          chai.request(server)
          .get('/sad')
          .end((err, response) => {
            response.should.have.status(404)
            done()
            })
          })

    describe('POST /api/v1/links', () => {
      it('should create a new link', (done) => {
        chai.request(server)
        .post('/api/v1/links')
        .send({
          longUrl: 'http://www.meow.com',
          visits: 3,
          folder_id: 1
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.a('object')
          done()
            })
          })
        })
      })
    })

    describe('Client Routes', () => {
      it('should return html', () => {
        chai.request(server)
        .get('/')
        .end((err, response) => {
          response.should.have.status(200)
        })
      })

      it('should return html', () => {
        chai.request(server)
        .get('/')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.html
        })
      })
    })
})
