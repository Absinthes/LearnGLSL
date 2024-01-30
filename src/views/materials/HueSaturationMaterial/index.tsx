import { ShaderMaterial, Texture, Vector2 } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class HueSaturationMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        saturation: {
          value: 0.5,
        },
        hue: {
          value: 0.5,
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

extend({ HueSaturationMaterial });

export type HueSaturationMaterialProps = {
  uTexture: Texture;
  saturation?: number;
  hue?: number;
};

export default CustomMaterial<HueSaturationMaterialProps>({
  material: HueSaturationMaterial,
  propsKey: ["uTexture", "saturation", "hue"],
  debug: {
    saturation: {
      min: -1,
      max: 1,
      value: 0.5,
      step: 0.1,
    },
    hue: {
      min: 0,
      max: 1,
      value: 0,
      step: 0.1,
    },
  },
});
