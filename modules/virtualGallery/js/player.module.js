export default class Player {
    MOVESPEED = 0.05
    TURNSPEED = Math.PI / 112
	
	camera

	wallHack = false
    editMap = false

	constructor(camera) {
		this.camera = camera
		this.setupHandlers()
	}

	tick(time) {

	}

	controls = {
		w: 0,
		a: 0,
		s: 0,
		d: 0,
	}

	pointerLockCallback(){
		
	}
	
	setupHandlers(){
		document.addEventListener('keydown', e => {
			this.controls[e.key] = 1
		})

		document.addEventListener('keyup', e => {
			this.controls[e.key] = 0
		})

		document.addEventListener('pointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('mozpointerlockchange', this.pointerLockCallback, false);
        document.addEventListener('webkitpointerlockchange', this.pointerLockCallback, false);
	}
}
