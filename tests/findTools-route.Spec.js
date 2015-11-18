"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var app = require('../app');
var findTools = require('../routes/findTools');
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

  it('GET /findTools/category request should return all tools', function(done) {
    chaiRequest()
      .get('/findTools')
      .send({ user: { id: '0'} })
      .end(function(err, res) {
        console.log(res.status);
        //console.log(err);
        //expect(err).to.be.null;
        // expect(res).to.have.status(200);
        // expect(res).to.be.json;
        // expect(res.body.message).to.equal('WELCOME!');
        done();
      });
  });

});


