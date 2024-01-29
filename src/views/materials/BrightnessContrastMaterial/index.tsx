import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class BrightnessContrastMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        brightness: {
          value: 0,
        },
        contrast: {
          value: 0.2,
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

extend({ BrightnessContrastMaterial });

export type BrightnessContrastMaterialProps = {
  uTexture: Texture;
  brightness?: number;
  contrast?: number;
};

export default CustomMaterial<BrightnessContrastMaterialProps>({
  material: BrightnessContrastMaterial,
  propsKey: ["uTexture", "brightness", "contrast"],
  debug: {
    brightness: {
      min: -0.2,
      max: 0.2,
      value: 0,
    },
    contrast: {
      min: 0,
      max: 0.8,
      value: 0.2,
    },
  },
});
