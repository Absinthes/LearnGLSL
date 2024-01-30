import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import Camera from "./Camera";
import { Suspense } from "react";
import { Scene } from "./Scene";

export default function Index() {
  return (
    <>
      <Canvas>
        {/* <Help /> */}
        {/* <Controls /> */}
        {/* <Env /> */}
        <color attach="background" args={["#0b1534"]} />
        <Camera />
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
