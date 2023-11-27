let ctx;
let boatXPosition;
let boatYPosition;
let boatMovement;
let movementList = [];
let movement = "";
let index;
let direction = "";
let xMediumIcebergValues = [];
let yMediumIcebergValues = [];
let xSmallIcebergValues = [];
let ySmallIcebergValues = [];
let xMediumIceberg;
let yMediumIceberg;
let xSmallIceberg;
let ySmallIceberg;
let holeXPosition;
let holeYPosition;
let flagXPosition;
let flagYPosition;
//let xBigIceberg = 425;
//let yBigIceberg = 55;
let flagsCollected = 0;
let distanceBoatAndFlag;
let distanceBoatAndHole;
let distanceBoatSmallIceberg;
let gameOver = false;

function setup() {
    ctx = document.getElementById("drawingSurface").getContext("2d");
    createElementsPositions();
    drawBoard(gameOver);
}

function createElementsPositions() {
    boatXPosition = 25;
    boatYPosition = 32;

    while(xMediumIcebergValues.length < 4) {
        let samePosition = false;
        xMediumIceberg = 60 + (50 * Math.floor(Math.random()*10));
        yMediumIceberg = 7 + (50 * Math.floor(Math.random()*7));
        
        for(let i = 0; i < xMediumIcebergValues.length; i++) {
            if(xMediumIceberg == xMediumIcebergValues[i] || yMediumIceberg == yMediumIcebergValues[i]) {
                samePosition = true;
            }
        }

        if(!samePosition) {
            xMediumIcebergValues.push(xMediumIceberg);
            yMediumIcebergValues.push(yMediumIceberg);
        }
    }

    while(xSmallIcebergValues.length < 7 ) {
        let samePosition = false;
        xSmallIceberg = 65 + (50 * Math.floor(Math.random()*10));
        ySmallIceberg = 5 + (50 * Math.floor(Math.random()*7));

        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            if(xSmallIceberg == xSmallIcebergValues[i] || ySmallIceberg == ySmallIcebergValues[i]) {
                samePosition = true;
            }
        }

        for(let i = 0; i < xMediumIcebergValues.length; i++) {
            if(xSmallIceberg == xMediumIcebergValues[i] + 5 && ySmallIceberg == yMediumIcebergValues[i] + 48) {
                samePosition = true;

            } else if (xSmallIceberg == xMediumIcebergValues[i] + 5 && ySmallIceberg == yMediumIcebergValues[i] - 2) {
                samePosition = true;
            }
        }

        if(!samePosition) {
            xSmallIcebergValues.push(xSmallIceberg);
            ySmallIcebergValues.push(ySmallIceberg);
        }
    }
          
    do {
        holeXPosition = 75 + (50 * Math.floor(Math.random()*10));
        holeYPosition = 25 + (50 * Math.floor(Math.random()*7));
        
    } while(isSamePosition(holeXPosition, holeYPosition, xMediumIcebergValues, yMediumIcebergValues, xSmallIcebergValues, ySmallIcebergValues));

    do {
        flagXPosition = 80 + (50 * Math.floor(Math.random()*10));
        flagYPosition = 40 + (50 * Math.floor(Math.random()*7));

    } while(!validFlagPosition(flagXPosition, flagYPosition, holeXPosition, holeYPosition, xMediumIcebergValues, yMediumIcebergValues, xSmallIcebergValues, ySmallIcebergValues));
          
    // console.log("--");
    // console.log("x values m iceberg: " + xMediumIcebergValues);
    // console.log("y values m iceberg: " + yMediumIcebergValues);
    // console.log("x values s iceberg: " + xSmallIcebergValues);
    // console.log("y values s iceberg: " + ySmallIcebergValues);
    // console.log("x hole: " + holeXPosition + " - y hole: " + holeYPosition);
    // console.log("x flag: " + flagXPosition + " - y flag: " + flagYPosition);

}

function isSamePosition(x, y, xValues1, yValues1, xValues2, yValues2) {
    let samePosition = false;

    for(let i = 0; i < xValues1.length; i++) {
        let xValue = xValues1[i];
        let yValue = yValues1[i];

        if((x == xValue + 15) && (y == yValue + 18) || (x == xValue + 15) && (y == yValue + 68)) {
            samePosition = true;
        }
    }

    for(let i = 0; i < xValues2.length; i++) {
        let xValue = xValues2[i];
        let yValue = yValues2[i];

        if((x == xValue + 10) && y == yValue + 20) {
            samePosition = true;
        }
    }
    return samePosition;
}

function validFlagPosition(xFlag, yFlag, xHole, yHole, xValues1, yValues1, xValues2, yValues2) {
    let validPosition = true;

    if((xFlag == xHole + 5) && (yFlag == yHole + 15)) {
        validPosition = false;
    }

    for(let i = 0; i < xValues1.length; i++) {
        let xIceberg = xValues1[i];
        let yIceberg = yValues1[i];

        if((xFlag == xIceberg + 20) && (yFlag == yIceberg + 33) || (xFlag == xIceberg + 20) && (yFlag == yIceberg + 83)) {
            validPosition = false;
        }
    }

    for(let i = 0; i < xValues2.length; i++) {
        let xIceberg = xValues2[i];
        let yIceberg = yValues2[i];

        if((xFlag == xIceberg + 15) && (yFlag == yIceberg + 35)) {
            validPosition = false;
        }
    }
    return validPosition;
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

    drawHole(holeXPosition, holeYPosition);
    drawFlagPoint(flagXPosition, flagYPosition);
    drawSmallIceberg(xSmallIcebergValues, ySmallIcebergValues);
    drawMediumIceberg(xMediumIcebergValues, yMediumIcebergValues);
    //drawHoleCover();
    //drawBigIceberg(xBigIceberg, yBigIceberg);

    if(gameOver) {
        ctx.font = "60px Georgia";
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black"
        ctx.fillText("Game Over", 150,200);
        ctx.strokeText("Game Over", 150,200);
    }
}

function saveMovements(e) {    
    if(e.key == "ArrowUp") {
        movement = "Up";
        
    } else if(e.key == "ArrowRight") {
        movement = "Right";
       
    } else if(e.key == "ArrowDown") {
        movement = "Down";
        
    } else if(e.key == "ArrowLeft") {
        movement = "Left";
    }
    
    if(movement.length > 0 && movementList.length < 5) {
        movementList.push(movement);
        movement = "";
    }

    document.getElementById("movements").innerHTML = "Movement Program: " + movementList;
   
    // console.log(movementList);
}

function runProgram() {
    index = 0;
    boatMovement = setInterval(moveBoat, 500);
}

function moveBoat() {
    direction = movementList[index];
    
    if(index == 5) {
        clearInterval(boatMovement);
        document.getElementById("movements").innerHTML = "Movement Program: ";
        movementList = [];
        return;

    } else {
        if(direction == "Up") {
            if(hitIceberg(boatXPosition,boatYPosition,direction)) {
                boatYPosition = boatYPosition;
    
            } else {
                boatYPosition -= 50;
            }
    
            if(boatYPosition < 0) {
                boatYPosition = 32;
            }
    
        } else if (direction == "Down") {
            if(hitIceberg(boatXPosition,boatYPosition,direction)) {
                boatYPosition = boatYPosition;
            
            } else {
                boatYPosition += 50;
            }
    
            if(boatYPosition > 400) {
                boatYPosition = 382;
            }
        
        } else if (direction == "Left") {
            if(hitIceberg(boatXPosition,boatYPosition,direction)) {
                boatXPosition = boatXPosition;
    
            } else {
                boatXPosition -= 50;
            }
    
            if(boatXPosition < 0) {
                boatXPosition = 25;
            }
    
        } else if(direction == "Right") {
            if(hitIceberg(boatXPosition,boatYPosition,direction)) {
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
    
            do {
                flagXPosition = 80 + (50 * Math.floor(Math.random()*10));
                flagYPosition = 40 + (50 * Math.floor(Math.random()*7));
        
            } while(!validFlagPosition(flagXPosition, flagYPosition, holeXPosition, holeYPosition, xMediumIcebergValues, yMediumIcebergValues, xSmallIcebergValues, ySmallIcebergValues));
            
            document.getElementById("score").innerHTML = "Score: " + flagsCollected * 100;
        }
    
        distanceBoatAndHole = distanceCalculation(boatXPosition, boatYPosition, holeXPosition, holeYPosition);
        
        if(distanceBoatAndHole < 15) {
            boatXPosition = -10;
            boatYPosition = -10;
            gameOver = true;
        } 
    }
    
    index++;
    
    // console.log("--")
    // console.log("x boat: " + boatXPosition + " - boat y: " + boatYPosition);
    // console.log("x iceb: " + xMediumIceberg + " - y iceb: " + yMediumIceberg);
    // console.log(xMediumIcebergValues);
    // console.log(yMediumIcebergValues);
    console.log(movementList);
    drawBoard(gameOver);
}

function distanceCalculation(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

function hitIceberg(boatXPosition, boatYPosition, direction) {
    let hit = false;

    if(direction == "Up") {
        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            xSmallIceberg = xSmallIcebergValues[i];
            ySmallIceberg = ySmallIcebergValues[i];

            if((boatXPosition == xSmallIceberg + 10) && (boatYPosition == ySmallIceberg + 77)) {
                hit = true;
            } 
        }

        for(let i = 0; i < xMediumIcebergValues.length; i++) {
            xMediumIceberg = xMediumIcebergValues[i];
            yMediumIceberg = yMediumIcebergValues[i];

            if((boatXPosition == xMediumIceberg + 15) && (boatYPosition == yMediumIceberg + 125)) {
                hit = true;
            }
        }

    } else if(direction == "Down") {
        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            xSmallIceberg = xSmallIcebergValues[i];
            ySmallIceberg = ySmallIcebergValues[i];

            if((boatXPosition == xSmallIceberg + 10) && (boatYPosition == ySmallIceberg - 23)) {
                hit = true;
            } 
        }

        for(let i = 0; i < xMediumIcebergValues.length; i++) {
            xMediumIceberg = xMediumIcebergValues[i];
            yMediumIceberg = yMediumIcebergValues[i];

            if((boatXPosition == xMediumIceberg + 15) && (boatYPosition == yMediumIceberg - 25)) {
                hit = true;
            }
        }

    } else if(direction == "Left") {
        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            xSmallIceberg = xSmallIcebergValues[i];
            ySmallIceberg = ySmallIcebergValues[i];

            if((boatXPosition == xSmallIceberg + 60) && (boatYPosition == ySmallIceberg + 27)) {
                hit = true;
            } 
        }

        for(let i = 0; i < xMediumIcebergValues.length; i++) {
            xMediumIceberg = xMediumIcebergValues[i];
            yMediumIceberg = yMediumIcebergValues[i];

            if((boatXPosition == xMediumIceberg + 65) && (boatYPosition == yMediumIceberg + 25) || (boatXPosition == xMediumIceberg + 65) && (boatYPosition == yMediumIceberg + 75)) {
                hit = true;
            }
        }

    } else if(direction == "Right") {
        for(let i = 0; i < xSmallIcebergValues.length; i++) {
            xSmallIceberg = xSmallIcebergValues[i];
            ySmallIceberg = ySmallIcebergValues[i];

            if((boatXPosition == xSmallIceberg - 40) && (boatYPosition == ySmallIceberg + 27)) {
                hit = true;
            } 
        }

        for(let i = 0; i < xMediumIcebergValues.length; i++) {
            xMediumIceberg = xMediumIcebergValues[i];
            yMediumIceberg = yMediumIcebergValues[i];

            if((boatXPosition == xMediumIceberg - 35) && (boatYPosition == yMediumIceberg + 25) || (boatXPosition == xMediumIceberg - 35) && (boatYPosition == yMediumIceberg + 75)) {
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
    movementList = [];
    
    createElementsPositions();
    drawBoard(gameOver);
    
    document.getElementById("score").innerHTML = "Score: " + flagsCollected;
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
