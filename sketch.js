var PLAY = 1;
var END = 0;


var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var ground
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 200);
  monkey = createSprite(50,120,20,50);
  
   monkey.addAnimation("running", monkey_running);
monkey.velocityY=-4
  monkey.scale = 0.1;
  
  ground = createSprite(150,150,1200,10);
  ground.velocityX=-6
  ground.x = ground.width /2;
 
invisibleGround = createSprite(151,151,1111100,10);
     invisibleGround.x = invisibleGround.width /2;
  invisibleGround.velocityX=-6
  invisibleGround.visible = false;

obstaceGroup=new Group()
  bananaGroup=new Group()
}


function draw() {
background("white")
   text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(invisibleGround);
     spawnObstace() 
spawnBanana()
  
    if(obstaceGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
            bananaGroup.setVelocityXEach(0);
          obstaceGroup.setVelocityXEach(0);
    obstaceGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
   text("GameOver",300,100)
  }
   drawSprites();
}
function spawnBanana() {
 
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(10,90));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX=-3
     banana.lifetime = 200;
  banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana)
     }
}
function spawnObstace() {
  if(frameCount % 60 === 0) {
    var  obstace = createSprite(140,140,10,40);
    obstace.addImage( obstaceImage)
  obstace.x=Math.round(random(600,700))
    obstace.scale = 0.1;
     obstace.velocityX=-3
    obstace.lifetime = 300;
obstaceGroup.add(obstace)
  }
  }