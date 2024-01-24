import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Box3, MathUtils, Mesh, PerspectiveCamera, Vector3 } from "three";
import "./materials/JitterMaterial";
import JitterMaterial from "./materials/JitterMaterial";

function frameArea(
  sizeToFitOnScreen: number,
  boxSize: number,
  boxCenter: Vector3,
  camera: PerspectiveCamera
) {
  const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
  const halfFovY = MathUtils.degToRad(camera.fov * 0.5);
  const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
  const direction = new Vector3()
    .subVectors(camera.position, boxCenter)
    .normalize();
  camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

  camera.near = boxSize / 100;
  camera.far = boxSize * 100;
  camera.updateProjectionMatrix();

  camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
}

export function Scene() {
  const texture = useTexture("/img/微信截图_20231024101134.png");
  const { width, height } = texture.source.data;
  const { camera } = useThree((state) => ({
    camera: state.camera,
  }));
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    const box3 = new Box3().setFromObject(meshRef.current!);

    const size = box3.getSize(new Vector3()).length();
    const center = box3.getCenter(new Vector3());

    frameArea(size * 0.7, size, center, camera as PerspectiveCamera);
  }, []);

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[width / 100, height / 100, 50, 50]} />
        <JitterMaterial uTexture={texture} />
      </mesh>
    </>
  );
}
