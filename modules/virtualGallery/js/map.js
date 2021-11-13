import * as THREE from './threejs/three.module.js'


export default class Map {
	loader = new THREE.TextureLoader();
	
	WALLTHICKNESS = .2
	
	mapSize = {x:20, z:20, max:20, min:20};
	
	skybox = null;
	floor = null;
	debugFloor = null;
	debugHoverRectangle = null;
	rawMap = null



	constructor(scene){
		this.scene = scene;
		this.rawMap = [];
		for (var i = 0; i < this.mapSize.x/this.WALLTHICKNESS; i++) {
			this.rawMap[i] = [];
			for (var j = 0; j < this.mapSize.z/this.WALLTHICKNESS; j++) {
				this.rawMap[i][j] = null;
			}
		}
	}

	loadScene(){
		this.createSkyBox();
		this.createFloor();
		this.createDebugFloor();
		this.createDebugHoverRectangle();
	}

	tick(time){

		
	}



	createDebugFloor(){
		this.debugFloor = new THREE.GridHelper(this.mapSize.min, this.mapSize.min/this.WALLTHICKNESS, 0xffffff, 0xbbbbbb);
		this.scene.add(this.debugFloor);
	}

	createDebugHoverRectangle(){
		const geometry = new THREE.BoxGeometry( this.WALLTHICKNESS, .1, this.WALLTHICKNESS );
		const material = new THREE.MeshBasicMaterial( {color: 0x990000} );
		this.debugHoverRectangle = new THREE.Mesh( geometry, material );
		this.scene.add( this.debugHoverRectangle );
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
		this.floor.layers.enable( 1 );
		this.scene.add(this.floor);

		this.loader.load(
			'img/textures/brickFloor/diff.jpg',
			texture => {
				texture.repeat.set(this.mapSize.x / this.WALLTHICKNESS / 21, this.mapSize.z / this.WALLTHICKNESS / 22);
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				let newMaterialFloor = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
				this.floor.material = newMaterialFloor;
			},
			log => console.log( 'Log from img loader:', log ),
			error => console.error( 'Errpr from img loader:', error )
		);
	}





}
