import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";
import { DoubleSide, ShaderMaterial, Texture } from "three";
import { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { pick } from "lodash-es";

class JitterMaterialImp extends ShaderMaterial {
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
      side: DoubleSide,
    });
  }
}

extend({ JitterMaterialImp });

export type JitterMaterialProps = {
  uTexture: Texture;
  amount?: number;
  speed?: number;
};

function setUniforms(target: Record<string, any>, values: Record<string, any>) {
  Object.keys(values).forEach((key) => {
    if (!Object.hasOwn(target, key)) return;
    target[key].value = values[key];
  });
}

export default function JitterMaterial(props: JitterMaterialProps) {
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

  return <jitterMaterialImp ref={shaderRef} />;
}
