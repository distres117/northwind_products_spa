var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public'));
app.use(require('serve-favicon')(__dirname + '/public/favicon.ico'));
app.use(require('morgan')('dev'));
app.use('/api',require('./router'));

app.use(function(req,res,next){
  var error = new Error("404: Page not found");
  error.status = 404;
  next(error);
});

app.use(function(err,req,res,next){
  console.log(err);
  res.status = err.status || 404;

});


module.exports = app;
