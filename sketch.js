var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullets, bulletsImg, bullets_shooting;
var obstacle, obstacleImg;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  obstacleImg = loadImage("assets/zombie.png")

  bullet = loadImage("assets/bullet.png")

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

  //creating the player sprite
  player = createSprite(displayWidth-1310, displayHeight-250, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = false
  player.setCollider("rectangle",0,0,300,300)

  obstaclesGroup = createGroup();

}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
  
    player.addImage(shooter_shooting)
  
  }

  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }

  spawnObstacle();
  drawSprites();

}

function spawnObstacle () { 
  //write code here to spawn the obstacle
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(windowWidth-100,windowHeight-100,10,10);
    obstacle.y = Math.round(random(windowHeight-700,windowHeight-50));
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    
    //assign lifetime to the variable
    obstacle.lifetime = 200;
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

//creating the cannon ball on key press
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    var bullets = new bullets(bullets.x, bullets.y);
    bullets.trajectory = []
    bullets.push(bullets);
  }
}

// function to show the ball.
function bullets() {
  bullets.display();
  if (bullets.body.position.x >= width || bullets.body.position.y >= height - 50) {
    Matter.World.remove(world, bullets.body);
    bullets.splice(index, 1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    bullets[bullets.length - 1].shoot();
  }
}



