import { ShaderMaterial, Texture } from "three";
import { extend, useFrame } from "@react-three/fiber";

import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import { useEffect, useRef } from "react";
import { pick } from "lodash-es";
import { setUniforms } from "@/utils";

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

export type SlicesMaterialProps = {
  uTexture: Texture;
  slices?: number;
  offset?: number;
  speedV?: number;
};

extend({ SlicesMaterial });

export default function _SlicesMaterial(props: SlicesMaterialProps) {
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
  return <slicesMaterial ref={shaderRef} />;
}
