var express = require("express");
var server = express();
bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended: true}));

let highScores = {};

server.post("/addNewScore", function(req,res){
    if(!highScores[req.body.user]) highScores[req.body.user] = 0;
    if(highScores.length <= 5){
        highScores[req.body.user]++;
        res.write("Your score has been recorded!");
    }
    else {
        let checkScore = highScores[req.body.user];
        for(let currentScore in highScores){
            if(checkScore >= highScores[req.body.currentScore]){
                highScores[req.body.currentScore] = checkScore;
                res.write("Congrats, you've earned a spot on the high score board!");
            }
            else{
                res.write("Sorry your score was too low, try again!")
            }
        }
    }
    res.end();
});

server.get("/topFiveScores", function (req, res) {
    res.set("Content-Type", "text/plain");
    res.set("Cache-Control", "no-cache");
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
    highScores.sort(function(x,y){
        return y - x;
    });
    for(let top in highScores){
        res.write(req.query.top + "has all time highscore of " + highScores[req.body.top] + "points \n");
        break;
    }
    res.end();
});

server.use(express.static("./pub"));
server.listen(80, function() {
    console.log("Server is now now running on port 80.");
});