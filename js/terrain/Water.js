import {Vector2, Mesh, MeshPhongMaterial, CircleBufferGeometry, Object3D, TextureLoader} from "../lib/three.module.js";
import {PlaneBufferGeometry} from "../lib/three.module.js";
import {PlaneGeometry} from "../lib/three.module.js";

export default class Water extends Object3D {
    constructor() {
        super();
        let loader = new TextureLoader();
        let waterGeometry = new PlaneBufferGeometry(4000, 4000);
        let normalMap = loader.load("resources/images/normalMap.jpg");

        let waterMaterial = new MeshPhongMaterial({
            // map: waterTexture,
            color: 0xA2CFEE,
            normalMap: normalMap,
            emissive: 0xFFBCED,
            emissiveIntensity: 0.1,
            normalScale: new Vector2(1.0, 1.0),
            shininess: 0.2,
            fog: true,

            createWave() {
                let count = 0
                for (let i = 0; i < waterGeometry.vertices.length; i++) {
                    let z = +waterGeometry.vertices[i].z;
                    waterGeometry.vertices[i].z = Math.sin((i + count * 0.00002)) *
                        (waterGeometry.vertices[i]._myZ - (waterGeometry.vertices[i]._myZ * 0.6))
                    waterGeometry.verticesNeedUpdate = true;

                    count += 0.1
                }

            },

        });

        this.water = new Mesh(waterGeometry, waterMaterial);
        this.water.rotation.x = -Math.PI / 2;
        this.add(this.water);

    }

    flow(deltaTime) {
        this.water.position.y = Math.sin(deltaTime / 8000) + 2;
        this.water.position.x = Math.sin(deltaTime / 6000);
        this.water.position.z = Math.sin(deltaTime / 4000);
        this.water.material.normalScale.set(Math.sin(deltaTime / 3000), 1.0);
    }
}