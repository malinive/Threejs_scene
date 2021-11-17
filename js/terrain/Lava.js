import Utilities from '../lib/Utilities.js';
import {PlaneGeometry, TextureLoader} from '../lib/three.module.js';
import {MeshBasicMaterial} from "../lib/three.module.js";
import {Mesh} from "../lib/three.module.js";



export default class Lava {
    constructor(scene) {

        const lavaTexture = new TextureLoader().load('resources/textures/lavatexture.jpg');

        this.vertexHeight = .15
        this.lavaGeometry = new PlaneGeometry(12, 23, 20, 20)
        this.lavaMaterial = new MeshBasicMaterial({
            color: 0xffffff,
            map: lavaTexture,
            transparent: false,
            opacity: 0.7,
            fog: true

        })


        this.lava = new Mesh(this.lavaGeometry, this.lavaMaterial)

        scene.add(this.lava)
        this.lava.rotation.x = -Math.PI * 0.5
        this.lava.position.set(-17, 10, -8)

    }
    updateLava(){
        for ( let i=0; i < this.lavaGeometry.vertices.length; i++){
            this.lavaGeometry.vertices[i].z += Math.random() * this.vertexHeight - this.vertexHeight;
            this.lavaGeometry.vertices[i]._myZ = this.lavaGeometry.vertices[i].z
        }
    }

    createWave() {
        let count = 0;
        for(let i =0; i<this.lavaGeometry.vertices.length; i++){
            let z = +this.lavaGeometry.vertices[i].z;
            this.lavaGeometry.vertices[i].z = Math.sin(( i + count * 0.00002)) *
                (this.lavaGeometry.vertices[i]._myZ - (this.lavaGeometry.vertices[i]._myZ* 0.2))
            this.lava.geometry.verticesNeedUpdate = true;



            count += 0.1
        }
    }

}