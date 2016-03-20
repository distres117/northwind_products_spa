var app = require('./app'),
  dbconnect = require('./db');

dbconnect()
.then(function(){
  console.log('db is connected...');
  app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running...");
  });
});
