import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 2;
const NODE_COUNT = 42;
const NODE_SIZE = 0.027;

interface Palette {
  wire: string;
  nodeA: string;
  nodeB: string;
  arc: string;
}

const DARK: Palette = { wire: "#34d399", nodeA: "#34d399", nodeB: "#2dd4bf", arc: "#2dd4bf" };
const LIGHT: Palette = { wire: "#0891b2", nodeA: "#0891b2", nodeB: "#7c3aed", arc: "#7c3aed" };

/** Evenly distributed points on a sphere (fibonacci spiral). */
function fibonacciSphere(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return pts;
}

/** Great-circle-ish arc between two surface points, bulging slightly outward. */
function arcPoints(a: THREE.Vector3, b: THREE.Vector3, bulge = 0.35, segments = 24) {
  const out: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().lerpVectors(a, b, t);
    const lift = Math.sin(t * Math.PI) * bulge;
    p.normalize().multiplyScalar(RADIUS + lift);
    out.push(p);
  }
  return out;
}

function Network({ palette }: { palette: Palette }) {
  const group = useRef<THREE.Group>(null);

  const { nodes, arcs } = useMemo(() => {
    const nodes = fibonacciSphere(NODE_COUNT, RADIUS);
    const arcs: THREE.Vector3[][] = [];
    // connect each node to its nearest few neighbours (dedup by index order)
    for (let i = 0; i < nodes.length; i++) {
      const dists = nodes
        .map((n, j) => ({ j, d: nodes[i].distanceTo(n) }))
        .filter((x) => x.j > i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 1);
      for (const { j } of dists) {
        if (Math.random() > 0.4) arcs.push(arcPoints(nodes[i], nodes[j]));
      }
    }
    return { nodes, arcs };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    // subtle cursor parallax
    const targetX = state.pointer.y * 0.35;
    const targetZ = state.pointer.x * 0.15;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      {/* wireframe sphere */}
      <mesh>
        <icosahedronGeometry args={[RADIUS, 3]} />
        <meshBasicMaterial color={palette.wire} wireframe transparent opacity={0.14} />
      </mesh>

      {/* glowing nodes */}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[NODE_SIZE, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? palette.nodeB : palette.nodeA} toneMapped={false} />
        </mesh>
      ))}

      {/* connecting arcs */}
      {arcs.map((pts, i) => (
        <Line key={i} points={pts} color={palette.arc} lineWidth={1} transparent opacity={0.4} />
      ))}
    </group>
  );
}

export default function Globe() {
  const [light, setLight] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("light"),
  );

  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() => setLight(el.classList.contains("light")));
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Network palette={light ? LIGHT : DARK} />
      </Canvas>
    </div>
  );
}
