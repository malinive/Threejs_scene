"use strict";

import {Mesh, Object3D} from "../lib/three.module.js";
import {GLTFLoader} from "../loaders/GLTFLoader.js";


export default class Boat {
    constructor(scene) {

        // oppretter usynlig objekt båten flyter rundt
        this.orbitNode = new Object3D();

        this.orbitNode.position.x = 50
        this.orbitNode.position.y = 1
        this.orbitNode.position.z = 0


        scene.add(this.orbitNode)

        let loader = new GLTFLoader()
        loader.load(
            // resource URL
            'resources/models/kenney_nature_kit/ship_light.gltf',
            // called when resource is loaded
            (object) => {
                const boat = object.scene;

                boat.scale.multiplyScalar(4) //størrelse
                boat.position.x = 150

                this.boat = boat;

                this.orbitNode.add(boat)

            },
            (xhr) => {
                console.log(((xhr.loaded / xhr.total) * 100) + '% loaded');
            },
            (error) => {
                console.error('Error loading model.', error);
            }
        );
    }

    animate = () => {
        if (this.boat) {
            this.orbitNode.rotation.y += 0.001;



        }
    }
}