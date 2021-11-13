import * as THREE from './threejs/three.module.js'

export default class Player {
	raycaster = new THREE.Raycaster();

    MOVESPEED = 0.005;
    TURNSPEED = Math.PI / 112;
    PLAYERHEIGHT = 1.7;
	

	camera
	
    editMap = true

	constructor(camera) {		
		this.camera = camera

		this.setupHandlers()
	}

	tick(delta, map, controls){
		/******** movePlayer *********/
		if(controls.isLocked !== true)
			return
			
		let direction = new THREE.Vector3();
		direction.z = this.controlKeys.w - this.controlKeys.s;
		direction.x = this.controlKeys.d - this.controlKeys.a;
		direction.normalize(); // this ensures consistent movements in all directions

		controls.getObject().position.y = this.PLAYERHEIGHT;
		controls.moveForward( direction.z * this.MOVESPEED * delta );
		controls.moveRight( direction.x * this.MOVESPEED * delta );
		
		/******** Raytrace GodMode *********/
		if(this.editMap){
			this.raycaster.layers.set( 1 );
			this.raycaster.setFromCamera( new THREE.Vector2(0,0), this.camera );
			const intersects = this.raycaster.intersectObjects( map.scene.children );

			if(intersects.length > 0){
				map.debugHoverRectangle.visible = true;
				map.debugHoverRectangle.position.set(
					Math.round(intersects[0].point.x/map.WALLTHICKNESS)*map.WALLTHICKNESS-map.WALLTHICKNESS/2,
					0,
					Math.round(intersects[0].point.z/map.WALLTHICKNESS)*map.WALLTHICKNESS-map.WALLTHICKNESS/2)
			}else{
				map.debugHoverRectangle.visible = false;
			}
		}else{
			map.debugHoverRectangle.visible = false;
		}
		map.debugFloor.visible = this.editMap;

	}

	controlKeys = {
		w: 0,
		a: 0,
		s: 0,
		d: 0,
	}

	toggleEditMap(){
		this.editMap = !this.editMap;
	} 
	
	setupHandlers(){
		document.addEventListener('keydown', e => {
			switch(e.key){
				case 'p':
					this.toggleEditMap(); 
					break;
				default:
					this.controlKeys[e.key] = 1
			}
		})

		document.addEventListener('keyup', e => {
			this.controlKeys[e.key] = 0
		})

		document.addEventListener('pointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('mozpointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('webkitpointerlockchange', this.pointerLockCallback, false);
	}
}
