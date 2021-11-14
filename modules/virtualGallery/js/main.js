import * as THREE from './threejs/three.module.js';
import { PointerLockControls } from './threejs/PointerLockControls.js';
import Player from './player.js';
import Stats from './threejs/stats.js';
import Map from './map.js';
import Maps from './maps.js';

let camera, scene, renderer, lights, stats, player, input, map, controls, prevTime, minimap;

// layers:
//  0 all
//  1 floor
//  2 walls
//  3 poster


init()

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color("black");

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
	camera.name = "camera";

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.domElement.className = "mainCanvas";

	lights = {};
	const sun = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 1 );
	sun.position.set( 0, 20, 0 );
	lights["sun"] = sun
	scene.add( lights["sun"] );
	
	lights["spotlights"] = []

	let dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.name = 'dirLight';
	dirLight.position.set( 10, 10, 5 );
	dirLight.castShadow = true;
	dirLight.shadow.camera.near = 1;
	dirLight.shadow.camera.far = 50;
	dirLight.shadow.camera.right = 15;
	dirLight.shadow.camera.left = -15;
	dirLight.shadow.camera.top	= 15;
	dirLight.shadow.camera.bottom = -15;
	dirLight.shadow.mapSize.width = 1024;
	dirLight.shadow.mapSize.height = 1024;
	scene.add( dirLight );
	lights["dirLight"] = dirLight
	
	//scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

	
	controls = new PointerLockControls( camera, document.body );
	controls.enableZoom = true;
	controls.enablePan = false;
	renderer.domElement.addEventListener( 'click', () => { controls.lock(); } );
	scene.add( controls.getObject() );

	window.addEventListener("resize", onWindowResize);

	map = new Map(scene);
	map.loadScene();
	
	player = new Player(camera, map);
	camera.position.set(0, player.PLAYERHEIGHT,0);

	stats = createStats();
	document.body.appendChild(stats.domElement);

	const minimapCavnas = document.getElementById("minimap");
	minimap = {
		scale: 4,
		canvas: minimapCavnas,	
		ctx: minimapCavnas.getContext('2d'),
	};
	minimapCavnas.width = map.mapSize.x / map.WALLTHICKNESS * minimap.scale;
	minimapCavnas.height = map.mapSize.z / map.WALLTHICKNESS * minimap.scale;

	map.importMap(Maps.debugMap);
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
	player.tick(delta, controls);
}

function render() {
	renderMiniMap();
	renderer.render(scene, camera);
}

function renderMiniMap(){
	minimap.ctx.clearRect(0, 0, minimap.canvas.width, minimap.canvas.height);
	
	for(let wall of map.walls){
		minimap.ctx.beginPath();
		minimap.ctx.rect(
			(Math.min(wall.x1, wall.x2)+map.mapSize.x/2)/map.WALLTHICKNESS * minimap.scale,
			(Math.min(wall.z1, wall.z2)+map.mapSize.z/2)/map.WALLTHICKNESS * minimap.scale,
			(Math.abs(wall.x1-wall.x2)/map.WALLTHICKNESS+1) * minimap.scale,
			(Math.abs(wall.z1-wall.z2)/map.WALLTHICKNESS+1) * minimap.scale
		);
		minimap.ctx.fillStyle = 'black';
		minimap.ctx.fill();
	}
	
	for(let poster of map.posters){
		let posterPosX = (poster.position.x + map.mapSize.x/2)/map.WALLTHICKNESS * minimap.scale;
		let posterPosZ = (poster.position.z + map.mapSize.z/2)/map.WALLTHICKNESS * minimap.scale;
		minimap.ctx.beginPath();
		minimap.ctx.arc(posterPosX, posterPosZ, 1*minimap.scale, 0, 2 * Math.PI);
		minimap.ctx.fillStyle = 'yellow';
		minimap.ctx.fill();
	}

	let playerPosX = (camera.position.x + map.mapSize.x/2)/map.WALLTHICKNESS * minimap.scale;
	let playerPosZ = (camera.position.z + map.mapSize.z/2)/map.WALLTHICKNESS * minimap.scale;
	minimap.ctx.beginPath();
	minimap.ctx.arc(playerPosX, playerPosZ, 1*minimap.scale, 0, 2 * Math.PI);
	minimap.ctx.fillStyle = 'green';
	minimap.ctx.fill();
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