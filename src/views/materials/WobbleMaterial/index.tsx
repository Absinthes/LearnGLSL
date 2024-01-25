import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";
import CustomMaterial from "../CustomMaterial";

export class WobbleMaterial extends ShaderMaterial {
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

extend({ WobbleMaterial });

export type WobbleMaterialProps = {
  uTexture: Texture;
  amount?: number;
  size?: number;
};

export default CustomMaterial<WobbleMaterialProps>({
  material: WobbleMaterial,
  propsKey: ["uTexture", "amount", "size"],
});
