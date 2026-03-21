"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// --- Constants ---
const CUBIE_SIZE = 0.9;
const GAP = 1.0;
const DRAG_THRESHOLD = 6;
const SNAP_LERP = 0.18;
const FAST_SNAP_LERP = 0.35;
const SNAP_EPSILON = 0.008;

const FACE_COLORS = [
  0xff6d00, // +X: Bright Orange
  0xff1744, // -X: Vivid Red
  0xfff833, // +Y: Bright Yellow
  0xffffff, // -Y: White
  0x2979ff, // +Z: Bright Blue
  0x00e676, // -Z: Vivid Green
];
const INNER_COLOR = 0x111111;

type Axis = "x" | "y" | "z";

interface Move {
  axis: Axis;
  layer: number;
  direction: number;
}

// --- Helpers ---

function axisIdx(a: Axis): number {
  return a === "x" ? 0 : a === "y" ? 1 : 2;
}

function getAxisRot(obj: THREE.Object3D, a: Axis): number {
  return a === "x" ? obj.rotation.x : a === "y" ? obj.rotation.y : obj.rotation.z;
}

function setAxisRot(obj: THREE.Object3D, a: Axis, v: number) {
  if (a === "x") obj.rotation.x = v;
  else if (a === "y") obj.rotation.y = v;
  else obj.rotation.z = v;
}

function createCubieMaterials(
  x: number,
  y: number,
  z: number
): THREE.MeshStandardMaterial[] {
  const make = (color: number) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.2, metalness: 0.05 });
  return [
    make(x === 1 ? FACE_COLORS[0] : INNER_COLOR),
    make(x === -1 ? FACE_COLORS[1] : INNER_COLOR),
    make(y === 1 ? FACE_COLORS[2] : INNER_COLOR),
    make(y === -1 ? FACE_COLORS[3] : INNER_COLOR),
    make(z === 1 ? FACE_COLORS[4] : INNER_COLOR),
    make(z === -1 ? FACE_COLORS[5] : INNER_COLOR),
  ];
}

function snapWorldNormal(n: THREE.Vector3): THREE.Vector3 {
  const a = [Math.abs(n.x), Math.abs(n.y), Math.abs(n.z)];
  const m = a.indexOf(Math.max(...a));
  const out = new THREE.Vector3();
  out.setComponent(m, Math.sign(n.getComponent(m)));
  return out;
}

function getCandidateAxes(normal: THREE.Vector3): Axis[] {
  if (Math.abs(normal.x) > 0.5) return ["y", "z"];
  if (Math.abs(normal.y) > 0.5) return ["x", "z"];
  return ["x", "y"];
}

function snapAngle(a: number): number {
  return Math.round(a / (Math.PI / 2)) * (Math.PI / 2);
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// --- Component ---

export default function RubiksCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<{
    scramble: () => void;
    solve: () => void;
  } | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ---- Scene ----
    const initW = container.clientWidth || 400;
    const initH = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, initW / initH, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initW, initH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const canvas = renderer.domElement;
    canvas.style.touchAction = "none";
    canvas.style.userSelect = "none";
    canvas.style.cursor = "grab";

    // ---- Lights ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const d1 = new THREE.DirectionalLight(0xffffff, 0.8);
    d1.position.set(5, 8, 5);
    scene.add(d1);
    const d2 = new THREE.DirectionalLight(0xffffff, 0.25);
    d2.position.set(-5, -2, -5);
    scene.add(d2);

    // ---- Camera (spherical orbit) ----
    let camTheta = Math.PI / 5;
    let camPhi = Math.PI / 3.2;
    const camRadius = 10;

    function updateCamera() {
      camera.position.set(
        camRadius * Math.sin(camPhi) * Math.sin(camTheta),
        camRadius * Math.cos(camPhi),
        camRadius * Math.sin(camPhi) * Math.cos(camTheta)
      );
      camera.lookAt(0, 0, 0);
    }
    updateCamera();

    // ---- Cubies ----
    const cubies: THREE.Mesh[] = [];
    const geom = new THREE.BoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE);
    const edgeGeom = new THREE.EdgesGeometry(geom);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const mats = createCubieMaterials(x, y, z);
          const mesh = new THREE.Mesh(geom, mats);
          mesh.position.set(x * GAP, y * GAP, z * GAP);
          const edges = new THREE.LineSegments(
            edgeGeom,
            new THREE.LineBasicMaterial({ color: 0x000000 })
          );
          mesh.add(edges);
          scene.add(mesh);
          cubies.push(mesh);
        }
      }
    }

    // ---- Interaction State ----
    const raycaster = new THREE.Raycaster();
    const moveHistory: Move[] = [];
    let pointerDown = false;
    let isDraggingSlice = false;
    let isOrbiting = false;
    let selectedCubie: THREE.Mesh | null = null;
    let faceNormal = new THREE.Vector3();
    let dragStartPos = new THREE.Vector2();
    let dragAxis: Axis | null = null;
    let tangentAxis: Axis | null = null;
    let dragLayer = 0;
    let dragSignFactor = 1;
    let dragTangentScreen = new THREE.Vector2();
    let dragThresholdPoint = new THREE.Vector2();

    // ---- Pivot State ----
    let activePivot: THREE.Group | null = null;
    let pivotCubies: THREE.Mesh[] = [];
    let pivotAxis: Axis | null = null;
    let pivotAngle = 0;
    let snapTarget: number | null = null;
    let snapCallback: (() => void) | null = null;
    let snapSpeed = SNAP_LERP;

    // ---- Orbit State ----
    let orbitStart = new THREE.Vector2();
    let orbitThetaStart = 0;
    let orbitPhiStart = 0;

    // ---- Queue State ----
    const moveQueue: { move: Move; callback?: () => void }[] = [];
    let isProcessingQueue = false;
    let trackMoves = true;

    // ---- Utility Functions ----

    function getPointerPos(e: PointerEvent): THREE.Vector2 {
      const r = canvas.getBoundingClientRect();
      return new THREE.Vector2(e.clientX - r.left, e.clientY - r.top);
    }

    function getNDC(e: PointerEvent): THREE.Vector2 {
      const r = canvas.getBoundingClientRect();
      return new THREE.Vector2(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1
      );
    }

    function projectToScreen(wp: THREE.Vector3): THREE.Vector2 {
      const p = wp.clone().project(camera);
      const r = canvas.getBoundingClientRect();
      return new THREE.Vector2(
        ((p.x + 1) / 2) * r.width,
        ((-p.y + 1) / 2) * r.height
      );
    }

    // ---- Pivot Functions ----

    function createPivot(axis: Axis, layer: number) {
      const idx = axisIdx(axis);
      activePivot = new THREE.Group();
      scene.add(activePivot);
      pivotAxis = axis;
      pivotAngle = 0;
      pivotCubies = cubies.filter(
        (c) => Math.round(c.position.getComponent(idx)) === layer
      );
      pivotCubies.forEach((c) => activePivot!.add(c));
    }

    function releasePivot() {
      if (!activePivot) return;
      activePivot.updateMatrixWorld(true);
      const wp = new THREE.Vector3();
      const wq = new THREE.Quaternion();
      pivotCubies.forEach((c) => {
        c.getWorldPosition(wp);
        c.getWorldQuaternion(wq);
        activePivot!.remove(c);
        c.position.set(Math.round(wp.x), Math.round(wp.y), Math.round(wp.z));
        c.quaternion.copy(wq);
        scene.add(c);
      });
      scene.remove(activePivot);
      activePivot = null;
      pivotCubies = [];
      pivotAxis = null;
      pivotAngle = 0;
    }

    // ---- Determine Drag Axis ----

    function determineTangent(
      candidates: Axis[],
      dragDelta: THREE.Vector2,
      cubie: THREE.Mesh
    ): Axis {
      let best = candidates[0];
      let bestDot = -1;
      for (const c of candidates) {
        const dir = new THREE.Vector3();
        dir.setComponent(axisIdx(c), 1);
        const p0 = projectToScreen(cubie.position.clone());
        const p1 = projectToScreen(cubie.position.clone().add(dir));
        const sd = p1.sub(p0).normalize();
        const d = Math.abs(dragDelta.dot(sd));
        if (d > bestDot) {
          bestDot = d;
          best = c;
        }
      }
      return best;
    }

    // ---- Pointer Handlers ----

    function onPointerDown(e: PointerEvent) {
      if (snapTarget !== null || isProcessingQueue) return;
      canvas.setPointerCapture(e.pointerId);
      pointerDown = true;
      dragStartPos = getPointerPos(e);

      const ndc = getNDC(e);
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(cubies, false);

      if (hits.length > 0 && hits[0].face) {
        selectedCubie = hits[0].object as THREE.Mesh;
        const ln = hits[0].face!.normal.clone();
        faceNormal = snapWorldNormal(
          ln.transformDirection(hits[0].object.matrixWorld)
        );
        isDraggingSlice = true;
        isOrbiting = false;
        dragAxis = null;
        tangentAxis = null;
        canvas.style.cursor = "grabbing";
      } else {
        isOrbiting = true;
        isDraggingSlice = false;
        orbitStart.copy(dragStartPos);
        orbitThetaStart = camTheta;
        orbitPhiStart = camPhi;
        canvas.style.cursor = "grabbing";
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!pointerDown) return;
      const pos = getPointerPos(e);

      if (isOrbiting) {
        camTheta = orbitThetaStart - (pos.x - orbitStart.x) * 0.008;
        camPhi = clamp(
          orbitPhiStart - (pos.y - orbitStart.y) * 0.008,
          0.3,
          Math.PI - 0.3
        );
        updateCamera();
        return;
      }

      if (!isDraggingSlice || !selectedCubie) return;

      const delta = pos.clone().sub(dragStartPos);

      if (!dragAxis) {
        if (delta.length() < DRAG_THRESHOLD) return;

        const candidates = getCandidateAxes(faceNormal);
        const nd = delta.clone().normalize();
        tangentAxis = determineTangent(candidates, nd, selectedCubie);
        dragAxis = candidates.find((a) => a !== tangentAxis)!;
        dragLayer = Math.round(
          selectedCubie.position.getComponent(axisIdx(dragAxis))
        );

        // Sign factor from cross product
        const nv = faceNormal.clone();
        const tv = new THREE.Vector3();
        tv.setComponent(axisIdx(tangentAxis), 1);
        const cross = new THREE.Vector3().crossVectors(nv, tv);
        dragSignFactor = Math.sign(cross.getComponent(axisIdx(dragAxis)));

        // Tangent screen direction
        const sp0 = projectToScreen(selectedCubie.position.clone());
        const sp1 = projectToScreen(
          selectedCubie.position.clone().add(tv)
        );
        dragTangentScreen = sp1.sub(sp0);
        if (dragTangentScreen.length() > 0.001) dragTangentScreen.normalize();

        dragThresholdPoint = pos.clone();
        createPivot(dragAxis, dragLayer);
        return;
      }

      if (activePivot && pivotAxis) {
        const td = pos.clone().sub(dragThresholdPoint);
        const comp = td.dot(dragTangentScreen);
        pivotAngle = comp * 0.008 * dragSignFactor;
        setAxisRot(activePivot, pivotAxis, pivotAngle);
      }
    }

    function onPointerUp(e: PointerEvent) {
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "grab";

      if (isDraggingSlice && dragAxis && activePivot && pivotAxis) {
        const current = getAxisRot(activePivot, pivotAxis);
        const snapped = snapAngle(current);

        snapTarget = snapped;
        snapSpeed = SNAP_LERP;

        if (Math.abs(snapped) > 0.01) {
          const numTurns = Math.round(Math.abs(snapped) / (Math.PI / 2));
          const direction = Math.sign(snapped);
          const capturedAxis = dragAxis;
          const capturedLayer = dragLayer;
          snapCallback = () => {
            if (trackMoves) {
              for (let i = 0; i < numTurns; i++) {
                moveHistory.push({
                  axis: capturedAxis,
                  layer: capturedLayer,
                  direction,
                });
              }
            }
          };
        } else {
          snapCallback = null;
        }
      } else if (isDraggingSlice && !dragAxis && !activePivot) {
        // Didn't drag past threshold — nothing to clean up
      }

      pointerDown = false;
      isDraggingSlice = false;
      isOrbiting = false;
      selectedCubie = null;
      dragAxis = null;
      tangentAxis = null;
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);

    // ---- Move Queue ----

    function enqueueMove(move: Move, callback?: () => void) {
      moveQueue.push({ move, callback });
      if (!isProcessingQueue) processNextMove();
    }

    function processNextMove() {
      if (moveQueue.length === 0) {
        isProcessingQueue = false;
        setIsBusy(false);
        return;
      }
      isProcessingQueue = true;
      const { move, callback } = moveQueue.shift()!;
      createPivot(move.axis, move.layer);
      snapTarget = move.direction * (Math.PI / 2);
      snapSpeed = FAST_SNAP_LERP;
      snapCallback = () => {
        if (trackMoves) moveHistory.push(move);
        callback?.();
        processNextMove();
      };
    }

    // ---- Scramble & Solve ----

    function scramble() {
      if (isProcessingQueue || snapTarget !== null) return;
      moveHistory.length = 0;
      trackMoves = true;
      setIsBusy(true);
      const axes: Axis[] = ["x", "y", "z"];
      const layers = [-1, 0, 1];
      const dirs = [1, -1];
      for (let i = 0; i < 20; i++) {
        enqueueMove({
          axis: axes[Math.floor(Math.random() * 3)],
          layer: layers[Math.floor(Math.random() * 3)],
          direction: dirs[Math.floor(Math.random() * 2)],
        });
      }
    }

    function solve() {
      if (isProcessingQueue || snapTarget !== null || moveHistory.length === 0)
        return;
      const reversed = [...moveHistory].reverse();
      moveHistory.length = 0;
      trackMoves = false;
      setIsBusy(true);
      reversed.forEach((m, i) => {
        enqueueMove(
          { axis: m.axis, layer: m.layer, direction: -m.direction },
          i === reversed.length - 1 ? () => { trackMoves = true; } : undefined
        );
      });
    }

    controllerRef.current = { scramble, solve };

    // ---- Animation Loop ----
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);

      if (snapTarget !== null && activePivot && pivotAxis) {
        const cur = getAxisRot(activePivot, pivotAxis);
        const diff = snapTarget - cur;
        if (Math.abs(diff) < SNAP_EPSILON) {
          setAxisRot(activePivot, pivotAxis, snapTarget);
          const cb = snapCallback;
          snapTarget = null;
          snapCallback = null;
          releasePivot();
          cb?.();
        } else {
          setAxisRot(activePivot, pivotAxis, cur + diff * snapSpeed);
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    // ---- Resize ----
    function onResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      if (canvas.parentElement === container) container.removeChild(canvas);
      renderer.dispose();
      geom.dispose();
      edgeGeom.dispose();
      cubies.forEach((c) => {
        (c.material as THREE.MeshStandardMaterial[]).forEach((m) =>
          m.dispose()
        );
      });
      controllerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center" style={{ minHeight: 380 }}>
      <div ref={containerRef} className="w-full" style={{ flex: "1 1 0%", minHeight: 320 }} />
      <div className="flex gap-3 mt-2">
        <button
          onClick={() => controllerRef.current?.scramble()}
          disabled={isBusy}
          className="px-5 py-2.5 border-4 border-black bg-vivid-yellow font-black uppercase tracking-wider text-sm shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          Scramble
        </button>
        <button
          onClick={() => controllerRef.current?.solve()}
          disabled={isBusy}
          className="px-5 py-2.5 border-4 border-black bg-slate-blue text-white font-black uppercase tracking-wider text-sm shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          Solve
        </button>
      </div>
    </div>
  );
}
