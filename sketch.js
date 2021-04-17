var spaceship1Img,spaceship2Img,spaceship,angle=0,enemy1Img,enemy2Img,enemy1,rayG,enemy1G,enemy2;
var edges,enemy2G;
var score=0,startImg,state=0,starImg,planet1Img,planet2Img,planet3Img,planet4Img,planet5Img,planet6Img;
var planet7Img,planet,planetG,starG,edges,resetImg,reset,resetG;
function preload(){
  spaceship1Img=loadImage("spaceship1.png");
  spaceship2Img=loadImage("spaceship2.png");
  enemy1Img=loadImage("enemy1.png");
  enemy2Img=loadImage("enemy2.png");
  startImg=loadImage("play.png");
  starImg=loadImage("star.png");
  planet1Img=loadImage("planet1.png");
  planet2Img=loadImage("planet2.png");
  planet3Img=loadImage("planet3.png");
  planet4Img=loadImage("planet4.png");
  planet5Img=loadImage("planet5.png");
  planet6Img=loadImage("planet6.png");
  planet7Img=loadImage("planet7.png");
  resetImg=loadImage("reset.png");
}
function setup() {
  createCanvas(displayWidth,600);
  spaceship = createSprite(100,displayHeight/2);
  spaceship.scale=0.25;
  spaceship.addImage(spaceship1Img);
  rayG=new Group();
  enemy1G=new Group();
  enemy2G=new Group();
  start=createSprite(displayWidth/2,height/2);
  start.addImage(startImg);
  start.scale=0.25;
  planetG=new Group();
  starG=new Group();
  resetG=new Group();
  pauseButtonG=new Group();
  resumeButtonG = new Group();
}

function draw() {
  background(0);  
  edges=createEdgeSprites();
  spaceship.bounceOff(edges);
  if(state!==2&&state!=="pause"){
  spawnStars();
  }
  if(mousePressedOver(spaceship)&&state===0){
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1:spaceship.addImage(spaceship1Img);
      break;
      case 2:spaceship.addImage(spaceship2Img);
      break;
      default:break;
    }
  }
  if(mousePressedOver(start)&&state===0){
    start.visible=false;
    state=1;
  }
  if(keyDown("right")&&state===1){
    spaceship.rotation+=5;
    angle+=5;
  }
  if(keyDown("left")&&state===1){
    spaceship.rotation-=5;
    angle-=5;
  }
  if(keyDown("up")&&state===1){
    spaceship.y-=5;
  }
  if(keyDown("down")&&state===1){
    spaceship.y+=5;
  }
  if(state!==2){
    resetG.setVisibleEach(false);
  }
  if(state===1){
  spawnEnemies1();
  spawnEnemies2();
  spawnPlanets();
  }
  for(var i=0;i<rayG.length;i++){
    if(rayG.get(i).isTouching(enemy1G)){
     enemy1G.destroyEach();
     rayG.get(i).destroy();
     score++;
   }
  }
  for(let j=0;j<rayG.length;j++){
    if(rayG.get(j).isTouching(enemy2G)){
      rayG.get(j).destroy();
      enemy2G.destroyEach();
      score++;
    }
  }
  for(let i=0;i<rayG.length;i++){
    if(rayG.get(i).isTouching(planetG)){
      rayG.get(i).destroy();
    }
  }
  if(planetG.isTouching(enemy1G)){
    enemy1G.destroyEach();
  }
  if(planetG.isTouching(enemy2G)){
    enemy2G.destroyEach();
  }
  if(planetG.isTouching(spaceship)){
    spaceship.visible=false;
    state=2;
    planetG.setVelocityEach(0,0);
    planetG.setLifetimeEach(-1);
    enemy1G.setVelocityEach(0,0);
    enemy1G.setLifetimeEach(-1);
    enemy2G.setVelocityEach(0,0);
    enemy2G.setLifetimeEach(-1);
    starG.setVelocityEach(0,0);
    starG.setLifetimeEach(-1);
    rayG.destroyEach(); 
  }
  if(enemy1G.isTouching(spaceship)){
    enemy1G.destroyEach();
    spaceship.visible=false;
    enemy2G.setVelocityEach(0,0);
    enemy2G.setLifetimeEach(-1);
    planetG.setVelocityEach(0,0);
    planetG.setLifetimeEach(-1);
    state=2;
    starG.setVelocityEach(0,0);
    starG.setLifetimeEach(-1);
  }
  if(enemy2G.isTouching(spaceship)){
    enemy2G.destroyEach();
    enemy1G.setVelocityEach(0,0);
    enemy1G.setLifetimeEach(-1);
    planetG.setVelocityEach(0,0);
    planetG.setLifetimeEach(-1);
    spaceship.visible=false;
    state=2;
    starG.setVelocityEach(0,0);
    starG.setLifetimeEach(-1);
  }
  if(state===2){
    restart();
  }
  if(state===2&&mousePressedOver(reset)){
    planetG.destroyEach();
    enemy1G.destroyEach();
    enemy2G.destroyEach();
    state=0;
    start.visible=true;
    starG.destroyEach();
    spaceship.visible=true;
    spaceship.x=100;
    spaceship.y=displayHeight/2;
    spaceship.rotation=0;
    angle=0;
    score=0;
  }
  drawSprites();
  fill(255);
  textSize(20);
  text("Score:"+'\t'+score,displayWidth-260,30);
}
function keyPressed(){
  if(keyCode === 32&&state===1){
 var ray1=createSprite(spaceship.x+2,spaceship.y+18,20,5);
 ray1.shapeColor="red";
 ray1.rotation=angle;
 ray1.setSpeedAndDirection(5,angle);
 var ray2=createSprite(spaceship.x+2,spaceship.y-18,20,5);
 ray2.shapeColor="yellow";
 ray2.rotation=angle;
 ray2.setSpeedAndDirection(5,angle);   
 rayG.add(ray1);
 rayG.add(ray2);
  }
}
function spawnEnemies1(){
  if(World.frameCount%300===0){
    enemy1=createSprite(displayWidth,random(0,600));
    enemy1.addImage(enemy1Img);
    enemy1.scale=0.25;
    enemy1.velocityX=-5-(score/2);
    enemy1.lifetime=displayWidth/(5+score/2);
    enemy1G.add(enemy1);
  }
    }
    function spawnEnemies2(){
      if(World.frameCount%430===0){
        enemy2=createSprite(displayWidth,random(0,600));
        enemy2.addImage(enemy2Img);
        enemy2.scale=0.25;
        enemy2.velocityX=-5-(score/2);
        enemy2.lifetime=displayWidth/5;
        enemy2G.add(enemy2);
      }
        }
function spawnStars(){
  if(World.frameCount%5===0){
  var star=createSprite(displayWidth,random(0,600));
  star.addImage(starImg);
  star.scale=0.025;
  star.velocityX=-2-(score/4);
  star.lifetime=displayWidth/(2+score/4);
  star.depth=start.depth;
  start.depth+=1;
  star.depth=spaceship.depth;
  spaceship.depth+=1;
  starG.add(star);
  }
}
function spawnPlanets(){
  if(World.frameCount%280===0){
  planet=createSprite(displayWidth,random(0,600));
  planet.scale=0.5;
  planet.velocityX=-5-(score/2);
  planet.lifetime=displayWidth/(5+score/2);
  planetG.add(planet);
  var rand=Math.round(random(1,5));
  switch(rand){
    case 1:planet.addImage(planet1Img);
    break;
    case 2:planet.addImage(planet2Img);
    break;
    case 3:planet.addImage(planet3Img);
    break;
    case 4:planet.addImage(planet4Img);
    break;
    case 5:planet.addImage(planet5Img);
    break;
    default:break;
  }
  }
}
function restart(){
  reset=createSprite(displayWidth/2,displayHeight/3-50);
  reset.addImage(resetImg);
  reset.scale=0.25;
  resetG.add(reset);
}