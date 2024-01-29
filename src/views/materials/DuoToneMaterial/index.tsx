import { Color, ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class DuoToneMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        colLight: {
          value: new Color("#e7305e"),
        },
        colDark: {
          value: new Color("#2e3060"),
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

extend({ DuoToneMaterial });

export type DuoToneMaterialProps = {
  uTexture: Texture;
  colLight?: string;
  colDark?: string;
};

export default CustomMaterial<DuoToneMaterialProps>({
  material: DuoToneMaterial,
  propsKey: ["uTexture", "colLight", "colDark"],
  propCallback: (value, key) => {
    const colorKey = ["colLight", "colDark"];
    if (!colorKey.includes(key)) return value;
    return new Color(value);
  },
  debug: {
    colLight: "#e7305e",
    colDark: "#2e3060",
  },
});
