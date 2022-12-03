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
        };
    },

    methods: {
        drawLine(x1, y1, x2, y2, color1, color2) {
            //set up the line's gradient
            let g = this.ctx.createLinearGradient(x1, y1, x2, y2);
            g.addColorStop(0, color1);
            g.addColorStop(1, color2);
            this.ctx.strokeStyle = g;

            //Draw the line
            this.ctx.beginPath(); //clears out any previous draw paths.
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(x1, y1); //moves your "pen" to that location
            this.ctx.lineTo(x2, y2); //draws to that location
            this.ctx.stroke(); //put ink down
        },
        redrawEverything() {
            this.ctx.fillStyle = this.backColor;
            this.ctx.fillRect(0, 0, 400, 400);
            //For the lines!
            for (let i = 0; i < this.nodes.length - 1; i++) { // -1 here because we look ahead to draw to the next node
                for (let j = 0; j < this.linesPerNode; j++) { //draws "this.linesPerNode" lines to the next node
                    let n = this.nodes[i];
                    let m = this.nodes[i + 1];
                    this.drawLine(n.x + n.dx * j, n.y + n.dy * j, m.x + m.dx * j, m.y + m.dy * j, n.color, m.color);
                }
            }
        },
        addNode() {

            this.redrawEverything();
        },
        deleteNode(indexToDelete) {

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

    computed: {},

    mounted() {
        this.ctx = this.$refs.splineDisplay.getContext("2d"); //gets the graphics context for drawing
        this.redrawEverything();
    }
}).mount("#app");