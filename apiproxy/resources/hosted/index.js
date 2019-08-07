var express = require('express');
var api = express();

api.get('/', function(req, resp){
    resp.send( "Hello, World!");
});

var server = api.listen(9000, function(){
    console.log("listening on port  %d", server.address().port);
});
