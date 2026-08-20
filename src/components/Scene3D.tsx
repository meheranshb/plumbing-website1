"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Rig() {
  const group = useRef<THREE.Group>(null);
  const drop = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const bubbles = useRef<THREE.InstancedMesh>(null);
  const paused = useRef(false);

  useEffect(() => {
    paused.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const bubbleData = useMemo(
    () =>
      Array.from({ length: 42 }, () => ({
        x: (Math.random() - 0.5) * 6.4,
        z: (Math.random() - 0.5) * 6.4,
        y: (Math.random() - 0.5) * 7,
        s: 0.03 + Math.random() * 0.085,
        v: 0.22 + Math.random() * 0.55,
        drift: Math.random() * Math.PI * 2,
      })),
    []
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const steel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#9fb8cc", metalness: 0.8, roughness: 0.3 }),
    []
  );
  const steelDark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#5d7d96", metalness: 0.75, roughness: 0.42 }),
    []
  );
  const emberMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff8a3d",
        metalness: 0.4,
        roughness: 0.35,
        emissive: "#7a3405",
        emissiveIntensity: 0.5,
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const w = state.size.width;
    const g = group.current;
    if (g) {
      const targetX = w < 768 ? 0 : 1.5;
      const targetY = w < 768 ? -0.9 : -0.15;
      const targetScale = w < 768 ? 0.72 : w < 1024 ? 0.86 : 1;
      g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.06);
      g.position.y = THREE.MathUtils.lerp(
        g.position.y,
        targetY + (paused.current ? 0 : Math.sin(t * 0.55) * 0.16),
        0.06
      );
      const s = THREE.MathUtils.lerp(g.scale.x, targetScale, 0.06);
      g.scale.setScalar(s);
      if (!paused.current) {
        g.rotation.y += delta * 0.14;
        g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.16, 0.045);
        g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.05, 0.045);
      } else if (g.rotation.y === 0) {
        g.rotation.y = 0.5;
      }
    }
    if (drop.current && !paused.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.045;
      drop.current.scale.set(s, s * 1.28, s);
    }
    if (ringA.current && !paused.current) ringA.current.rotation.z = t * 0.28;
    if (ringB.current && !paused.current) ringB.current.rotation.z = -t * 0.2;
    if (bubbles.current && !paused.current) {
      bubbleData.forEach((b, i) => {
        b.y += b.v * delta;
        if (b.y > 3.6) b.y = -3.6;
        dummy.position.set(b.x + Math.sin(t * 0.7 + b.drift) * 0.3, b.y, b.z);
        dummy.scale.setScalar(b.s * (1 + Math.sin(t * 2.2 + b.drift) * 0.25));
        dummy.updateMatrix();
        bubbles.current!.setMatrixAt(i, dummy.matrix);
      });
      bubbles.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* ---- water droplet ---- */}
      <mesh ref={drop} position={[0, 1.15, 0]} scale={[1, 1.28, 1]}>
        <sphereGeometry args={[0.6, 48, 48]} />
        <meshPhysicalMaterial
          color="#3ecdf5"
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.12}
          transparent
          opacity={0.82}
          emissive="#0a5f83"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[0, 1.12, 0]} scale={[0.55, 0.7, 0.55]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial color="#c9f3ff" transparent opacity={0.35} />
      </mesh>

      {/* ---- pipe assembly ---- */}
      <group position={[0, -0.85, 0]}>
        {/* main run */}
        <mesh material={steel} rotation={[0, 0, Math.PI / 2]} position={[-0.98, 0, 0]}>
          <cylinderGeometry args={[0.155, 0.155, 4.52, 24]} />
        </mesh>
        {/* flanges */}
        {[-2.7, -1.7, -0.2, 0.7].map((x) => (
          <mesh key={x} material={steelDark} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.225, 0.225, 0.15, 24]} />
          </mesh>
        ))}
        {/* left down branch */}
        <mesh material={steel} position={[-2.7, -0.55, 0]}>
          <cylinderGeometry args={[0.155, 0.155, 1.1, 24]} />
        </mesh>
        <mesh material={steelDark} position={[-2.7, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.225, 0.225, 0.15, 24]} />
        </mesh>
        <mesh material={emberMat} position={[-2.7, -1.14, 0]}>
          <coneGeometry args={[0.24, 0.26, 24]} />
        </mesh>
        {/* elbow + riser */}
        <mesh material={steelDark} position={[1.26, 0.34, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.34, 0.155, 16, 24, Math.PI / 2]} />
        </mesh>
        <mesh material={steel} position={[1.6, 1.05, 0]}>
          <cylinderGeometry args={[0.155, 0.155, 1.42, 24]} />
        </mesh>
        <mesh material={steelDark} position={[1.6, 1.77, 0]}>
          <cylinderGeometry args={[0.21, 0.21, 0.12, 24]} />
        </mesh>
        {/* valve wheel */}
        <mesh material={emberMat} position={[1.6, 1.95, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.24, 12]} />
        </mesh>
        <mesh material={emberMat} position={[1.6, 2.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.05, 12, 32]} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            material={emberMat}
            position={[1.6, 2.12, 0]}
            rotation={[0, (i * Math.PI) / 4 + Math.PI / 4, 0]}
          >
            <boxGeometry args={[0.56, 0.05, 0.05]} />
          </mesh>
        ))}
        {/* gauge branch */}
        <mesh material={steel} position={[-0.9, 0.42, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.84, 16]} />
        </mesh>
        <mesh material={steelDark} position={[-0.9, 0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.14, 24]} />
        </mesh>
        <mesh position={[-0.9, 0.96, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.04, 24]} />
          <meshBasicMaterial color="#eef6fc" />
        </mesh>
        <mesh position={[-0.9, 0.99, 0]} rotation={[Math.PI / 2, 0, -0.7]}>
          <boxGeometry args={[0.03, 0.16, 0.02]} />
          <meshBasicMaterial color="#ef6a1a" />
        </mesh>
      </group>

      {/* ---- orbit rings ---- */}
      <mesh ref={ringA} position={[0, 0.2, 0]} rotation={[1.25, 0, 0]}>
        <torusGeometry args={[2.75, 0.016, 12, 96]} />
        <meshBasicMaterial color="#3ecdf5" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringB} position={[0, 0.2, 0]} rotation={[-1.05, 0.4, 0]}>
        <torusGeometry args={[3.3, 0.012, 12, 96]} />
        <meshBasicMaterial color="#ff8a3d" transparent opacity={0.4} />
      </mesh>

      {/* ---- rising bubbles ---- */}
      <instancedMesh ref={bubbles} args={[undefined, undefined, 42]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#7fdcff" transparent opacity={0.4} />
      </instancedMesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 9.2], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} color="#bfe4ff" />
      <directionalLight position={[2, 6, 4]} intensity={1.4} color="#eaf6ff" />
      <pointLight position={[7, 4, 6]} intensity={70} color="#7fdcff" />
      <pointLight position={[-7, -4, -4]} intensity={55} color="#ff8a3d" />
      <Rig />
    </Canvas>
  );
}
