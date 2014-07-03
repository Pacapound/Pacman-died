<body></body>
<script src="http://gamingJS.com/Three.js"></script>
<script src="http://gamingJS.com/physi.js"></script>
<script src="http://gamingJS.com/ChromeFixes.js"></script>
<script src="http://gamingJS.com/Sounds.js"></script>
<script>
  // Physics settings
  Physijs.scripts.ammo = 'http://gamingJS.com/ammo.js';
  Physijs.scripts.worker = 'http://gamingJS.com/physijs_worker.js';

  // This is where stuff in our game will happen:
  var scene = new Physijs.Scene({ fixedTimeStep: 2 / 60 });
  scene.setGravity(new THREE.Vector3( 0, -50, 0 ));

  // This is what sees the stuff:
  var width = window.innerWidth,
      height = window.innerHeight,
      aspect_ratio = width / height;
  var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  // var camera = new THREE.OrthographicCamera(
  //   -width/2, width/2, height/2, -height/2, 1, 10000
  // );

  camera.position.set(0, 100, 200);
  camera.rotation.x = -Math.PI/8;
  scene.add(camera);

  // This will draw what the camera sees onto the screen:
  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMapEnabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.backgroundColor = '#ffffff';

  // ******** START CODING ON THE NEXT LINE ********
addLights();
var ball = addBall();
var board = addBoard();
addControls();
addGoal();
addBackground();
function addLights() {
  scene.add(new THREE.AmbientLight(0x999999));
  var back_light = new THREE.PointLight(0xffffff);
  back_light.position.set(50, 50, -100);
  scene.add(back_light);
  var spot_light = new THREE.SpotLight(0xffffff);
  spot_light.position.set(-250, 250, 250);
  spot_light.castShadow = true;
  scene.add(spot_light);
}
function addBall() {
  var ball = new Physijs.SphereMesh(
    new THREE.SphereGeometry(10, 25, 21),
    new THREE.MeshPhongMaterial({
      color:0x333333,
      shininess: 100.0,
      ambient:0xff0000,
      emissive: 0x111111,
      specular: 0xbbbbbb
    })
  );
  ball.castShadow = true;
  scene.add(ball);
  resetBall(ball);
  return ball;
}
function resetBall(ball) {
  ball.__dirtyPosition = true;
  ball.position.set(-33, 50, -65);
  ball.setLinearVelocity(0, 0, 0);
  ball.setAngularVelocity(0, 0, 0);
}
function addBoard() {
  var material = new THREE.MeshPhongMaterial({
    color: 0x333333,
    shininess: 40,
    ambient: 0xffd700,
    emissive: 0x111111,
    specular: 0xeeeeee
  });
  var beam = new Physijs.BoxMesh(
    new THREE.CubeGeometry(50, 2, 200),
    material,
    0
  );
  beam.position.set(-37, 0, 0);
  beam.receiveShadow = true;
  var beam2 = new Physijs.BoxMesh(
    new THREE.CubeGeometry(50, 2, 200),
    material
  );
  beam2.position.set(75, 0, 0);
  beam2.receiveShadow = true;
  beam.add(beam2);
  var beam3 = new Physijs.BoxMesh(
    new THREE.CubeGeometry(200, 2, 50),
    material
  );
  beam3.position.set(40, 0, -40);
  beam3.receiveShadow = true;
  beam.add(beam3);
  var beam4 = new Physijs.BoxMesh(
    new THREE.CubeGeometry(200, 2, 50),
    material
  );
  beam4.position.set(40, 0, 40);
  beam4.receiveShadow = true;
  beam.add(beam4);
  beam.rotation.set(0.1, 0, 0);
  scene.add(beam);
  return beam;
}
function addControls() {
  document.addEventListener("keydown", function(event) {
    var code = event.keyCode;
    if (code == 37) left();
    if (code == 39) right();
    if (code == 38) up();
    if (code == 40) down();
  });
}
function left() { tilt('z', 0.02);}
function right(){ tilt('z', -0.02);}
function up()   { tilt('x', -0.02);}
function down() { tilt('x', 0.02);}
function tilt (dir, amount) {
  board.__dirtyRotation = true;
  board.rotation[dir] = board.rotation[dir] + amount;
}
function addGoal() {
  var light = new THREE.Mesh(
    new THREE.CylinderGeometry(20, 20, 1000),
    new THREE.MeshPhongMaterial({
      transparent:true,
      opacity: 0.15, 
      shininess: 0,
      ambient: 0xffffff,
      emissive: 0xffffff
    })
  );
  scene.add(light);
  var score = new Physijs.ConvexMesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshNormalMaterial({wireframe: true})
  );
  score.position.y = -50;
  score.rotation.x = -Math.PI/2;
  scene.add(score);
  score.addEventListener('collision', function() {
    flashGoalLight(light);
    resetBall(ball);
    Sounds.guitar.play();
  });
}
function flashGoalLight(light, remaining) {
  if (typeof(remaining) == 'undefined') remaining = 9;
  if (light.material.opacity == 0.4) {
    light.material.ambient.setRGB(1, 1, 1);
    light.material.emissive.setRGB(1, 1, 1);
    light.material.color.setRGB(1, 1, 1);
    light.material.opacity = 0.15;
  }
  else {
    light.material.ambient.setRGB(1, 0, 0);
    light.material.emissive.setRGB(1, 0, 0);
    light.material.color.setRGB(1, 0, 0);
    light.material.opacity = 0.4;
  }
  if (remaining > 0) {
    setTimeout(function() {flashGoalLight(light, remaining-1);}, 500);
  }
}
function addBackground() {
  document.body.style.backgroundColor = 'black';
  var stars = new THREE.Geometry();
  while (stars.vertices.length < 1000) {
    var lat = Math.PI * Math.random() - Math.PI/2;
    var lon = 2*Math.PI * Math.random();
    stars.vertices.push(new THREE.Vector3(
      1000 * Math.cos(lon) * Math.cos(lat),
      1000 * Math.sin(lon) * Math.cos(lat),
      1000 * Math.sin(lat)
    ));
  }
  var star_stuff = new THREE.ParticleBasicMaterial({size: 5});
  var star_system  = new THREE.ParticleSystem(stars, star_stuff);
  scene.add(star_system);
}
  // Animate motion in the game
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Run physics
  function gameStep() {
    scene.simulate();
    if (ball.position.y < -100) resetBall(ball);
    // Update physics 60 times a second so that motion is smooth
    setTimeout(gameStep, 1000/60);
  }
  gameStep();
</script>
