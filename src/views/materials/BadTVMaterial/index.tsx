import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class BadTvMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        thickDistort: {
          value: 3,
        },
        fineDistort: {
          value: 1,
        },
        rollSpeed: {
          value: 1,
        },
        speed: {
          value: 1,
        },
        time: {
          value: 0,
        },
        uTexture: {
          value: null,
        },
      },
      vertexShader,
      fragmentShader,
    });
  }
}

extend({ BadTvMaterial });

export type BadTvMaterialProps = {
  uTexture: Texture;
  thickDistort?: number;
  fineDistort?: number;
  rollSpeed?: number;
  speed?: number;
};

export default CustomMaterial<BadTvMaterialProps>({
  material: BadTvMaterial,
  propsKey: ["uTexture", "thickDistort", "fineDistort", "rollSpeed", "speed"],
  debug: {
    thickDistort: {
      min: 0.1,
      max: 6,
      value: 1.5,
    },
    fineDistort: {
      min: 0,
      max: 6,
      value: 1,
    },
    rollSpeed: {
      min: 0,
      max: 3,
      value: 0,
      step: 1,
    },
    speed: {
      min: 0,
      max: 3,
      value: 0.1,
      step: 0.1,
    },
  },
});
