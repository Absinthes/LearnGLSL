import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class DotMatrixMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        dots: {
          value: 40,
        },
        size: {
          value: 0.3,
        },
        blur: {
          value: 0,
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

extend({ DotMatrixMaterial });

export type DotMatrixMaterialProps = {
  uTexture: Texture;
  dots?: number;
  size?: number;
  blur?: number;
};

export default CustomMaterial<DotMatrixMaterialProps>({
  material: DotMatrixMaterial,
  propsKey: ["uTexture", "dots", "size", "blur"],
});
