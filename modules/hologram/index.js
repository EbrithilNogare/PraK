import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { OBJLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/MTLLoader.js'
import Stats from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/stats.module'

let scene, group, renderer, stats, clock

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const modelName = urlParams.get("model") || "T72" 

const modelList = ["betonovyJezek", "jezek", "T72"]

let modelOBJ = `models/${modelName}.obj`
let modelMTL = `models/${modelName}.mtl`

let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

const views = [{
		left: 0,
		bottom: 0.5,
		angle: 0,
		rotation: 33.75
	},
	{
		left: 0,
		bottom: 0,
		angle: 90,
		rotation: 101.25
	},
	{
		left: 0.5,
		bottom: 0,
		angle: 180,
		rotation: -101.25
	},
	{
		left: 0.5,
		bottom: 0.5,
		angle: 270,
		rotation: 101.25
	}
]

function init() {
	scene = new THREE.Scene()

	clock = new THREE.Clock()
	
	stats = new Stats()
	stats.showPanel(0)
	stats.dom.style.display = "none"
	stats.dom.childNodes.forEach(node => node.style.display = "block")
	document.body.appendChild(stats.dom)

	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setScissorTest(true)
	renderer.setClearColor(0,0,0,1)
	document.body.appendChild(renderer.domElement)

	group = new THREE.Group()
	group.scale.set(300,300,300)
	group.position.set(0,-30,0)
	scene.add(group)

	setLights()
	loadModels()
	addCameras()
}

document.getElementById("button").addEventListener("click", buttonClicked)
function buttonClicked(){
	stats.dom.style.display = stats.dom.style.display === "none" ? "block" : "none"
}

function setLights(){
	const ambient = new THREE.AmbientLight(0xffffff, 1.0)
	scene.add(ambient)
}

function loadModels(){
	const mtlLoader = new MTLLoader()
    mtlLoader.load(
		modelMTL,
		mtl => {
			mtl.preload()
			const objLoader = new OBJLoader()
			//mtl.materials.Material.side = THREE.DoubleSide
			objLoader.setMaterials(mtl)
			objLoader.load(
				modelOBJ, 
				object => {
					group.add( object )
				},
				xhr => { 
					console.log( modelOBJ + " " + Math.round( xhr.loaded / xhr.total * 100, 2 ) + '% downloaded' )
				},
				err => { // onError
					console.warn("Error when loading " + modelOBJ, err)
				}
			)
    	},
		xhr => { // onProgress
				console.log( modelMTL + " " + Math.round( xhr.loaded / xhr.total * 100, 2 ) + '% downloaded' )
		},
		err => { // onError
			console.warn("Error when loading " + modelMTL, err)
		}
	)
}

function addCameras(){
	for(let view of views) {
		const camera = new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 1, 1000)

		camera.position.set(
			300 * Math.sin(90 * Math.PI / 180) * Math.cos(view.angle * Math.PI / 180),
			300 * Math.cos(90 * Math.PI / 180),
			300 * Math.sin(90 * Math.PI / 180) * Math.sin(view.angle * Math.PI / 180)
		)
		
		view.camera = camera
	}
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
	for(let view of views) {
		var camera = view.camera
		camera.aspect = windowWidth / windowHeight
		camera.updateProjectionMatrix()
	}
	renderer.setSize(window.innerWidth, window.innerHeight)
}


function render() {
	const delta = clock.getDelta()
	group.rotation.y += .4 * delta

	for(let view of views) {
		view.camera.lookAt(scene.position)
		view.camera.rotation.z = view.rotation - Math.PI

		const left = Math.floor(windowWidth * view.left)
		const bottom = Math.floor(windowHeight * view.bottom)
		const width = Math.floor(windowWidth * .5)
		const height = Math.floor(windowHeight * .5)

		renderer.setViewport(left, bottom, width, height)
		renderer.setScissor(left, bottom, width, height)

		renderer.render(scene, view.camera)
	}
}


function animate() {
	render()
	stats.update()
	requestAnimationFrame(animate)
}

init()
animate()
