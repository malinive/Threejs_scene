import {Vector2, Mesh, MeshPhongMaterial, CircleBufferGeometry, Object3D, TextureLoader} from "../lib/three.module.js";
import {PlaneBufferGeometry} from "../lib/three.module.js";
import {MeshBasicMaterial} from "../lib/three.module.js";
import {BackSide} from "../lib/three.module.js";
import * as THREE from "../lib/three.module.js";
import Utilities from "../lib/Utilities.js";
import {SpriteMaterial} from "../lib/three.module.js";
import {Sprite} from "../lib/three.module.js";

export default class Skyes extends Object3D {
    constructor (scene) {
        super();

        function generateClouds() {

            let random = (min, max) => Math.random() * (max - min) + min;

            for (let i= 0; i<50; i++) {
                const texture = new TextureLoader().load('resources/textures/cloud2.png')


        //let randomTexture = Math.floor(Math.random() * 4);
        let material = new SpriteMaterial(
            {
                map: texture,
                color: 0xffffff,
                fog: true});
        let skyPlane = new Sprite(material);

        let pX = random(-2000, 2000);
        let pZ = random(-400, -1000);
        let pY = random(200, 100);
        let s1 = random(2000, 1000);

        skyPlane.position.set(pX, pY, pZ);
        skyPlane.scale.multiplyScalar(random(100, 500));

        scene.add(skyPlane);
            }
    }
    generateClouds();

    }
}
