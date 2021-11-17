import {
    AmbientLight,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PointLight,
    SphereBufferGeometry,
    SphereGeometry,
    TextureLoader
} from "../lib/three.module.js";
import MoonShader from "./MoonShader.js";
import {Color} from "../lib/three.module.js";

export default class Moon extends Object3D {
    constructor(scene) {
        super();

        // SUN

        let radius = 8;
        let widthSegments = 64;
        let heightSegments = 64;

        let sunGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        let sunTextureUrl = 'resources/images/sun.jpg';
        let sunTexture = new TextureLoader().load(sunTextureUrl);

        let sunMaterial = new MoonShader({
            mapInParameters: sunTexture,
            colorInParameters: new Color(0xB9B9B9)
        })

        this.sun = new Mesh(sunGeometry, sunMaterial);

        this.sun.position.y = 80;
        this.sun.position.x = 15;

        scene.add(this.sun);

        /* point Light, lys som blir sendt ut i alle retninger */
        let pLight = new PointLight(0xffa31a, 0.5, 1500.0, 2);
        pLight.castShadow = true;
        pLight.shadow.mapSize.width = 2048;
        pLight.shadow.mapSize.height = 2048;
        pLight.position.y = 80;
        pLight.position.x = 15;

        scene.add(pLight);

        // MOON

        let moonGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        let moonTextureUrl = 'resources/textures/moon.jpg';
        let moonTexture = new TextureLoader().load(moonTextureUrl);

        let moonMaterial = new MoonShader({
            mapInParameters: moonTexture,
            colorInParameters: new Color(0xB9B9B9)
        })

        this.moon = new Mesh(moonGeometry, moonMaterial);

        this.moon.position.y = 80;
        this.moon.position.x = -30;

        scene.add(this.moon);
    }

    animate() {
        //Når App-klassen ber solsystemet om å animere seg: roter planetene
        this.rotateObject(this.moon, [0.0, 0.005, 0.0]);
        this.rotateObject(this.sun, [0.0, 0.005, 0.0]);
    }

    rotateObject(object, rotation){
        //Hjelpe-metode for å rotere et objekt
        object.rotation.x += rotation[0];
        object.rotation.y += rotation[1];
        object.rotation.z += rotation[2];
    }
}