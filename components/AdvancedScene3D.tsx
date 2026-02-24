'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Ring, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function DataRing({ radius, speed, axis }: { radius: number; speed: number; axis: 'x' | 'y' | 'z' }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      if (axis === 'x') {
        ringRef.current.rotation.x = state.clock.getElapsedTime() * speed;
      } else if (axis === 'y') {
        ringRef.current.rotation.y = state.clock.getElapsedTime() * speed;
      } else {
        ringRef.current.rotation.z = state.clock.getElapsedTime() * speed;
      }
    }
  });

  return (
    <Ring ref={ringRef} args={[radius, radius + 0.05, 64]}>
      <meshBasicMaterial color="#FF6A00" transparent opacity={0.4} side={THREE.DoubleSide} />
    </Ring>
  );
}

function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }

    if (lightRef.current) {
      const intensity = 2 + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
      lightRef.current.intensity = intensity;
    }
  });

  // Create glowing particles around core
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 1.5 + Math.random() * 1;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push({ position: [x, y, z], scale: Math.random() * 0.05 + 0.02 });
    }
    return temp;
  }, []);

  return (
    <group>
      {/* Central glowing sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#FF6A00"
          emissive="#FF6A00"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.2}
        />
      </Sphere>

      {/* Point light at center */}
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={2} color="#FF6A00" distance={10} />

      {/* Orbiting data rings */}
      <DataRing radius={1.5} speed={0.3} axis="x" />
      <DataRing radius={1.8} speed={-0.2} axis="y" />
      <DataRing radius={2.1} speed={0.25} axis="z" />
      <DataRing radius={2.4} speed={-0.15} axis="x" />

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position as [number, number, number]}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial color="#FF6A00" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.5} color="#FF6A00" />
    </group>
  );
}

export default function AdvancedScene3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <AICore />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
