import { GUI } from 'https://cdn.skypack.dev/dat.gui@0.7.7';
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0'

export default class Player {
    MOVESPEED = 0.005;
    CROUCHSPEED = 0.001;
    TURNSPEED = Math.PI / 180; //! todo doesnt work 
    PLAYERHEIGHT = 1.7;
    PLAYERCROUCHHEIGHT = 1.2;
	
	raycaster = new THREE.Raycaster();
	raycasterHits = []

	camera
	map
	controls
	datGui = {
		gui: null,
		selectorCube: null,
		selectedObject: null,
		selectorFolder: null,
		selectorFolderControlers: [],
		emptySelectorFolder: () => {
			while(this.datGui.selectorFolderControlers.length !== 0){
				this.datGui.selectorFolderControlers[0].remove();
				this.datGui.selectorFolderControlers.shift();
			}
		},
		updateSelectorCube: () => {
			const selectedObject = this.datGui.selectedObject;
			const selectorCube = this.datGui.selectorCube;
			const boundingBox = new THREE.Box3().setFromObject(selectedObject.object);
			selectorCube.position.set(
				(boundingBox.max.x + boundingBox.min.x) / 2,
				(boundingBox.max.y + boundingBox.min.y) / 2,
				(boundingBox.max.z + boundingBox.min.z) / 2
			);
			selectorCube.rotation.set(0,0,0);
			selectorCube.scale.set(
				boundingBox.max.x - boundingBox.min.x,
				boundingBox.max.y - boundingBox.min.y,
				boundingBox.max.z - boundingBox.min.z
			);
		},
	}
	
    editMap = 0 // 0: visitor, 1: walls, 2: posters, 3: models
	jumpVelocity = 0
	canJump = true

	moveControls = {
		forward: 0,
		back: 0,
		left: 0,
		right: 0,
		crouch: 0,
		jump: 0,
	}

	constructor(camera, map, controls) {		
		this.camera = camera;
		this.map = map;
		this.controls = controls;
		this.datGui.selectorCube = map.selectorCube;

		this.createDatGui();
		this.setupHandlers();
	}

	tick(delta){

		if(this.editMap === 0){
			this.datGui.gui.hide();
		}else{
			this.datGui.gui.show();
		}

		if(this.datGui.selectedObject === null || this.editMap === 0){
			this.map.selectorCube.visible = false;
		}else{
			this.map.selectorCube.visible = true;
			this.datGui.updateSelectorCube();
		}
		
		/******** movePlayer *********/
		if(!this.controls.isLocked)
			return;

		if(delta > 500)
			return;
			
		let direction = new THREE.Vector3();
		direction.z = this.moveControls.forward - this.moveControls.back;
		direction.x = this.moveControls.right - this.moveControls.left;
		direction.normalize(); // this ensures consistent movements in all directions
		
		direction.x *= (this.moveControls.crouch ? this.CROUCHSPEED : this.MOVESPEED) * delta;
		direction.z *= (this.moveControls.crouch ? this.CROUCHSPEED : this.MOVESPEED) * delta;

		if ( this.moveControls.jump &&  this.canJump === true){
			this.jumpVelocity += 200;
			this.canJump = false;	
		}
		
		this.controls.getObject().position.y += this.jumpVelocity * delta / 20000;
		if(this.controls.getObject().position.y > (this.moveControls.crouch ? this.PLAYERCROUCHHEIGHT : this.PLAYERHEIGHT)){
			this.jumpVelocity -= 9.8 * 80.0 * delta / 1000;
		} else {
			this.controls.getObject().position.y = this.moveControls.crouch ? this.PLAYERCROUCHHEIGHT : this.PLAYERHEIGHT;
			this.jumpVelocity = 0;
			this.canJump = true;	
		}

		let oldPosX = this.camera.position.x;
		let oldPosZ = this.camera.position.z;

		this.controls.moveForward( direction.z );
		this.controls.moveRight( direction.x );

		let newPosX = this.camera.position.x;
		let newPosZ = this.camera.position.z;

		if(this.editMap === 0){
			for(let wall of this.map.walls){
				if(
					Math.min(wall.collisionBox.x1, wall.collisionBox.x2) <= newPosX &&
					Math.max(wall.collisionBox.x1, wall.collisionBox.x2) >= newPosX &&
					Math.min(wall.collisionBox.z1, wall.collisionBox.z2) <= oldPosZ &&
					Math.max(wall.collisionBox.z1, wall.collisionBox.z2) >= oldPosZ
				){
					this.camera.position.x = oldPosX;
					break;
				}
			}
			for(let wall of this.map.walls){
				if(
					Math.min(wall.collisionBox.x1, wall.collisionBox.x2) <= oldPosX &&
					Math.max(wall.collisionBox.x1, wall.collisionBox.x2) >= oldPosX &&
					Math.min(wall.collisionBox.z1, wall.collisionBox.z2) <= newPosZ &&
					Math.max(wall.collisionBox.z1, wall.collisionBox.z2) >= newPosZ
				){
					this.camera.position.z = oldPosZ;
					break;
				}
			}
		}
		
		/******** Raytrace *********/
		this.raycaster.layers.set( 1 );    // floor
		this.raycaster.layers.enable( 2 ); // wall
		this.raycaster.layers.enable( 3 ); // poster
		this.raycaster.layers.enable( 4 ); // model
		this.raycaster.setFromCamera( new THREE.Vector2(0,0), this.camera );
		this.raycasterHits = this.raycaster.intersectObjects( this.map.scene.children );
		
		for (let wall of this.map.walls)
			if(wall.object.material.name !== "wallMaterial")					
				wall.object.material = this.map.mat.wall;

		this.map.debugCube.visible = false;
		this.map.debugCube.rotation.set(0,0,0);
		
		let hit = this.raycasterHits.length > 0 ? this.raycasterHits[0] : null;
		/******* Wall editor *******/
		if(this.editMap === 1 && this.raycasterHits.length > 0 && hit.object.name === "floor"){
			this.map.debugCube.visible = true;
			let hitPointRoundedX = this.map.roundCoor(hit.point.x);
			let hitPointRoundedZ = this.map.roundCoor(hit.point.z);
			
			if(this.map.debugWallFirstPoint === null){
				/******* Show position *******/
				this.map.debugCube.scale.set(1,1,1);
				this.map.debugCube.position.set(
					hitPointRoundedX,
					0,
					hitPointRoundedZ
				)
			} else {
				/******* Show wall *******/
				this.map.debugCube.scale.set(
					(Math.abs(hitPointRoundedX - this.map.debugWallFirstPoint.x) + this.map.WALLTHICKNESS) / this.map.WALLTHICKNESS,
					1,
					(Math.abs(hitPointRoundedZ - this.map.debugWallFirstPoint.z) + this.map.WALLTHICKNESS) / this.map.WALLTHICKNESS
				);
				this.map.debugCube.position.set(
					(hitPointRoundedX + this.map.debugWallFirstPoint.x) / 2,
					0,
					(hitPointRoundedZ + this.map.debugWallFirstPoint.z) / 2,
				)
			}
		}
		
		/******* Poster editor *******/
		if(this.editMap === 1 && this.raycasterHits.length > 0 && hit.object.name === "wall"){
			hit.object.material = this.map.mat.wallSelected;
		}
		if(this.editMap === 2 && this.raycasterHits.length > 0 && hit.object.name === "wall"){
			this.map.debugCube.visible = true;
			this.map.debugCube.scale.set(5*.841, 5*1.189, .1); // todo resize
			let angle = new THREE.Vector3(0, .5 * Math.PI * hit.face.normal.x + (hit.face.normal.z < 0 ? Math.PI : 0), 0);
			
			let newPosition = hit.point.addScaledVector(hit.face.normal,.01);
			if(hit.face.normal.z !== 0)
				newPosition.x = this.map.roundCoor(newPosition.x);
			else
				newPosition.z = this.map.roundCoor(newPosition.z);

			this.map.debugCube.position.set(newPosition.x, 1.5, newPosition.z);

			this.map.debugCube.rotation.set(angle.x, angle.y, angle.z);

		}		
		if(this.editMap === 2 && this.raycasterHits.length > 0 && hit.object.name === "poster"){

		}	
		/******* Items editor *******/
		
		if(this.editMap === 3 && this.raycasterHits.length > 0 && hit.object.name === "floor"){
			this.map.debugCube.visible = true;
			let hitPointRoundedX = this.map.roundCoor(hit.point.x);
			let hitPointRoundedZ = this.map.roundCoor(hit.point.z);

			this.map.debugCube.scale.set(5,1,5);
			this.map.debugCube.position.set(
				hitPointRoundedX,
				0,
				hitPointRoundedZ
			)
		}
		if(this.editMap === 3 && this.raycasterHits.length > 0 && hit.object.name === "modelComponent"){
			//console.log(hit.object.parent)
		}
		

		this.map.floorGrid.visible = this.editMap > 0;

	}


	createDatGui(){
		this.datGui.gui = new GUI({closed: false, closeOnTop: false, width: 300});
		this.datGui.gui.domElement.id = "datGui";

		const buttons = {
			exportMap: () => {this.map.exportMap(this);},
			unbindSelected: () => {
				this.datGui.selectedObject = null;
				this.datGui.emptySelectorFolder();
			},
		};

		this.datGui.gui.add(buttons,'exportMap').name("Uložit mapu / Save");

		this.datGui.gui.selectorFolder = this.datGui.gui.addFolder('SelectorFolder');
		this.datGui.gui.selectorFolder.open();
		this.datGui.gui.add(buttons, 'unbindSelected').name("Odznačit");
	}

	toggleEditMap(toMode = undefined){
		this.editMap = toMode | (this.editMap + 1) % 4;
		console.log("edit mode: " + this.editMap);
		const modes = [ 
			{name: "Visitor", color: "#000000", innerHTML: ""},
			{name: "Walls", color: "#aa0000", innerHTML: `
				Kliknutím na zem se začne tvořit zeď <br/>
				Odkliknutím se zeď dokončí <br/>
				Pravým kliknutím na zeď se zničí <br/>
			`},
			{name: "Posters", color: "#aaaa00", innerHTML: `
				Kliknutím na stěnu se umístí plakát <br/>
				Kliknutí na plakát změní url obrázku <br/>
				Pravým kliknutím na plakát se zničí <br/>
			`},
			{name: "Models", color: "#0000aa", innerHTML: `
				Kliknutím na zem se umístí model <br/>
				Kliknutí na model změní data modelu <br/>
				Pravým kliknutím na model se zničí <br/>
			`},
		];

		let textToShow = `
			${modes[this.editMap].name} mode
			<br/>
			CTRL + S uloží mapu do clipboardu<br/>
			CTRL + V načte mapu z clipboardu<br/><br/>
		`
		textToShow += modes[this.editMap].innerHTML;
		document.getElementById("infoBlockMode").innerHTML = this.editMap !== 0 ? textToShow : "";
		document.getElementById("infoBlockMode").style.background = modes[this.editMap].color+"55";

		this.map.mat.debugCube.color.set(modes[this.editMap].color);
	} 

	setupHandlers(){
		document.addEventListener('keydown', e => {
			if(e.code === "KeyS" && e.ctrlKey){
				this.map.exportMap(this);
				e.preventDefault();
				return;
			}

			switch(e.code){
				case 'KeyP': this.toggleEditMap(); break;
				case 'KeyM': this.map.exportMap(this); break;
				case 'ArrowUp':
				case 'KeyW': this.moveControls.forward = 1; break;
				case 'ArrowLeft':
				case 'KeyA': this.moveControls.left = 1; break;
				case 'ArrowDown':
				case 'KeyS': this.moveControls.back = 1; break;
				case 'ArrowRight':
				case 'KeyD': this.moveControls.right = 1; break;
				case 'Space': this.moveControls.jump = 1; break;
				case 'KeyC':
				case 'ShiftRight':
				case 'ShiftLeft': this.moveControls.crouch = 1; break;
				case 'KeyX': document.getElementById("infoBlock").click();
			}
		})

		document.addEventListener('keyup', e => {
			switch(e.code){
				case 'ArrowUp':
				case 'KeyW': this.moveControls.forward = 0; break;
				case 'ArrowLeft':
				case 'KeyA': this.moveControls.left = 0; break;
				case 'ArrowDown':
				case 'KeyS': this.moveControls.back = 0; break;
				case 'ArrowRight':
				case 'KeyD': this.moveControls.right = 0; break;
				case 'Space': this.moveControls.jump = 0; break;
				case 'KeyC':
				case 'ShiftRight':
				case 'ShiftLeft': this.moveControls.crouch = 0; break;
			}
		})

		document.addEventListener('pointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('mozpointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('webkitpointerlockchange', this.pointerLockCallback, false);

        document.addEventListener('mousedown', e => { // left click
			if(e.button !== 0 || this.raycasterHits.length === 0 || !this.controls.isLocked)
				return;

			if(this.raycasterHits[0].object.name === "wall"){
				this.map.wallClicked(this.raycasterHits[0], this.editMap, "left");
				if(this.editMap == 1){
					this.datGui.selectedObject = this.raycasterHits[0].object.userData.class;
					this.datGui.emptySelectorFolder();
					this.datGui.selectedObject.setupDatGui(this.datGui, this.map.selectorCube);
				}
			}
			if(this.raycasterHits[0].object.name === "poster"){
				this.map.posterClicked(this.raycasterHits[0], this.editMap, "left");
				if(this.editMap == 2){
					this.datGui.selectedObject = this.raycasterHits[0].object.userData.class;
					this.datGui.emptySelectorFolder();
					this.datGui.selectedObject.setupDatGui(this.datGui, this.map.selectorCube);
				}
			}
			if(this.raycasterHits[0].object.name === "modelComponent"){
				this.map.modelClicked(this.raycasterHits[0], this.editMap, "left");
				if(this.editMap == 3){
					this.datGui.selectedObject = this.raycasterHits[0].object.userData.class;
					this.datGui.emptySelectorFolder();
					this.datGui.selectedObject.setupDatGui(this.datGui, this.map.selectorCube);
				}
			}
			if(this.raycasterHits[0].object.name === "floor"){
				this.map.floorClicked(this.raycasterHits[0], this.editMap, "left");
			}
		});
		
        document.addEventListener('mouseup', e => { // left click
			if(e.button !== 0 || this.editMap === 0 || this.raycasterHits.length === 0 || !this.controls.isLocked)
				return;
				
			if(this.raycasterHits[0].object.name === "floor"){
				this.map.floorClicked(this.raycasterHits[0], this.editMap, "left", false);
			}
		});
		
        document.addEventListener('mousedown', e => { // right click
			if(e.button !== 2 || this.editMap === 0 || this.raycasterHits.length === 0)
				return;
			
			this.datGui.selectedObject = null;
			this.datGui.emptySelectorFolder();

			if(this.raycasterHits[0].object.name === "wall"){
				this.map.wallClicked(this.raycasterHits[0], this.editMap, "right");
			}
			if(this.raycasterHits[0].object.name === "poster"){
				this.map.posterClicked(this.raycasterHits[0], this.editMap, "right");
			}
			if(this.raycasterHits[0].object.name === "modelComponent"){
				this.map.modelClicked(this.raycasterHits[0], this.editMap, "right");
			}
		});

		document.addEventListener('wheel', e => {
			let newFov = Math.min(Math.max(this.camera.fov + e.deltaY * .07, 10), 70);
			this.camera.fov = newFov;
			this.camera.updateProjectionMatrix();
		});

		document.addEventListener('paste', (event) => {
			event.preventDefault();

			let paste = (event.clipboardData || window.clipboardData).getData('text');
			let JSONPaste;
			try {
				JSONPaste = JSON.parse(paste);
			} catch (e) {
				JSONPaste = {};
			}

			if(JSONPaste.isMapForVirtualGallery){
				this.map.clearMap();
				this.map.importMap(JSONPaste);
			}
		});

	}
}
