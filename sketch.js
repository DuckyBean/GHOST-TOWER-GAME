var PLAY = 1;
var END = 0;
var gameState = PLAY;


var towerImage, tower;
var doorImage, door, doorGroup;
var climberImage, climber, climberGroup;
var ghost, ghostImage,ghost_moving,ghost_standing;
var invisclimber, invisclimberGroup;
var music

function preload() {
  
  towerImage = loadImage("tower.png");

  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  
  ghost_moving = loadAnimation("ghost-standing.png","ghost-jumping.png");
  
  ghost_standing = loadAnimation("ghost-standing.png");
  
  music = loadSound("spooky.wav");
  
  
}




function setup() {
 createCanvas(600, 600); 
  
 tower = createSprite(300,0,20,20);
 tower.addImage("tower.png",towerImage);
 tower.velocityY = 5
  
  music.loop();
  
  ghost = createSprite(300,300,20,20);
  ghost.addAnimation("moving",ghost_moving);
  ghost.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisclimberGroup = new Group();
  
}






function draw() {
  background("turquoise")
  var edges = createEdgeSprites();
  
  if (gameState === PLAY){
    ghost.addAnimation("moving",ghost_moving);
    ghost.changeAnimation("moving",ghost_moving);

    if(tower.y > 600) {
      tower.y = 0;
    }

    spawnDoor();


    if(keyDown("up")) {
      ghost.velocityY = -8;
    }
    ghost.velocityY = ghost.velocityY + 0.8

    if(keyDown("left")) {
      ghost.velocityX = -8
    }
    if(keyDown("right")) {
      ghost.velocityX = 8
    }


    if(ghost.isTouching(climberGroup)) {
      ghost.velocityY = 0;
      ghost.velocityX = 0;
      ghost.addAnimation("ghost-standing.png",ghost_standing);
      ghost.changeAnimation("ghost-standing.png",ghost_standing);
    }
    if(ghost.isTouching(invisclimberGroup)) {
      gameState = END;
    }
    
    if(ghost.y > 600) {
      gameState = END;
    }
    

    drawSprites();
  }
  
   if (gameState===END) {
     stroke("yellow");
     textSize(50);
     fill("yellow");
     text("GameOver",200,300)
   }
}




function spawnDoor() {
  if(frameCount % 100 === 0) {
    door = createSprite(300,0,20,20)
    door.addImage("door.png", doorImage);
    door.velocityY = 5;
    door.x = random(150,450);
    door.lifetime = 650/5;
    
    door.depth = ghost.depth - 1;
    
    doorGroup.add(door);
    
    climber = createSprite(door.x,door.y + 50,20,20)
    climber.addImage("climber.png", climberImage);
    climber.velocityY = 5;
    climber.lifetime = 650/5;
    
    climber.depth = door.depth + 1;
    
    climberGroup.add(climber);
    
    invisclimber = createSprite(climber.x,climber.y + 15,100,20)
    invisclimber.velocityY = 5;
    invisclimber.lifetime = 650/5;
    invisclimber.visible = false;
    
    invisclimberGroup.add(invisclimber);
  }
}