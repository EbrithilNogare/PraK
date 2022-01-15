import * as THREE from 'https://cdn.skypack.dev/three@0.135.0'
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/MTLLoader.js'

import Player from './player.js';

export default class Map {
	textureLoader = new THREE.TextureLoader();
	objLoader = new OBJLoader();
	mtlLoader = new MTLLoader();
	scene
	
	WALLHEIGHT = 2.2;
	WALLTHICKNESS = .2
	
	mapSize = {x:20, z:20, max:20, min:20};
	mat = {
		floor: new THREE.MeshPhongMaterial({name: "floorMaterial", color: 0x000}),
		grass: new THREE.MeshPhongMaterial({name: "grassMaterial", color: 0x009900}),
		debugCube: new THREE.MeshPhongMaterial( {name: "debugCubeMaterial", color: 0x009900, opacity: .5, transparent: true} ),
		selectorCube: new THREE.MeshPhongMaterial( {name: "selectorCubeMaterial", color: 0xffff00, wireframe: true} ),
		wall: new THREE.MeshPhongMaterial( {name: "wallMaterial", color: 0x444444} ),
		wallSelected: new THREE.MeshPhongMaterial( {name: "wallSelectedMaterial", color: 0xff1111} ),
		poster: new THREE.MeshPhongMaterial( {name: "posterMaterial", color: 0x999900} ),
		skyBox: new THREE.MeshBasicMaterial({name: "skyBoxMaterial", color: 0x000088, side: THREE.BackSide}),
	}
	textures = {
		
	}

	DEFAULT_POSTER_TEXTURE = "img/special/defaultPoster.jpg";
	MISSING_POSTER_TEXTURE = "img/special/defaultPoster.jpg";
	
	skybox = null;
	floor = null;
	floorGrid = null;
	debugCube = null;
	selectorCube = null;
	debugWallFirstPoint = null;
	walls = [];
	posters = [];
	models = [];

	constructor(scene, importMap = null){
		this.scene = scene;

		if(importMap !== null)
			this.importMap(importMap);
	}

	loadScene(){
		this.createDebugCube();
		this.createSelectorCube();
		this.createFloor();
		this.createFloorGrid();
		this.createSkyBox();
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
	
	createSelectorCube(){
		const geometry = new THREE.BoxGeometry( 1,1,1,3,3,3 );
		this.selectorCube = new THREE.Mesh( geometry, this.mat.selectorCube );
		this.selectorCube.visible = false;
		this.scene.add( this.selectorCube );
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
		this.mat.floor.map = this.textureLoader.load(
			'img/textures/brickFloor/diff.jpg',
			texture => {
				texture.repeat.set(this.mapSize.x / this.WALLTHICKNESS / 21, this.mapSize.z / this.WALLTHICKNESS / 22);
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				texture.anisotropy = 16;
				this.mat.floor.color.set(0xffffff);
			}
		);
		this.mat.wall.map = this.mat.wallSelected.map = this.textureLoader.load(
			'img/textures/wall1/diff.jpg',
			texture => {
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				this.mat.wall.color.set(0xffffff);
			}
		);
		this.mat.grass.map = this.textureLoader.load(
			'img/textures/grass/diff.jpg',
			texture => {
				texture.repeat.set(400, 400);
				texture.rotation = 1;
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				this.mat.grass.color.set(0xffffff);
			}
		);
		this.mat.wall.normalMap = this.textureLoader.load(
			'img/textures/wall1/normal.jpg',
			texture => {
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
			}
		);
		this.mat.floor.normalMap = this.textureLoader.load(
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

	floorClicked(objectClicked, editMap, button, down = true){
		if(editMap == 1 && button === "left" && down){ // editWalls
			let point = objectClicked.point;
			point.x = this.roundCoor(point.x);
			point.z = this.roundCoor(point.z);
			this.debugWallFirstPoint = new THREE.Vector3(point.x, point.y, point.z);
		}
		if(editMap == 1 && button === "left" && !down){ // editWalls
			let point = objectClicked.point;
			point.x = this.roundCoor(point.x);
			point.z = this.roundCoor(point.z);
			if(this.debugWallFirstPoint === null)
				return;
			else{
				this.createWall(this.debugWallFirstPoint, point);
				this.debugWallFirstPoint = null;
			}
		}
		if(editMap == 3 && button === "left" && down){ // editModels
			let point = objectClicked.point;
			point.x = this.roundCoor(point.x);
			point.z = this.roundCoor(point.z);
			this.models.push(new Model(point, new THREE.Vector3(), 1.5, "models/jezek/jezek.obj", "models/jezek/jezek.mtl", this, true))
		}
	}

	wallClicked(objectClicked, editMap, button){
		if(editMap == 1 && button === "right"){ // editWalls
			this.walls = this.walls.filter(wall => wall.object.uuid !== objectClicked.object.uuid);
			this.scene.remove(objectClicked.object);
		}

		if(editMap == 2 && button === "left"){ // editPosters
			let angle = new THREE.Vector3(0, .5 * Math.PI * objectClicked.face.normal.x + (objectClicked.face.normal.z < 0 ? Math.PI : 0), 0);
			let testImgSource = this.DEFAULT_POSTER_TEXTURE;
			let newPosition = objectClicked.point.addScaledVector(objectClicked.face.normal,.01);
			if(objectClicked.face.normal.z !== 0)
				newPosition.x = this.roundCoor(newPosition.x);
			else
				newPosition.z = this.roundCoor(newPosition.z);
				newPosition.y = 1.5;
			this.createPoster(newPosition, angle, testImgSource);
		}
	}

	posterClicked(objectClicked, editMap, button){
		if(editMap == 2 && button === "right"){ // editPosters
			this.posters = this.posters.filter(poster => poster.object.uuid !== objectClicked.object.uuid);
			this.scene.remove(objectClicked.object);
		}
		
		if(editMap == 0 && button === "left"){ // visitor
			console.log(objectClicked.object.userData.class)
			window.windowObjectReference = window.open(
				objectClicked.object.userData.class.imgSource,
				"Poster preview",
				"width="+screen.availWidth+", height="+screen.availHeight
			)
			window.windowObjectReference.moveTo(0,0)
		}
	}

	modelClicked(objectClicked, editMap, button){
		if(editMap == 3 && button === "right"){ // editPosters
			let parent = objectClicked.object.parent;
			this.models = this.models.filter(model => model.object.uuid !== parent.uuid);
			this.scene.remove(parent);
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
			models: [],
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

			for(let model of this.models)
				toReturn.models.push({ 
					position: {
						x: +model.position.x.toFixed(FD),
						y: +model.position.y.toFixed(FD),
						z: +model.position.z.toFixed(FD)
					},
					rotation: {
						x: +model.rotation.x.toFixed(FD),
						y: +model.rotation.y.toFixed(FD),
						z: +model.rotation.z.toFixed(FD)
					},
					size: model.size,
					sourceOBJ: model.sourceOBJ,
					sourceMTL: model.sourceMTL
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
		
		while(this.models.length != 0){
			this.scene.remove(this.models[0].object);
			this.models.shift();
		}
	}
	
	importMap(mapData){

		this.scene.getObjectByName("camera").position.set(mapData.player.position.x, mapData.player.position.y, mapData.player.position.z);
		this.scene.getObjectByName("camera").rotation.set(mapData.player.rotation.x, mapData.player.rotation.y, mapData.player.rotation.z);

		for(let wall of mapData.walls)
			this.createWall({ x:wall.x1, z:wall.z1 }, { x:wall.x2, z:wall.z2 });
		
		for(let poster of mapData.posters)
			this.createPoster(poster.position, poster.rotation, poster.imgSource);
			
		for(let model of mapData.models)
			this.models.push(new Model(model.position, model.rotation, model.size, model.sourceOBJ, model.sourceMTL, this, false))
	
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

		this.textureLoader.loadAsync( newImgSource )
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
		this.object.position.set((x1+x2)/2, map.WALLHEIGHT/2, (z1+z2)/2);

		this.object.userData.class = this;

		map.scene.add( this.object );
	}

	setupDatGui(datGui, selectorCube){
	// datGui.selectorFolderControlers.push(datGui.gui.selectorFolder.add(this, 'x1', -20, 20, 1)); //todo change material
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
	map

	constructor(position, rotation, imgSource, map){
		this.position = position;
		this.rotation = rotation;
		this.imgSource = imgSource;
		this.map = map;
		
		const geometry = new THREE.PlaneGeometry( 1.189, 1.189 );
		this.object = new THREE.Mesh( geometry, map.mat.poster.clone() );
		this.object.name = "poster";
		this.object.receiveShadow = true;

		this.object.layers.enable( 3 );
		this.object.position.set(position.x, position.y, position.z)
		this.object.rotation.set(rotation.x, rotation.y, rotation.z)

		this.object.userData.class = this;

		map.scene.add( this.object );

		map.loadTextureToPoster(imgSource, this.object)
	}

	setupDatGui(datGui, selectorCube){
		let imgSourceControler = datGui.gui.selectorFolder.add(this, 'imgSource').onFinishChange(value => {
			this.map.loadTextureToPoster(value, this.object);
		});
		datGui.selectorFolderControlers.push(imgSourceControler);
	}
}

class Model{
	position
	rotation
	size
	sourceOBJ
	sourceMTL
	object
	map
	maxSide

	constructor(position, rotation, size, sourceOBJ, sourceMTL, map, autoAltitude){
		this.position = position;
		this.rotation = rotation;
		this.size = size; // 1 is 1 meter
		this.sourceOBJ = sourceOBJ;
		this.sourceMTL = sourceMTL;
		this.map = map;

		this.loadModel(sourceOBJ, sourceMTL, map, autoAltitude);
	}

	setupDatGui(datGui, selectorCube){
		selectorCube.position.set(this.position.x, this.position.y, this.position.z);
		selectorCube.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
		selectorCube.scale.set(this.size,this.size,this.size);

		let buttons = {
			loadModel: () => {
				this.map.scene.remove( this.object );
				this.loadModel(this.sourceOBJ, this.sourceMTL, this.map, true);
			},
			restartHeight: () => {
				const boundingBox = new THREE.Box3().setFromObject(this.object);
				this.position.y -= boundingBox.min.y;
				this.object.position.set(this.position.x,this.position.y,this.position.z);
			},
		}

		// position
		let positionControlerX = datGui.gui.selectorFolder
			.add(this.position, 'x', -20, 20, .1)
			.listen()
			.name("Pozice X")
			.onChange(value => {
				this.object.position.set(this.position.x,this.position.y,this.position.z);
			});
		datGui.selectorFolderControlers.push(positionControlerX);

		let positionControlerZ = datGui.gui.selectorFolder
			.add(this.position, 'z', -20, 20, .1)
			.listen()
			.name("Pozice Z")
			.onChange(value => {
				this.object.position.set(this.position.x,this.position.y,this.position.z);
			});
		datGui.selectorFolderControlers.push(positionControlerZ);
		
		let positionControlerY = datGui.gui.selectorFolder
			.add(this.position, 'y', 0, 5, .01)
			.listen()
			.name("Pozice horizontálně")
			.onChange(value => {
				this.object.position.set(this.position.x,this.position.y,this.position.z);
			});
		datGui.selectorFolderControlers.push(positionControlerY);
		
		let positionControlerYReset = datGui.gui.selectorFolder
			.add(buttons, 'restartHeight')
			.name("Posadit na zem");
		datGui.selectorFolderControlers.push(positionControlerYReset);
		

		// size
		let sizeControler = datGui.gui.selectorFolder.add(this, 'size', 0, 10, .1).name("Velikost (metry)").onChange(value => {
			this.object.scale.set(
				this.size/this.maxSide,
				this.size/this.maxSide,
				this.size/this.maxSide
			);
		});
		datGui.selectorFolderControlers.push(sizeControler);
		
		// rotation
		let rotationControler = datGui.gui.selectorFolder.add(this.rotation, 'y', 0, Math.PI*2, Math.PI/16)
			.listen()
			.name("Rotace")
			.onChange(value => {
				this.object.rotation.set(this.rotation.x,this.rotation.y,this.rotation.z);
			});
		datGui.selectorFolderControlers.push(rotationControler);

		// surce data
		let sourceOBJControler = datGui.gui.selectorFolder.add(this, 'sourceOBJ')
		datGui.selectorFolderControlers.push(sourceOBJControler);

		let sourceMTLControler = datGui.gui.selectorFolder.add(this, 'sourceMTL')
		datGui.selectorFolderControlers.push(sourceMTLControler);

		let loadModelControler = datGui.gui.selectorFolder.add(buttons, 'loadModel')
			.name("Načíst model");
		datGui.selectorFolderControlers.push(loadModelControler);
	}
	
	loadModel(modelOBJ, modelMTL, map, autoAltitude = true){
		let objLoader = new OBJLoader();
		map.mtlLoader.loadAsync(modelMTL)
		.then(mtl => {
			//mtl.preload()
			//mtl.side = THREE.DoubleSide
			objLoader.setMaterials(mtl)
			objLoader.loadAsync(modelOBJ) 
			.then(object => {
					const boundingBox = new THREE.Box3().setFromObject(object);

					object.name = "model";
					object.children.forEach(mesh => {
						mesh.name = "modelComponent";
						mesh.castShadow = true
						mesh.receiveShadow = true
						mesh.layers.enable(4);
						mesh.material.metalness = 0;
						mesh.material.roughness = 1;
						mesh.userData.class = this;
					});

					this.maxSide = Math.max(boundingBox.max.x - boundingBox.min.x, Math.max(boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z));
					object.scale.set(
						this.size/this.maxSide,
						this.size/this.maxSide,
						this.size/this.maxSide
					);

					if(autoAltitude)
						this.position.y = - this.size * boundingBox.min.y / this.maxSide;
					
						object.position.set(this.position.x, this.position.y, this.position.z);
					
					object.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
					
					//const boundingBoxHelper = new THREE.BoxHelper( object, 0xffff00 );
					//map.scene.add(boundingBoxHelper);
					
					this.object = object;

					this.object.userData.class = this;

					map.scene.add(object);
				})
				.catch( err => { // onError
					console.warn("Error when loading " + modelOBJ, err)
				})
		})
		.catch(
			err => { // onError
				console.warn("Error when loading " + modelMTL, err)
		})
	}
}
