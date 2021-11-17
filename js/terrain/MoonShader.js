"use strict";

import {ShaderMaterial} from "../lib/three.module.js";

export default class MoonShader extends ShaderMaterial {
    constructor({
                    mapInParameters = null, //Tekstur
                    colorInParameters = null //Farge som skal fargelegge videre
                }) {

        const vertexShader = `
            out vec2 vUv;
            
            void main(){
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        
        `

        const fragmentShader = `
            uniform sampler2D textureInShader;
            uniform vec3 colorInShader;
            
            in vec2 vUv;
            
            void main(){
                vec4 textureColor = texture(textureInShader, vUv);
                gl_FragColor = vec4(textureColor.xyz * colorInShader, 1.0);
            }
        `

        super({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {

                textureInShader: {
                    value: mapInParameters
                },
                colorInShader: {
                    value: colorInParameters
                }
            }
        });
    }
}