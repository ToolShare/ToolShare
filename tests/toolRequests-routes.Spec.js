"use strict";

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var app = require('../app');
var port = 3003;

var toolReq1 = {
  lenderId: '564cb7474e4d4ec618c9e0db',
  requesterId: '564bb2932184f20a1580ae44', 
  toolId: '564cf3a19bb4708416ac0ba8',
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

  it('POST /toolRequests request should add a toolRequest to DB', function(done) {
    chaiRequest()
    .post('/toolRequests')
    .send(toolReq1)
    .end(function(err, res) {
        expect(res).to.have.status(200);
        console.log(res.body);
        expect(res.body).to.have.property('_id');
        toolReq1._id = res.body._id;
        expect(res.body.status).to.equal('open');
        done();
      });
  });

});
