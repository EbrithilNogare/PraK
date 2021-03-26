import * as THREE from 'https://unpkg.com/three/build/three.module.js'
import {
	PeppersGhostEffect
} from 'https://unpkg.com/three/examples/jsm/effects/PeppersGhostEffect.js'
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader.js'

let container

let camera, scene, renderer, effect
let group
let object

init()
animate()

function init() {
	container = document.createElement('div')
	document.body.appendChild(container)
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000)
	scene = new THREE.Scene()
	group = new THREE.Group()
	scene.add(group)

	const ambientLight = new THREE.AmbientLight( 0xffffff, 1.0 )
	scene.add( ambientLight )

	// Models
	// manager
	function loadModel() {
		object.traverse( function ( child ) {
			if ( child.isMesh ) child.material.map = texture
		} )
		group.add( object )
	}

	const manager = new THREE.LoadingManager( loadModel )
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total )
	}

	// texture
	const textureLoader = new THREE.TextureLoader( manager )
	const texture = textureLoader.load( 'models/ColorGrid.png' )
	// model

	function onProgress( xhr ) {
		if ( xhr.lengthComputable ) {
			const percentComplete = xhr.loaded / xhr.total * 100
			console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' )
		}
	}

	function onError() {}

	const loader = new OBJLoader( manager )
	loader.load( 'models/suzane.obj', function ( obj ) {
		object = obj
	}, onProgress, onError )

	
	// Renderer
	renderer = new THREE.WebGLRenderer()
	renderer.setPixelRatio(window.devicePixelRatio)
	container.appendChild(renderer.domElement)
	effect = new PeppersGhostEffect(renderer)
	effect.setSize(window.innerWidth, window.innerHeight)
	effect.cameraDistance = 5
	window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	effect.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
	requestAnimationFrame( animate )
	render()
}

function render() {
	group.rotation.y += 0.01
	effect.render(scene, camera)
}