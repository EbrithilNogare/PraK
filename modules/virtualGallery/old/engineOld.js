import * as THREE from './three.module.js'; 


var player = {
    speed: 0.05,
    turn: Math.PI / 112,
    life: 3,
    hp: 100,
    maxHp: 100,
    weapon: 0,
    availableWeapons: [true,true,false,false],/* 0-knife, 1-pistol, 2-machine gun, 3-chain  gun */
    ammo: 24,
    maxAmmo: 128,
    points: 0,
    keyYellow: false,
    keyBlue: false,
    hpUpdate: function (value) {
        player.hp += value;
        if (value == 0)
            player.hp = player.maxHp;
        if (player.hp > player.maxHp)
            player.hp = player.maxHp;
        if (player.hp <= 0)
            player.lifeUpdate(-1);
        hudUpdate();
    },
    lifeUpdate: function (value) {
        player.life += value;
        if (player.life == 0) {
            //player.die()
        }
        else {
            if (value < 0)
                player.hpUpdate(0);
        }
        hudUpdate();
    },
    ammoUpdate: function (value) {
        player.ammo += value;
        if (player.ammo > player.maxAmmo)
            player.ammo = player.maxAmmo;
        if (value == 0)
            player.ammo = player.maxAmmo;
        hudUpdate();
    }
};
var enemies = [];
var controls = {//define and reset keybord input
    move_up: 0,
    move_side: 0,
    turn_up: 0,
    turn_side: 0,
    space: 0,
    a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0,
    k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0,
    u: 0, v: 0, w: 0, x: 0, y: 0, z: 0, 1: 0, 2: 0, 3: 0, 4: 0,
    touchbar: [[0,0,0],[0,0,0],[0,0,0]],
    Green:0,Red:0,Blue:0,Yellow:0,LT:0,PT:0,LD:0,PD:0,Back:0,Start:0,LJ:0,RJ:0,T:0,B:0,L:0,R:0
};
var gameSettings = {
    wallHack: false,
    editMap: false,
    newBlock: 1,
    pause: false,
    layout: 0,
    level: 2
};


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.83), 0.01, 35);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, (window.innerHeight * 0.83));
document.body.appendChild(renderer.domElement);
scene.fog = new THREE.Fog(0x000000, 0.02,30);



function resetMap(level){
    gameSettings.level = level;
    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
    //if(level != "c"){
        enemies = [];
    //}
    createMap(level);
    drawGun();
    player.keyYellow = false;
    player.keyBlue = false;
    var ctx = document.getElementById("minimap").getContext("2d");
    ctx.clearRect(0, 0, 640, 640);
}
function changeLayout(){
    switch(gameSettings.layout){
        case 0:   gameSettings.layout=0.5; break;
        case 0.5: gameSettings.layout=0.2; break;
        case 0.2: gameSettings.layout=0.1; break;
        case 0.1: gameSettings.layout=0;   break;
    }
    document.getElementById('layout').style.opacity = gameSettings.layout;
}
function touchbar(x,y,state){
    controls.touchbar[x][y]=state;
    controls.w = controls.s = 0;
    if(controls.touchbar[0][0] || controls.touchbar[1][0] || controls.touchbar[2][0]){
        controls.w = 1;
    } else if(controls.touchbar[0][2] || controls.touchbar[1][2] || controls.touchbar[2][2]){
        controls.s = 1;
    }
    controls.j = controls.l = 0;
    if(controls.touchbar[0][0] || controls.touchbar[0][1] || controls.touchbar[0][2]){
        controls.j = 1;
    } else if(controls.touchbar[2][0] || controls.touchbar[2][1] || controls.touchbar[2][2]){
        controls.l = 1;
    }
}
function render() {
    if(!gameSettings.pause){
        tick();
        renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
}
function tick() {

    for (var i = 0; i < objectToUpdate.length; i++) {
        objectToUpdate[i].rotation.y = camera.rotation.y;
    }

    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].hp > 0) {
            enemies[i].object.position.x = enemies[i].x;
            enemies[i].object.position.z = enemies[i].z;
            var rotation = Math.floor(((camera.rotation.y / Math.PI * 4 - enemies[i].r / Math.PI * 4) % 8 + 8) % 8);
            enemies[i].object.material = materialsEnemies[Math.floor(enemies[i].step)][rotation];

            if (enemies[i].moving) {
                enemies[i].step = (enemies[i].step + 0.07 - 2) % 4 + 2;
                enemies[i].x += Math.sin(enemies[i].r) * 0.02;
                enemies[i].z += Math.cos(enemies[i].r) * 0.02;
            } else {
                enemies[0].step = 1;
            }
        }
            enemies[i].object.rotation.y = camera.rotation.y;
    }


    buildHelper();
    playerMove();
    pickupItem();
    doorMoveing();
}
function playerMove() {
    var from_wall = .2 * timing;


    var new_z = 0, new_x = 0;

    if(navigator.getGamepads()[0]){
        var gp = navigator.getGamepads()[0];
        controls.move_up   = Math.round(-gp.axes[1]*1000)/1000;
        controls.move_side = Math.round(-gp.axes[0]*1000)/1000;
        controls.turn_side = Math.round(-gp.axes[2]*1000)/1000;
        if (Math.abs(controls.move_up)<0.1) { controls.move_up = 0; }
        if (Math.abs(controls.move_side)<0.1) { controls.move_side = 0; }
        if (Math.abs(controls.turn_side)<0.1) { controls.turn_side = 0; }
        //console.log(`up: ${controls.move_up}, side: ${controls.move_side}, turn: ${controls.turn_side}`);
    }else{
        controls.move_up = controls.w - controls.s;
        controls.move_side = controls.a - controls.d;
        controls.turn_up = controls.k - controls.i;
        controls.turn_side = controls.j - controls.l;
    }

    if (controls.turn_up != 0 && camera.fov + controls.turn_up * 0.5 < 120 && camera.fov + controls.turn_up * 0.5 > 20) {
        camera.fov += controls.turn_up * 0.7;
        camera.updateProjectionMatrix();
    }
    camera.rotation.y += controls.turn_side * player.turn;

    var rotation = camera.rotation.y;
    var move = controls.move_up;

    if (controls.move_side != 0)
    {
        if (controls.move_up != 0)
        {
            let diff = Math.atan2(controls.move_side, controls.move_up);
            diff = diff>Math.PI/2?diff-Math.PI:diff;
            diff = diff<-Math.PI/2?diff+Math.PI:diff;

            //console.log(`diff: ${diff}`);
            rotation += diff;
            rotation += 2 * Math.PI;
            rotation = rotation % (2 * Math.PI);
            move = Math.sign(controls.move_up) * Math.sqrt(Math.abs(controls.move_up)+Math.abs(controls.move_side));
        }
        else
        {
            rotation += Math.PI * 0.5;
            rotation = rotation % (2 * Math.PI);
            move = controls.move_side;
        }
    }

    var step = player.speed * move * timing;

    //console.log(`side: ${controls.move_side}, up: ${controls.move_up}`);

    new_x = camera.position.x - Math.sin(rotation) * step;
    new_z = camera.position.z - Math.cos(rotation) * step;
    /*
     console.log("\n\n");
     console.log("position: " + camera.position.x);
     console.log("sin rotation: " + Math.sin(rotation));
     console.log("player.step: " + player.step);
     console.log("move: " + move);
     console.log("new x: " + new_x);
     */

    var safe_new_x = new_x + ((rotation < 0 ? -move : move) * ((Math.abs(rotation % (2 * Math.PI)) < Math.PI) ? -from_wall : from_wall));
    var safe_new_z = new_z + ((Math.abs(rotation % (2 * Math.PI)) < Math.PI * 0.5 || Math.abs(rotation % (2 * Math.PI)) > Math.PI * 1.5) ? -from_wall * move : from_wall * move);

    if (gameSettings.wallHack || (
            safe_new_x > 0 &&
            safe_new_x < map.length &&
            map[Math.floor(safe_new_x)][Math.floor(camera.position.z)] <= 0 &&
            map[Math.floor(safe_new_x)][Math.floor(camera.position.z)] >= -25)
            )
        camera.position.x = new_x;
    if (gameSettings.wallHack || (
            safe_new_z > 0 &&
            safe_new_z < map[0].length &&
            map[Math.floor(camera.position.x)][Math.floor(safe_new_z)] <= 0 &&
            map[Math.floor(camera.position.x)][Math.floor(safe_new_z)] >= -25)
            )
        camera.position.z = new_z;
}
function pickupItem() {
    if (gameSettings.editMap == false) {
        var numberOnMap = map[Math.floor(camera.position.x)][Math.floor(camera.position.z)];
        if (numberOnMap < 0 && numberOnMap >= -13) {
            switch (numberOnMap) {
                case -1:
                    player.hpUpdate(4);
                    break;
                case -2:
                    player.hpUpdate(10);
                    break;
                case -3:
                    player.hpUpdate(25);
                    break;
                case -4:
                    player.ammoUpdate(8);
                    break;
                case -5:
                    player.availableWeapons[2]=true;
                    nextWeapon("2");
                    break;
                case -6:
                    player.availableWeapons[3]=true;
                    nextWeapon("3");
                    break;
                case -7:
                    player.points += 100;
                    break;
                case -8:
                    player.points += 500;
                    break;
                case -9:
                    player.points += 1000;
                    break;
                case -10:
                    player.points += 5000;
                    break;
                case -11:
                    player.hpUpdate(0);
                    player.ammoUpdate(25);
                    player.lifeUpdate(1);
                    break;
                case -12:
                    player.keyYellow = true;
                    break;
                case -13:
                    player.keyBlue = true;
                    break;

            }


            map[Math.floor(camera.position.x)][Math.floor(camera.position.z)] = 0;
            scene.remove(object[Math.floor(camera.position.x)][Math.floor(camera.position.z)]);
        }
    }
}
function printMap(){
    var log = "map = [";
    for (var i = 0; i < map.length; i++) {
        log += "\n    [" + map[i] + "]";
        if(i < map.length-1)
        log += ",";
    }
    log += "\n];";
    log += "\nresetMap('c');";
    log += "\nsetplayer(" + Math.floor(camera.position.x*1000)/1000 + "," + Math.floor(camera.position.z*1000)/1000 + "," + Math.floor(camera.rotation.y%(2*Math.PI)/Math.PI*2000)/1000 + ");";
    for (var i = 0; i < enemies.length; i++) {
        log += "\nsetenemie(" + enemies[i].x + "," + enemies[i].z + "," + enemies[i].r/Math.PI*2 + "," + ((enemies[i].hp>0)?enemies[i].hp:0) + ");";
    }



    console.log(log);
}
function keyDown(e, state) {
    //alert(e.keyCode);
    switch (e.keyCode) {
        case 87: //w
            controls.w = state;
            break;
        case 83: //s
            controls.s = state;
            break;
        case 65: //a
            controls.a = state;
            break;
        case 68: //d
            controls.d = state;
            break;
        case 73: //i
            if (gameSettings.editMap)
                controls.i = state;
            else
                controls.w = state;
            break;
        case 75: //k
            if (gameSettings.editMap)
                controls.k = state;
            else
                controls.s = state;
            break;
        case 74: //j
            controls.j = state;
            break;
        case 76: //l
            controls.l = state;
            break;
        case 81:
        case 85: //q
            if (state) {
                nextWeapon("+");
            }
            break;
        case 69:
        case 79: //e
            if (state) {
                doorOpen();
            }
            break;
        case 27: //esc
            if (state) {
                gameSettings.pause = !gameSettings.pause;
            }
            break;
        case 67: //c
            if (state) {
                changeBlock(-1);
            }
            break;
        case 86: //v
            if (state) {
                changeBlock(1);
            }
            break;
        case 32: //space
            if (state) {
                shoot();
            }
            break;
        case 82: //r
            controls.r = state;
            break;
        case 80: //p
            if (state) {
                tryGodMode();
            }
            break;
        case 90: //z
            if (state) {
                createWall();
            }
            break;
        case 88: //x
            if (state) {
                destroy();
            }
            break;
        case 66: //b
            if (state && gameSettings.editMap) {
                var x = lookingAt("x")+0.5;
                var z = lookingAt("z")+0.5;
                var r = Math.round(camera.rotation.y%(2*Math.PI)/Math.PI*2);
                setenemie(x,z,r,prompt("zadejte HP nepřítele",100));
            }
            break;
        case 77: //m
            if (state && gameSettings.editMap){
                printMap();
            }
            break;
        case 49: //1
            if (state && player.availableWeapons[0]) {
                nextWeapon("0");
            }
            break;
        case 50: //2
            if (state && player.availableWeapons[1]) {
                nextWeapon("1");
            }
            break;
        case 51: //3
            if (state && player.availableWeapons[2]) {
                nextWeapon("2");
            }
            break;
        case 52: //4
            if (state && player.availableWeapons[3]) {
                nextWeapon("3");
            }
            break;
        case 13: //Enter
            if (state) {
                showHelp();
            }
            break;
    }
}
function resize(){
    renderer.setSize(window.innerWidth, (window.innerHeight * 0.83));
    camera.aspect = window.innerWidth / (window.innerHeight * 0.83);
    camera.updateProjectionMatrix();
}
function setplayer(x, z, r) {
    camera.position.x = x;
    camera.position.z = z;
    camera.position.y = 0.5;
    camera.rotation.y = r*Math.PI/2;
};
function createMap(level) {
    setenemie = function (x, z, r, hp) {

        enemy = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshLambertMaterial({side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('textures/enemy/11.png'), transparent: true}));
        scene.add(enemy);
        enemy.position.set(x, 0.5, z);

        enemies.push({
            x: x,
            z: z,
            r: r*Math.PI/2,
            step: 1,
            hp: hp,
            moving: false,
            object: enemy
        });
        if(hp <= 0) enemy.material = new THREE.MeshLambertMaterial({side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('textures/enemy/65.png'), transparent: true});
    };
    if(level != "c"){
        chooseMap(level);
    }



    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
    scene.add(light);

    light.position.x = 0;
    light.position.y = 2000;
    light.position.z = 0;


    var BoxGeometry = new THREE.BoxGeometry(1, 1, 1);


    materialsEnemies = [[0, 0]];
    for (var i = 1; i <= 6; i++) {
        materialsEnemies.push(new Array());
        for (var j = 1; j <= 8; j++) {
            materialsEnemies[i].push(new THREE.MeshLambertMaterial({side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('textures/enemy/' + i + j + '.png'), transparent: true, color: "#fff"}));
        }
    }

    materialsWalls = [0];
    for (var i = 1; i <= 53; i++) {

        materialsWalls.push(new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('textures/walls/' + i + '.png')}));
    }

    materialsObjects = [0];
    for (var i = 1; i <= 49; i++) {

        materialsObjects.push(new THREE.MeshLambertMaterial({side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('textures/objects/-' + i + '.png'), transparent: true}));
    }


    walls = new Array();
    object = new Array();
    objectToUpdate = new Array();
    for (var i = 0; i < map.length; i++) {
        walls[i] = new Array();
        object[i] = new Array();
        for (var j = 0; j < map[i].length; j++) {
            switch (true) {
                case(map[i][j] == 0):
                    break;
                case(map[i][j] == -48):
                case(map[i][j] == -49):
                    object[i][j] = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialsObjects[-map[i][j]]);
                    scene.add(object[i][j]);
                    object[i][j].position.set(i + 0.5, 0.5, j + 0.5);
                    if (map[i][j + 1] > 0) {
                        object[i][j].rotation.y = Math.PI * 0.5;
                        /* ##### */
                    }
                    else {

                    }
                    break;
                case(map[i][j] > 0):
                    walls[i][j] = new THREE.Mesh(BoxGeometry, materialsWalls[map[i][j]]);
                    scene.add(walls[i][j]);
                    walls[i][j].position.set(i + 0.5, 0.5, j + 0.5);
                    break;
                case(map[i][j] < 0):
                    object[i][j] = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialsObjects[-map[i][j]]);
                    scene.add(object[i][j]);
                    object[i][j].position.set(i + 0.5, 0.5, j + 0.5);
                    object[i][j].rotation.y = Math.PI * 0.5;
                    objectToUpdate.push(object[i][j]);
                    break;

            }
        }
    }
    var map_size_x = map.length;
    var map_size_z = map[0].length;
    var PlaneGeometry = new THREE.PlaneGeometry(map_size_x, map_size_z, map_size_x, map_size_z);
    var materialF = new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.BackSide});
    var materialC = new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.FrontSide});
    var floor = new THREE.Mesh(PlaneGeometry, materialF);
    floor.rotation.x = Math.PI * 0.5;
    floor.position.set(map_size_x * 0.5, 0.01, map_size_z * 0.5);
    scene.add(floor);
    material = new THREE.MeshBasicMaterial({color: 0x444444, side: THREE.DoubleSide});
    var ceil = new THREE.Mesh(PlaneGeometry, materialC);
    ceil.rotation.x = Math.PI * 0.5;
    ceil.position.set(map_size_x * 0.5, 0.99, map_size_z * 0.5);
    scene.add(ceil);

    builder = new THREE.Mesh(new THREE.BoxGeometry(1.01, 0.99, 1.01), new THREE.MeshBasicMaterial({color: 0xaa0000, wireframe: true}));
    builder.position.set(-0.5, 0.01, -0.5);
    scene.add(builder);

}
function lookingAt(coordinate){
    var rotation = (camera.rotation.y) % (2 * Math.PI);
    rotation < 0 ? rotation += 2 * Math.PI : 0;

    if(coordinate == "x") return Math.round(camera.position.x - Math.sin(camera.rotation.y)) + (rotation > Math.PI ? 0 : -1);
    if(coordinate == "z") return Math.round(camera.position.z - Math.cos(camera.rotation.y)) + (rotation > Math.PI / 2 && rotation < Math.PI * 1.5 ? 0 : -1);
    return 0;
}
function createWall() {
    var rotation = (camera.rotation.y) % (2 * Math.PI);
    rotation < 0 ? rotation += 2 * Math.PI : 0;

    var x = lookingAt("x");
    var z = lookingAt("z");

    if (!gameSettings.editMap || map[x][z] != 0)
        return;

    var BoxGeometry = new THREE.BoxGeometry(1, 1, 1);

    switch (true) {
        case(gameSettings.newBlock == -48): //vytah
        case(gameSettings.newBlock == -49): //dvere
            object[x][z] = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialsObjects[-gameSettings.newBlock]);
            scene.add(object[x][z]);
            object[x][z].position.set(x + 0.5, 0.5, z + 0.5);
            if (map[x][z + 1] > 0) {
                object[x][z].rotation.y = Math.PI * 0.5;

            }
            else {

            }
            break;
        case(gameSettings.newBlock > 0):
            walls[x][z] = new THREE.Mesh(BoxGeometry, materialsWalls[gameSettings.newBlock]);
            scene.add(walls[x][z]);
            walls[x][z].position.set(x + 0.5, 0.5, z + 0.5);
            break;
        case(gameSettings.newBlock < 0):
            object[x][z] = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialsObjects[-gameSettings.newBlock]);
            scene.add(object[x][z]);
            object[x][z].position.set(x + 0.5, 0.5, z + 0.5);
            object[x][z].rotation.y = Math.PI * 0.5;
            objectToUpdate.push(object[x][z]);
            break;
    }
    map[x][z] = gameSettings.newBlock;
}
function destroy() {
    if (!gameSettings.editMap) return;

    var x = lookingAt("x");
    var z = lookingAt("z");

    map[x][z] = 0;
    scene.remove(walls[x][z]);
    scene.remove(object[x][z]);

    for (var i = 0; i < enemies.length; i++) {
        if(enemies[i].x >= x && enemies[i].x < x+1 && enemies[i].z >= z && enemies[i].z < z+1 ){
            scene.remove(enemies[i].object);
            enemies.splice(i,1);
            i--;
        }
    }
}
function showHelp(){
    alert(
                    "    HRA" + "\n" +
                    " W A S D - pohyb" + "\n" +
                    " I J K L - kamera" + "\n" +
                    " Space strelba" + "\n" +
                    " E O - Interakce" + "\n" +
                    " Q U - zmena zbrane" + "\n" +
                    " esc - PAUSE" + "\n" +
                    "\n" +
                    " Hrani na Gamepadu:" + "\n" +
                    " Pohyb:   levy Joystick" + "\n" +
                    " Otaceni: pravy Joystick" + "\n" +
                    " Strelba: levy horn� tlacitko" + "\n" +
                    " Zmena zbrani: �lut� tlacitko" + "\n" +
                    " Otevren� dveri: Zelene tlacitko" + "\n" +
                    "" + "\n" +
                    "   BUILD MODE" + "\n" +
                    " P - aktivovat" + "\n" +
                    " Z - pridat objekt" + "\n" +
                    " X - odebrat objekt" + "\n" +
                    " C V - zmena objektu" + "\n" +
                    " B - pridat nepritele" + "\n" +
                    " M - ulozit mapu" + "\n" +
                    "" + "\n" +
                    "Enter - tato napoveda" + "\n"
                    );
}
function doorOpen() {
    var i = Math.floor(camera.position.x);
    var j = Math.floor(camera.position.z);
    var direction;
    var rotation = (camera.rotation.y) % (2 * Math.PI);
    rotation < 0 ? rotation += 2 * Math.PI : 0;

    switch (true) {
        case (rotation >= Math.PI * 1.75 || rotation < Math.PI * 0.25):
            j -= 1;
            direction = "x";
            break;
        case (rotation >= Math.PI * 0.25 && rotation < Math.PI * 0.75):
            i -= 1;
            direction = "z";
            break;
        case (rotation >= Math.PI * 0.75 && rotation < Math.PI * 1.25):
            j += 1;
            direction = "x";
            break;
        case (true):
            i += 1;
            direction = "z";
            break;
    }
    if (map[i][j] == -48 || map[i][j] == -49) {
        doorMove[0] = true;
        doorMove[1] = i;
        doorMove[2] = j;
        doorMove[3] = direction;
    }
}
function changeBlock(value) {
    gameSettings.newBlock += value;
    if (gameSettings.newBlock == 0) {
        gameSettings.newBlock += value;
    }
    if (gameSettings.newBlock == -50) {
        gameSettings.newBlock = 53;
    }
    if (gameSettings.newBlock == 54) {
        gameSettings.newBlock = -49;
    }

    document.getElementById("block").src = "textures/" + (gameSettings.newBlock > 0 ? "walls/" : "objects/") + gameSettings.newBlock + ".png";
    if (gameSettings.editMap) {
        document.getElementById("block").style.width = document.getElementById("block").style.height = window.innerHeight * 0.17 + "px";
    }
    else {
        document.getElementById("block").style.width = document.getElementById("block").style.height = "0px";
    }
}
function nextWeapon(input) {
    switch(input){
        case "+":
            do{
                player.weapon += 10;
                if (player.weapon >= 40) player.weapon -= 40;
            }while(!player.availableWeapons[Math.floor(player.weapon/10)] && player.availableWeapons[0]);
            break;
        case "0":
        case "1":
        case "2":
        case "3":
            player.weapon=parseInt(input)*10;
            break;
    }
    drawGun();
    hudUpdate();
}
function doorMoveing() {
    if (doorMove[0]) {
        var i = doorMove[1];
        var j = doorMove[2];
        var direction = doorMove[3];

        if (direction == "x") {
            if (object[i][j].position.x >= i + 1.48) {
                scene.remove(object[i][j]);
                doorMove[0] = false;
                map[i][j] = 0;
                return;
            }
            object[i][j].position.x += 0.02;
        }
        else {
            if (object[i][j].position.z >= j + 1.48) {
                scene.remove(object[i][j]);
                doorMove[0] = false;
                map[i][j] = 0;
                return;
            }
            object[i][j].position.z += 0.02;
        }
    }
}
function buildHelper() {
    if (gameSettings.editMap) {
        var rotation = (camera.rotation.y) % (2 * Math.PI);
        rotation < 0 ? rotation += 2 * Math.PI : 0;

        var x = Math.round(camera.position.x - Math.sin(camera.rotation.y)) + 0.5 * (rotation > Math.PI ? 1 : -1);
        var z = Math.round(camera.position.z - Math.cos(camera.rotation.y)) + 0.5 * (rotation > Math.PI / 2 && rotation < Math.PI * 1.5 ? 1 : -1);



        builder.position.set(x, 0.5, z);
    } else {
        builder.position.set(-1, -1, -1);
    }
}
function enemyHit(enemy, damage){
    enemy.hp -= damage;

    if(enemy.hp <= 0){
        navigator.vibrate(70);
        enemy.object.material = materialsEnemies[6][0];
        setTimeout(function(){ enemy.object.material = materialsEnemies[6][1]; }, 150);
        setTimeout(function(){ enemy.object.material = materialsEnemies[6][2]; }, 300);
        setTimeout(function(){ enemy.object.material = materialsEnemies[6][3]; }, 450);
        setTimeout(function(){ enemy.object.material = materialsEnemies[6][4]; }, 600);
        setTimeout(function(){ scene.remove(enemy.object); }, 1500);

        var x = Math.floor(enemy.x);
        var z = Math.floor(enemy.z);
        if(map[x][z] == 0){
            object[x][z] = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialsObjects[4]);
            scene.add(object[x][z]);
            object[x][z].position.set(x + 0.5, 0.5, z + 0.5);
            object[x][z].rotation.y = Math.PI * 0.5;
            objectToUpdate.push(object[x][z]);
            map[x][z] = -4;
        }
    }else{
        enemy.object.material.color.g = enemy.object.material.color.b = 0.5;
        setTimeout(function(){ enemy.object.material.color.g = enemy.object.material.color.b = 1; }, 150);
    }
}
function drawGun(){
    document.getElementById("weapon").style.top = -Math.floor(player.weapon / 10) * 200 - 100 + "%";
    document.getElementById("weapon").style.left = -player.weapon % 10 * 100 + "%";
}
function shoot() {
    if ((player.ammo <= 0 && player.weapon > 5) || player.weapon % 10 != 0) {
        return;
    }
    if (player.weapon > 5) {
        player.ammo--;
    }


    player.weapon++;



    setTimeout(function(){ player.weapon++;drawGun(); }, 100);
    setTimeout(function(){ player.weapon++;drawGun(); }, 200);
    setTimeout(function(){ player.weapon = Math.floor(player.weapon / 10) * 10;drawGun(); }, 300);

    hudUpdate();

    // hit-box detecting

    for(var i = 0; i < enemies.length; i++){
        var rotation = (camera.rotation.y % (Math.PI * 2))<0?camera.rotation.y % (Math.PI * 2)+(Math.PI * 2):(camera.rotation.y % (Math.PI * 2));
        if(
            Math.abs( rotation -
            (Math.atan2((enemies[i].x - camera.position.x), (enemies[i].z - camera.position.z)) + Math.PI)) <
            Math.tan((22/64)/Math.sqrt(Math.exp(Math.abs(enemies[i].x - camera.position.x),2) + Math.exp(Math.abs(enemies[i].z - camera.position.z),2))) +0.005 &&
            enemies[i].hp > 0
        ){
        if( player.weapon < 10 ){
            if(Math.sqrt(Math.exp(Math.abs(enemies[i].x - camera.position.x),2) + Math.exp(Math.abs(enemies[i].z - camera.position.z),2)) < 2){
                enemyHit(enemies[i],300);
            }
        }else{
            enemyHit(enemies[i],Math.floor(player.weapon/10)*30);
        }
        }
     }
}
function tryGodMode(){
    if (typeof map[Math.floor(camera.position.x)][Math.floor(camera.position.z)] != "undefined") { // ### hazi chybu
                    gameSettings.wallHack = !gameSettings.wallHack;
                    gameSettings.editMap = !gameSettings.editMap;
                    changeBlock(0);
                }
                if (gameSettings.wallHack) {
                    document.getElementById("minimap").style.visibility = "visible";
                    document.getElementById("weapon").style.visibility = "hidden";
                } else {
                    document.getElementById("minimap").style.visibility = "hidden";
                    document.getElementById("weapon").style.visibility = "visible";
                }
}
function hudUpdate() {
    var canvas = document.getElementById("hud");
    var ctx = canvas.getContext("2d");
    var img = new Image();

    ctx.fillStyle = "#004040";
    ctx.fillRect(0, 0, 384, 40);

    img.src = "textures/hud/hud.png";
    ctx.drawImage(img, 32, 0, 320, 40);

    img.src = "textures/hud/weapon" + Math.floor(player.weapon / 10) + ".png";
    ctx.drawImage(img, 288, 9, 48, 24);

    if (player.keyYellow) {
        img.src = "textures/hud/keyg.png";
        ctx.drawImage(img, 272, 4, 8, 16);
    }
    if (player.keyBlue) {
        img.src = "textures/hud/keys.png";
        ctx.drawImage(img, 272, 21, 8, 16);
    }


    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "end";
    ctx.font = "17px serif";

    ctx.fillText(fps, 28, 25);

    ctx.fillText(gameSettings.level, 65, 30);

    ctx.fillText(player.points, 125, 31);

    ctx.fillText(player.life, 155, 31);

    ctx.fillText(player.hp / player.maxHp * 100, 224, 30);

    ctx.fillText(player.ammo, 265, 31);

    var zivoty = Math.floor((player.maxHp - player.hp) / player.maxHp) * 8;
    var faceX = (zivoty % 4) * 23;
    var faceY = zivoty < 4 ? 0 : 31;
    img.src = "textures/hud/face.png";
    ctx.drawImage(img, faceX, faceY, 23, 31, 168, 5, 23, 31);
}
function minimapUpdate() {
    var ctx = document.getElementById("minimap").getContext("2d");

    var zoom = 640 / (map.length > map[0].length?map.length:map[0].length);
    for (var i = 0; i < map.length; i++)
        for (var j = 0; j < map[0].length; j++) {
            switch (true) {
                case map[i][j] == 0:
                    ctx.fillStyle = "#888";
                    break;
                case map[i][j] < 0:
                    ctx.fillStyle = "#696969";
                    break;
                case map[i][j] > 0:
                    ctx.fillStyle = "#222";
                    break;
                default:
                    ctx.fillStyle = "#000";
                    break;
            }
            ctx.fillRect(i * zoom, j * zoom, zoom, zoom);
        }
    ctx.fillStyle = "#22f";
    ctx.fillRect(camera.position.x * zoom-5, camera.position.z * zoom-5, 10, 10);
    ctx.beginPath();
    ctx.moveTo(camera.position.x * zoom, camera.position.z * zoom);
    ctx.lineTo((camera.position.x+Math.sin(-camera.rotation.y)*2) * zoom, (camera.position.z-Math.cos(camera.rotation.y)*2) * zoom);
    ctx.lineWidth = 5;
    ctx.stroke();
    for (var i = 0; i < enemies.length; i++) {
        if(enemies[i].hp > 0)
            ctx.fillStyle = "#f55";
        else
        ctx.fillStyle = "#800";

        ctx.fillRect(enemies[i].x * zoom, enemies[i].z * zoom, 10, 10);
    }
}
function gamepadSetKeys(){
    var gp = navigator.getGamepads()[0];
    if(gp){
        if(controls.Green == 0 && gp.buttons[0].pressed){if(gameSettings.editMap)createWall();else doorOpen();};
        if(controls.Red == 0 && gp.buttons[1].pressed){destroy();};
        //if(controls.Blue == 0 && gp.buttons[2].pressed){doorOpen();};
        if(controls.Yellow == 0 && gp.buttons[3].pressed){nextWeapon("+");};

        //if(controls.LT == 0 && gp.buttons[4].pressed){doorOpen();};
        if(controls.PT == 0 && gp.buttons[5].pressed){shoot();};
        //if(controls.LD == 0 && gp.buttons[6].pressed){doorOpen();};
        if(controls.PD == 0 && gp.buttons[7].pressed){nextWeapon("0");shoot();};

        if(controls.Back == 0 && gp.buttons[8].pressed){tryGodMode();};
        if(controls.Start == 0 && gp.buttons[9].pressed){gameSettings.pause = !gameSettings.pause;};
        //if(controls.LJ == 0 && gp.buttons[10].pressed){doorOpen();};
        //if(controls.RJ == 0 && gp.buttons[11].pressed){doorOpen();};

        //if(controls.T == 0 && gp.buttons[12].pressed){doorOpen();};
        //if(controls.B == 0 && gp.buttons[13].pressed){doorOpen();};
        if(controls.L == 0 && gp.buttons[14].pressed){changeBlock(-1);};
        if(controls.R == 0 && gp.buttons[15].pressed){changeBlock(-1);};
        //-----------------------------------------------------
        controls.Green = gp.buttons[0].pressed?1:0;     //Green
        controls.Red = gp.buttons[1].pressed?1:0;       //Red
        controls.Blue = gp.buttons[2].pressed?1:0;      //Blue
        controls.Yellow = gp.buttons[3].pressed?1:0;    //Yellow

        controls.LT = gp.buttons[4].pressed?1:0;        //Left Top
        controls.PT = gp.buttons[5].pressed?1:0;        //Right Top
        controls.LD = gp.buttons[6].pressed?1:0;        //Left Down
        controls.PD = gp.buttons[7].pressed?1:0;        //Right Top

        controls.Back = gp.buttons[8].pressed?1:0;      //Back
        controls.Start = gp.buttons[9].pressed?1:0;     //Start
        controls.LJ = gp.buttons[10].pressed?1:0;        //Left Joystick
        controls.RJ = gp.buttons[11].pressed?1:0;        //Right Joystick

        controls.T = gp.buttons[12].pressed?1:0;         //Top
        controls.B = gp.buttons[13].pressed?1:0;         //Bottom
        controls.L = gp.buttons[14].pressed?1:0;         //Left
        controls.R = gp.buttons[15].pressed?1:0;         //Right
    }
}



setInterval(function () {
    hudUpdate();
    if (gameSettings.wallHack) {
        minimapUpdate();
    }
    fps = newfps * 4;
    newfps = 0;
}, 250);

window.addEventListener("gamepadconnected", function( event ) {
    gamepadSetKeysInterval = setInterval(function(){gamepadSetKeys();},1000/60);
});
window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",e.gamepad.index, e.gamepad.id);
    clearInterval(gamepadSetKeysInterval);
});


if(navigator.getGamepads()[0]){gamepadSetKeysInterval = setInterval(function(){gamepadSetKeys();},1000/60);}

var clock = new THREE.Clock();
clock.start;
var newfps = 0;
var fps = 0;
var doorMove = [false, 0, 0, "x"];

createMap(gameSettings.level);
render();
