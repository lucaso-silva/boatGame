let ctx;
let boatXPosition;
let boatYPosition;
let flagXPosition;
let flagYPosition;
let holeXPosition;
let holeYPosition;
let xSmallIcebergValues = [];
let ySmallIcebergValues = [];
let xMediumIcebergValues = [];
let yMediumIcebergValues = [];
let xSmallIceberg;
let ySmallIceberg;
let xMediumIceberg;
let yMediumIceberg;
//let xBigIceberg = 425;
//let yBigIceberg = 55;
let flagsCollected = 0;
let distanceBoatAndFlag;
let distanceBoatAndHole;
let distanceBoatSmallIceberg;
let gameOver = false;

//NEED TO VALIDATE TO AVOID THE SAME COORDINATES
function createElementsPositions() {
    boatXPosition = 25;
    boatYPosition = 32;

    while(xMediumIcebergValues.length < 4) {
        xMediumIceberg = 60 + (50 * Math.floor(Math.random()*10));
        yMediumIceberg = 7 + (50 * Math.floor(Math.random()*7));

        xMediumIcebergValues.push(xMediumIceberg);
        yMediumIcebergValues.push(yMediumIceberg);
    }

    while(xSmallIcebergValues.length < 7 ) {
        xSmallIceberg = 65 + (50 * Math.floor(Math.random()*10));
        ySmallIceberg = 5 + (50 * Math.floor(Math.random()*7));

        xSmallIcebergValues.push(xSmallIceberg);
        ySmallIcebergValues.push(ySmallIceberg);
    }
          
    do {
        flagXPosition = 80 + (50 * Math.floor(Math.random()*10));
        flagYPosition = 40 + (50 * Math.floor(Math.random()*7));

    } while((flagXPosition == xSmallIceberg + 15) && (flagYPosition == ySmallIceberg + 35));
    
  
    do {
        holeXPosition = 75 + (50 * Math.floor(Math.random()*10));
        holeYPosition = 25 + (50 * Math.floor(Math.random()*7));

    } while((holeXPosition == flagXPosition - 5) && (holeYPosition == flagYPosition - 15) || (holeXPosition == xSmallIceberg + 10) && (holeYPosition == ySmallIceberg + 20));

    console.log("x values iceberg: " + xMediumIcebergValues);
    console.log("y values iceberg: " + yMediumIcebergValues);
}

function setup() {
    ctx = document.getElementById("drawingSurface").getContext("2d");
    createElementsPositions();
    drawBoard(gameOver);
}

function drawBoard(gameOver) {
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

    if(boatXPosition > 0 && boatYPosition > 0) {
        drawBoat(boatXPosition, boatYPosition);

    }

    //drawHoleCover();

    drawHole(holeXPosition, holeYPosition);

    drawFlagPoint(flagXPosition, flagYPosition);

    drawSmallIceberg(xSmallIcebergValues, ySmallIcebergValues);
    //drawMediumIceberg(xMediumIcebergValues, yMediumIcebergValues);
    //drawBigIceberg(xBigIceberg, yBigIceberg);

    if(gameOver) {
        ctx.font = "60px Georgia";
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black"
        ctx.fillText("Game Over", 150,200);
        ctx.strokeText("Game Over", 150,200);
    }
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

function drawSmallIceberg(xValues,yValues) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "PaleTurquoise";
    ctx.strokeStyle = "DarkBlue";

    for(let i = 0; i < xValues.length; i++) {
        ctx.moveTo(xValues[i],yValues[i]);
        ctx.lineTo(xValues[i],yValues[i]);
        ctx.lineTo(xValues[i]+20,yValues[i]+4);
        ctx.lineTo(xValues[i]+25,yValues[i]+25);
        ctx.lineTo(xValues[i]+15,yValues[i]+40);
        ctx.lineTo(xValues[i]-5,yValues[i]+30);
        ctx.lineTo(xValues[i],yValues[i]+20);
        ctx.lineTo(xValues[i]-5,yValues[i]+10);
        ctx.lineTo(xValues[i],yValues[i]);
        ctx.fill();
        ctx.stroke(); 

    }
    
    ctx.restore();
}

function drawMediumIceberg(xValues,yValues) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "PaleTurquoise";
    ctx.strokeStyle = "DarkBlue";

    for(let i = 0; i < xValues.length; i++) {
        ctx.moveTo(xValues[i],yValues[i]);
        ctx.lineTo(xValues[i],yValues[i]);
        ctx.lineTo(xValues[i]-5,yValues[i]+45);
        ctx.lineTo(xValues[i]+5,yValues[i]+60);
        ctx.lineTo(xValues[i]-5,yValues[i]+80);
        ctx.lineTo(xValues[i]+10,yValues[i]+90);
        ctx.lineTo(xValues[i]+25,yValues[i]+80);
        ctx.lineTo(xValues[i]+35,yValues[i]+45);
        ctx.lineTo(xValues[i]+35,yValues[i]+25);
        ctx.lineTo(xValues[i]+25,yValues[i]+20);
        ctx.lineTo(xValues[i]+30,yValues[i]+5);
        ctx.lineTo(xValues[i],yValues[i]);
        ctx.fill();
        ctx.stroke(); 
    }

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

function drawHoleCover() {
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.fillStyle = "grey"
    ctx.beginPath();
    ctx.arc(75,25,17,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(75, 22, 4, 8, 0*Math.PI, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "grey"
    ctx.ellipse(75, 18, 10, 5, 0*Math.PI, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();

}

function moveBoat(e) {
    
    if(boatXPosition > 0 && boatYPosition > 0) {
        if(e.key == "ArrowUp") {
            if(hitIceberg(boatXPosition,boatYPosition,e)) {
                boatYPosition = boatYPosition;

            } else {
                boatYPosition -= 50;
            }
    
            if(boatYPosition < 0) {
                boatYPosition = 32;
            }
    
        } else if (e.key == "ArrowDown") {
            if(hitIceberg(boatXPosition,boatYPosition,e)) {
                boatYPosition = boatYPosition;
            
            } else {
                boatYPosition += 50;

            }
    
            if(boatYPosition > 400) {
                boatYPosition = 382;
            }
    
        } else if (e.key == "ArrowLeft") {
            if(hitIceberg(boatXPosition,boatYPosition,e)) {
                boatXPosition = boatXPosition;

            } else {
                boatXPosition -= 50;

            }
    
            if(boatXPosition < 0) {
                boatXPosition = 25;
            }
    
        } else if(e.key == "ArrowRight") {
            if(hitIceberg(boatXPosition,boatYPosition,e)) {
                boatXPosition = boatXPosition;

            } else {
                boatXPosition += 50;

            }
    
            if(boatXPosition > 600) {
                boatXPosition = 575;
            }
        }

        distanceBoatAndFlag = distanceCalculation(boatXPosition, boatYPosition, flagXPosition, flagYPosition);
        
        if(distanceBoatAndFlag < 15) {
            flagsCollected++;

            flagXPosition = 80 + (50 * Math.floor(Math.random()*10));
            flagYPosition = 40 + (50 * Math.floor(Math.random()*7));

            document.getElementById("flagsCounter").innerHTML = "Flags collected: " + flagsCollected;
        }

        distanceBoatAndHole = distanceCalculation(boatXPosition, boatYPosition, holeXPosition, holeYPosition);
        
        if(distanceBoatAndHole < 15) {
            boatXPosition = -10;
            boatYPosition = -10;
            gameOver = true;
        }

/** 
        console.log("--")
        console.log("boat y: " + boatYPosition + " iceberg y: " + ySmallIceberg);
        console.log("x boat: " + boatXPosition + " - x iceberg: " + xSmallIceberg);
*/
    }
    
    drawBoard(gameOver);
}

function distanceCalculation(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

function hitIceberg(boatXPosition, boatYPosition, event) {
    let hit = false;

    if(event.key == "ArrowUp") {
        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            xSmallIceberg = xSmallIcebergValues[i];
            ySmallIceberg = ySmallIcebergValues[i];

            if((boatXPosition == xSmallIceberg + 10) && (boatYPosition == ySmallIceberg + 77)) {
                hit = true;
            } 
        }

    } else if(event.key == "ArrowDown") {
        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            xSmallIceberg = xSmallIcebergValues[i];
            ySmallIceberg = ySmallIcebergValues[i];

            if((boatXPosition == xSmallIceberg + 10) && (boatYPosition == ySmallIceberg - 23)) {
                hit = true;
            } 
        }

    } else if(event.key == "ArrowLeft") {
        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            xSmallIceberg = xSmallIcebergValues[i];
            ySmallIceberg = ySmallIcebergValues[i];

            if((boatXPosition == xSmallIceberg + 60) && (boatYPosition == ySmallIceberg + 27)) {
                hit = true;
            } 
        }

    } else if(event.key == "ArrowRight") {
        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            xSmallIceberg = xSmallIcebergValues[i];
            ySmallIceberg = ySmallIcebergValues[i];

            if((boatXPosition == xSmallIceberg - 40) && (boatYPosition == ySmallIceberg + 27)) {
                hit = true;
            } 
        }
    }

    return hit;
}

function resetGame() {
    flagsCollected = 0;
    gameOver = false;
    xSmallIcebergValues = [];
    ySmallIcebergValues = [];
    xMediumIcebergValues = [];
    yMediumIcebergValues = [];
    
    createElementsPositions();
    drawBoard(gameOver);
    
    document.getElementById("flagsCounter").innerHTML = "Flags collected: " + flagsCollected;
}