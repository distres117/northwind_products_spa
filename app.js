var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public'));
app.use(require('serve-favicon')(__dirname + '/public/favicon.ico'));
app.use(require('morgan')('dev'));
app.use('/api',require('./router'));//maybe /api/<resource_name> might be better

app.use(function(req,res,next){
  var error = new Error("404: Page not found");
  error.status = 404;
  next(error);
});

app.use(function(err,req,res,next){
  console.log(err);
  res.json(err);

});


module.exports = app;
