<body></body>
<script src="http://gamingJS.com/Three.js"></script>
<script src="http://gamingJS.com/physi.js"></script>
<script src="http://gamingJS.com/ChromeFixes.js"></script>

<script>
  // Physics settings
  Physijs.scripts.ammo = 'http://gamingJS.com/ammo.js';
  Physijs.scripts.worker = 'http://gamingJS.com/physijs_worker.js';

  // This is where stuff in our game will happen:
  var scene = new Physijs.Scene({ fixedTimeStep: 2 / 60 });
  scene.setGravity(new THREE.Vector3( 0, 0, 0 ));

  // This is what sees the stuff:
  var width = window.innerWidth,
      height = window.innerHeight,
      aspect_ratio = width / height;
  var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  // var camera = new THREE.OrthographicCamera(
  //   -width/2, width/2, height/2, -height/2, 1, 10000
  // );

  camera.position.z = 500;
  scene.add(camera);

  // This will draw what the camera sees onto the screen:
  var renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.backgroundColor = '#ffffff';

  // ******** START CODING ON THE NEXT LINE ********
var cube = addCube();
function addCube() {
  var cube = new Physijs.BoxMesh(
    new THREE.CubeGeometry(101, 100, 100),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
  );
  scene.add(cube);
  var face = new Physijs.BoxMesh(
    new THREE.CubeGeometry(100, 101, 100),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
  );
  var newbie = new Physijs.BoxMesh(
    new THREE.CubeGeometry(100, 100, 101),
    new THREE.MeshBasicMaterial({color: 0xff0000})
  );
  //face.rotation.set(-Math.PI/2, 0, Math.PI/2);
  cube.add(face);
  cube.add(newbie);
  return cube;
  
}


  // Animate motion in the game
  var clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    var time = clock.getElapsedTime();
    cube.rotation.set(time, 2*time, 0);
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
