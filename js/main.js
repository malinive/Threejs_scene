import {
    PerspectiveCamera,
    WebGLRenderer,
    PCFSoftShadowMap,
    Scene,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    SphereBufferGeometry,
    TextureLoader,
    RepeatWrapping,
    DirectionalLight,
    Vector3,
    AxesHelper, PointLight,
} from './lib/three.module.js';

import Utilities from './lib/Utilities.js';
import MouseLookController from './controls/MouseLookController.js';
import Skydome from "./terrain/Skydome.js";
import TextureSplattingMaterial from './materials/TextureSplattingMaterial.js';
import TerrainBufferGeometry from './terrain/TerrainBufferGeometry.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';
import { SimplexNoise } from './lib/SimplexNoise.js';
import Water from "./terrain/Water.js";
import * as THREE from "./lib/three.module.js";
import {AmbientLight} from "./lib/three.module.js";
import Skyes from "./terrain/Skyes.js";
import Light from "./terrain/Light.js";
import Rain from "./terrain/Rain.js";
import Boat from "./terrain/boat.js";
import Terrain from "./terrain/terrain.js";
import Lava from "./terrain/Lava.js";
import Moon from "./terrain/Moon.js";

async function main() {

    //const scene = new Scene();

    const scene = new THREE.Scene();

    {
        const near = 1;
        const far = 10000;
        const color = 0xFFBCED;
        scene.fog = new THREE.FogExp2(color, 0.00085, near, far);
    }

    const axesHelper = new AxesHelper(15);
    scene.add(axesHelper);

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    /**
     * Handle window resize:
     *  - update aspect ratio.
     *  - update projection matrix
     *  - update renderer size
     */
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    /**
     * Add canvas element to DOM.
     */
    document.body.appendChild(renderer.domElement);

    camera.position.z = 70; //70
    camera.position.y = 55; //55
    camera.rotation.x -= Math.PI * 0.25; // Math.PI * 0.25

    let light = new Light();
    scene.add(light);

    /**
     * Add terrain:
     * 
     * We have to wait for the image file to be loaded by the browser.
     * There are many ways to handle asynchronous flow in your application.
     * We are using the async/await language constructs of Javascript:
     *  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
     */

    /**
     * Set up camera controller:
     */

    const mouseLookController = new MouseLookController(camera);

    // We attach a click lister to the canvas-element so that we can request a pointer lock.
    // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
    const canvas = renderer.domElement;

    canvas.addEventListener('click', () => {
        canvas.requestPointerLock();
    });

    let yaw = 0;
    let pitch = 0;
    const mouseSensitivity = 0.001;

    function updateCamRotation(event) {
        yaw += event.movementX * mouseSensitivity;
        pitch += event.movementY * mouseSensitivity;
    }

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === canvas) {
            canvas.addEventListener('mousemove', updateCamRotation, false);
        } else {
            canvas.removeEventListener('mousemove', updateCamRotation, false);
        }
    });

    let move = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        speed: 0.01
    };

    window.addEventListener('keydown', (e) => {
        if (e.code === 'KeyW') {
            move.forward = true;
            e.preventDefault();
        } else if (e.code === 'KeyS') {
            move.backward = true;
            e.preventDefault();
        } else if (e.code === 'KeyA') {
            move.left = true;
            e.preventDefault();
        } else if (e.code === 'KeyD') {
            move.right = true;
            e.preventDefault();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'KeyW') {
            move.forward = false;
            e.preventDefault();
        } else if (e.code === 'KeyS') {
            move.backward = false;
            e.preventDefault();
        } else if (e.code === 'KeyA') {
            move.left = false;
            e.preventDefault();
        } else if (e.code === 'KeyD') {
            move.right = false;
            e.preventDefault();
        }
    });

    let terrain = new Terrain();
    scene.add(terrain);

    let lava = new Lava(scene);

    let skydome = new Skydome();
    skydome.receiveShadow = true;
    scene.add(skydome);

    let water = new Water();
    scene.add(water);

    let skies = new Skyes(scene);
    scene.add(skies);

    let rain = new Rain(scene);
    scene.add(rain);

    let moon = new Moon(scene);
    scene.add(moon);

    const boat = new Boat (scene);

    const velocity = new Vector3(0.0, 0.0, 0.0);

    let then = performance.now();
    let start = Date.now();
    let Deltatime = 0;
    function loop(now) {

        lava.updateLava();
        lava.createWave();

        rain.animate();
        boat.animate();
        moon.animate();

        const delta = now - then;
        then = now;

        Deltatime = Date.now()-start;

        const moveSpeed = move.speed * delta;

        velocity.set(0.0, 0.0, 0.0);

        if (move.left) {
            velocity.x -= moveSpeed;
        }

        if (move.right) {
            velocity.x += moveSpeed;
        }

        if (move.forward) {
            velocity.z -= moveSpeed;
        }

        if (move.backward) {
            velocity.z += moveSpeed;
        }

        // update controller rotation.
        mouseLookController.update(pitch, yaw);
        yaw = 0;
        pitch = 0;

        // apply rotation to velocity vector, and translate moveNode with it.
        velocity.applyQuaternion(camera.quaternion);
        camera.position.add(velocity);

        water.flow(Deltatime);
        // render scene:
        renderer.render(scene, camera);

        requestAnimationFrame(loop);
    };

    loop(performance.now());
}

main(); // Start application