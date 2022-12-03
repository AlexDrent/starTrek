function randomColumn() {
    let columns = [0, 70, 140, 210, 280, 350, 420, 490, 560, 630];
    let currentCol = columns[Math.floor(Math.random() * columns.length)];
    return currentCol;
}
//-------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    keyMapper();
});

function keyMapper() {
    let buffer = [];
    let lastKeyTime = Date.now();

    document.addEventListener('keydown', event => {
        const charList = 'abcdefghijklmnopqrstuvwxyz0123456789←→↓↑';
        const key = event.key.toLowerCase();


        const currentTime = Date.now();

        if (currentTime - lastKeyTime > 1000) {
            buffer = [];
        }

        buffer.push(key);
        lastKeyTime = currentTime;


        console.log(buffer);
        return buffer[0];
    });
}
//---------------------------------------------------------------------------------

let myApp = Vue.createApp({

    data() {
        return {
            backColor: "#000000",
            linesPerNode: 20,
            ctx: null,
            nodes: [],
            currentScore: 0,
            lives: 3,
            gornYPos: 0,
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
        },
        deleteGorn(indexToDelete) {

            this.redrawEverything();
        },
        movePlayer(xCoord) {
            if (buffer[0] == "→") {
                if (xCoord > 630) {
                    this.redrawEverything();
                } else {
                    xCoord += 70;
                    this.redrawEverything();
                }
            } else if (buffer[0] == "←") {
                if (xCoord < 0) {
                    this.redrawEverything();
                } else {
                    xCoord -= 70;
                    this.redrawEverything();
                }
            }
        },
        gornPlacement() {
            //for (i = 0; i <= 2; i++) {
                const gImg = new Image();
                gImg.src = "img/gorn.png";
                gImg.onload = () => {
                    const startHere = randomColumn();
                    this.ctx.drawImage(gImg, startHere, this.gornYPos, 67, 67);
                }
            //};
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
                this.ctx.drawImage(pImg, 280, 410, 67, 67);
            }
        },
        gornAttack() {
            //if caught
            //remove image
            //else missed
            //removeLife called here
        },

        reset() {
            this.lives = 3;
        },
        addToScore() {
            this.currentScore += 1701;
        },
        removeLife() {
            this.lives -= 0;
        },
        gameTime() {
            setInterval(function() {
                this.redrawEverything;
                this.gornYPos += 40;
                console.log("refresh");
            }, 1000)
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
    }
}).mount("#app");