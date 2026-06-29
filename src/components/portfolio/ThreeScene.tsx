import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Globe() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.3;
      ref.current.rotation.x += d * 0.05;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 3]} />
      <meshBasicMaterial color="#00F0FF" wireframe />
    </mesh>
  );
}

function NodeSphere() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  useFrame(({ mouse }, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.1 + mouse.x * 0.01;
      ref.current.rotation.x += mouse.y * 0.005;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7CFFCB" size={0.035} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

export function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#00F0FF" intensity={2} />
      <Stars radius={50} depth={50} count={1500} factor={4} fade speed={1} />
      <Globe />
      <NodeSphere />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}
