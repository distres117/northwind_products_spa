var Product = require('./models'),
  dbconnect = require('./index'),
  chalk = require('chalk');

var products = [
  {name: 'Baby Shampoo', priority: 5},
  {name: 'Teddy Bear', priority: 10},
  {name: 'Nuclear secrets', priority: 1},
  {name: 'George Washington Teeth', priority: 2}
];

var seed = function(){
  return dbconnect()
  .then(function(){
    return Product.remove();
  })
  .then(function(){
    console.log(chalk.magenta('seeding...'));
    return Product.insertMany(products);
  })
  .catch(function(err){
    console.log(err);
  });
};
if (!process.env.TESTING){
  seed()
  .then(function(){
    process.exit(0);
  });
}

module.exports = seed;
