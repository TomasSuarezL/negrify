import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

import { Model } from "./models3d/Emb";

export const Experience = () => {
  const cubeRef = useRef<Mesh | null>(null);
  // const groupRef = useRef<Group<Object3DEventMap> | null>(null);
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    if (cubeRef.current) cubeRef.current.rotation.y += delta;

    // Move camera
    // state.camera.position.x = Math.sin(state.clock.elapsedTime) * 8;
    // state.camera.position.z = Math.cos(state.clock.elapsedTime) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <OrbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} />
      <ambientLight intensity={0.2} />

      <Model />
      {/* <group ref={groupRef} position={[0, -1, 0]}>
        <mesh ref={cubeRef} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
        <mesh position-x={-2} position-y={2}>
          <sphereGeometry />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </group>
      <mesh rotation-x={-Math.PI / 2} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={"green"} />
      </mesh> */}
    </>
  );
};
