var express = require("express");
var server = express();
bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended: true}));

let highScores = {};

server.post("/addNewScore", function(req,res){
    if(!highScores[req.body.user]) highScores[req.body.user] = 0;
    if(highScores.length <= 5){
        highScores[req.body.user]++;
    }
    else {
         //check if new score is higher than the current 5
        //if yes, replace 
        //if no, "sorry, try again"
    }
    res.end();
});

server.get("/topFiveScores", function (req, res) {
    res.set("Content-Type", "text/plain");
    res.set("Cache-Control", "no-cache");
    //are we doing a cache?
    highScores.sort(function(x,y){
        return y - x;
    });
    for(let topScores in highScores){
        res.write(req.query.topScores + " has " + highScores[req.body.topScores] + "points \n");
    }
    res.end();
});

server.get("/highestScore", function(req,res){
    res.set("Content-Type", "text/plain");
    res.set("Cache-Control", "no-cache");
    //check for max
    res.end();
});

server.use(express.static("./pub"));
server.listen(80, function() {
    console.log("Server is now now running on port 80.");
});