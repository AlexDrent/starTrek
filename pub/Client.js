function randomColumn() {
    let columns = [0, 70, 140, 210, 280, 350, 420, 490, 560, 630];
    let currentCol = columns[Math.floor(Math.random() * columns.length)];
    return currentCol;
}
//-------------------------------------------------------------------
// document.addEventListener('DOMContentLoaded', () => {
//     'use strict';

//     keyMapper();
// });

// let buffer = [];

// function keyMapper() {
//     //buffer = [];
//     let lastKeyTime = Date.now();

//     document.addEventListener('keydown', event => {
//         const charList = 'abcdefghijklmnopqrstuvwxyz0123456789←→↓↑';
//         const key = event.key.toLowerCase();


//         const currentTime = Date.now();

//         if (currentTime - lastKeyTime > 1000) {
//             buffer = [];
//         }

//         buffer.push(key);
//         lastKeyTime = currentTime;


//         console.log(buffer);
//         return buffer[0];
//     });
// }
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
            gornYPos: 10,
            starthere: 0,
            gImg: null,
            position: 210,
            buffer: [],
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
        deleteGorn(indexToDelete) {

            this.redrawEverything();
        }, //"→"
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
            //remove image
            if (this.gornYPos == 410 && this.startHere == this.position) {
                //caught
                this.addToScore();
                this.gornReset();
            } else if (this.gornYPos > 410 && this.startHere != this.position) {
                //missed
                this.removeLife();
                this.gornReset();
            }
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
            this.lives -= 1;
        },
        gameTime() {
            setInterval(this.redrawEverything, 1000);
            console.log("refresh 1");
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

            if (this.buffer[0] == "arrowright") {
                this.position += 70;
                this.redrawEverything();
            } else if (this.buffer[0] == "arrowleft") {
                this.position -= 70;
                this.redrawEverything();
            }
            console.log(this.buffer);
            return this.buffer[0];
        });
    }
}).mount("#app");