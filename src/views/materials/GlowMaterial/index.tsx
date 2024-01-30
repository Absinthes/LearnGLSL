import { ShaderMaterial, Texture, Vector2 } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class GlowMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        strength: {
          value: 0.5,
        },
        size: {
          value: 4,
        },
        resolution: {
          value: [1000, 1000],
        },
        cutOff: {
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

extend({ GlowMaterial });

export type GlowMaterialProps = {
  uTexture: Texture;
  strength?: number;
  size?: number;
  resolution?: number;
  cutOff?: number;
};

export default CustomMaterial<GlowMaterialProps>({
  material: GlowMaterial,
  propsKey: ["uTexture", "strength", "size", "cutOff", "resolution"],
  propCallback: (value, key) => {
    if (key !== "resolution") return value;
    return new Vector2(value, value);
  },
  debug: {
    strength: {
      min: 0,
      max: 2,
      step: 0.1,
      value: 0.5,
    },
    size: {
      min: 0,
      max: 10,
      step: 1,
      value: 4,
    },
    cutOff: {
      min: 0,
      max: 0.8,
      value: 0.5,
    },
    resolution: {
      value: 1000,
      step: 100,
    },
  },
});
