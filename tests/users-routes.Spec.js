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
								zip: 97007
							},
							_id: '',
						};

chai.use(chaiHttp);

function chaiRequest() {
 	return chai.request(`localhost:${port}`);
}

describe('Single Resource REST API', function() {
	//before(function(done) {
   	//app.listen(port, done);
	//});

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
			.send(user1)
			.end(function(err, res) {
				expect(res).to.have.status(200);
				expect(res.body._id).to.equal(user1._id);
				expect(res.body.username).to.equal(user1.username);
				console.log(user1);
				done();
			});
	});

	it('GET /users/:id request for INVALID ID should return error', function(done) {
		chaiRequest()
			.get('/users/999999')
			.send(user1)
			.end(function(err, res) {
				expect(err).to.exist;
				done();
			});
	});

});