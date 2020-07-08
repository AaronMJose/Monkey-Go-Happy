//Global Variables
var bananaimage,obstacleimage,obstacleGroup,BackGround,score,player_running,backGround,ground,player,bananaGroup,player_standing

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY ;


function preload(){
  BackGround=loadImage("jungle.jpg");
  
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaimage = loadImage("Banana.png");
  obstacleimage = loadImage("stone.png");
  
  player_standing = loadImage("Monkey_07.png");
}


function setup() {
  createCanvas(800,400);
 backGround = createSprite(0,0,800,400);
  backGround.addImage("bg",BackGround);
   backGround.x = backGround.width/2; 
  backGround.velocityX=-3;
     backGround.scale = 1.5;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.velocityX = -3;
  ground.visible = false;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("pr",player_running);
  player.scale= 0.08;
  player.addAnimation("ps",player_standing);

  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
}



function draw(){
 background(255);
  
  player.collide(ground);
  obstaclesGroup.collide(ground);
  
  if(gameState===PLAY){
  if(ground.x<0){
   ground.x = ground.width/2; 
  }
 if(backGround.x <0){
  backGround.x = backGround.width/2; 
 }
 
     banana();
  obstacle();
  
  if(keyDown("space")){
   player.velocityY = -3; 
  }
  player.velocityY = player.velocityY + 0.07 ;
  
  
  for(var i = 0;i<bananaGroup.length;i=i+1){
  if(bananaGroup.get(i).isTouching(player)){
    bananaGroup.get(i).destroy();
    score = score+2;
  }
  }
    switch(score){
      case 10:player.scale= 0.12;
        break;
       case 20:player.scale= 0.14
        break;
         case 30:player.scale = 0.16
          break;
          case 40:player.scale = 0.18
           break;
           default: break;
    
}
  if(player.isTouching(obstaclesGroup)){
      for(var j = 0;j<obstaclesGroup.length;j=j+1){
  if(obstaclesGroup.get(j).isTouching(player)){
    obstaclesGroup.get(j).destroy();
  }
    score = 0
    player.scale =0.09;
         
  }
  }  
  }
  if(score===0 && player.scale===0.09 ){
  gameState=END;
    
  }
  
  drawSprites();
  
  if (gameState === END){
    textSize ( 30 );
    fill("white");
    text("GAME OVER",200,200);
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    backGround.velocityX = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
     player.changeAnimation("ps",player_standing);
  }
  
  
   fill("white");
  textSize(20);
   text("Score:"+score,500,50);
}

function banana(){
  if(frameCount%80===0){
    var r = random(120,200);
    var bananaFood = createSprite(600,r,10,10);
    bananaFood.scale = 0.05;
    bananaFood.addImage("bn",bananaimage);
    bananaFood.velocityX = -3;
    bananaFood.lifetime = 410;
    bananaGroup.add(bananaFood);
  }
}

function obstacle(){
  if(frameCount%300===0){
    var obstacles = createSprite(800,350,10,40);
    obstacles.addImage("St",obstacleimage);
    obstacles.scale = 0.2;
    obstacles.velocityX = -3;
    obstacles.lifetime = 410;
    obstacles.depth = player.depth;
    player.depth = player.depth + 1;
    obstaclesGroup.add(obstacles);
  
  }
}

