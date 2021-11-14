import * as THREE from './threejs/three.module.js'

export default class Player {
	raycaster = new THREE.Raycaster();
	raycasterHits = []

    MOVESPEED = 0.005;
    CROUCHSPEED = 0.001;
    TURNSPEED = Math.PI / 112;
    PLAYERHEIGHT = 1.7;
	
	
	camera
	map
	
    editMap = false


	constructor(camera, map) {		
		this.camera = camera;
		this.map = map;

		this.setupHandlers();
	}

	tick(delta, controls){
		/******** movePlayer *********/
		if(controls.isLocked !== true)
			return;
			
		let direction = new THREE.Vector3();
		direction.z = this.moveControls.forward - this.moveControls.back;
		direction.x = this.moveControls.right - this.moveControls.left;
		direction.normalize(); // this ensures consistent movements in all directions
		
		direction.x *= (this.moveControls.crouch ? this.CROUCHSPEED : this.MOVESPEED) * delta;
		direction.z *= (this.moveControls.crouch ? this.CROUCHSPEED : this.MOVESPEED) * delta;

		controls.getObject().position.y = this.PLAYERHEIGHT;
		controls.moveForward( direction.z );
		controls.moveRight( direction.x );

		for(let wall of this.map.walls){
			if(
				Math.min(wall.collisionBox.x1, wall.collisionBox.x2) <= this.camera.position.x &&
				Math.max(wall.collisionBox.x1, wall.collisionBox.x2) >= this.camera.position.x &&
				Math.min(wall.collisionBox.z1, wall.collisionBox.z2) <= this.camera.position.z &&
				Math.max(wall.collisionBox.z1, wall.collisionBox.z2) >= this.camera.position.z
			){
				controls.moveForward( - direction.z * (1-this.editMap * .2));
				controls.moveRight( - direction.x * (1-this.editMap * .2));
				break;
			}
		}
		
		/******** Raytrace GodMode *********/
		if(this.editMap){
			this.raycaster.layers.set( 1 );
			this.raycaster.setFromCamera( new THREE.Vector2(0,0), this.camera );
			this.raycasterHits = this.raycaster.intersectObjects( this.map.scene.children );

			if(this.raycasterHits.length > 0 && this.raycasterHits[0].object.name === "floor"){
				this.map.debugCube.visible = true;
				this.map.debugCube.position.set(
					Math.floor(this.raycasterHits[0].point.x/this.map.WALLTHICKNESS-this.map.WALLTHICKNESS/2)*this.map.WALLTHICKNESS+this.map.WALLTHICKNESS/2,
					0,
					Math.floor(this.raycasterHits[0].point.z/this.map.WALLTHICKNESS-this.map.WALLTHICKNESS/2)*this.map.WALLTHICKNESS+this.map.WALLTHICKNESS/2
				)
			}else{
				this.map.debugCube.visible = false;
			}
		}else{
			this.map.debugCube.visible = false;
		}
		this.map.floorGrid.visible = this.editMap;

	}

	moveControls = {
		forward: 0,
		back: 0,
		left: 0,
		right: 0,
		crouch: 0,
	}

	toggleEditMap(){
		this.editMap = !this.editMap;
	} 

	setupHandlers(){
		document.addEventListener('keydown', e => {
			switch(e.key.toLowerCase()){
				case 'p': this.toggleEditMap();
				case 'w': this.moveControls.forward = 1; break;
				case 'a': this.moveControls.left = 1; break;
				case 's': this.moveControls.back = 1; break;
				case 'd': this.moveControls.right = 1; break;
				case 'shift': this.moveControls.crouch = 1; break;
			}
		})

		document.addEventListener('keyup', e => {
			switch(e.key.toLowerCase()){
				case 'w': this.moveControls.forward = 0; break;
				case 'a': this.moveControls.left = 0; break;
				case 's': this.moveControls.back = 0; break;
				case 'd': this.moveControls.right = 0; break;
				case 'shift': this.moveControls.crouch = 0; break;
			}
		})

		document.addEventListener('pointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('mozpointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('webkitpointerlockchange', this.pointerLockCallback, false);

        document.addEventListener('click', e => {
			if(e.button !== 0 || !this.editMap || this.raycasterHits.length == 0)
				return;

			if(this.raycasterHits[0].object.name === "floor"){
				this.map.floorClicked(this.raycasterHits[0].point);
			}

				

		});
	}
}
