"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({ mouse }: { mouse: React.MutableRefObject<[number,number]> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.09;
    meshRef.current.rotation.y = t * 0.13;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current[0] * 0.35, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current[1] * 0.35, 0.05);
  });
  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.75}>
      <MeshDistortMaterial
        color="#FF8C00"
        attach="material"
        distort={0.45}
        speed={1.8}
        roughness={0.15}
        metalness={0.7}
      />
    </Sphere>
  );
}

function Particles() {
  const count = 140;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i*3]   = (Math.random() - 0.5) * 12;
    positions[i*3+1] = (Math.random() - 0.5) * 12;
    positions[i*3+2] = (Math.random() - 0.5) * 6;
  }
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.025; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FF1493" size={0.03} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

function CoralRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.getElapsedTime() * 0.2;
      ref.current.rotation.z = s.clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.6, 0.018, 16, 80]} />
      <meshBasicMaterial color="#FF6347" transparent opacity={0.35} />
    </mesh>
  );
}

export default function HeroCanvas() {
  const [supported, setSupported] = useState(true);
  const mouse = useRef<[number,number]>([0,0]);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      if (!c.getContext("webgl") && !c.getContext("experimental-webgl")) setSupported(false);
    } catch { setSupported(false); }

    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth)  * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!supported) return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-72 h-72 rounded-full bg-gradient-to-br from-accent-orange/25 to-accent-pink/25 blur-3xl" />
    </div>
  );

  return (
    <Canvas camera={{ position:[0,0,4.5], fov:58 }} style={{ background:"transparent" }} gl={{ antialias:true, alpha:true }}>
      <ambientLight intensity={0.25} />
      <pointLight position={[8,8,8]}   intensity={1.2} color="#FF8C00" />
      <pointLight position={[-8,-6,4]} intensity={0.7} color="#FF1493" />
      <pointLight position={[0,0,-6]}  intensity={0.4} color="#20B2AA" />
      <AnimatedSphere mouse={mouse} />
      <Particles />
      <CoralRing />
    </Canvas>
  );
}
