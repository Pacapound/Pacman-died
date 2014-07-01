<body></body>
<script src="http://gamingJS.com/Three.js"></script>
<script src="http://gamingJS.com/physi.js"></script>
<script src="http://gamingJS.com/ChromeFixes.js"></script>
<script src="http://gamingJS.com/ammo.js"></script>
<script src"http://gamingJS.com/physijs_worker.js"></script>
<script>
  // Physics settings
  Physijs.scripts.ammo = 'http://gamingJS.com/ammo.js';
  Physijs.scripts.worker = 'http://gamingJS.com/physijs_worker.js';

  // This is where stuff in our game will happen:
  var scene = new Physijs.Scene({ fixedTimeStep: 2 / 60 });
  scene.setGravity(new THREE.Vector3( -100, -100, -100 ));

  // This is what sees the stuff:
  var width = window.innerWidth,
      height = window.innerHeight,
      aspect_ratio = width / height;
  var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  // var camera = new THREE.OrthographicCamera(
  //   -width/2, width/2, height/2, -height/2, 1, 10000
  // );

  camera.position.z = 200;
  camera.position.y = 100;
  scene.add(camera);

  // This will draw what the camera sees onto the screen:
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.backgroundColor = '#ffffff';

  // ******** START CODING ON THE NEXT LINE ********
startAnime();
function startAnime()  {
var ground = addGround();
var avatar = addAvatar();
var avatarz = addAvatarz();
var avatarm = addAvatarm();
var avatart = addAvatart();
var avatare = addAvatare();
var avatarr = addAvatarr();
var avatarx = addAvatarx();
var avatarc = addAvatarc();
}
function resetAnime() {
  scene.remove(avatar);
  scene.remove(avatarx);
  scene.remove(avatarc);
  scene.remove(avatarr);
  scene.remove(avatarz);
  scene.remove(avatarm);
  scene.remove(avatare);
  scene.remove(avatart);
  console.log("removed")
}
function addGround() {
  document.body.style.backgroundColor = '#87CEEB';
  ground = new Physijs.PlaneMesh(
    new THREE.PlaneGeometry(1e6, 136, 100),
    new THREE.MeshBasicMaterial({color: 0x7CFC00})
  );
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);
  return ground;
}
function addAvatar() {
  avatar = new Physijs.BoxMesh(
    new THREE.CubeGeometry(40, 50, 1),
    new THREE.MeshBasicMaterial({color: 0x990000})
  );
  avatar.position.set(0, 50, 0);
  scene.add(avatar);
}
function addAvatarz() {
  avatarz = new Physijs.BoxMesh(
    new THREE.CubeGeometry(40, 50, 1),
    new THREE.MeshBasicMaterial({color: 0x990099})
  );
  avatarz.position.set(50, 100, 0);
  scene.add(avatarz);
}
function addAvatarm() {
  avatarm = new Physijs.BoxMesh(
    new THREE.CubeGeometry(40, 50, 1),
    new THREE.MeshBasicMaterial({color: 0x009900})
  );
  avatarm.position.set(100, 200, 0);
  scene.add(avatarm);
}
function addAvatart() {
  avatart = new Physijs.BoxMesh(
    new THREE.CubeGeometry(40, 50, 1),
    new THREE.MeshBasicMaterial({color: 0x999999})
  );
  avatart.position.set(200, 300, 0);
  scene.add(avatart);
}
function addAvatarc() {
  avatarc = new Physijs.BoxMesh(
    new THREE.CubeGeometry(40, 50, 1),
    new THREE.MeshBasicMaterial({color: 0x099999})
  );
  avatarc.position.set(0, 50, 0);
  scene.add(avatarc);
}
function addAvatare() {
  avatare = new Physijs.BoxMesh(
    new THREE.CubeGeometry(40, 50, 1),
    new THREE.MeshBasicMaterial({color: 0x090990})
  );
  avatare.position.set(-50, 100, 0);
  scene.add(avatare);
}
function addAvatarr() {
  avatarr = new Physijs.BoxMesh(
    new THREE.CubeGeometry(40, 50, 1),
    new THREE.MeshBasicMaterial({color: 0x099000})
  );
  avatarr.position.set(-100, 200, 0);
  scene.add(avatarr);
}
function addAvatarx() {
  avatarx = new Physijs.BoxMesh(
    new THREE.CubeGeometry(40, 50, 1),
    new THREE.MeshBasicMaterial({color: 0x999009})
  );
  avatarx.position.set(-200, 300, 0);
  scene.add(avatarx);
}
document.addEventListener('keydown', function(event) {
  var code = event.keyCode;
  if (code == 32) startAnime();
  if (code == 82) resetAnime();
});
  // Animate motion in the game
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  }
  animate();

  // Run physics
  function gameStep() {
    scene.simulate();
    // Update physics 60 times a second so that motion is smooth
    setTimeout(gameStep, 1000/600);
  }
  gameStep();
</script>
