import Player from './player.js';
import * as THREE from './threejs/three.module.js'


export default class Map {
	loader = new THREE.TextureLoader();
	scene
	
	WALLHEIGHT = 2.2;
	WALLTHICKNESS = .2
	
	mapSize = {x:20, z:20, max:20, min:20};
	mat = {
		floor: new THREE.MeshPhongMaterial({name: "floorMaterial", color: 0x000}),
		grass: new THREE.MeshPhongMaterial({name: "grassMaterial", color: 0x009900}),
		debugCube: new THREE.MeshPhongMaterial( {name: "debugCubeMaterial", color: 0x009900, opacity: .5, transparent: true} ),
		wall: new THREE.MeshPhongMaterial( {name: "wallMaterial", color: 0x444444} ),
		wallSelected: new THREE.MeshPhongMaterial( {name: "wallSelectedMaterial", color: 0xff1111} ),
		poster: new THREE.MeshPhongMaterial( {name: "posterMaterial", color: 0x999900} ),
		skyBox: new THREE.MeshBasicMaterial({name: "skyBoxMaterial", color: 0x000088, side: THREE.BackSide}),
	}
	textures = {

	}
	
	skybox = null;
	floor = null;
	floorGrid = null;
	debugCube = null;
	debugWallFirstPoint = null;
	walls = [];
	posters = [];

	constructor(scene, importMap = null){
		this.scene = scene;

		if(importMap !== null)
			this.importMap(importMap);
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
		this.floorGrid = new THREE.GridHelper(this.mapSize.max, this.mapSize.max, 0xffffff, 0xbbbbbb);
		this.floorGrid.visible = false;
		this.scene.add(this.floorGrid);
	}

	createDebugCube(){
		const geometry = new THREE.BoxGeometry( this.WALLTHICKNESS, this.WALLTHICKNESS, this.WALLTHICKNESS );
		this.debugCube = new THREE.Mesh( geometry, this.mat.debugCube );
		this.debugCube.visible = false;
		this.scene.add( this.debugCube );
	}

	createSkyBox(){
		this.scene.background = new THREE.CubeTextureLoader()
		.setPath( 'img/textures/skybox/' )
		.load( [
			'front.jpg',
			'back.jpg',
			'up.jpg',
			'down.jpg',
			'left.jpg',
			'right.jpg',
		] );
	}

	createFloor(){
		let PlaneGeometry = new THREE.PlaneGeometry(this.mapSize.x, this.mapSize.z, 1, 1);
		
		this.floor = new THREE.Mesh(PlaneGeometry, this.mat.floor);
		this.floor.name = "floor";
		this.floor.receiveShadow = true;
		this.floor.rotation.x = - Math.PI * 0.5;
		this.floor.position.set(0, 0, 0);
		this.floor.layers.enable( 1 );
		this.scene.add(this.floor);

		/****** grass *******/
		let grassGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
		let grass = new THREE.Mesh(grassGeometry, this.mat.grass);
		grass.name = "grass";
		grass.receiveShadow = true;
		grass.rotation.x = - Math.PI * 0.5;
		grass.position.set(0, -.05, 0);
		this.scene.add(grass);
	}

	loadTextures(){
		this.mat.floor.map = this.loader.load(
			'img/textures/brickFloor/diff.jpg',
			texture => {
				texture.repeat.set(this.mapSize.x / this.WALLTHICKNESS / 21, this.mapSize.z / this.WALLTHICKNESS / 22);
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				texture.anisotropy = 16;
				this.mat.floor.color.set(0xffffff);
			}
		);
		this.mat.wall.map = this.mat.wallSelected.map = this.loader.load(
			'img/textures/wall1/diff.jpg',
			texture => {
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				this.mat.wall.color.set(0xffffff);
			}
		);
		this.mat.grass.map = this.loader.load(
			'img/textures/grass/diff.jpg',
			texture => {
				texture.repeat.set(400, 400);
				texture.rotation = 1;
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				this.mat.grass.color.set(0xffffff);
			}
		);
		this.mat.wall.normalMap = this.loader.load(
			'img/textures/wall1/normal.jpg',
			texture => {
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
			}
		);
		this.mat.floor.normalMap = this.loader.load(
			'img/textures/brickFloor/normal.jpg',
			texture => {
				texture.repeat.set(this.mapSize.x / this.WALLTHICKNESS / 21, this.mapSize.z / this.WALLTHICKNESS / 22);
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
			}
		);
	}

	loadHDTextures(){

	}

	floorClicked(objectClicked, editMap, button){
		if(editMap == 1 && button === "left"){ // editWalls
			let point = objectClicked.point;
			point.x = this.roundCoor(point.x);
			point.z = this.roundCoor(point.z);
			if(this.debugWallFirstPoint === null)
				this.debugWallFirstPoint = new THREE.Vector3(point.x, point.y, point.z);
			else{
				this.createWall(this.debugWallFirstPoint, point);
				this.debugWallFirstPoint = null;
			}
		}
	}

	wallClicked(objectClicked, editMap, button){
		if(editMap == 1 && button === "right"){ // editWalls
			this.walls = this.walls.filter(wall => wall.object.uuid !== objectClicked.object.uuid);
			this.scene.remove(objectClicked.object);
		}

		if(editMap == 2 && button === "left"){ // editPosters
			let angle = new THREE.Vector3(0, .5 * Math.PI * objectClicked.face.normal.x + (objectClicked.face.normal.z < 0 ? Math.PI : 0), 0);
			let testImgSource = "img/posters/00.jpg" //todo
			let newPosition = objectClicked.point.addScaledVector(objectClicked.face.normal,.01);
			if(objectClicked.face.normal.z !== 0)
				newPosition.x = this.roundCoor(newPosition.x);
			else
				newPosition.z = this.roundCoor(newPosition.z);
			this.createPoster(newPosition, angle, testImgSource);
		}
	}

	posterClicked(objectClicked, editMap, button){
		if(editMap == 2 && button === "left"){ // editPosters
			let poster = this.posters.find(poster => poster.object == objectClicked.object);
			let oldImgSource = poster.imgSource;
			let newImgSource = prompt(`enter new imahe source (default: ${oldImgSource})`, oldImgSource);

			if(newImgSource !== null){
				this.loadTextureToPoster(newImgSource, objectClicked.object);
				poster.imgSource = newImgSource;
			}
		}

		if(editMap == 2 && button === "right"){ // editPosters
			this.posters = this.posters.filter(poster => poster.object.uuid !== objectClicked.object.uuid);
			this.scene.remove(objectClicked.object);
		}
	}

	roundCoor(coor){
		return Math.floor(coor/this.WALLTHICKNESS-this.WALLTHICKNESS/2)*this.WALLTHICKNESS+this.WALLTHICKNESS/2
	}

	createWall(first, second){
		this.walls.push(new Wall(first.x, first.z, second.x, second.z, this))
	}

	createPoster(position, rotation, imgSource){
		this.posters.push(new Poster(position, rotation, imgSource, this))
	}

	exportMap(player){
		const FD = 3; // fixed digits

		let toReturn = {
			isMapForVirtualGallery: true,
			player: {
				position: {
					x: +player.camera.position.x.toFixed(FD),
					y: +player.camera.position.y.toFixed(FD),
					z: +player.camera.position.z.toFixed(FD)
				},
				rotation: {
					x: +player.camera.rotation.x.toFixed(FD),
					y: +player.camera.rotation.y.toFixed(FD),
					z: +player.camera.rotation.z.toFixed(FD)
				}
			},
			walls: [],
			posters: [],
		}

		for(let wall of this.walls)
			toReturn.walls.push({ 
				x1: +wall.x1.toFixed(FD),
				z1: +wall.z1.toFixed(FD),
				x2: +wall.x2.toFixed(FD),
				z2: +wall.z2.toFixed(FD)
			});

		for(let poster of this.posters)
			toReturn.posters.push({ 
				position: {
					x: +poster.position.x.toFixed(FD),
					y: +poster.position.y.toFixed(FD),
					z: +poster.position.z.toFixed(FD)
				},
				rotation: {
					x: +poster.rotation.x.toFixed(FD),
					y: +poster.rotation.y.toFixed(FD),
					z: +poster.rotation.z.toFixed(FD)
				},
				imgSource: poster.imgSource
			});

		console.log("exported map: ", toReturn);
		
		let json = JSON.stringify(toReturn);
		console.log("exported map JSON: ", json);
		navigator.clipboard.writeText(json);

		console.log("exported map URI: ", window.location.href.split('?')[0] + "?rawMap=" + encodeURI(json));
		
		return(toReturn)
	}

	clearMap(){
		while(this.walls.length != 0){
			this.scene.remove(this.walls[0].object);
			this.walls.shift();
		}
		
		while(this.posters.length != 0){
			this.scene.remove(this.posters[0].object);
			this.posters.shift();
		}
	}
	
	importMap(mapData){
		console.log();
		this.scene.getObjectByName("camera").position.set(mapData.player.position.x, mapData.player.position.y, mapData.player.position.z);
		this.scene.getObjectByName("camera").rotation.set(mapData.player.rotation.x, mapData.player.rotation.y, mapData.player.rotation.z);

		for(let wall of mapData.walls)
			this.createWall({ x:wall.x1, z:wall.z1 }, { x:wall.x2, z:wall.z2 });
		
		for(let poster of mapData.posters)
			this.createPoster(poster.position, poster.rotation, poster.imgSource, this);
	
	}
	
	loadTextureToPoster(newImgSource, myObject){
		if (newImgSource in this.textures){
			myObject.scale.set(
				this.textures[newImgSource].image.width / this.textures[newImgSource].image.height,
				1,
				this.textures[newImgSource].image.width / this.textures[newImgSource].image.height
			);

			if(newImgSource.slice(-3).toLowerCase() === "png"){
				myObject.material.transparent = true;
			}

			myObject.material.color.set(0xffffff);
			myObject.material.map = this.textures[newImgSource];
			myObject.material.needsUpdate = true;
			
			return;
		}

		this.loader.loadAsync( newImgSource )
		.then(texture => {
			myObject.scale.set(
				texture.image.width / texture.image.height,
				1,
				texture.image.width / texture.image.height
			);

			if(newImgSource.slice(-3).toLowerCase() === "png"){
				myObject.material.transparent = true;
			}

			myObject.material.color.set(0xffffff);
			myObject.material.map = texture;
			myObject.material.needsUpdate = true;
			this.textures[newImgSource] = texture;
		})
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
			x1: Math.min(x1,x2) - map.WALLTHICKNESS,
			z1: Math.min(z1,z2) - map.WALLTHICKNESS,
			x2: Math.max(x1,x2) + map.WALLTHICKNESS,
			z2: Math.max(z1,z2) + map.WALLTHICKNESS,
		}
		
		const geometry = new THREE.BoxGeometry( Math.abs(x1-x2)+map.WALLTHICKNESS, map.WALLHEIGHT, Math.abs(z1-z2)+map.WALLTHICKNESS );
		this.assignUVs(geometry, Math.abs(x1-x2)+map.WALLTHICKNESS, Math.abs(z1-z2)+map.WALLTHICKNESS, map.WALLHEIGHT, x1, z1);
		this.object = new THREE.Mesh( geometry, map.mat.wall );
		this.object.name = "wall";
		this.object.layers.enable( 2 );
		this.object.castShadow = true;
		this.object.receiveShadow = true;
		this.object.position.set((x1+x2)/2, map.WALLHEIGHT/2, (z1+z2)/2)
		map.scene.add( this.object );
	}
	
	assignUVs(geometry, width, depth, WALLHEIGHT, positionX, positionZ) {

		let uvs = geometry.getAttribute("uv");
		const motion = positionX + positionZ;
		for (let i = 0; i < uvs.array.length-1; i+=2) {
			if(i%2==1) continue;
			uvs.array[i] *= i > 16 ? width / WALLHEIGHT : depth / WALLHEIGHT;
			uvs.array[i] += motion;
		}
		
		geometry.uvsNeedUpdate = true;
	}
}

class Poster{
	position
	rotation
	object
	imgSource

	constructor(position, rotation, imgSource, map){
		this.position = position;
		this.rotation = rotation;
		this.imgSource = imgSource;
		
		const geometry = new THREE.PlaneGeometry( 1.189, 1.189 );
		this.object = new THREE.Mesh( geometry, map.mat.poster.clone() );
		this.object.name = "poster";
		this.object.receiveShadow = true;

		this.object.layers.enable( 3 );
		this.object.position.set(position.x, 1.5, position.z)
		this.object.rotation.set(rotation.x, rotation.y, rotation.z)
		map.scene.add( this.object );

		map.loadTextureToPoster(imgSource, this.object)
	}
}