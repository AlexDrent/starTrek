function randomColor() {
    let ret = "#";
    for (let i = 0; i < 6; i++) ret += Math.floor(Math.random() * 16).toString(16);
    return ret;
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
            highScore: null,
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
    },

    computed: {
        addToScore(){
            currentScore += 1701;
            return currentScore;
        },
        highScore(){
            if (this.currentScore > this.highScore){
                return this.currentScore;
            }
            return this.highScore;
            }
        }
    },

    mounted() {
        this.ctx = this.$refs.splineDisplay.getContext("2d"); //gets the graphics context for drawing
        this.redrawEverything();
    }
}).mount("#app");
