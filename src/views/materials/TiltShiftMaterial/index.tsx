import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class TiltShiftMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        amount: {
          value: 0.01,
        },
        position: {
          value: 0.4,
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

extend({ TiltShiftMaterial });

export type TiltShiftMaterialProps = {
  uTexture: Texture;
  amount?: number;
  position?: number;
};

export default CustomMaterial<TiltShiftMaterialProps>({
  material: TiltShiftMaterial,
  propsKey: ["uTexture", "amount", "position"],
  debug: {
    amount: {
      value: 0.01,
      min: 0.001,
      max: 0.02,
      step: 0.001,
    },
    position: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
});
