import {Object3D} from "../lib/three.module.js";
import {DirectionalLight} from "../lib/three.module.js";
import {AmbientLight} from "../lib/three.module.js";

export default class Light extends Object3D {
    constructor() {
        super();

        /*
        Add light
         */

        let directionalLight = new DirectionalLight(0xffffff, 0.2);
        directionalLight.position.set(100, 3000, 200);
        //directionalLight.position.set(300, 400, 1000);

        directionalLight.castShadow = true;

        //Set up shadow properties for the light
        directionalLight.shadow.mapSize.width = 3000; // 512
        directionalLight.shadow.mapSize.height = 2000; // 512
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 2000;

        this.add(directionalLight);

        // Set direction
        directionalLight.target.position.set(200, 200, 0); // x 0 y 15 z 0
        this.add(directionalLight.target);

        const ambientLight = new AmbientLight(0xffb3ff, 0.5);

        this.add(ambientLight);


        //const pointLight = new PointLight(0x222222);


    }
}