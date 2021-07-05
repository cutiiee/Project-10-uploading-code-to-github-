var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["ae9b199e-aa66-4d9a-a08f-2388ca6fa520","1082d8f5-0cd0-478c-8877-8518e8738992"],"propsByKey":{"ae9b199e-aa66-4d9a-a08f-2388ca6fa520":{"name":"1","sourceUrl":null,"frameSize":{"x":29,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"rYccR7r49xsirdwtN77YaHMCysUHkpLM","categories":["germs"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":29,"y":30},"rootRelativePath":"assets/ae9b199e-aa66-4d9a-a08f-2388ca6fa520.png"},"1082d8f5-0cd0-478c-8877-8518e8738992":{"name":"MASK","sourceUrl":null,"frameSize":{"x":43,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"JxPqERNwhHy_bI8_V9lfXP4X3Ayum6m2","loadedFromSource":true,"saved":true,"sourceSize":{"x":43,"y":30},"rootRelativePath":"assets/1082d8f5-0cd0-478c-8877-8518e8738992.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var Goal1 = createSprite(200, 28, 100, 20);
Goal1.shapeColor = "orange";
var Goal2 = createSprite(200, 372, 100, 20);
Goal2.shapeColor = "orange";
var Striker = createSprite(200, 200, 10, 10);
Striker.setAnimation("1");
var PlayerMallet = createSprite(200, 50, 50, 10);
PlayerMallet.setAnimation("MASK");
var ComputerMallet = createSprite(200, 350, 50, 10);
ComputerMallet.setAnimation("MASK");

var GameState = "serve";
var ComputerScore = 0;
var PlayerScore = 0;

function draw() {
  background("rgb(43, 255, 82)");
  fill("black");
  text(ComputerScore, 20, 230);
  text(PlayerScore, 20, 180);
  
  createEdgeSprites();
  PlayerMallet.bounceOff(edges);
  PlayerMallet.bounceOff(Goal1);
  Striker.bounceOff(PlayerMallet);
  Striker.bounceOff(edges);
  Striker.bounceOff(ComputerMallet);
  
  if (GameState === "serve") {
    fill("rgb(255, 0, 0)");
    textSize(25);
    text("Protect yourself from virus!",55, 180);
  }
  
  if (keyDown("left")) {
    PlayerMallet.x = PlayerMallet.x-10;
  }
  
  if (keyDown("right")) {
    PlayerMallet.x = PlayerMallet.x+10;
  }
  
  if (keyDown("up")) {
    if (PlayerMallet.y>25) {
      PlayerMallet.y = PlayerMallet.y-10;
    }
  }
  
  if (keyDown("down")) {
    if (PlayerMallet.y<120) {
      PlayerMallet.y = PlayerMallet.y+10;
    }
}
  
  for (var i = 0; i < 400; i = i + 20) {
    line(i, 200, i + 10, 200);
  }
  
  if (keyDown("space") && GameState === "serve") {
    serve();
    GameState = "play";
  }
  if (Striker.isTouching(Goal1)) {
    playSound("assets/category_alerts/retro_game_health_pickup_6.mp3", false);
  }
   if (Striker.isTouching(Goal2)) {
    playSound("assets/category_alerts/retro_game_health_pickup_6.mp3", false);
  }
  if (Striker.isTouching(Goal1) || Striker.isTouching(Goal2)) {
    if (Striker.isTouching(Goal1)) {
      ComputerScore = ComputerScore + 1;
    }
    
    if (Striker.isTouching(Goal2)) {
      PlayerScore = PlayerScore + 1;
    }
    reset();
    GameState = "serve";
  }
  
  if (PlayerScore === 5 || ComputerScore === 5) {
    GameState = "over";
    fill("maroon");
    textSize(15);
    text("Game Over", 160, 160);
    text("Press r to serve", 150, 180);
  }
  
  if (keyDown("r") && GameState === "over") {
    GameState = "serve";
    ComputerScore = 0;
    PlayerScore = 0;
  }

  
  fill("rwhite");
  stroke("white");
  strokeWeight(5);
  line(0, 384, 400, 384);
  line(0, 15, 400, 15);
  line(0, 2, 400, 2);
  line(0, 398, 400, 398);
  line(10, 0, 10, 400);
  line(390, 0, 390, 400);
  line(0, 120, 400, 120);
  line(0, 280, 400, 280);
  ComputerMallet.x = Striker.x;
  drawSprites();
}

function serve() {
  Striker.velocityX = 3;
  Striker.velocityY = 4;
}

function reset() {
  Striker.x = 200;
  Striker.y = 200;
  Striker.velocityX = 0;
  Striker.velocityY = 0;
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
