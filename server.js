var app = require('./app'),
  dbconnect = require('./db');

dbconnect()
.then(function(){
  console.log('db is connected...');
  app.listen(process.env.port || 3000, function(){
    console.log("Server is running...");
  });
});
