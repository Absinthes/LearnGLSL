import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";
import CustomMaterial from "../CustomMaterial";

export class ShakeMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        amount: {
          value: 0.01,
        },
        size: {
          value: 10,
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

extend({ ShakeMaterial });

export type ShakeMaterialProps = {
  uTexture: Texture;
  amount?: number;
};

export default CustomMaterial<ShakeMaterialProps>({
  material: ShakeMaterial,
  propsKey: ["uTexture", "amount"],
});
