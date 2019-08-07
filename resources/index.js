var express = require('express');
var api = express();

api.get('/clients', function(req, resp){
    resp.send( req.url + " is a secure API. Env is " + process.env.NODE_ENV);
    resp.send("This is a secure API " + req.id);
});

api.get('/services', function(req, resp){
    resp.send( req.url + " is an unsecured API. Env is " + process.env.NODE_ENV);
});


var server = api.listen(process.env.PORT, function(){
    console.log("listening on port  %d", server.address().port);
});
