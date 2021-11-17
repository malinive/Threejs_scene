import {Float32BufferAttribute, Object3D} from "../lib/three.module.js";
import * as THREE from "../lib/three.module.js";
import {TextureLoader} from "../lib/three.module.js";

export default class Rain extends Object3D {
    constructor(scene) {
        super();

        let sprite, size;

        //
        this.particlesGeometry = new THREE.BufferGeometry();

        let tsprite = new TextureLoader().load('resources/textures/raindrop5.png');

        let parameters =
            [[[1.0, 0.2, 0.5], tsprite, 300],
                [[0.95, 0.1, 0.5], tsprite, 200],
                [[0.90, 0.05, 0.5], tsprite, 400]];

        let materials = [];

        for (let i = 0; i < parameters.length; i++) {

            let color = parameters[i][0];
            sprite = parameters[i][1];
            size = parameters[i][2];

            materials[i] = new THREE.PointsMaterial({

                size: size,
                map: sprite,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true,
                fog: false
            });

            materials[i].color.setHSL(color[0], color[1], color[2]);

            let particles = new THREE.Points(this.particlesGeometry, materials[i]);

            particles.rotation.x = Math.random() * 60;
            particles.rotation.y = Math.random() * 60;
            particles.rotation.z = Math.random() * 60;

            scene.add(particles);
        }

        this.addRain();
    }

    addRain() {

        let positions = [];

        for (let i = 0; i < 20000; i++) {
            let vertex = new THREE.Vector3();
            vertex.x = Math.random() * 40000 - 20000;
            vertex.y = Math.random() * 40000 - 20000;
            vertex.z = Math.random() * 40000 - 20000;

            positions.push(vertex.x);
            positions.push(vertex.y);
            positions.push(vertex.z);

//            this.particlesGeometry.vertices.push(vertex);
        }

        this.particlesGeometry.setAttribute("position", new Float32BufferAttribute(positions,3));

    }

    animate() {

        let positions = this.particlesGeometry.getAttribute("position");

        for (let i = 0; i < positions.count; i++) {
            let currentY = positions.getY(i);
            currentY += 1;
            positions.setY(i,currentY);
        }

        this.particlesGeometry.attributes.position.needsUpdate = true;
    }
}