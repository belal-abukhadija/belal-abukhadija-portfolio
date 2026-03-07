"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

// --- Crystal Core — all meshBasicMaterial, zero lighting dependency ---
function CrystalCore({ mouse }: { mouse: MouseRef }) {
  const outerWire = useRef<THREE.Mesh>(null);
  const innerWire = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mx = mouse.current.x;
    const my = mouse.current.y;

    if (outerWire.current) {
      outerWire.current.rotation.y = t * 0.12 + mx * 1.2;
      outerWire.current.rotation.x = t * 0.04 - my * 0.8;
    }
    if (innerWire.current) {
      innerWire.current.rotation.y = t * 0.08 - mx * 0.9;
      innerWire.current.rotation.z = t * 0.05 + my * 0.6;
    }
  });

  return (
    <>
      <mesh ref={outerWire}>
        <icosahedronGeometry args={[2.0, 2]} />
        <meshBasicMaterial color="#c8ff1a" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh ref={innerWire}>
        <icosahedronGeometry args={[1.48, 1]} />
        <meshBasicMaterial color="#4de8ff" wireframe transparent opacity={0.45} />
      </mesh>
    </>
  );
}

// --- Scene ---
function Scene({ mouse }: { mouse: MouseRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.35) * 0.08;
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <CrystalCore mouse={mouse} />
    </group>
  );
}

// --- Canvas ---
export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    mouse.current.y = (e.clientY - rect.top) / rect.height - 0.5;
  };

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouse.current.x = 0; mouse.current.y = 0; }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.NoToneMapping,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        dpr={[1, 2]}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
