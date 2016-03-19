var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  priority:{
    type:Number,
    default: 0
  }
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
