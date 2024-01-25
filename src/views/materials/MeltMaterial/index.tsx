import { ShaderMaterial, Texture } from "three";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import { extend } from "@react-three/fiber";
import CustomMaterial from "../CustomMaterial";

export class MeltMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTexture: {
          value: null,
        },
        time: {
          value: 0,
        },
        speed: {
          value: 0.1,
        },
        amount: {
          value: 0.03,
        },
        scale: {
          value: 1,
        },
      },
      vertexShader,
      fragmentShader,
    });
  }
}

extend({ MeltMaterial });

export type MeltMaterialProps = {
  uTexture: Texture;
  amount?: number;
  scale?: number;
  speed?: number;
};

export default CustomMaterial<MeltMaterialProps>({
  material: MeltMaterial,
  propsKey: ["uTexture", "amount", "scale", "speed"],
});
