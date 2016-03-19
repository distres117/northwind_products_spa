var mongoose = require('mongoose');

var conn;
module.exports = function(){
  if (!conn){
    conn = mongoose.connect('mongodb://localhost/products-spa', function(err){
      if (err)
        console.log(err);
    });
  }
  return conn;
};
