"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
// var db = require('../app/models/db');
var app = require('../app');
var port = 3001;

chai.use(chaiHttp);

function chaiRequest() {
 	return chai.request(`localhost:${port}`);
}

describe('Single Resource REST API', function() {
	//before(function(done) {
   	//app.listen(port, done);
	//});

	// it('GET /users/new request should respond with no data before data is added to DB', function(done) {
	// 	chaiRequest()
	// 		.get('/api/collegeteams')
	// 		.end(function(err, res) {
	// 			expect(err).to.be.null;
	// 			expect(res).to.have.status(200);
	// 			expect(res).to.be.json;
	// 			expect(res.body).to.be.empty;
	// 			done();
	// 		});
	// });

it('POST /users request should add a user to DB', function(done) {
		chaiRequest()
			.post('/users')
			.send({ 
							username: 'Laura', 
							password: 'tiger',
							address: {
								street: '123 Main St',
								city: 'Beaverton',
								state: 'OR',
								zip: 97007
							}	
						})
			//.send({ name: 'LSU', mascot: 'tiger' })
			.end(function(err, res) {
				console.log(res.body);
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.username).to.equal('Laura');
				done();
			});
	});

});