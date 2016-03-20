var mongoose = require('mongoose');

var conn;
module.exports = function(){
  if (!conn){
    conn = mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/products-spa', function(err){
      if (err)
        console.log(err);
    });
  }
  return conn;
};
