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


        console.log(buffer)
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
        };
    },

    methods: {
        addBgImage() {
            const img = new Image();
            img.src = "img/back.png";
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0);
            };

            //Draw the line
            this.ctx.beginPath(); //clears out any previous draw paths.
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(x1, y1); //moves your "pen" to that location
            this.ctx.lineTo(x2, y2); //draws to that location
            this.ctx.stroke(); //put ink down
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

        },
        gornPlacement() {
            const gImg = new Image();
            gImg.src = "img/gorn.png";
            gImg.onload = () => {
                this.ctx.drawImage(gImg, 1, 1, 75, 75);
            };
        },
        movePlayer() {

        }
    },

    computed: {},

    mounted() {
        this.ctx = this.$refs.splineDisplay.getContext("2d"); //gets the graphics context for drawing
        this.redrawEverything();
    }
}).mount("#app");