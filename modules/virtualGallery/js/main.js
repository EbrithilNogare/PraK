import * as THREE from './threejs/three.module.js';
import { PointerLockControls } from './threejs/PointerLockControls.js';
import Player from './player.js';
import Stats from './stats.js';
import Map from './map.js';

let camera, scene, renderer, stats, player, input, map, controls, prevTime;



init()

function init() {
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
	camera.position.set(0,2,0);

	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog(0x000000, .1, 100);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.domElement.className = "mainCanvas";

	const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	scene.add( light );
	
	controls = new PointerLockControls( camera, document.body );
	controls.addEventListener( 'change', render ); // use this only if there is no animation loop
	controls.enableZoom = false;
	controls.enablePan = false;
	renderer.domElement.addEventListener( 'click', () => {controls.lock()} );
	scene.add( controls.getObject() );

	window.addEventListener("resize", onWindowResize);



	player = new Player(camera);
	map = new Map(scene);
	map.loadScene();

	stats = createStats();
	document.body.appendChild(stats.domElement);

	renderer.setAnimationLoop(animation);
}

function animation(time) {
	let delta = time - prevTime;
	prevTime = time;
	tick(delta);
	render(delta);
	stats.update();
}

function tick(delta) {
	map.tick(delta);
	player.tick(delta, map, controls);
}

function render() {
	renderer.render(scene, camera);
}

function createStats() {
	let stats = new Stats();
	stats.setMode(0);

	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0';
	stats.domElement.style.top = '0';

	return stats;
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}