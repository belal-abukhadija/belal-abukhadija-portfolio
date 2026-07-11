"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface Label {
  name: string;
  lat: number;
  lng: number;
}

const LABELS: Label[] = [
  { name: "ME", lat: 25.95, lng: 45.93 },
  { name: "ASIA", lat: 30.68, lng: 101.38 },
  { name: "NA", lat: 40.71, lng: -74.01 },
  { name: "LATAM", lat: -15.79, lng: -47.88 },
  { name: "EU", lat: 47.55, lng: 20.82 },
  { name: "AF", lat: -1.29, lng: 26.82 },
  { name: "AU", lat: -33.87, lng: 151.21 },
];

function project(
  lat: number,
  lng: number,
  phi: number,
  theta: number
): { x: number; y: number; visible: boolean } {
  const latR = (lat * Math.PI) / 180;
  const lngR = (lng * Math.PI) / 180;
  const rel = lngR + phi;

  // Sphere position in camera space (Z toward viewer)
  const sx = Math.cos(latR) * Math.cos(rel);
  const sy = Math.sin(latR);
  const sz = -Math.cos(latR) * Math.sin(rel);

  // Apply theta tilt around X axis
  const screenX = sx;
  const screenY = -(sy * Math.cos(theta) - sz * Math.sin(theta));
  const depth = sy * Math.sin(theta) + sz * Math.cos(theta);

  return { x: screenX, y: screenY, visible: depth > 0.15 };
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.25);
  const pointerDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startPhi = useRef(0);
  const startTheta = useRef(0.25);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = canvas.offsetWidth;
    let animId: number;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 22000,
      mapBaseBrightness: 0.03,
      markerElevation: 0.0,
      mapBrightness: 3.2,
      baseColor: [0.28, 0.24, 0.18],
      markerColor: [0.96, 0.7, 0.24],
      glowColor: [0.55, 0.4, 0.16],
      markers: [],
    });

    function updateLabels() {
      const w = container!.offsetWidth;
      const h = container!.offsetHeight;
      const globeR = Math.min(w, h) * 0.44;
      const cx = w / 2;
      const cy = h / 2;

      LABELS.forEach((label, i) => {
        const el = labelsRef.current[i];
        if (!el) return;
        const { x, y, visible } = project(
          label.lat,
          label.lng,
          phiRef.current,
          thetaRef.current
        );
        el.style.left = `${cx + x * globeR}px`;
        el.style.top = `${cy + y * globeR}px`;
        el.style.opacity = visible ? "1" : "0";
      });
    }

    function animate() {
      if (!pointerDown.current) {
        phiRef.current += 0.005;
      }
      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        width: width * 2,
        height: width * 2,
      });
      updateLabels();
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    const onResize = () => {
      if (canvas) width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    setTimeout(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDown.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    startPhi.current = phiRef.current;
    startTheta.current = thetaRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerDown.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    phiRef.current = startPhi.current + dx / 120;
    thetaRef.current = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, startTheta.current + dy / 120)
    );
  };

  const handlePointerUp = () => {
    pointerDown.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: "1",
        margin: "auto",
        position: "relative",
        cursor: "grab",
        touchAction: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />

      {LABELS.map((label, i) => (
        <div
          key={label.name}
          ref={(el) => {
            labelsRef.current[i] = el;
          }}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="block w-[6px] h-[6px] rounded-full"
              style={{ backgroundColor: "#F5B23D", boxShadow: "0 0 8px #F5B23D" }}
            />
            <span
              className="font-mono tracking-wide px-2 py-0.5 text-[10px] leading-none rounded-full"
              style={{
                color: "#F4EFE6",
                backgroundColor: "rgba(20,18,16,0.85)",
                border: "1px solid #2A2621",
                backdropFilter: "blur(4px)",
              }}
            >
              {label.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
