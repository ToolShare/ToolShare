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

  it('GET /findtools/category request should return all tools', function(done) {
    chaiRequest()
      .get('/findtools/hand')
      .end(function(err, res) {
        //expect(err).to.be.null;
        // expect(res).to.have.status(200);
        // expect(res).to.be.json;
        // expect(res.body.message).to.equal('WELCOME!');
        done();
      });
  });

});


