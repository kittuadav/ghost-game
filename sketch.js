var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,500);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background(200);
  if(gameState==="play"){

  
  if(tower.y > 400){
      tower.y = 300
    }
    drawSprites();
    if(keyDown("left")){
       ghost.x=ghost.x-2;
    }
    if(keyDown("right")){
      ghost.x=ghost.x+2;
    }
    if(keyDown("space")){
      ghost.velocityY=-4;

    }
   //spookySound.loop();
     ghost .velocityY=ghost.velocityY+0.5;  
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      gameState="end";
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    doors();
  }
  if(gameState==="end"){
    fill('red')
    textSize(30);
    text("GAME OVER",200,300);
  }
}

function doors(){
  if(frameCount%200===0){
    door = createSprite(random(100,500),0);
    door.addImage("door",doorImg);
    door.velocityY=1;
    doorsGroup.add(door);
    door.lifetime=600;

    climber = createSprite(door.x,door.y+60)
    climber.addImage("climber",climberImg);
    climber.velocityY=1;
    climbersGroup.add(climber);
    climber.lifetime=600;

    invisibleBlock = createSprite(door.x,climber.y+10,climber.width,2);
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=false;
    invisibleBlock.visible=false;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime=600;
   
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;

  }
    
}
