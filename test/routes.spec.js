var expect = require('chai').expect,
  Product = require('../db/models'),
  seed = require('../db/seed'),
  app = require('../app'),
  request = require('supertest-as-promised')(app);

describe('route tests', function(){
    before(function(){
      return seed();
    });

    function getRequest(fn){
      return request.get('/api')
      .then(function(res){
        fn(res);
      });
    }
    function sort(arr)
    {
      return arr.concat().sort((a,b)=> a.priority - b.priority);
    }
    it('Gets all products from highest to lowest priority', function(){
      return getRequest(function(res){
        var products = res.body;
        expect(products).to.eql(sort(products));
      });
    });

    it('Posts new product', function(){
      return request.post('/api')
      .send({name: 'Old cellphone', priority: 9})
      .then(function(res){
        expect(res.statusCode).to.equal(200);
        return getRequest(function(res){
          var products = res.body;
          expect(products).to.eql(sort(products));
        });

      });
    });

    it('Updates product priority and returns sorted list', function(){
      var product;
      return Product.find().sort({priority: 'asc'})
      .then(function(products){
        product = products[0];
        var index = products[1].priority + 1;
        return request.put('/api/' + product.id).send({priority: index});
      })
      .then(function(res){
        expect(res.statusCode).to.equal(200);
        expect(res.body.name).to.equal(product.name);
        return getRequest(function(res){
          expect(product.name).to.equal(res.body[1].name);
        });

      });
    });

    it('Removes product and returns sorted list', function(){
      return Product.findOne({name: 'Old cellphone'})
      .then(function(product){
        return request.del('/api/' + product.id);
      })
      .then(function(res){
        expect(res.statusCode).to.equal(204);
        return getRequest(function(res){
          expect(res.body.length).to.equal(4);
        });
    });
  });
});
