import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class EdgesMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        amount: {
          value: 0.5,
        },
        passthru: {
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

extend({ EdgesMaterial });

export type EdgesMaterialProps = {
  uTexture: Texture;
  amount?: number;
  passthru?: number;
};

export default CustomMaterial<EdgesMaterialProps>({
  material: EdgesMaterial,
  propsKey: ["uTexture", "amount", "passthru"],
});
