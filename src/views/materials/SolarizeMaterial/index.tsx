import { ShaderMaterial, Texture } from "three";
import { extend } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import CustomMaterial from "../CustomMaterial";

export class SolarizeMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        centerBrightness: {
          value: 0.5,
        },
        powerCurve: {
          value: 2,
        },
        colorize: {
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

extend({ SolarizeMaterial });

export type SolarizeMaterialProps = {
  uTexture: Texture;
  centerBrightness?: number;
  powerCurve?: number;
  colorize?: number;
};

export default CustomMaterial<SolarizeMaterialProps>({
  material: SolarizeMaterial,
  propsKey: ["uTexture", "centerBrightness", "colorize", "powerCurve"],
});
