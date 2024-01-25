import { setUniforms } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { camelCase, pick } from "lodash-es";
import { PropsWithChildren, useEffect, useRef } from "react";
import { ShaderMaterial } from "three";

export type WrapperMaterialProps<T> = {
  material: typeof ShaderMaterial;
  timeKey?: string;
  propsKey?: (keyof T)[];
};

export default function CustomMaterial<T extends object>(
  props: WrapperMaterialProps<T>
) {
  const { timeKey = "time", propsKey = [], material } = props;

  const name = material.name;
  const CamelCaseName = camelCase(name);

  return (props: T) => {
    const shaderRef = useRef<ShaderMaterial>(null);

    useFrame(({ clock }) => {
      shaderRef.current!.uniforms[timeKey].value = clock.getElapsedTime();
    });

    useEffect(() => {
      if (!shaderRef.current) return;

      setUniforms(shaderRef.current.uniforms, pick(props, propsKey));
    }, [props]);

    // @ts-expect-error
    return <CamelCaseName ref={shaderRef} />;
  };
}
