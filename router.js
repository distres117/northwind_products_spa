var router = require('express').Router(),
  Product = require('./db/models');

router.route('/')
  .get(function(req,res,next){
    Product.find().sort({priority: 'asc'})
    .then(function(products){
      res.json(products);
    }, next);
  })

  .post(function(req,res,next){
    Product.create(req.body)
    .then(function(product){
      res.status(200).json(product);
    }, next);
  });

router.route('/:id')
  .put(function(req,res,next){
    Product.findById(req.params.id)
    .then(function(product){
      product.priority = req.body.priority;
      return product.save();
    })
    .then(function(product){
      res.status(200).json(product);
    },next);
  })
  .delete(function(req,res,next){
    Product.remove({_id: req.params.id})
    .then(function(){
      res.sendStatus(204);
    }, next);
  });

module.exports = router;
