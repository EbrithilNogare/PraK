import * as THREE from './threejs/three.module.js'


export default class Map {
	WALLTHICKNESS = .2
	mapSize = {x:20, z:20, max:20, min:20};
	skybox = null;
	floor = null;
	debugFloor = {}




	constructor(scene){
		this.scene = scene;
	}

	loadScene(){
		this.createSkyBox();
		this.createFloor();
		this.createDebugFloor();
	}

	tick(time){

		
	}



	createDebugFloor(){
		const material = new THREE.LineBasicMaterial({
			color: 0x000000
		});
		
		let  helperGrid = new THREE.GridHelper(this.mapSize.min, this.mapSize.min/this.WALLTHICKNESS, 0x000000, 0x666666);
		this.scene.add(helperGrid);
		
	}

	createSkyBox(){
		let skyboxGeo = new THREE.BoxGeometry(50, 50, 50);
		let materialSkybox = new THREE.MeshBasicMaterial({color: 0x000088, side: THREE.BackSide});
		this.skybox = new THREE.Mesh(skyboxGeo, materialSkybox);
		this.scene.add(this.skybox);
	}

	createFloor(){
		let PlaneGeometry = new THREE.PlaneGeometry(this.mapSize.x, this.mapSize.z, this.mapSize.x, this.mapSize.z);
		let materialFloor = new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.BackSide});
		
		this.floor = new THREE.Mesh(PlaneGeometry, materialFloor);
		this.floor.rotation.x = Math.PI * 0.5;
		this.floor.position.set(0, 0, 0);
		this.scene.add(this.floor);
	}





}
