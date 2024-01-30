import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class RgbShiftMaterial extends ShaderMaterial {
  constructor(...args) {
    console.log(args);
    super({
      uniforms: {
        amount: {
          value: 0.5,
        },
        angle: {
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

extend({ RgbShiftMaterial });

export type RgbShiftMaterialProps = {
  uTexture: Texture;
  amount?: number;
  angle?: number;
};

export default CustomMaterial<RgbShiftMaterialProps>({
  material: RgbShiftMaterial,
  propsKey: ["uTexture", "amount", "angle"],
  debug: {
    amount: {
      min: 0,
      max: 0.1,
      value: 0.005,
      step: 0.001,
    },
    angle: {
      min: -Math.PI * 2,
      max: Math.PI * 2,
      value: 0,
      step: Math.PI / 180,
    },
  },
});
