import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const W = 512;
const H = 320;

type Section = { id: string; label: string; top: number; height: number };

const getSections = (): Section[] => {
  const els = document.querySelectorAll<HTMLElement>("section[id]");
  return Array.from(els).map((el) => ({
    id: el.id,
    label: (el.dataset.label ?? el.id).toUpperCase(),
    top: el.offsetTop,
    height: el.offsetHeight,
  }));
};

export function useScreenMirror(enabled: boolean): THREE.Texture {
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const t = new THREE.CanvasTexture(c);
    t.flipY = false;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.colorSpace = THREE.SRGBColorSpace;
    return { canvas: c, texture: t };
  }, []);

  const mouseRef = useRef({ x: 0, y: 0, hasMoved: false });

  useEffect(() => {
    if (!enabled) return;

    if (!mouseRef.current.hasMoved) {
      mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2, hasMoved: false };
    }

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, hasMoved: true };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const draw = () => {
      drawMinimap(ctx, mouseRef.current);
      texture.needsUpdate = true;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled, canvas, texture]);

  return texture;
}

const SECTION_COLORS: Record<string, string> = {
  home: "#1e3a8a",
  about: "#3b1361",
  projects: "#831843",
  blog: "#134e4a",
  contact: "#78350f",
};

function drawMinimap(ctx: CanvasRenderingContext2D, mouse: { x: number; y: number }) {
  ctx.fillStyle = "#050510";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, W, 28);
  ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(14 + i * 14, 14, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#9ca3af";
  ctx.font = "11px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("dj-elliott.com", 70, 14);

  const sections = getSections();
  const pageHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;

  if (sections.length === 0 || pageHeight === 0 || viewportHeight === 0) {
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "center";
    ctx.fillText("no sections", W / 2, H / 2);
    return;
  }

  const mapTop = 40;
  const mapBottom = H - 18;
  const mapH = mapBottom - mapTop;
  const mapW = 200;
  const mapL = (W - mapW) / 2;

  const yScale = mapH / pageHeight;

  sections.forEach((s) => {
    const y = mapTop + s.top * yScale;
    const h = Math.max(2, s.height * yScale);
    const color = SECTION_COLORS[s.id] ?? "#1f2937";

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.65;
    ctx.fillRect(mapL, y, mapW, h);
    ctx.globalAlpha = 1;

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(mapL + 0.5, y + 0.5, mapW - 1, h - 1);

    if (h > 16) {
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = "bold 10px ui-sans-serif, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(s.label, mapL + mapW / 2, y + Math.min(h / 2, 12));
    }
  });

  const vpY = mapTop + scrollY * yScale;
  const vpH = Math.max(6, viewportHeight * yScale);
  ctx.fillStyle = "rgba(120, 180, 255, 0.12)";
  ctx.fillRect(mapL - 3, vpY, mapW + 6, vpH);
  ctx.strokeStyle = "rgba(140, 200, 255, 0.95)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(mapL - 3, vpY, mapW + 6, vpH);

  const cursorX = mapL - 3 + (mouse.x / window.innerWidth) * (mapW + 6);
  const cursorY = vpY + (mouse.y / viewportHeight) * vpH;

  const glow = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, 12);
  glow.addColorStop(0, "rgba(255,255,255,0.6)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cursorX, cursorY, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cursorX, cursorY, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(14, H - 12, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "9px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("LIVE", 22, H - 11);
}
