var express = require("express");
var server = express();
bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended: true}));

server.post("/addNewScore", function(req,res){
    
    res.end();
});

server.get("/topFiveScores", function (req, res) {
    res.set("Content-Type", "text/plain");
    res.set("Cache-Control", "no-cache");
    
    res.end();
});

server.get("/highestScore", function(req,res){
    res.set("Content-Type", "text/plain");
    res.set("Cache-Control", "no-cache");

    res.end();
});

server.use(express.static("./pub"));
server.listen(80, function() {
    console.log("Server is now now running on port 80.");
});