import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class RainbowMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        amount: {
          value: 0.5,
        },
        offset: {
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

extend({ RainbowMaterial });

export type RainbowMaterialProps = {
  uTexture: Texture;
  amount?: number;
  offset?: number;
};

export default CustomMaterial<RainbowMaterialProps>({
  material: RainbowMaterial,
  propsKey: ["uTexture", "amount", "offset"],
  debug: {
    amount: {
      min: 0.1,
      max: 0.8,
      step: 0.1,
      value: 0.5,
    },
    offset: {
      min: 0,
      max: 2,
      step: 0.1,
      value: 0.5,
    },
  },
});
