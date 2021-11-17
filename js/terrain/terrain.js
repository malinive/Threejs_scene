import {Mesh, MeshPhongMaterial, TextureLoader, Object3D, AmbientLight} from "../lib/three.module.js";
import Utilities from "../lib/Utilities.js";
import TerrainBufferGeometry from "./TerrainBufferGeometry.js";
import {RepeatWrapping} from "../lib/three.module.js";
import TextureSplattingMaterial from "../materials/TextureSplattingMaterial.js";
import Tree from "./Tree.js";
import Lava from "./Lava.js";
import * as THREE from "../lib/three.module.js";

export default class Terrain extends Object3D {
    constructor() {
        super();
        Utilities.loadImage('resources/images/heightmap5.jpeg').then((heightmapImage) => {
            const width = 100;

            const terrainGeometry = new TerrainBufferGeometry({
                width,
                heightmapImage,
                numberOfSubdivisions: 128,
                height: 20,
                fog: true

            });

            /*const sandTexture = new TextureLoader().load('resources/textures/sand3.jpeg');
            sandTexture.wrapS = RepeatWrapping;
            sandTexture.wrapT = RepeatWrapping;
            sandTexture.repeat.set(3000 / width, 3000 / width);

            const grassTexture = new TextureLoader().load('resources/textures/grass_02.png');
            grassTexture.wrapS = RepeatWrapping;
            grassTexture.wrapT = RepeatWrapping;
            grassTexture.repeat.set(3500 / width, 3500 / width);*/

            const sandTexture = new TextureLoader().load('resources/textures/snow.jpg');
            sandTexture.wrapS = RepeatWrapping;
            sandTexture.wrapT = RepeatWrapping;
            sandTexture.repeat.set(3000 / width, 3000 / width);

            const grassTexture = new TextureLoader().load('resources/textures/grass_02.png');
            grassTexture.wrapS = RepeatWrapping;
            grassTexture.wrapT = RepeatWrapping;
            grassTexture.repeat.set(3500 / width, 3500 / width);


            //const splatMap = new TextureLoader().load('resources/images/splatmap_01.png');
            const splatMap = new TextureLoader().load('resources/images/bump-map.jpg');

            const terrainMaterial = new TextureSplattingMaterial({
                color: 0xffffff,
                shininess: 0,
                textures: [sandTexture, grassTexture],
                splatMaps: [splatMap],
                fog: true
            });

            const terrain = new Mesh(terrainGeometry, terrainMaterial);

            terrain.castShadow = true;
            terrain.receiveShadow = true;

            terrain.traverse ( function (node) {
                if (node instanceof Mesh ){
                    node.castShadow = true ;
                    node.receiveShadow = true ;
                }
            });

            this.add(terrain);
            let tree = new Tree(terrainGeometry);
            this.add(tree);
            let moreTrees = new Tree(terrainGeometry);
            this.add(moreTrees);
            let evenmoreTrees = new Tree(terrainGeometry);
            this.add(evenmoreTrees);

        });
    }
}
