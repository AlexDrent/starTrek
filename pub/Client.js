function randomPosition() {
    let positions = [50, 100 ,150, 200, 250, 300, 350, 400, 450];
    let currentPos = positions[Math.floor(Math.random()*positions.length)];
    return currentPos;
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
            this.gornPlacement();
            
            //For the lines! - KEEP for redraw reference
                // for (let j = 0; j < this.linesPerNode; j++) { //draws "this.linesPerNode" lines to the next node
                //     let n = this.nodes[i];
                //     let m = this.nodes[i + 1];
                //     this.drawLine(n.x + n.dx * j, n.y + n.dy * j, m.x + m.dx * j, m.y + m.dy * j, n.color, m.color);
                // }

        },
        addGorn() {

            this.redrawEverything();
        },
        deleteGorn(indexToDelete) {

            this.redrawEverything();
        },
        movePlayer() {
            if (buffer[0] == "→") {
                //if all the way right dont move
                //else move +100 px
            } else if (buffer[0] == "←") {
                //if all the way left dont move
                //else move -100 px
            }
        },
        gornPlacement() {
            const gImg = new Image();
            gImg.src = "img/gorn.png";
            gImg.onload = () => {
                const startHere = randomPosition();
                this.ctx.drawImage(gImg, startHere, 0, 75, 75);
            };
        },
    },

    computed: {
        addToScore(){
            currentScore += 1701;
            return currentScore;
        }
    },

    mounted() {
        this.ctx = this.$refs.splineDisplay.getContext("2d"); //gets the graphics context for drawing
        this.redrawEverything();
    }
}).mount("#app");
