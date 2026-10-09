// Only loaded through a dynamic import (see PageLine.tsx), so three.js stays
// out of the initial bundle. Named imports make no measurable difference to
// its size: the WebGL renderer is most of the library.
import {
  AmbientLight,
  BoxGeometry,
  type BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  type Material,
  Mesh,
  MeshToonMaterial,
  OrthographicCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";

export interface PenPose {
  /** Lean in the plane of the page, in radians. Positive leans the barrel left. */
  lean: number;
  /** Spin around the pen's own axis, in radians. */
  roll: number;
  /** 0 = writing, cap posted on the back. 1 = cap on the nib. */
  capped: number;
}

export interface Pen {
  render(pose: PenPose): void;
  dispose(): void;
}

// How far the barrel tips out of the page towards the viewer, in radians.
const TILT = 0.5;

// Where the cap's open end sits along the pen's axis (nib at 0, units are px):
// posted on the back of the barrel while writing, and pushed over the nib
// and collar when capped. In between it slides off the back by CAP_PULL,
// swings round the side of the pen by CAP_SWING while turning to face the
// nib, and comes in from CAP_APPROACH beyond it.
const CAP_POSTED = 150;
const CAP_ON_NIB = 36;
const CAP_PULL = 52;
const CAP_SWING = 70;
const CAP_APPROACH = -34;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const ease = (v: number) => v * v * (3 - 2 * v);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * A marker pen modelled from primitives and drawn into `canvas`, with its nib
 * at the exact centre of the canvas so the caller can place that point on the
 * thing being drawn. `size` is the canvas edge in CSS pixels and `scale`
 * shrinks the pen for small screens. Colours come from the site's ink tokens,
 * and the shading is flat two-tone so it sits with the printed look of the page.
 *
 * The cap behaves like a real one: it rides posted on the back of the barrel
 * while the pen writes, and to cap the pen it comes off the back, swings
 * round, and pushes onto the nib.
 */
export function createPen(
  canvas: HTMLCanvasElement,
  size: number,
  scale: number,
  colors: { mark: string; ink: string; paper: string }
): Pen {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(size, size, false);

  // One unit is one CSS pixel, so the model's measurements read as pixels.
  const half = size / 2;
  const camera = new OrthographicCamera(-half, half, half, -half, -1000, 1000);
  camera.position.z = 500;

  const scene = new Scene();
  // A low ambient and a strong side light, so the two-tone shading splits the
  // barrel into a lit face and a shaded one instead of washing out flat.
  scene.add(new AmbientLight(0xffffff, 1.5));
  const key = new DirectionalLight(0xffffff, 2.6);
  key.position.set(-2.4, 0.8, 1.6);
  scene.add(key);

  const mark = new MeshToonMaterial({ color: colors.mark });
  const ink = new MeshToonMaterial({ color: colors.ink });
  const paper = new MeshToonMaterial({ color: colors.paper });
  // The cap is a deeper shade of the pen's own red, like a real marker's, and
  // unlike the ink or paper colours it shows on both the paper and the footer.
  const capColor = new MeshToonMaterial({ color: new Color(colors.mark).multiplyScalar(0.56) });
  const capTrim = new MeshToonMaterial({ color: new Color(colors.mark).multiplyScalar(0.4) });

  // The rig carries lean and tilt. The pen and the cap each spin on their own
  // axis inside it, so the cap's swing is always sideways on screen however
  // far the pen has rolled.
  const rig = new Group();
  const pen = new Group();
  const cap = new Group();
  rig.add(pen, cap);

  const part = (group: Group, geometry: BufferGeometry, material: Material, y: number) => {
    const mesh = new Mesh(geometry, material);
    mesh.position.y = y;
    group.add(mesh);
    return mesh;
  };

  // The pen, built upwards from the nib at the origin.
  part(pen, new ConeGeometry(5, 14, 24), mark, 7).rotation.x = Math.PI; // nib
  part(pen, new CylinderGeometry(12, 5, 20, 32), paper, 24); // collar
  part(pen, new CylinderGeometry(13, 12, 118, 32), mark, 93); // barrel
  part(pen, new CylinderGeometry(13.6, 13.6, 9, 32), ink, 60); // band
  part(pen, new CylinderGeometry(11.6, 12.4, 36, 32), mark, 170); // tail the cap posts onto

  // The cap, built from its open end at the origin towards its closed end.
  part(cap, new CylinderGeometry(14.2, 14.8, 44, 32), capColor, 22); // body
  part(cap, new CylinderGeometry(15.8, 15.8, 4.5, 32), capTrim, 2.25); // rim at the opening
  part(cap, new CylinderGeometry(14.5, 14.5, 1.8, 32), capTrim, 30); // grip grooves
  part(cap, new CylinderGeometry(14.45, 14.45, 1.8, 32), capTrim, 35);
  part(cap, new SphereGeometry(14.2, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), capColor, 44).scale.y = 0.42; // closed end
  // The pocket clip: a bridge off the closed end, a bar, and a ball tip.
  part(cap, new BoxGeometry(5.5, 7, 6), capTrim, 42).position.z = 15;
  part(cap, new BoxGeometry(4.6, 36, 2.6), capTrim, 26).position.z = 17.4;
  part(cap, new SphereGeometry(3.3, 16, 12), capTrim, 8.5).position.z = 16.8;

  rig.scale.setScalar(scale);
  // Lean in the page plane is applied after the tilt towards the viewer.
  rig.rotation.order = "ZXY";
  // The cap turns end over end (z) on top of sharing the pen's roll (y).
  cap.rotation.order = "ZYX";
  scene.add(rig);

  return {
    render({ lean, roll, capped }) {
      rig.rotation.set(TILT, 0, lean);
      pen.rotation.y = roll;

      // Off the back, round the side, onto the nib.
      const off = ease(clamp01(capped / 0.25));
      const round = ease(clamp01((capped - 0.25) / 0.45));
      const on = ease(clamp01((capped - 0.7) / 0.3));
      const y = on > 0 ? mix(CAP_APPROACH, CAP_ON_NIB, on) : mix(CAP_POSTED + CAP_PULL * off, CAP_APPROACH, round);
      cap.position.set(Math.sin(Math.PI * round) * CAP_SWING, y, 0);
      cap.rotation.set(0, roll, Math.PI * round);

      renderer.render(scene, camera);
    },
    dispose() {
      rig.traverse((node) => {
        if (node instanceof Mesh) node.geometry.dispose();
      });
      [mark, ink, paper, capColor, capTrim].forEach((m) => m.dispose());
      renderer.dispose();
    },
  };
}
