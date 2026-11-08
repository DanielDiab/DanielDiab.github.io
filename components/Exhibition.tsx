"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// The home page is a small exhibition room: every project is a monitor on a concrete plinth.
// Hover lifts a monitor; click opens its panel. The room leans toward the cursor.

export type Exhibit = { slug: string; name: string; index: string; src?: string; svgId?: string; bg: string };

const SLOTS = [
  // back row, taller plinths
  { x: -1.75, z: -1.0, h: 2.1, ry: 0.2 },
  { x: 0, z: -1.2, h: 2.35, ry: 0 },
  { x: 1.75, z: -1.0, h: 2.15, ry: -0.2 },
  // front row
  { x: -1.75, z: 0.85, h: 0.95, ry: 0.24 },
  { x: 0, z: 1.05, h: 0.78, ry: 0 },
  { x: 1.75, z: 0.85, h: 1.0, ry: -0.24 },
];

// Portrait screens: three rows of two, so the monitors stay large on a phone.
const SLOTS_PORTRAIT = [
  { x: -0.82, z: -2.4, h: 3.2, ry: 0.12 },
  { x: 0.82, z: -2.4, h: 3.4, ry: -0.12 },
  { x: -0.82, z: -0.8, h: 2.0, ry: 0.14 },
  { x: 0.82, z: -0.8, h: 2.1, ry: -0.14 },
  { x: -0.82, z: 0.85, h: 0.8, ry: 0.16 },
  { x: 0.82, z: 0.85, h: 0.85, ry: -0.16 },
];

// With five on display the front row has two plinths, set between the three at the back.
const FRONT_PAIR = [
  { x: -0.88, z: 0.95, h: 0.9, ry: 0.12 },
  { x: 0.88, z: 0.95, h: 0.82, ry: -0.12 },
];
const FRONT_ONE_PORTRAIT = [{ x: 0, z: 0.9, h: 0.8, ry: 0 }];

function slotsFor(count: number, portrait: boolean) {
  if (count === 5) return portrait ? [...SLOTS_PORTRAIT.slice(0, 4), ...FRONT_ONE_PORTRAIT] : [...SLOTS.slice(0, 3), ...FRONT_PAIR];
  return portrait ? SLOTS_PORTRAIT : SLOTS;
}

const COL = { room: 0x1f2f3a, floor: 0x24363f, plinth: 0xe1d8c9, body: 0x1b1b1b, bezel: 0x262626, ink: "#1b1b1b" };

function screenTexture(img: CanvasImageSource & { width: number; height: number }, bg: string) {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 768;
  const g = c.getContext("2d")!;
  g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height);
  const s = Math.min(c.width / img.width, c.height / img.height);
  const w = img.width * s, h = img.height * s;
  g.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
  // faint scanlines, like a CRT
  g.fillStyle = "rgba(0,0,0,0.07)";
  for (let y = 0; y < c.height; y += 4) g.fillRect(0, y, c.width, 1);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function labelTexture(index: string, name: string) {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#e1d8c9"; g.fillRect(0, 0, 512, 512);
  // concrete speckle
  for (let i = 0; i < 900; i++) {
    g.fillStyle = `rgba(54,42,32,${Math.random() * 0.12})`;
    g.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 3 + 1, Math.random() * 3 + 1);
  }
  g.fillStyle = COL.ink;
  g.font = '600 30px "TikTok Sans Variable", Arial, sans-serif';
  g.fillText(index, 40, 70);
  g.font = '800 40px "TikTok Sans Variable", Arial Black, sans-serif';
  const words = name.toUpperCase().split(" ");
  let line = "", y = 120;
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (g.measureText(test).width > 430 && line) { g.fillText(line, 40, y); line = w; y += 46; } else line = test;
  }
  g.fillText(line, 40, y);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
}

function svgToImage(id: string): Promise<HTMLImageElement> | null {
  const svg = document.querySelector<SVGSVGElement>(`#${id} svg`);
  if (!svg) return null;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", "1200"); clone.setAttribute("height", "800");
  const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" });
  return loadImage(URL.createObjectURL(blob));
}

export default function Exhibition({ exhibits, onSelect, onHover, paused, shifted }: { exhibits: Exhibit[]; onSelect: (slug: string) => void; onHover?: (slug: string | null) => void; paused: boolean; shifted: boolean }) {
  const shiftRef = useRef(shifted);
  shiftRef.current = shifted;
  const host = useRef<HTMLDivElement>(null);
  const select = useRef(onSelect);
  const hoverCb = useRef(onHover);
  hoverCb.current = onHover;
  const pausedRef = useRef(paused);
  select.current = onSelect;
  pausedRef.current = paused;

  useEffect(() => {
    let dead = false;
    let cleanup = () => {};
    const fonts = document.fonts ? Promise.all([document.fonts.load('800 40px "TikTok Sans Variable"'), document.fonts.load('600 30px "TikTok Sans Variable"')]) : Promise.resolve();
    fonts.catch(() => {}).finally(() => { if (!dead) cleanup = setup(); });
    return () => { dead = true; cleanup(); };
  }, [exhibits]);

  function setup() {
    const el = host.current;
    if (!el) return () => {};
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COL.room);
    scene.fog = new THREE.Fog(COL.room, 9, 19);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
    const look = new THREE.Vector3(0, 1.65, 0);

    scene.add(new THREE.HemisphereLight(0xf6f3ec, 0x1f2f3a, 1.25));
    const sun = new THREE.DirectionalLight(0xfff4e0, 2.4);
    sun.position.set(-4, 8, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -6; sun.shadow.camera.right = 6; sun.shadow.camera.top = 6; sun.shadow.camera.bottom = -6;
    sun.shadow.radius = 6;
    sun.shadow.bias = -0.0004;
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0xcda247, 0.6);
    rim.position.set(5, 3, -4);
    scene.add(rim);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: COL.floor, roughness: 0.95 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const bodyGeo = new RoundedBoxGeometry(1.2, 0.96, 0.62, 4, 0.07);
    const backGeo = new RoundedBoxGeometry(0.92, 0.74, 0.5, 4, 0.08);
    const bodyMat = new THREE.MeshStandardMaterial({ color: COL.body, roughness: 0.55, metalness: 0.1 });
    const plinthMat = new THREE.MeshStandardMaterial({ color: COL.plinth, roughness: 0.92 });

    type Item = { slug: string; group: THREE.Group; monitor: THREE.Group; screen: THREE.Mesh; baseY: number; lift: number; phase: number; label: HTMLDivElement; order: number; below: boolean };
    const labels = document.createElement("div");
    labels.className = "room-labels";
    el.appendChild(labels);
    const items: Item[] = [];
    const hitTargets: THREE.Object3D[] = [];

    const portrait = el.clientWidth / Math.max(1, el.clientHeight) < 0.9;
    const slots = slotsFor(exhibits.length, portrait);
    exhibits.slice(0, slots.length).forEach((ex, i) => {
      const s = slots[i];
      const group = new THREE.Group();
      group.position.set(s.x, 0, s.z);
      group.rotation.y = s.ry;

      const label = labelTexture(ex.index, ex.name);
      const front = new THREE.MeshStandardMaterial({ map: label, roughness: 0.92 });
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(portrait ? 1.2 : 1.3, s.h, 1.05), [plinthMat, plinthMat, plinthMat, plinthMat, front, plinthMat]);
      // keep the label square on the front face
      label.repeat.set(1, 1.3 / s.h > 1 ? 1 : 1.3 / s.h);
      label.offset.set(0, 1 - label.repeat.y);
      plinth.position.y = s.h / 2;
      plinth.castShadow = true; plinth.receiveShadow = true;
      group.add(plinth);

      const monitor = new THREE.Group();
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      const back = new THREE.Mesh(backGeo, bodyMat);
      back.position.z = -0.42; back.castShadow = true;
      const screenMat = new THREE.MeshBasicMaterial({ color: 0x2a2a2a, toneMapped: false, transparent: true });
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.75), screenMat);
      screen.position.z = 0.312;
      monitor.add(body, back, screen);
      const baseY = s.h + 0.48;
      monitor.position.y = baseY;
      group.add(monitor);
      scene.add(group);

      [body, back, screen, plinth].forEach((m) => { m.userData.slug = ex.slug; hitTargets.push(m); });
      const tag = document.createElement("div");
      // floating titles only for the rows whose plinth fronts are hidden behind other monitors
      tag.className = i < (portrait ? 4 : 3) ? "room-label" : "room-label hide";
      tag.innerHTML = `<span>${ex.index}</span>${ex.name}`;
      labels.appendChild(tag);
      items.push({ slug: ex.slug, group, monitor, screen, baseY, lift: 0, phase: Math.random() * 6, label: tag, order: i, below: false });

      const p = ex.src ? loadImage(ex.src) : ex.svgId ? svgToImage(ex.svgId) : null;
      p?.then((img) => { screenMat.map = screenTexture(img, ex.bg); screenMat.color.set(0xffffff); screenMat.needsUpdate = true; }).catch(() => {});
    });

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // pull back on narrow screens so every monitor fits
      const narrow = w / h < 1;
      camera.fov = narrow ? 48 : 34;
      scene.fog = new THREE.Fog(COL.room, narrow ? 11 : 9, narrow ? 24 : 19);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const ray = new THREE.Raycaster();
    let hovered: string | null = null;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      if (e.pointerType !== "touch") target.copy(pointer);
    };
    const onLeave = () => { target.set(0, 0); pointer.set(9, 9); hovered = null; el.style.cursor = ""; delete el.dataset.cursor; hoverCb.current?.(null); };
    const onClick = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(hitTargets, false)[0];
      if (hit) select.current(hit.object.userData.slug);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("click", onClick as unknown as EventListener);

    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    let introStart = -1;
    const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
    const cam = new THREE.Vector2(0, 0);
    let baseX = 0;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (pausedRef.current || document.hidden) return;
      const t = clock.getElapsedTime();
      const narrow = camera.aspect < 1;

      cam.lerp(target, 0.05);
      const sway = reduce ? 0 : Math.sin(t * 0.25) * 0.25;
      const dist = narrow ? 11.6 : 10;
      // on desktop the room sits right of the title; with a panel open it centres in the space left
      const goalX = narrow ? 0 : shiftRef.current ? 2.3 : -1.0;
      baseX += (goalX - baseX) * 0.06;
      look.set(baseX, narrow ? 2.05 : 1.6, 0);
      camera.position.set(baseX + cam.x * 1.6 + sway * (narrow ? 0.4 : 1), (narrow ? 3.1 : 2.4) + cam.y * 0.7, dist);
      camera.lookAt(look);

      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(hitTargets, false)[0];
      const now = hit ? (hit.object.userData.slug as string) : null;
      if (now !== hovered) { hovered = now; el.style.cursor = now ? "pointer" : ""; if (now) el.dataset.cursor = "Open"; else delete el.dataset.cursor; hoverCb.current?.(now); }

      if (introStart < 0) introStart = t;
      const since = reduce ? 99 : t - introStart;
      const w = el.clientWidth, hgt = el.clientHeight;
      for (const it of items) {
        // drop in one after another, then power the screen on
        const k = ease((since - it.order * 0.12) / 0.9);
        const goal = it.slug === hovered ? 0.16 : 0;
        it.lift += (goal - it.lift) * 0.12;
        const bob = reduce ? 0 : Math.sin(t * 0.9 + it.phase) * 0.012;
        it.monitor.position.y = it.baseY + it.lift + bob + (1 - k) * 2.2;
        it.monitor.rotation.y = it.lift * 0.6 + (1 - k) * 0.8;
        it.group.scale.setScalar(0.6 + 0.4 * ease((since - it.order * 0.12) / 0.6));
        const power = ease((since - 0.5 - it.order * 0.12) / 0.5);
        const flick = power < 1 ? (Math.sin(t * 60) > 0 ? 1 : 0.4) : 1;
        it.screen.scale.set(1, Math.max(0.02, power), 1);
        (it.screen.material as THREE.MeshBasicMaterial).opacity = flick;
        // title above the monitor, projected to the screen
        it.monitor.getWorldPosition(tmp);
        tmp.y += it.below ? -0.6 : 0.72;
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * hgt;
        it.label.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, ${it.below ? "0" : "-100%"})`;
        it.label.style.opacity = String(ease((since - 0.9 - it.order * 0.1) / 0.5));
        it.label.classList.toggle("on", it.slug === hovered);
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("click", onClick as unknown as EventListener);
      renderer.dispose();
      el.removeChild(renderer.domElement);
      labels.remove();
    };
  }

  return <div ref={host} className="room" aria-hidden="true" />;
}
