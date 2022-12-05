var express = require("express");
var server = express();
bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended: true}));

let highScores = {};

server.post("/addNewScore", function(req,res){
    if(!highScores[req.body.user]) highScores[req.body.user] = req.body.score;
    res.write("Your score of " + req.body.score + " has been recorded " + req.body.user + "!");
    
    res.end();
});

server.get("/topHighScores", function (req, res) {
    res.set("Content-Type", "text/plain");
    res.set("Cache-Control", "max-age=300");
    for(user in highScores){
        res.write(user + " has " + highScores[user] + " points \n");
    }
    res.end();
});

server.use(express.static("./pub"));
server.listen(80, function() {
    console.log("Server is now running on port 80.");
});