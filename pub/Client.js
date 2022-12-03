function randomColumn() {
    let columns = [0, 70, 140, 210, 280, 350, 420, 490, 560, 630];
    let currentCol = columns[Math.floor(Math.random() * columns.length)];
    return currentCol;
}
function dropRow(){
    let rows = [0,24,48,72,96,120,144,168,192,216,240,264,288,312,338,360,384,408,432,456];
    
    
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
            lives: 3
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
            this.drawScore();
        },
        deleteGorn(indexToDelete) {

            this.redrawEverything();
        },
        movePlayer(position) {
            if (buffer[0] == "→") {
                if(position > 630){
                    return position;
                }else{
                    position += 70;
                    return position;
                }
            } else if (buffer[0] == "←") {
                if(position < 0) {
                    return position;
                }else{
                    position -= 70;
                    return position;
                }
            }
        },
        gornPlacement() {
            for (i = 0; i <= 2; i++) {
                const gImg = new Image();
                gImg.src = "img/gorn.png";
                gImg.onload = () => {
                    const startHere = randomColumn();
                    this.ctx.drawImage(gImg, startHere, 0, 67, 67);
                }
            };
        },
        hypoSpray() {
            const hImg = new Image();
            hImg.src = "img/hypospray.png";
            var tile = 5;
            hImg.onload = () => {
                for (let i = 0; i < this.lives; i++){
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
        gornAttack(){
            //if caught
                //remove image
            //else missed
                //hypoSpray called here and displayed
        },

        reset() {
            this.lives = 3;
        },
    },

    computed: {
        addToScore() {
            currentScore += 1701;
            return currentScore;
        }
    },

    mounted() {
        this.ctx = this.$refs.splineDisplay.getContext("2d"); //gets the graphics context for drawing
        this.redrawEverything();
    }
}).mount("#app");