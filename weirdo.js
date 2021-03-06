<body></body>
<script src="http://gamingJS.com/Three.js"></script>
<script src="http://gamingJS.com/physi.js"></script>
<script src="http://gamingJS.com/Scoreboard.js"></script>
<script src="http://gamingJS.com/ChromeFixes.js"></script>
<script src="http://gamingJS.com/ammo.js"></script>
<script src="http://gamingJS.com/physijs_worker.js"></script>
<script>
// This is where stuff in our game will happen:
Physijs.scripts.ammo = 'http://gamingJS.com/ammo.js';
Physijs.scripts.worker = 'http://gamingJS.com/physijs_worker.js';
var scene = new Physijs.Scene({ fixedTimeStep: 2 / 60 });
scene.setGravity(new THREE.Vector3( 0, -100, 0 ));
// This is what sees the stuff:
var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 200;
camera.position.y = 100;
scene.add(camera);
// This will draw what the camera sees onto the screen:
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// ******** START CODING ON THE NEXT LINE ********
var ground = addGround();
var avatar = addAvatar();
var scoreboard = addScoreboard();
animate();
gameStep();
function addGround() {
document.body.style.backgroundColor = '#87CEEB';
ground = new Physijs.PlaneMesh(
new THREE.PlaneGeometry(1e6, 1e6),
new THREE.MeshBasicMaterial({color: 0x7CFC00})
);
ground.rotation.x = -Math.PI/2;
scene.add(ground);
return ground;
}
function addAvatar() {
avatar = new Physijs.BoxMesh(
new THREE.CubeGeometry(40, 50, 1),
new THREE.MeshBasicMaterial({visible: false})
);
var avatar_material = new THREE.MeshBasicMaterial({
map: THREE.ImageUtils.loadTexture('/images/purple_fruit_monster.png'),
transparent: true
});
var avatar_picture = new THREE.Mesh(
new THREE.PlaneGeometry(40, 50), avatar_material
);
avatar.add(avatar_picture);
avatar.position.set(-50, 50, 0);
scene.add(avatar);
avatar.setAngularFactor(new THREE.Vector3( 0, 0, 0 )); // no rotation
avatar.setLinearFactor(new THREE.Vector3( 1, 1, 0 )); // only move on X/Y axes
avatar.setLinearVelocity(new THREE.Vector3(0, 150, 0));
avatar.addEventListener('collision', function(object) {
if (object.is_fruit) {
scoreboard.addPoints(10);
avatar.setLinearVelocity(new THREE.Vector3(0, 200, 0));
scene.remove(object);
}
if (object == ground) {
game_over = true;
scoreboard.message("Game Over!");
}
if (object.is_rock) {
  scoreboard.subtractPoints(20);
  avatar.setLinearVelocity(new THREE.Vector3(-200, 200, 0));
  scene.remove(object);
}

});
return avatar;
}
function addScoreboard() {
var scoreboard = new Scoreboard();
scoreboard.score(0);
scoreboard.help(
'Use arrow keys to move and the space bar to jump. ' + 
"Don't eat the rolling Purple Fruit Monsters!"
);
return scoreboard;
}
var game_over = false;
function animate() {
if (game_over) return;
requestAnimationFrame(animate);
scene.simulate(); // run physics
renderer.render(scene, camera);
}
function gameStep() {
if (game_over) return;
rockOrFruit();
setTimeout(gameStep, 3*1000);
}
function rockOrFruit() {
  rand = Math.random();
  if (rand < 0.5) launchFruit();
  if (rand > 0.5) launchRock(); 
}

function launchFruit() {
var fruit = new Physijs.ConvexMesh(
new THREE.CylinderGeometry(20, 20, 1, 24),
new THREE.MeshBasicMaterial({visible: false})
);
var material = new THREE.MeshBasicMaterial({
map: THREE.ImageUtils.loadTexture('/images/fruit.png'),
transparent: true
});
var picture = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), material);
picture.rotation.x = -Math.PI/2;
fruit.add(picture);
fruit.is_fruit = true;
fruit.setAngularFactor(new THREE.Vector3( 0, 0, 1 ));
fruit.setLinearFactor(new THREE.Vector3( 1, 1, 0 ));
fruit.position.set(300, 20, 0);
fruit.rotation.x = Math.PI/2;
scene.add(fruit);
fruit.setLinearVelocity(
new THREE.Vector3(-150, 0, 0)
);
}
function launchRock() {
var rock = new Physijs.ConvexMesh(
new THREE.CylinderGeometry(20, 20, 1, 24),
new THREE.MeshBasicMaterial({visible: false})
);
var material = new THREE.MeshBasicMaterial({
map: THREE.ImageUtils.loadTexture('/images/purple_fruit_monster.png'),
transparent: true
});
var picture = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), material);
picture.rotation.x = -Math.PI/2;
rock.add(picture);
rock.is_rock = true;
rock.setAngularFactor(new THREE.Vector3( 0, 0, 1 ));
rock.setLinearFactor(new THREE.Vector3( 1, 1, 0 ));
rock.position.set(300, 20, 0);
rock.rotation.x = Math.PI/2;
scene.add(rock);
rock.setLinearVelocity(
new THREE.Vector3(-150, 0, 0)
);
}
function launchFruit2() {

}
function launchDead() {

}
document.addEventListener("keydown", function(event) {
var code = event.keyCode;
if (code == 37) left(); // left arrow
if (code == 39) right(); // right arrow
if (code == 38) up(); // up arrow
if (code == 32) up(); // space bar
if (code == 82) reset(); // R
});
function left() { move(-50, 0); }
function right() { move(50, 0); }
function up() { move(avatar.getLinearVelocity().x, 200); }
function move(x, y) {
avatar.setLinearVelocity(
new THREE.Vector3(x, y, 0)
);
}
fruit2.addEventListener('collision', function() {
  if (object.is_fruit) {
fruit.setLinearVelocity(new THREE.Vector3(0, 200, 20));
}
if (object.is_rock) {
  rock.setLinearVelocity(0, 300, -20);
  
}
});
dead.addEventListener('collision', function() {
  if (object.is_fruit) {
fruit.setLinearVelocity(new THREE.Vector3(0, 200, 20));
}
if (object.is_rock) {
  rock.setLinearVelocity(0, 300, -20);
}
});
function reset() {
avatar.__dirtyPosition = true;
avatar.position.set(-50, 50, 0);
avatar.setLinearVelocity(new THREE.Vector3(0, 150, 0));
for (var i in scene._objects) {
if (scene._objects[i].is_fruit) {
scene.remove(scene._objects[i]);
}
}
scoreboard.score(0);
if (game_over) {
game_over = false;
scoreboard.setMessage();
animate();
gameStep();
}
}
</script>
