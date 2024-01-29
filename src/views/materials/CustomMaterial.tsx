import { setUniforms } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { camelCase, pick } from "lodash-es";
import { PropsWithChildren, useEffect, useRef } from "react";
import { ShaderMaterial } from "three";

export type WrapperMaterialProps<T> = {
  material: typeof ShaderMaterial;
  timeKey?: string;
  propsKey?: (keyof T)[];
  propCallback?: Parameters<typeof setUniforms>["2"];
  debug?: Parameters<typeof useControls>[0];
};

export default function CustomMaterial<T extends object>(
  props: WrapperMaterialProps<T>
) {
  const {
    timeKey = "time",
    propsKey = [],
    material,
    propCallback,
    debug = {},
  } = props;

  const name = material.name;
  const CamelCaseName = camelCase(name);

  return (props: T) => {
    const shaderRef = useRef<ShaderMaterial>(null);

    const debugProps = useControls(debug);

    useFrame(({ clock }) => {
      shaderRef.current!.uniforms[timeKey].value = clock.getElapsedTime();
    });

    useEffect(() => {
      if (!shaderRef.current) return;

      setUniforms(
        shaderRef.current.uniforms,
        pick({ ...props, ...debugProps }, propsKey),
        propCallback
      );
    }, [props, debugProps]);

    // @ts-expect-error
    return <CamelCaseName ref={shaderRef} {...debugProps} />;
  };
}
