let ctx;
let boatXPosition = 25;
let boatYPosition = 32;
let flagXPosition = 180;
let flagYPosition = 190;
let holeXPosition = 225;
let holeYPosition = 325;
let xSmallIceberg = 415;
let ySmallIceberg = 305;
let xMediumIceberg = 310;
let yMediumIceberg = 105;
let xBigIceberg = 425;
let yBigIceberg = 55;

function setup() {
    ctx = document.getElementById("drawingSurface").getContext("2d");
    drawBoard();
}

function drawBoard() {
    ctx.save();
    ctx.clearRect(0,0,600,400);
    ctx.beginPath();
    ctx.fillStyle = "DeepSkyBlue";
    ctx.strokeStyle = "blue";
    
    for(let i = 0; i < 8; i++) {
        ctx.save();
        for(let i = 0; i < 12; i++) {
            ctx.rect(1,1,49,49);
            ctx.stroke();
            ctx.fill();
            ctx.translate(50,0);
        }
        
        ctx.restore();
        ctx.translate(0,50);
    }
    ctx.restore();

    drawBoat(boatXPosition, boatYPosition);
    drawHole(holeXPosition, holeYPosition);
    drawFlagPoint(flagXPosition, flagYPosition);
    drawSmallIceberg(xSmallIceberg, ySmallIceberg);
    drawMediumIceberg(xMediumIceberg, yMediumIceberg);
    drawBigIceberg(xBigIceberg, yBigIceberg);
}


function drawBoat(x,y) {
    //bottom
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.moveTo(x, y);
    ctx.lineTo(x+22, y);
    ctx.lineTo(x+12, y+12);
    ctx.lineTo(x-12, y+12);
    ctx.lineTo(x-22, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fill();

    //right flag
    ctx.beginPath();
    ctx.fillStyle = "white";
    
    ctx.moveTo(x,y-3);
    ctx.lineTo(x, y-27);
    ctx.lineTo(x+17, y-3);
    ctx.lineTo(x,y-3);
    ctx.stroke();
    ctx.fill();

    //left flag
    ctx.beginPath();
    ctx.moveTo(x-3, y-3);
    ctx.lineTo(x-3, y-23);
    ctx.lineTo(x-20, y-3);
    ctx.lineTo(x-3, y-3);
    ctx.stroke();
    ctx.fill();
    
    //small left flag
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(x-3, y-25);
    ctx.lineTo(x-3, y-30);
    ctx.lineTo(x-12, y-25);
    ctx.lineTo(x-3, y-25);
    ctx.stroke();
    ctx.fill();

    //floats
    ctx.strokeStyle = "DarkRed";
    ctx.lineWidth = 2;
    let distance = 0;
    for(let i= 1; i<= 3; i++) {
        ctx.beginPath();
        ctx.arc((x-12) + distance, y+5, 2, 0, 2*Math.PI);
        distance+=12;
        ctx.stroke();
    }
    ctx.restore();
}

function drawHole(x,y) {
    let grdColor = ctx.createRadialGradient(x,y,20,x,y,2);
    grdColor.addColorStop(0, "DarkBlue");
    grdColor.addColorStop(1, "black");

    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.fillStyle = grdColor;
    ctx.beginPath();
    ctx.arc(x,y,20,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

function drawFlagPoint(x,y) {
    //bottom
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "yellow"
    ctx.ellipse(x, y, 15, 10, 0*Math.PI, Math.PI, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

     //flag
    ctx.moveTo(x,y-10);
    ctx.lineTo(x,y-10);
    ctx.lineTo(x,y-30);
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(x-2,y-30);
    ctx.lineTo(x-2,y-30);
    ctx.lineTo(x-23,y-30);
    ctx.lineTo(x-15,y-25);
    ctx.lineTo(x-23,y-20);
    ctx.lineTo(x-2,y-20);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawSmallIceberg(x,y) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "PaleTurquoise";
    ctx.strokeStyle = "DarkBlue";

    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.lineTo(x+20,y+4);
    ctx.lineTo(x+25,y+25);
    ctx.lineTo(x+15,y+40);
    ctx.lineTo(x-5,y+30);
    ctx.lineTo(x,y+20);
    ctx.lineTo(x-5,y+10);
    ctx.lineTo(x,y);
    ctx.fill();
    ctx.stroke(); 
    ctx.restore();
}

function drawMediumIceberg(x,y) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "PaleTurquoise";
    ctx.strokeStyle = "DarkBlue";

    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.lineTo(x-5,y+45);
    ctx.lineTo(x+5,y+60);
    ctx.lineTo(x-5,y+80);
    ctx.lineTo(x+10,y+90);
    ctx.lineTo(x+25,y+80);
    ctx.lineTo(x+35,y+45);
    ctx.lineTo(x+35,y+25);
    ctx.lineTo(x+25,y+20);
    ctx.lineTo(x+30,y+5);
    ctx.lineTo(x,y);
    ctx.fill();
    ctx.stroke(); 
    ctx.restore();
}

function drawBigIceberg(x,y) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "PaleTurquoise";
    ctx.strokeStyle = "DarkBlue";

    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.lineTo(x-15,y+15);
    ctx.lineTo(x-5,y+55);
    ctx.lineTo(x-15,y+70);
    ctx.lineTo(x-20,y+105);
    ctx.lineTo(x-10,y+120);
    ctx.lineTo(x-15,y+130);
    ctx.lineTo(x+15,y+135);
    ctx.lineTo(x+10,y+105);
    ctx.lineTo(x+20,y+80);
    ctx.lineTo(x+20,y+30);
    ctx.lineTo(x,y);

    ctx.fill();
    ctx.stroke(); 
    ctx.restore();
}