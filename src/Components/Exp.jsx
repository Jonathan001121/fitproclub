import { OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Exp = (props) => {
  const { avatarProp } = props;

  return (
    <>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <group position-y={0}>
    
      <Avatar avatarProp={avatarProp} />
      </group>
    <ambientLight intensity={1} />
    </>
  );
};
