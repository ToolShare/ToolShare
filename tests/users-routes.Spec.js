"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
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
			.end(function(err, res) {
				console.log(res.body);
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.username).to.equal('Laura');
				expect(res.body.password).to.equal('tiger');
				expect(res.body.address.street).to.equal('123 Main St');
				expect(res.body.address.city).to.equal('Beaverton');
				expect(res.body.address.state).to.equal('OR');
				expect(res.body.address.zip).to.equal(97007);
				done();
			});
	});

});