<body></body>
<script src="http://gamingJS.com/Three.js"></script>
<script src="http://gamingJS.com/physi.js"></script>
<script src="http://gamingJS.com/ChromeFixes.js"></script>
<script src="http://gamingJS.com/Scoreboard.js"></script>
<script src="http://gamingJS.com/Mouse.js"></script>
<script src="http://gamingJS.com/Sounds.js"></script>
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
camera.position.z = 500;
scene.add(camera);
// This will draw what the camera sees onto the screen:
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.style.backgroundColor = '#9999aa';
// ******** START CODING ON THE NEXT LINE ********
/*
// Perspective camera border
function makeBorder(x, y, w, h) {
var border = new Physijs.BoxMesh(
new THREE.CubeGeometry(1.2*w, 1.2*h, 100),
Physijs.createMaterial(
new THREE.MeshBasicMaterial({color: 0x000000}), 0.2, 1.0
),
0
);
border.position.set(1.2*x, 1.2*y, 0);
return border;
}
*/
document.addEventListener("keydown", function(event) {
  var code = event.keyCode;
    if (code == 32) scoreboard.countdown(20);
    });


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
scene.add(makeBorder(width/-2, 0, 50, height));
scene.add(makeBorder(width/2, 0, 50, height));
scene.add(makeBorder(0, height/2, width, 50));
scene.add(makeBorder(0, height/-2, width, 50));

var avatar = new Physijs.ConvexMesh(
new THREE.CylinderGeometry(30, 30, 5, 16),
Physijs.createMaterial(
new THREE.MeshBasicMaterial({color:0xbb0000}), 0.2, 0.5
)
);
avatar.rotation.set(Math.PI/2, 0, 0);
avatar.position.set(0.5 * width/-2, -height/2 + 25 + 30, 0);
scene.add(avatar);
avatar.setAngularFactor(new THREE.Vector3( 0, 0, 0 )); // don't rotate
avatar.setLinearFactor(new THREE.Vector3( 1, 1, 0 )); // only move on X and Y axis
document.addEventListener("keydown", function(event) {
var code = event.keyCode;
if (code == 37) move(-50); // left arrow
if (code == 39) move(50); // right arrow
});
function move(x) {
var v_y = avatar.getLinearVelocity().y,
v_x = avatar.getLinearVelocity().x;
if (Math.abs(v_x + x) > 1000) return;
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
if (rand > 0.66) x = width / 2;
goal.position.set(x, height/2, 0);
scene.add(goal);
}
placeGoal();
function Ramp(x, y) {
this.mesh = new Physijs.ConvexMesh(
new THREE.CylinderGeometry(5, height * 0.05, height * 0.25),
Physijs.createMaterial(
new THREE.MeshBasicMaterial({color:0x0000cc}), 0.2, 1.0
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
mesh.addEventListener('drag', function(event) {
me.move(event.x_diff, event.y_diff);
});
document.addEventListener('keydown', function(event) {
if (mesh.isActive) return;
if (event.keyCode != 83) return; // S
me.rotate(0.1);
Sounds.bubble.play();
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
"Get the green ring. " +
"Click and drag blue ramps. " +
"Click blue ramps and press S to spin. " +
"Left and right arrows to move player. " +
"Be quick! " +
"Press Space every level for a time challenge!"
);
scoreboard.onTimeExpired(function() {
scoreboard.setMessage("Game Over!");
gameOver();
});
var pause = false;
function gameOver() {
if (scoreboard.getTimeRemaining() > 560) scoreboard.setMessage('Win!');
if (scoreboard.getTimeRemaining() < 560) scoreboard.setMessage('Win, but you are too slow!');
if (scoreboard.getTimeRemaining() === 0) scoreboard.setMessage('You lose, slowpoke!');
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
this.scoreboard.resetCountdown(600 - this.current_level * 5);
};
Levels.prototype.hasMoreLevels = function() {
var last_level = this.levels.length-1;
return this.current_level < last_level;
};
function buildObstacle(shape_name, x, y) {
var shape;
if (shape_name == 'platform') {
shape = new THREE.CubeGeometry(height/2, height/10, 10);
} else {
shape = new THREE.CylinderGeometry(50, 2, height);
}
var material = Physijs.createMaterial(
new THREE.MeshBasicMaterial({color:0x333333}), 0.2, 1.0
);
var obstacle = new Physijs.ConvexMesh(shape, material, 0);
obstacle.position.set(x, y, 0);
return obstacle;
}
var levels = new Levels(scoreboard, scene);
levels.addLevel([]);
levels.addLevel([
buildObstacle('platform', 0, 0.5 * height/2 * Math.random())
]);levels.addLevel([
buildObstacle('platform', 0, 0.5 * height/2 * Math.random()),
buildObstacle('platform', 0, -0.5 * height/2 * Math.random())
]);
levels.addLevel([
buildObstacle('platform', 0, 0.5 * height/2 * Math.random()),
buildObstacle('platform', 0, -0.5 * height/2 * Math.random()),
buildObstacle('stalactite', -0.33 * width, height/2),
buildObstacle('stalactite', 0.33 * width, height/2)
]);
levels.addLevel([
buildObstacle('platform', 0, 0.5 * height/2 * Math.random()),
buildObstacle('platform', 0, -0.5 * height/2 * Math.random()),
buildObstacle('stalactite', -0.11 * width/2, height/2),
buildObstacle('stalactite', 0.22 * width/5, height/2),
buildObstacle('platform', 0, 0.5 * height/2 * Math.random()),
buildObstacle('platform', 0, -0.5 * height/2 * Math.random()),
buildObstacle('stalactite', -0.33 * width/3, height/2),
buildObstacle('stalactite', 0.44 * width/7, height/2),
buildObstacle('stalactite', -0.2 * width, height/4),
buildObstacle('stalactite', 0.2 * width, height/4),
buildObstacle('stalactite', -0.4 * width, height/4),
buildObstacle('stalactite', 0.4 * width, height/4)
]);

avatar.addEventListener('collision', function(object) {
if (!object.isGoal) return;
if (!levels.hasMoreLevels()) return gameOver();
moveGoal();
levels.levelUp();
//if (scoreboard.getTimeRemaining() > 560) scoreboard.setMessage('Level Up!');
//else if (scoreboard.getTimeRemaining() < 560) scoreboard.setMessage('Finally made it, eh slowpoke? Good luck on making it on time now!');
//setTimeout(scoreboard.setMessage(), 2*1000);
});
avatar.addEventListener('collision', function(object) {
if (object.isGoal) Sounds.guitar.play();
else Sounds.drip.play();
});
function moveGoal() {
scene.remove(goal);
setTimeout(placeGoal, 0.05*1000);
}
// Animate motion in the game
function animate() {
if (pause) return;
requestAnimationFrame(animate);
renderer.render(scene, camera);
}
animate();
// Run physics
function gameStep() {
if (pause) return;
scene.simulate();
// Update physics 60 times a second so that motion is smooth
setTimeout(gameStep, 1000/60);
}
gameStep();
</script>
