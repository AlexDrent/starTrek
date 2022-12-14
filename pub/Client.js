function randomColumn() {
    let columns = [0, 70, 140, 210, 280, 350, 420, 490, 560, 630];
    let currentCol = columns[Math.floor(Math.random() * columns.length)];
    return currentCol;
}

let myApp = Vue.createApp({

    data() {
        return {
            backColor: "#000000",
            linesPerNode: 20,
            ctx: null,
            nodes: [],
            currentScore: 0,
            lives: 3,
            gornYPos: 10,
            starthere: 0,
            gImg: null,
            position: 210,
            buffer: [],
            gameYeet: null,
            feedback: "",
        };
    },

    methods: {
        addBgImage() {
            const img = new Image();
            img.src = "img/back.png";
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0);
            };
        },
        redrawEverything() {
            this.addBgImage();
            this.gornAttack();
            this.gornPlacement();
            this.playerPlacement();
            this.hypoSpray();
            this.gornYPos += 40;
            console.log("refresh");
        },
        movePlayer() {
            if (this.buffer[0] == "arrowright") {
                if (this.position > 630) {
                    this.redrawEverything();
                } else {
                    this.position += 70;
                    this.redrawEverything();
                }
            } else if (this.buffer[0] == "←") {
                if (this.position < 0) {
                    this.redrawEverything();
                } else {
                    this.position -= 70;
                    this.redrawEverything();
                }
            }
            console.log(this.position);
        },
        gornPlacement() {
            for (i = 0; i <= 2; i++) {
                gImg = new Image();
                gImg.src = "img/gorn.png";
                gImg.onload = () => {
                    this.ctx.drawImage(gImg, this.startHere, this.gornYPos, 67, 67);
                }
            };
        },
        gornReset() {
            this.startHere = randomColumn();
            this.gornYPos = 10;
        },
        hypoSpray() {
            const hImg = new Image();
            hImg.src = "img/hypospray.png";
            var tile = 5;
            hImg.onload = () => {
                for (let i = 0; i < this.lives; i++) {
                    this.ctx.drawImage(hImg, tile, 5);
                    tile += 50;
                }
            }
        },
        playerPlacement() {
            const pImg = new Image();
            pImg.src = "img/kirk.png";
            pImg.onload = () => {
                this.ctx.drawImage(pImg, this.position, 410, 67, 67);
            }
        },
        gornAttack() {
            //if caught
            //if gorn is on bottom row and gorn and kirk are in the same column
            if (this.gornYPos == 410 && this.startHere == this.position) {
                //caught
                this.addToScore();
                this.gornReset();
                //else if gorn is below the bottom row and they are not in the same column
            } else if (this.gornYPos > 410 && this.startHere != this.position) {
                //missed
                this.removeLife();
                this.gornReset();
            }
            //else missed
            //removeLife called here
        },
        addToScore() {
            this.currentScore += 1701;
        },
        removeLife() {
            this.lives -= 1;
            if (this.lives <= 0) {
                this.stopGame();
            }
        },
        gameTime() {
            gameYeet = setInterval(this.redrawEverything, 500);
            console.log("refresh 1");
        },
        stopGame() {
            clearInterval(gameYeet);
            this.addBgImage();
            document.getElementById("scoreList").style.visibility = "visible";
        },
        fetchScoreList(){
            fetch("/topHighScores").then(
                (result) => {
                    if(!result.ok) throw new Error("status: " + result.status);
                    return result.text();
                }
            ).then(
                (data) => {
                    this.feedback = data;
                },
                (err) => {
                    this.feedback = "Error: " + err.message;
                }
            );
        },
        fetchAddingScore() {
            let params = new URLSearchParams();
            params.append("user", this.user);
            params.append("score", this.score);
            fetch("/addNewScore", {method: 'POST', body: params }).then(
                (result) => {
                    if(!result.ok) throw new Error("status: " + result.status);
                    return result.text();
                }
            ).then(
                (data) => {
                    this.feedback = data;
                },
                (err) => {
                    this.feedback = "Error: " + err.message;
                }
            );
        }
    },

    computed: {
        message: function() {
            if (this.lives == 0) {
                return "Game Over! Final Score: " + this.currentScore + ". Submit score below?";
            } else {
                return "Current Score: " + this.currentScore;
            }
        }
    },

    mounted() {
        this.ctx = this.$refs.splineDisplay.getContext("2d"); //gets the graphics context for drawing
        this.redrawEverything();
        this.gameTime();
        this.gornReset();
        this.movePlayer();
        document.addEventListener('keydown', event => {
            const charList = 'abcdefghijklmnopqrstuvwxyz0123456789←→↓↑';
            let lastKeyTime = null;
            const key = event.key.toLowerCase();


            const currentTime = Date.now();

            if (currentTime - lastKeyTime > 1000) {
                this.buffer = [];
            }

            this.buffer.push(key);
            lastKeyTime = currentTime;

            if (this.lives != 0) {
                if (this.buffer[0] == "arrowright") {
                    this.position += 70;
                    this.redrawEverything();
                } else if (this.buffer[0] == "arrowleft") {
                    this.position -= 70;
                    this.redrawEverything();
                }
            }
            console.log(this.buffer);

        });
    }
}).mount("#app");