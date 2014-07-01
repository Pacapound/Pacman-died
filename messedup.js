<body></body>
<script src="http://gamingJS.com/Three.js"></script>
<script src="http://gamingJS.com/physi.js"></script>
<script src="http://gamingJS.com/ChromeFixes.js"></script>
<script src="http://gamingJS.com/Scoreboard.js"></script>
<script src="http://gamingJS.com/Mouse.js"></script>
<script src="http://gamingJS.com/ammo.js"></script>
<script src="http://gamingJS.com/physijs_worker.js"></script>
<script>
  // Physics settings
  Physijs.scripts.ammo = 'http://gamingJS.com/ammo.js';
  Physijs.scripts.worker = 'http://gamingJS.com/physijs_worker.js';

  // This is where stuff in our game will happen:
  var scene = new Physijs.Scene({ fixedTimeStep: 2 / 60 });
  scene.setGravity(new THREE.Vector3( 0, -100, 0 ));

  // This is what sees the stuff:
  var width = window.innerWidth,
      height = window.innerHeight,
      aspect_ratio = width / height;
  //var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
    var camera = new THREE.OrthographicCamera(
      -width/2, width/2, height/2, -height/2, 1, 10000
    );

  camera.position.z = 200;
  camera.position.y = 100;
  scene.add(camera);
  console.log("started!");
  // This will draw what the camera sees onto the screen:
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.backgroundColor = '#9999aa';

  // ******** START CODING ON THE NEXT LINE ********
function makeBorder(x, y, w, h) {
  var border = new Physijs.BoxMesh(
    new THREE.CubeGeometry(w, h, 100),
    Physijs.createMaterial(
      new THREE.MeshBasicMaterial({color: 0x000000}), 0.2, 1.0
      ),
      0
    );
    border.position.set(x, y, 0);
    return border;
}
scene.add(makeBorder(width/-2, 0, 100, height));
scene.add(makeBorder(width/2, 0, 100, height));
scene.add(makeBorder(0, height/2, width, 50));
scene.add(makeBorder(0, height/-2, width, 250));
console.log('test');
var avatar = new Physijs.ConvexMesh(
  new THREE.CylinderGeometry(30, 30, 5, 16),
  Physijs.createMaterial(
    new THREE.MeshBasicMaterial({color:0xbb0000}), 0.2, 0.5
    )
  );
  avatar.rotation.set(Math.PI/2, 0, 0);
  avatar.position.set(0.5 * width/-2,-height/2 + 125 + 30, 0);
  scene.add(avatar);
  
  avatar.setAngularFactor(new THREE.Vector3( 0, 0, 0 )); //don't rotate
  avatar.setLinearFactor(new THREE.Vector3( 1, 1, 0 )); //x/y axis only
  
document.addEventListener("keydown", function(event) {
  var code = event.keyCode;
  console.log('keydown:' + code);
  if (code == 37) move(-50); //left
  if (code == 39) move(50); //right
  if (code == 40) avatar.position.y = avatar.position.y + 50
});

function move(x) {
  var v_y = avatar.getLinearVelocity().y,
      v_x = avatar.getLinearVelocity().x;
      console.log('received');
      
  if(Math.abs(v_x + x) > 500) return;
  avatar.setLinearVelocity(
    new THREE.Vector3(v_x + x, v_y, 0)
  );
}
var goal = new Physijs.ConvexMesh(
  new THREE.TorusGeometry(100, 25, 20, 30),
  Physijs.createMaterial(
    new THREE.MeshBasicMaterial({color:0x00bb00})
    ),
    0
  );
  goal.isGoal = true;
  
function placeGoal() {
  var x = 0,
    rand = Math.random();
  if (rand < 0.33) x = width / -2;
  if (rand > 0.66) x = width/2;
  goal.position.set(x, height/2, 0);
  scene.add(goal);
}
placeGoal();

function Ramp(x, y) {
  this.mesh = new Physijs.ConvexMesh(
    new THREE.CylinderGeometry(5, height * 0.05, height * 0.25),
    Physijs.createMaterial(
      new THREE.MeshBasicMaterial({color: 0x0000cc}), 0.2, 1.0
      ),
      0
    );
    
    this.move(x, y);
    this.rotate(2*Math.PI*Math.random());
    this.listenForEvents();
}

Ramp.prototype.move = function(x, y) {
  this.mesh.position.x = this.mesh.position.x + x;
  this.mesh.position.y = this.mesh.position.y + y;
  this.mesh.__dirtyRotation = true;
  this.mesh.__dirtyPosition = true;
};

Ramp.prototype.rotate = function(angle) {
  this.mesh.rotation.z = this.mesh.rotation.z + angle;
  this.mesh.__dirtyRotation = true;
  this.mesh.__dirtyPosition = true;
};

Ramp.prototype.listenForEvents = function() {
  var me = this,
      mesh = this.mesh;
      console.log('add listenForEvent')
  mesh.addEventListener('mousedown', function(event) {
    me.move(event.x_diff, event.y_diff);
    console.log('event received: ' + event.y_diff);
  });
  
document.addEventListener('keydown', function(event) {
  if (mesh.isActive) return true;
  if (event.keyCode != 83) return; //S
  console.log ('got' + event.keyCode);
  me.rotate(0.1);
  });
};

var ramp1 = new Ramp(-width/4, height/4);
scene.add(ramp1.mesh);

var ramp2 = new Ramp(width/4, -height/4);
scene.add(ramp2.mesh);

var scoreboard = new Scoreboard();
scoreboard.timer();
scoreboard.countdown(600);
scoreboard.help(
  "Get to the green ring. " +
  "Drag ramps and rotate them with S. " +
  "Don't let time run out! " +
  "Move the red ball (player) with the left and right arrows."
  );
  scoreboard.onTimeExpired(function() {
    scoreboard.setMessage("TOO BAD!");
    gameOver();
});

var pause = false;
function gameOver() {
  if (scoreboard.getTimeRemaining() > 0) scoreboard.setMessage('You got a star!');
  scoreboard.stopCountdown();
  scoreboard.stopTimer();
  pause = true;
}

function Levels(scoreboard, scene) {
  this.scoreboard = scoreboard;
  this.scene = scene;
  this.levels = [];
  this.current_level = 0;
}

Levels.prototype.addLevel = function(things_on_this_level) {
  this.levels.push(things_on_this_level);
};

Levels.prototype.thingsOnCurrentLevel = function() {
  return this.levels[this.current_level];
};

Levels.prototype.draw = function() {
  var scene = this.scene;
  this.thingsOnCurrentLevel().forEach(function(thing) {
    scene.add(thing);
  });
};

Levels.prototype.erase = function() {
  var scene = this.scene;
  this.thingsOnCurrentLevel().forEach(function(obstacle) {
    scene.remove(obstacle);
  });
};

Levels.prototype.levelUp = function() {
  if (!this.hasMoreLevels()) return;
  this.erase();
  this.current_level++;
  this.draw();
  this.scoreboard.resetCountdown(500 - this.current_level * 5);
};

Levels.prototype.hasMoreLevels = function() {
  var last_level = this.levels.lengh=1;
  return this.current_level < last_level;
};

function buildObstacle(shape_name, x, y) {
  var shape;
  if (shape_name == 'platform') {
    shape = new THREE.CubeGeometry(height/2, height/10, 10);
  } else {
    shape = new THREE.CylinderGeometry(50, 2, height);
  }
  var material = new Physijs.createMaterial(
    new THREE.MeshBasicMaterial({color:0x333333}), 0.2, 1.0
  );
  
  var obstacle = new Physijs.ConvexMesh(shape, material, 0);
  obstacle.position.set(x, y, 0);
  return obstacle;
}

var levels = new Levels(scoreboard, scene);
levels.addLevel([]);
levels.addLevel([
  buildObstacle('platform', 0, 0.9 * height/2 * Math.random()),
   buildObstacle('platform', 0, 0.9 * height/2 * Math.random()),
  buildObstacle('platform', 0, -0.6 * height/3 * Math.random()),
  buildObstacle('platform', 0, 0.3456 * height/4 * Math.random()),
  buildObstacle('platform', 0, -0.1 * height/5 * Math.random()),
  buildObstacle('stalagmite', -0.33 * width, height/2),
  buildObstacle('stalactite', 0.33 * width,  height/2)
]);

levels.addLevel([
  buildObstacle('platform', 0, 0.9 * height/2 * Math.random()),
  buildObstacle('platform', 0, -0.6 * height/3 * Math.random()),
  buildObstacle('platform', 0, 0.3456 * height/4 * Math.random()),
  buildObstacle('platform', 0, -0.1 * height/5 * Math.random()),
  buildObstacle('stalagmite', -0.33 * width, height/2),
  buildObstacle('stalactite', 0.33 * width,  height/2)
]);

avatar.addEventListener('collision', function(object) {
  if(!object.isGoal) return;
  if(!levels.hasMoreLevels()) return gameOver();
  moveGoal();
  levels.levelUp();
});

function moveGoal() {
  scene.remove(goal);
  setTimeout(placeGoal, 2*1000);
}





  // Animate motion in the game
  function animate() {
    if(pause) return;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Run physics
  function gameStep() {
    scene.simulate();
    // Update physics 60 times a second so that motion is smooth
    setTimeout(gameStep, 1000/60);
  }
  gameStep();
</script>
