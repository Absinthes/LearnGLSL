import { ShaderMaterial, Texture, Vector2, Vector2Tuple } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class HalfToneMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        center: {
          value: new Vector2(0.1, 0.1),
        },
        angle: {
          value: Math.PI,
        },
        scale: {
          value: 1,
        },
        tSize: {
          value: new Vector2(0.01, 0.01),
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

extend({ HalfToneMaterial });

export type HalfToneMaterialProps = {
  uTexture: Texture;
  center?: Vector2Tuple;
  angle?: number;
  scale?: number;
  tSize?: number;
};

export default CustomMaterial<HalfToneMaterialProps>({
  material: HalfToneMaterial,
  propsKey: ["uTexture", "angle", "center", "scale", "tSize"],
  propCallback: (value, key) => {
    const vec2List = ["center", "tSize"];
    if (!vec2List.includes(key)) return;
    return new Vector2(...value);
  },
});
