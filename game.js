var character = document.getElementById("character");
var interval;
var both = 0;
var gravitySpeed = 0;
var speedX = 0;
var speedY = 0;
var up = 0;
var jumping = false;


console.log();

function moveLeft() {
    if (speedX <= 2) {
        speedX += 0.5;
    }
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - speedX + "px";
    }
}

function moveRight() {
    if (speedX <= 2) {
        speedX += 0.5;
    }
    var right = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(right<580){
        character.style.left = right + speedX + "px";
    }
}

function frictionLeft(){
    speedX *= 0.8;
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - speedX + "px";
    }
}

function frictionRight(){
    speedX *= 0.8;
    var right = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(right < 580){
        character.style.left = right + speedX + "px";
    }
}

document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
        if (event.key === " ") {
            
        }
    }
});

document.addEventListener("keyup", event => {
    if(event.key==="ArrowLeft"){
        both = 0;
        clearInterval(interval);
        var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        if(left>0){
        character.style.left = left - speedX*0.3 + "px";
        }
    }
    if(event.key==="ArrowRight"){
        both = 0;
        clearInterval(interval);
        var right = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        if(right < 580){
        character.style.left = right + speedX*0.3 + "px";
        }
    }
});

function gravity(){
    gravitySpeed += 3;
    gravitySpeed *= 0.9;
    
    var vertical = parseInt(window.getComputedStyle(character).getPropertyValue("top"))
    if (vertical < 270){
        character.style.top = vertical + gravitySpeed + "px"
    }
}

function jump(){
    if (jumping == false) {
        jumping = true;
        gravitySpeed -= 30;
    }
}


var yInterval = setInterval(gravity, 20);



