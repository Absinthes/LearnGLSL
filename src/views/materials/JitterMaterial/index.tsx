import { DoubleSide, ShaderMaterial, Texture } from "three";
import { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { pick } from "lodash-es";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import { setUniforms } from "@/utils";

export class JitterMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        amount: {
          value: 0.1,
        },
        speed: {
          value: 0.8,
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

extend({ JitterMaterial });

export type JitterMaterialProps = {
  uTexture: Texture;
  amount?: number;
  speed?: number;
};

export default function _JitterMaterial(props: JitterMaterialProps) {
  const shaderRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    shaderRef.current!.uniforms.time.value = clock.elapsedTime;
  });

  useEffect(() => {
    if (!shaderRef.current) return;

    setUniforms(
      shaderRef.current.uniforms,
      pick(props, ["uTexture", "amount", "speed"])
    );
  }, [props]);

  return <jitterMaterial ref={shaderRef} />;
}
