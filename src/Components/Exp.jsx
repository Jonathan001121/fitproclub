import { OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Exp = () => {
  return (
    <>
      <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
      <group position-y={0}>
      <Avatar />
      </group>
    <ambientLight intensity={1} />
    </>
  );
};
