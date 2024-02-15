# Boat Game

![image](https://github.com/lucaso-silva/boatGame/assets/97140968/cc160a4e-84fe-4040-b95b-08497d919026)

### [Play the game](https://lucaso-silva.github.io/boatGame/)

## Overview
This game was developed using JavaScript. 

It was developed at the end of the course Introduction to Web Programming, as one of the criteria for evaluation. The game needs to involve a player moving around a grid. One goal element will score points if the player moves to it. There will be an enemy element that will end the game if the player touches it.

> Status: Concluded ✔️

---

### Objectives
- Create a function that draws everything involved in the game. The pictures should be drawn on canvas. ✅
- As an advanced feature, walls can be used to restrict movement around the board. ✅
- Instead of moving immediately when the user presses an arrow key, a command will be added to their program to move up, down, etc. A complete program will consist of exactly 5 commands and only a complete program can be executed. ✅
- When the user clicks on the button to run the player program, the commands are executed one by one using an interval. ✅
- Each time a command is executed, the enemy will also move once ✅

## Built with
- HTML ``<canvas>`` element
- JavaScript

## What I learned
Through this project, I could improve my knowledge and apply a lot of concepts about JavaScript programming. 
Using the HTML <canvas> element, I could see how elements can be drawn and displayed making it possible to interact with the user. 

The properties in the JS Array object were largely used in this project, through them it was possible to store the information about the positions of each iceberg, and the user movements for example.

The ```setInterval( )``` method was responsible for making the game run. The interval created was assigned to the ```boatMovement``` variable, which needed to be reset after each five turns, using the method ```clearInterval( )``` and assigned to ```undefined```.

```JavaScript 
function runProgram() {
    if(!gameOver) {
        if(movementList.length == 5 && boatMovement == undefined) {
            turn = 1;
            boatMovement = setInterval(moveBoat, 900);
            (...)
        }   
```
```JavaScript
function moveBoat() {
    let direction = movementList.splice(0,1);

    if(turn == 6 || gameOver) {
        clearInterval(boatMovement);
        boatMovement = undefined;
        (...)
    }       
    
```

### Useful Resources
- [Mdn Web docs](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) - setInterval() global function
- [Mdn Web docs](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) - clearInterval() global function

---
### Acknowledgments
- Instructor Chris Schmidt, Langara College
