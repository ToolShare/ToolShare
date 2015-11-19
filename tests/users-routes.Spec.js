"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var app = require('../app');
var port = 3001;

var user1 = {
  username: 'Laura',
  password: 'tiger',
  address: {
    street: '123 Main St',
    city: 'Beaverton',
    state: 'OR',
    zip: 97007,
  },
  _id: '',
};

chai.use(chaiHttp);

function chaiRequest() {
  return chai.request(`localhost:${port}`);
}

describe('Single Resource REST API', function() {

  before(function(done) {
     app.listen(port, done);
  });

  it('POST /users request should add a user to DB', function(done) {
    chaiRequest()
    .post('/users')
    .send(user1)
			.end(function(err, res) {
        expect(res).to.have.status(200);
        //expect(res.text).to.have.string('Welcome to');
        expect(res.body).to.have.property('_id');
        user1._id = res.body._id;
        expect(res.body.username).to.equal(user1.username);
        done();
			});
  });

  it('GET /users/:id request for user1 ID should user1 from DB', function(done) {
    chaiRequest()
    .get('/users/' + user1._id)
			.end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body._id).to.equal(user1._id);
        expect(res.body.username).to.equal(user1.username);
        done();
			});
  });

  it('GET /users request should return all users from DB', function(done) {
    chaiRequest()
    .get('/users')
			.end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.length).to.be.above(0);
        done();
			});
  });

  it('GET /users/:id request for INVALID ID should return empty object', function(done) {
    chaiRequest()
    .get('/users/999999')
			.end(function(err, res) {
        expect(res.body).to.be.empty;
        done();
			});
  });

  it('PUT /users/:id request for user1 ID should update user1 password in DB', function(done) {
    chaiRequest()
    .put('/users/' + user1._id)
    .send({password: 'NewPassword'})
			.end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body._id).to.equal(user1._id);
        expect(res.body.password).to.equal('NewPassword');
        done();
			});
  });

  it('DELETE /users/:id should delete user1 from DB', function(done) {
    chaiRequest()
    .del('/users/' + user1._id)

			.end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.message).to.equal('ID: ' + user1._id + ' deleted from DB');
        done();
			});
  });

});
