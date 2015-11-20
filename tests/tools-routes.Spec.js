"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var app = require('../app');
var port = 3002;

var tool1 = {
  userId: '564bb2793aa7615c07c699c7',
  category: 'Power Tools', 
  name: 'Joiner',
  description: 'Makita 6-Amp Plate Joiner',
  isAvailable: true,
  _id: ''
};

chai.use(chaiHttp);

function chaiRequest() {
  return chai.request(`localhost:${port}`);
}

describe('Single Resource REST API', function() {
  before(function(done) {
    app.listen(port, done);
  });

  // it('POST /tools request should add a user to DB', function(done) {
  //   chaiRequest()
  //   .post('/tools')
  //   .send(tool1)
		// 	.end(function(err, res) {
  //       expect(res).to.have.status(200);
  //       expect(res.text).to.have.string('<h1>Login Page</h1>');
  //       done();
		// 	});
  // });

  it('GET /tools/:id request for a tool ID from DB', function(done) {
    chaiRequest()
    .get('/tools/564f586b2935f8263d26d84c')
			.end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.contain('<h1>Tool Details</h1>');
        done();
			});
  });

  it('GET /tools request should return all tools from DB', function(done) {
    chaiRequest()
    .get('/tools')
			.end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.length).to.be.above(0);
        done();
			});
  });

  it('GET /tools/:id request for INVALID ID should return empty object', function(done) {
    chaiRequest()
    .get('/tools/999999')
			.end(function(err, res) {
        expect(res.body).to.be.empty;
        done();
			});
  });

  // it('PUT /tools/:id request for tool1 ID should update tool1 isAvailable flag in DB', function(done) {
  //   chaiRequest()
  //   .put('/tools/' + tool1._id)
  //   .send({isAvailable: false})
		// 	.end(function(err, res) {
  //       expect(res).to.have.status(200);
  //       expect(res.body._id).to.equal(tool1._id);
  //       expect(res.body.isAvailable).to.equal(false);
  //       done();
		// 	});
  // });

  // it('DELETE /tools/:id should delete tool1 from DB', function(done) {
  //   chaiRequest()
  //   .del('/tools/' + tool1._id)
		// 	.end(function(err, res) {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res.body.message).to.equal('ID: ' + tool1._id + ' deleted from DB');
  //       done();
		// 	});
  // });

});
