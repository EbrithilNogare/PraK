import * as THREE from './three.module.js'
import Player from './player.module.js'
import Stats from './stats.module.js'

let camera, scene, renderer, stats, player, input
let geometry, material, mesh



init()

function init() {

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
	camera.position.z = 1

	scene = new THREE.Scene()
	scene.fog = new THREE.Fog(0x000000, .1, 9)

	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
	material = new THREE.MeshNormalMaterial()

	mesh = new THREE.Mesh(geometry, material)
	scene.add(mesh)

	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	renderer.domElement.className = "mainCanvas"
	renderer.domElement.requestPointerLock()

	player = new Player(camera)

	stats = createStats()
	document.body.appendChild(stats.domElement)

	renderer.setAnimationLoop(animation)
}

function animation(time) {
	tick(time)
	render()
	stats.update()
}

function tick(time) {
	player.tick(time)

	mesh.rotation.x = time / 2000 // todo remove
	mesh.rotation.y = time / 1000 // todo remove
}

function render() {
	renderer.render(scene, camera)
}

function createStats() {
	let stats = new Stats()
	stats.setMode(0)

	stats.domElement.style.position = 'absolute'
	stats.domElement.style.left = '0'
	stats.domElement.style.top = '0'

	return stats
}



