import * as THREE from './threejs/three.module.js'

export default class Player {
	raycaster = new THREE.Raycaster();
	raycasterHits = []

    MOVESPEED = 0.005;
    CROUCHSPEED = 0.001;
    TURNSPEED = Math.PI / 112;
    PLAYERHEIGHT = 1.7;
    PLAYERCROUCHHEIGHT = 1.2;
	
	
	camera
	map
	
    editMap = 0 // 0: visitor, 1: walls, 2: posters, 3: models
	jumpVelocity = 0
	canJump = true

	constructor(camera, map) {		
		this.camera = camera;
		this.map = map;

		this.setupHandlers();
	}

	tick(delta, controls){
		/******** movePlayer *********/
		if(!controls.isLocked)
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
		
		controls.getObject().position.y += this.jumpVelocity * delta / 20000;
		if(controls.getObject().position.y > (this.moveControls.crouch ? this.PLAYERCROUCHHEIGHT : this.PLAYERHEIGHT)){
			this.jumpVelocity -= 9.8 * 80.0 * delta / 1000;
		} else {
			controls.getObject().position.y = this.moveControls.crouch ? this.PLAYERCROUCHHEIGHT : this.PLAYERHEIGHT;
			this.jumpVelocity = 0;
			this.canJump = true;	
		}

		let oldPosX = this.camera.position.x;
		let oldPosZ = this.camera.position.z;

		controls.moveForward( direction.z );
		controls.moveRight( direction.x );

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
		this.raycaster.layers.set( 1 );
		this.raycaster.layers.enable( 2 );
		this.raycaster.layers.enable( 3 );
		this.raycaster.setFromCamera( new THREE.Vector2(0,0), this.camera );
		this.raycasterHits = this.raycaster.intersectObjects( this.map.scene.children );
		
		for (let wall of this.map.walls)
			if(wall.object.material.name !== "wallMaterial")					
				wall.object.material = this.map.mat.wall;

		if(this.editMap > 0){
			if(this.raycasterHits.length > 0){ 
				let hit = this.raycasterHits[0];
				/******* Floor *******/
				if(hit.object.name === "floor"){
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
				} else {
					this.map.debugCube.visible = false;
				}
				/******* Wall *******/
				if(hit.object.name === "wall"){
					hit.object.material = this.map.mat.wallSelected;
				} 
				/******* Poster *******/
				if(hit.object.name === "poster"){
					//hit.object.material = this.map.mat.posterSelected;
				} 
			} else {
				this.map.debugCube.visible = false;
			}
		} else {
			this.map.debugCube.visible = false;
		}
		this.map.floorGrid.visible = this.editMap > 0;

	}

	moveControls = {
		forward: 0,
		back: 0,
		left: 0,
		right: 0,
		crouch: 0,
		jump: 0,
	}

	toggleEditMap(toMode = undefined){
		this.editMap = toMode | (this.editMap + 1) % 4;
		console.log("edit mode: " + this.editMap);
		const modes = [ 
			{name: "Visitor", color: "#000000"},
			{name: "Walls", color: "#aa0000"},
			{name: "Posters", color: "#aaaa00"},
			{name: "Models", color: "#0000aa"},
		];
		document.getElementById("infoBlock").textContent = modes[this.editMap].name;
		document.getElementById("infoBlock").style.background = modes[this.editMap].color;
		this.map.mat.debugCube.color.set(modes[this.editMap].color);
	} 

	setupHandlers(){
		document.addEventListener('keydown', e => {
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
				case 'ShiftRight':
				case 'ShiftLeft': this.moveControls.crouch = 1; break;
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
				case 'ShiftRight':
				case 'ShiftLeft': this.moveControls.crouch = 0; break;
			}
		})

		document.addEventListener('pointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('mozpointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('webkitpointerlockchange', this.pointerLockCallback, false);

        document.addEventListener('click', e => { // left click
			if(e.button !== 0 || this.editMap === 0 || this.raycasterHits.length === 0)
				return;
			if(this.raycasterHits[0].object.name === "floor"){
				this.map.floorClicked(this.raycasterHits[0].point);
			}
			if(this.raycasterHits[0].object.name === "wall"){
				this.map.wallClicked(this.raycasterHits[0]);
			}
			if(this.raycasterHits[0].object.name === "poster"){
				this.map.posterClicked(this.raycasterHits[0].point);
			}
		});
		
        document.addEventListener('click', e => { // right click
			if(e.button !== 2 || this.editMap === 0 || this.raycasterHits.length === 0)
				return;
			if(this.raycasterHits[0].object.name === "wall"){
				this.map.walls = this.map.walls.filter(wall => wall.object.uuid !== this.raycasterHits[0].object.uuid);
				this.map.scene.remove(this.raycasterHits[0].object);
			}
			if(this.raycasterHits[0].object.name === "poster"){
				this.map.posters = this.map.posters.filter(poster => poster.object.uuid !== this.raycasterHits[0].object.uuid);
				this.map.scene.remove(this.raycasterHits[0].object);
			}
		});

		document.addEventListener('wheel', e => {
			let newFov = Math.min(Math.max(this.camera.fov + e.deltaY * .04, 10), 70);
			this.camera.fov = newFov;
			this.camera.updateProjectionMatrix();
		});

		document.addEventListener('paste', (event) => {
			let paste = (event.clipboardData || window.clipboardData).getData('text');

			console.log(paste);

			event.preventDefault();
		});

	}
}
