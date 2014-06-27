<body></body>
<script src="http://gamingJS.com/Three.js"></script>
<script src="http://gamingJS.com/ChromeFixes.js"></script>
<script>
// This is where stuff in our game will happen:
var scene = new THREE.Scene();
// This is what sees the stuff:
var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;
scene.add(camera);
// This will draw what the camera sees onto the screen:
var renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled = true;
//var renderer = new THREE.CanvasRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// ******** START CODING ON THE NEXT LINE ********
var shape = new THREE.SphereGeometry(100);
var cover = new THREE.MeshBasicMaterial();
cover.color.setRGB(1, 0, 0);
var ball = new THREE.Mesh(shape, cover);
scene.add(ball);
ball.position.set(500, 0, 0);
var shape = new THREE.TorusGeometry(100, 50, 8, 20);
var cover = new THREE.MeshPhongMaterial();
cover.emissive.setRGB(0.8, 0.1, 0.1);
cover.specular.setRGB(0.9, 0.9, 0.9);
var donut = new THREE.Mesh(shape, cover);
scene.add(donut);
donut.castShadow = true;
var sunlight = new THREE.DirectionalLight();
sunlight.intensity = 0.5;
sunlight.position.set(100, 100, 100);
scene.add(sunlight);
sunlight.castShadow = true;
var shape = new THREE.PlaneGeometry(1000, 1000);
var cover = new THREE.MeshBasicMaterial();
var ground = new THREE.Mesh(shape, cover);
scene.add(ground);
ground.position.set(0, -200, 0);
ground.rotation.set(-Math.PI/2, 0, 0);
ground.receiveShadow = true;
var clock = new THREE.Clock();
function animate() {
requestAnimationFrame(animate);
var time = clock.getElapsedTime();
donut.rotation.set(time, 2*time, 0);
renderer.render(scene, camera);
}
animate();
</script>
