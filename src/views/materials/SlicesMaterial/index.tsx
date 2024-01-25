import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class SlicesMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        slices: {
          value: 7,
        },
        offset: {
          value: 0.05,
        },
        time: {
          value: 0,
        },
        speedV: {
          value: 0.5,
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

extend({ SlicesMaterial });

export type SlicesMaterialProps = {
  uTexture: Texture;
  slices?: number;
  offset?: number;
  speedV?: number;
};

export default CustomMaterial<SlicesMaterialProps>({
  material: SlicesMaterial,
  propsKey: ["uTexture", "slices", "offset", "speedV"],
});
