var context, controller, character, loop, kill, kill2, kill3;
//creating canvas;
context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 180;
context.canvas.width = 320;


//create our character;
character = {
  height:30,
  width:5,
  jumping:true,
  x:7,
  x_velocity:0,
  y:0,
  y_velocity:0,
  get bottom() { return this.y + this.height; },
  get left() { return this.x; },
  get right() { return this.x + this.width; },
  get top() { return this.y; },
  testCollision:function(rectangle) {

    if (this.top > rectangle.bottom || this.right < rectangle.left || this.bottom < rectangle.top || this.left > rectangle.right) {

      return false;

    }

    return true;

  }
};

kill = {
    height:10,
    width:20,
    x:70,
    y:0,
    y_velocity:0,
    get bottom() { return this.y + this.height; },
    get left() { return this.x; },
    get right() { return this.x + this.width; },
    get top() { return this.y; },
    testCollision:function(rectangle) {

    if (this.top > rectangle.bottom || this.right < rectangle.left || this.bottom < rectangle.top || this.left > rectangle.right) {

      return false;

    }

    return true;

  }
};

kill2 = {
    height:10,
    width:20,
    x:170,
    y:180 - 70 -10,
    y_velocity:0,
    get bottom() { return this.y + this.height; },
    get left() { return this.x; },
    get right() { return this.x + this.width; },
    get top() { return this.y; },
    testCollision:function(rectangle) {

    if (this.top > rectangle.bottom || this.right < rectangle.left || this.bottom < rectangle.top || this.left > rectangle.right) {

      return false;

    }

    return true;

  }
};

kill3 = {
    height:10,
    width:20,
    x:270,
    y:180 - 70 -10,
    y_velocity:0,
    get bottom() { return this.y + this.height; },
    get left() { return this.x; },
    get right() { return this.x + this.width; },
    get top() { return this.y; },
    testCollision:function(rectangle) {

    if (this.top > rectangle.bottom || this.right < rectangle.left || this.bottom < rectangle.top || this.left > rectangle.right) {

      return false;

    }

    return true;

  }
};

controller = {
  left:false,
  right:false,
  up:false,
  keyListener:function(event) {
    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {
      case 37:
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;
    }
  }
};



loop = function() {
  if (controller.up && character.jumping == false) {
    character.y_velocity -= 15;
    character.jumping = true;
  }

  if (controller.left) {
    character.x_velocity -= 0.3;
  }
    
  if (controller.right) {
    character.x_velocity += 0.3;
  }

  character.y_velocity += 1.5;// gravity
  character.x_velocity *= 0.9;// friction
  character.y_velocity *= 0.9;// friction

    
  //!!!!!!!!!this is what makes the ball move
  character.x += character.x_velocity;
  console.log(character.x);
  character.y += character.y_velocity;
    
  //!!!!!!!!! 
    
  
    
  if (kill.testCollision(character)) {
      alert("gameover" + "restart click refresh button in the browser");
      character.x = 7;
      controller.left = false;
      controller.right = false;
      controller.up = false;
      kill.y = 0;
  }
    
  if (kill2.testCollision(character)) {
      alert("gameover" + "restart click refresh button in the browser");
      character.x = 7;
      controller.left = false;
      controller.right = false;
      controller.up = false;
      kill.y = 0;
      clearInterval(kInterval);
      clearInterval(k3Interval);
  } 
    
  if (kill3.testCollision(character)) {
      alert("gameover" + "restart click refresh button in the browser");
      character.x = 7;
      controller.left = false;
      controller.right = false;
      controller.up = false;
      kill.y = 0;
      kill3.y = 180 -70 -10;
      clearInterval(kInterval);
      clearInterval(k3Interval);
  } 
    
    
  function killani(){
      kill.y += 2;
  }

  function kill3ani(){
      kill3.y -= 1 ;
  }
  
  if (58.5 <= character.x && character.x <= 62) {
      var kInterval = setInterval(killani, 1);
  } else if (250 <= character.x && character.x <= 290&& character.jumping == true) {
      var k3Interval = setInterval(kill3ani, 1);
  }
  if(kill.y > 170) {
      clearInterval(kInterval);
      kill.y = 170;
  }
  if (kill3.y < 10) {
      clearInterval(k3Interval);
      kill.y = 10;
  }
    
    
  // collider bottom
  if (character.y > 180 - 70 - 30) {
    character.jumping = false;
    character.y = 180 - 70 -30;
    character.y_velocity = -4;
    character.y_velocity = -2;
    character.y_velocity = 0;
    
  }

  // icollider left
  if (character.x < 5) {
    character.x = 5;
      
  } //collider right
    else if (character.x > 315) {
    alert("nextLevel")
    character.x = 7;
  }
  
    //drawing everything on canvas
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 320, 180);// x, y, width, height
  context.fillStyle = "#0000FF";
  context.beginPath();
  context.fillRect(character.x, character.y, character.width, character.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 110);
  context.lineTo(320, 110);
  context.stroke();
  context.fillStyle = "#FF0000"
  context.fillRect(kill.x,kill.y, kill.width, kill.height)
  context.fillRect(kill2.x,kill2.y, kill2.width, kill2.height)
  context.fillRect(kill3.x,kill3.y, kill3.width, kill3.height)

  // update
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);