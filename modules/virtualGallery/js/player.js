import * as THREE from './threejs/three.module.js'

export default class Player {
    MOVESPEED = 0.005
    TURNSPEED = Math.PI / 112
    PLAYERHEIGHT = 1.7
	
	camera

	wallHack = false
    editMap = false

	constructor(camera) {
		this.camera = camera
		this.setupHandlers()
	}

	tick(delta, map, controls){
		if(controls.isLocked !== true)
			return
			
		let direction = new THREE.Vector3();
		direction.z = this.controlKeys.w - this.controlKeys.s;
		direction.x = this.controlKeys.d - this.controlKeys.a;
		direction.normalize(); // this ensures consistent movements in all directions

		controls.getObject().position.y = this.PLAYERHEIGHT;
		controls.moveForward( direction.z * this.MOVESPEED * delta );
		controls.moveRight( direction.x * this.MOVESPEED * delta );
	}

	controlKeys = {
		w: 0,
		a: 0,
		s: 0,
		d: 0,
	}

	pointerLockCallback(){
		
	}
	
	setupHandlers(){
		document.addEventListener('keydown', e => {
			this.controlKeys[e.key] = 1
		})

		document.addEventListener('keyup', e => {
			this.controlKeys[e.key] = 0
		})

		document.addEventListener('pointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('mozpointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('webkitpointerlockchange', this.pointerLockCallback, false);
	}
}
