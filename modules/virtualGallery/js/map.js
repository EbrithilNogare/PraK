import * as THREE from './threejs/three.module.js'


export default class Map {
	loader = new THREE.TextureLoader();
	
	WALLHEIGHT = 2.2;
	WALLTHICKNESS = .2
	
	mapSize = {x:20, z:20, max:20, min:20};
	mat = {
		floor: new THREE.MeshBasicMaterial({color: 0x000}),
		debugCube: new THREE.MeshBasicMaterial( {color: 0x990000} ),
		wall: new THREE.MeshBasicMaterial( {color: 0x222222} ),
		skyBox: new THREE.MeshBasicMaterial({color: 0x000088, side: THREE.BackSide}),
	}
	
	skybox = null;
	floor = null;
	floorGrid = null;
	debugCube = null;
	debugWallFirstPoint = null;
	walls = []

	constructor(scene){
		this.scene = scene;
	}

	loadScene(){
		this.createSkyBox();
		this.createFloor();
		this.createFloorGrid();
		this.createDebugCube();
		this.loadTextures();
	}

	tick(time){

		
	}

	createFloorGrid(){
		this.floorGrid = new THREE.GridHelper(this.mapSize.min, this.mapSize.min/this.WALLTHICKNESS, 0xffffff, 0xbbbbbb);
		this.floorGrid.visible = false;
		this.scene.add(this.floorGrid);
	}

	createDebugCube(){
		const geometry = new THREE.BoxGeometry( this.WALLTHICKNESS, .1, this.WALLTHICKNESS );
		this.debugCube = new THREE.Mesh( geometry, this.mat.debugCube );
		this.scene.add( this.debugCube );
	}

	createSkyBox(){
		let skyboxGeo = new THREE.BoxGeometry(50, 50, 50);
		this.skybox = new THREE.Mesh(skyboxGeo, this.mat.skyBox);
		this.scene.add(this.skybox);
	}

	createFloor(){
		let PlaneGeometry = new THREE.PlaneGeometry(this.mapSize.x, this.mapSize.z, 1, 1);
		
		this.floor = new THREE.Mesh(PlaneGeometry, this.mat.floor);
		this.floor.name = "floor";
		this.floor.rotation.x = - Math.PI * 0.5;
		this.floor.position.set(0, 0, 0);
		this.floor.layers.enable( 1 );
		this.scene.add(this.floor);
	}

	loadTextures(){
		this.mat.floor.map = this.loader.load(
			'img/textures/brickFloor/diff.jpg',
			texture => {
				texture.repeat.set(this.mapSize.x / this.WALLTHICKNESS / 21, this.mapSize.z / this.WALLTHICKNESS / 22);
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				this.mat.floor.color.set(0xffffff);
			}
		);
		this.mat.wall.map = this.loader.load(
			'img/textures/wood1/diff.jpg',
			texture => {
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				this.mat.wall.color.set(0xffffff);
			}
		);
	}

	floorClicked(point){
		point.x = Math.floor(point.x/this.WALLTHICKNESS-this.WALLTHICKNESS/2)*this.WALLTHICKNESS+this.WALLTHICKNESS/2;
		point.z = Math.floor(point.z/this.WALLTHICKNESS-this.WALLTHICKNESS/2)*this.WALLTHICKNESS+this.WALLTHICKNESS/2;
		if(this.debugWallFirstPoint === null)
			this.debugWallFirstPoint = new THREE.Vector3(point.x, point.y, point.z);
		else{
			this.createWall(this.debugWallFirstPoint, point);
			this.debugWallFirstPoint = null;
		}
	}

	createWall(first, second){
		this.walls.push(new Wall(first.x, first.z, second.x, second.z, this))
	}



}

class Wall{
	x1
	z1
	x2
	z2
	object
	collisionBox

	constructor(x1,z1,x2,z2, map){
		this.x1 = x1;
		this.z1 = z1;
		this.x2 = x2;
		this.z2 = z2;
		this.collisionBox = {
			x1: Math.min(x1,x2)-map.WALLTHICKNESS,
			z1: Math.min(z1,z2)-map.WALLTHICKNESS,
			x2: Math.max(x1,x2)+map.WALLTHICKNESS,
			z2: Math.max(z1,z2)+map.WALLTHICKNESS,
		} // TODO check this funcitonality
		
		const geometry = new THREE.BoxGeometry( Math.abs(x1-x2)+map.WALLTHICKNESS, map.WALLHEIGHT, Math.abs(z1-z2)+map.WALLTHICKNESS );
		this.assignUVs(geometry, Math.abs(x1-x2)+1, Math.abs(z1-z2)+1);
		geometry.needsUpdate = true;
		this.object = new THREE.Mesh( geometry, map.mat.wall );
		this.object.name = "wall";
		this.object.position.set((x1+x2)/2, map.WALLHEIGHT/2, (z1+z2)/2)
		map.scene.add( this.object );
		
	}
	
	assignUVs(geometry, width, depth) {
	
		let uvs = geometry.getAttribute("uv");

		for (let i = 0; i < uvs.array.length-1; i+=2) {
			if(i%2==1) continue;
			uvs.array[i] *= i > 16 ? width : depth;
		}
		
		console.log(geometry);

		geometry.uvsNeedUpdate = true;
	}
}