import {Mesh,  Object3D} from "../lib/three.module.js";
import Utilities from "../lib/Utilities.js";
import {GLTFLoader} from "../loaders/GLTFLoader.js";


export default class Tree extends Object3D{

    constructor(terrainGeometry) {
        super();
        new GLTFLoader()
            .load(
                // resource URL
                'resources/models/kenney_nature_kit/tree_pineSmallB.glb',
                // called when resource is loaded
                (object) => {
                    for (let x = -50; x < 150; x += 8) {
                        for (let z = -50; z < 50; z += 8) {
                            const px = x + 1 + (6 * Math.random()) - 3;
                            const pz = z + 1 + (6 * Math.random()) - 3;
                            const height = terrainGeometry.getHeightAt(px, pz);
                            if (height < 7 && height > 3) {
                                const tree = object.scene.children[0].clone();
                                tree.traverse((child) => {
                                    if (child.isMesh) {
                                        child.castShadow = true;
                                        child.receiveShadow = true;
                                    }
                                });
                                tree.position.x = px;
                                tree.position.y = height - 0.01;
                                tree.position.z = pz;
                                tree.rotation.y = Math.random() * (2 * Math.PI);
                                tree.scale.multiplyScalar(1.5 + Math.random() * 1);
                                this.add( tree );
                            }
                        }
                    }
                },
                (xhr) => {
                    console.log(((xhr.loaded / xhr.total) * 100) + '% loaded');
                },
                (error) => {
                    console.error('Error loading model.', error);
                }
            );



    }
}