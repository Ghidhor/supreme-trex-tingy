var PLAY = 1;
var END = 0;
var DORITOED = 3;
var gameState = PLAY;

var trex, trex_running, trex_collided,trex_doritoed;
var ground, invisibleGround, groundImage;
var youveBeenDoritoed,youveBeenDoritoedImg;
var miniDoritoImg , miniDoritoGroup
var manaBallGroup,manaballimage
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var coinGroup,coin1 , doubleCoinGroup , coin2;
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var badBirdGroup  , badBirdAnimation
var SupahHotFiyah , fireyImage , shootEm , kaBoom , manapoints
var hotSaucerGroup , hotSaucerImg
var manaGroup , manaImage 





function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png","trex3.5.png","trex4.png","trex3.5.png","trex3.png","trex2.png","trex1.png");
  trex_collided = loadAnimation("trex_collided.png");
  badBirdAnimation = loadAnimation("BadBird1.png","BadBird1.3.png","BadBird1.8.png","BadBird2.png","BadBird1.8.png","BadBird1.3.png")
  groundImage = loadImage("ground2.png");
  manaImage = loadImage("tseriessucksbutthismanadosent.png")
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  coin2 = loadImage("AllthemodiumDouble.png")
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  coin1=loadImage("Allthemodium.png")
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  fireyImage = loadImage("Fireball.png")
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("calm3.ogg")
  checkPointSound = loadSound("checkPoint.mp3")
  shootEm = loadSound("minecraft-creeper-fuse.mp3")
  kaBoom = loadSound("kabaam.mp3")
  hotSaucerImg = loadImage("HotSaucerAndDoritoer.png")
  youveBeenDoritoedImg = loadImage("Untitled.png")
  miniDoritoImg = loadImage("doritoPorjectile.png")
}

function setup() {
createCanvas(displayWidth,displayHeight);

  var message = "This is a message";
 console.log(message)
  
  trex = createSprite(20,50,20,50);

  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  
 
  trex.scale =0.5;
  
  ground = createSprite(displayWidth/2,displayHeight -20,displayWidth,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOverImg);
  youveBeenDoritoed = createSprite(displayWidth/2,displayHeight/2);
  youveBeenDoritoed.addImage(youveBeenDoritoedImg); 
  restart = createSprite(displayWidth/2,gameOver.y - 50);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(displayWidth/2,displayHeight -10,displayWidth,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  coinGroup = createGroup();
  badBirdGroup = createGroup();
  SupahHotFiyah = createGroup();
  doubleCoinGroup = createGroup();
  hotSaucerGroup = createGroup();
  miniDoritoGroup = createGroup();
  manaGroup = createGroup();
  manaBallGroup = createGroup();
  trex.setCollider("circle",0,0,45);
  trex.debug = false
  obstaclesGroup.debug = true
  score = 0;
  manapoints = 1000000
  
}

function draw() {
  
  background(0,200,255);
  //displaying score
  text("Score: "+ score, windowWidth - 100,windowHeight - 400);
  text("Mana: "+ manapoints, windowWidth - 100,windowHeight - 200 );
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    youveBeenDoritoed.visible = false
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    //score = score + Math.round(getFrameRate()/60);
    manapoints = manapoints + getFrameRate()/600;
    if(trex.isTouching(coinGroup)){
      score = score+100
      coinGroup.destroyEach()
    }
    if (trex.isTouching(doubleCoinGroup)){
      score = score +400
      doubleCoinGroup.destroyEach()
    }
    //if(score>0 && score%100 === 0){
    //   checkPointSound.play() 
    //}
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      trex.x = mouseX
  trex.y = mouseY
    //jump when the space key is pressed
    if(keyDown("space")){
        trex.velocityY = -12   ;
        jumpSound.play();
    }
    //console.log(trex.y)
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnSupahHotFire();
    spawnBirds();
    spawnCoins();
    spawnDoubleCoins();
    spawnHotSaucerGroup();
    miniDorito();
   //puremanashoot();
    
    if(obstaclesGroup.isTouching(trex)||badBirdGroup.isTouching(trex)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }

    if(obstaclesGroup.isTouching(SupahHotFiyah)||badBirdGroup.isTouching(SupahHotFiyah)){
      obstaclesGroup.destroyEach();
      badBirdGroup.destroyEach();
      SupahHotFiyah.destroyEach();
      kaBoom.play()
      score = score + 1000
    }
    if(trex.isTouching(hotSaucerGroup)){
      gameState = DORITOED

    }
    if(trex.isTouching(miniDoritoGroup)){
      gameState = DORITOED
    }
    /*if(obstaclesGroup.isTouching(manaGroup)||badBirdGroup.isTouching(manaGroup)){
      obstaclesGroup.destroyEach();
      badBirdGroup.destroyEach();
      manaGroup.destroyEach();
      hotSaucerGroup.destroyEach();
      miniDoritoGroup.destroyEach();
      kaBoom.play()
      score = score + 10000
      manapoints = manapoints + 5000
    */
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      text("Tip : press Alt + F4 to get a billion jillion quantrillion(10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) points" , windowWidth/2 , windowHeight/2 + 100)
    textSize(30)
      textColor(255)                      

     //change the trex animation
      trex.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
     coinGroup.setVelocityXEach(0); 
   }
   else if (gameState === DORITOED) {
    youveBeenDoritoed.visible = true;
    restart.visible = true;
   
   //change the trex animation
    trex.changeAnimation("collided", trex_collided);
  
   
   
    ground.velocityX = 0;
    trex.velocityY = 0
    
   
    //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
   
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);    
   coinGroup.setVelocityXEach(0); 
 }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
  }
function reset(){
  gameState=PLAY
obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  coinGroup.destroyEach()
  trex.changeAnimation("running", trex_running);
}


function spawnObstacles(){
 if (frameCount % 0.25 === 0){
   var obstacle = createSprite(displayWidth,120,10,40);
   obstacle.y = Math.round(random(0,3000))
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() { 
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}
function spawnCoins(){
  if (frameCount % 6 === 0){
    var coin = createSprite(displayWidth,120,10,40);
    coin.y = Math.round(random(0,3000))
    coin.velocityX = -6;
    coin.addImage(coin1)
    coin.scale = 0.25
    coinGroup.add(coin)
  }
}
function spawnDoubleCoins(){
  if (frameCount % 6 === 0){
    var doubleCoin = createSprite(displayWidth,120,10,40);
    doubleCoin.y = Math.round(random(0,3000))
    doubleCoin.velocityX = -6;
    doubleCoin.addImage(coin2)
    doubleCoin.scale = 0.25
    doubleCoinGroup.add(doubleCoin)
  }
}
function spawnBirds(){
  if (frameCount % 60 === 0){
    var birdBad = createSprite(displayWidth,120,50,40);
    birdBad.y = Math.round(random(0,3000))
    birdBad.velocityX = -6;
    birdBad.addAnimation("fly",badBirdAnimation)
    birdBad.scale = 0.5
    badBirdGroup.add(birdBad)
  }

}
function spawnSupahHotFire(){
  if (keyDown("f")){
    var fiyah = createSprite(trex.x,trex.y,50,50)
    fiyah.velocityX = 6
    shootEm.play()
    fiyah.addImage(fireyImage)
    fiyah.scale = 0.25
    SupahHotFiyah.add(fiyah)

  } 
}
function spawnHotSaucerGroup(){
  if (frameCount === 60){
    var hotSaucer = createSprite(displayWidth,120,50,40)
    hotSaucer.y = Math.round(random(0,3000))
    hotSaucer.addImage(hotSaucerImg)
    hotSaucer.velocityX = -6

    hotSaucerGroup.add(hotSaucer)
    
    

  }


}
function miniDorito(){
  if ( frameCount === 60 ){
    var miniDoritoBoi =createSprite(displayWidth,120,50,40)
    miniDoritoBoi.y = Math.round(random(0,3000))
 
    miniDoritoBoi.addImage(miniDoritoImg)
    miniDoritoGroup.add(miniDoritoBoi)
    miniDoritoBoi.scale = 0.25
    miniDoritoBoi.velocityX = -6

    
    
    
  }

}
/*function puremanashoot(){
  if(keyDown("m")&&score > 100 && manapoints > 10000){
    var manaCharge = (trex.x,trex.y,50,50)
    manaCharge.velocityX = 6
    shootEm.play()
    manaCharge.addImage(manaImage)
    manaCharge.scale = 0.25
    manaGroup.add(manaCharge)
    manapoints = manapoints - 1000
  }
  

8
}
/*&& score > 10000keyDown("right")&& score > 10000*/
