var expect = require('chai').expect,
  Product = require('../db/models'),
  seed = require('../db/seed');


xdescribe('model tests', function(){
  before(function(){
    return seed();
  });
  it('test before hook', function(){
    expect(1+1).to.equal(2);
  });
});
