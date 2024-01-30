import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class VignetteMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        amount: {
          value: 1,
        },
        darkness: {
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

extend({ VignetteMaterial });

export type VignetteMaterialProps = {
  uTexture: Texture;
  amount?: number;
  darkness?: number;
};

export default CustomMaterial<VignetteMaterialProps>({
  material: VignetteMaterial,
  propsKey: ["uTexture", "amount", "darkness"],
  debug: {
    amount: {
      min: 0,
      max: 2,
      value: 1,
    },
    darkness: {
      min: 1,
      max: 2,
      value: 1,
    },
  },
});
