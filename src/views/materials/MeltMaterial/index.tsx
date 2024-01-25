import { ShaderMaterial, Texture } from "three";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import { extend, useFrame } from "@react-three/fiber";
import { setUniforms } from "@/utils";
import { pick } from "lodash-es";
import { useRef, useEffect } from "react";

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

export default function _MeltMaterial(props: MeltMaterialProps) {
  const shaderRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    shaderRef.current!.uniforms.time.value = clock.getElapsedTime();
  });

  useEffect(() => {
    if (!shaderRef.current) return;

    setUniforms(
      shaderRef.current.uniforms,
      pick(props, ["uTexture", "slices", "offset", "speedV"])
    );
  }, [props]);

  // @ts-expect-error
  return <meltMaterial ref={shaderRef} />;
}
