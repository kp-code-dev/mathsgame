"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

/* =========================
   Utils
   ========================= */
type Offset = { x: number; y: number };

const setHiDPICanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const parent = canvas.parentElement;
  const cw = (parent?.clientWidth ?? window.innerWidth) | 0;
  const ch = (parent?.clientHeight ?? window.innerHeight) | 0;
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  canvas.width = Math.floor(cw * dpr);
  canvas.height = Math.floor(ch * dpr);
  canvas.style.width = cw + "px";
  canvas.style.height = ch + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const originFromOffset = (offset: Offset, cell: number) => ({
  x: -((offset.x % cell) + cell) % cell,
  y: -((offset.y % cell) + cell) % cell,
});

/* =========================
   Film grain (subtle cyber noise)
   ========================= */
const Noise: React.FC<{ refresh?: number; alpha?: number }> = ({ refresh = 3, alpha = 8 }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let f = 0;
    let id = 0;
    const S = 512;

    const resize = () => {
      c.width = S;
      c.height = S;
      c.style.width = "100vw";
      c.style.height = "100vh";
    };

    const draw = () => {
      const img = ctx.createImageData(S, S);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = alpha;
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = () => {
      if (f % refresh === 0) draw();
      f++;
      id = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(id);
    };
  }, [refresh, alpha]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

/* =========================
   Moving grid (Drafting blueprint lines)
   ========================= */
interface GridProps {
  squareSize: number;
  borderColor: string;
  vignette?: boolean;
  gridOffsetRef: React.MutableRefObject<Offset>;
  className?: string;
}

const MovingGrid: React.FC<GridProps> = ({
  squareSize,
  borderColor,
  vignette = true,
  gridOffsetRef,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);

      const origin = originFromOffset(gridOffsetRef.current, squareSize);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      // vertical lines
      for (let x = origin.x; x < cw + squareSize; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, ch);
        ctx.stroke();
      }
      // horizontal lines
      for (let y = origin.y; y < ch + squareSize; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(cw, y + 0.5);
        ctx.stroke();
      }

      if (vignette) {
        const grad = ctx.createRadialGradient(
          cw / 2,
          ch / 2,
          0,
          cw / 2,
          ch / 2,
          Math.sqrt(cw * cw + ch * ch) / 2
        );
        grad.addColorStop(0, "rgba(2, 6, 23, 0)");
        grad.addColorStop(1, "rgba(2, 6, 23, 0.75)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
      }

      raf.current = requestAnimationFrame(draw);
    };

    const resize = () => setHiDPICanvas(canvas, ctx);
    resize();
    raf.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [squareSize, borderColor, vignette, gridOffsetRef]);

  return <canvas ref={canvasRef} className={`block h-full w-full border-none ${className}`} />;
};

/* =========================
   Interactive hover cell (Glow cursor tracker)
   ========================= */
interface HoverProps {
  squareSize: number;
  hoverFillColor: string;
  hoverStrokeColor: string;
  hoverGlowColor: string;
  gridOffsetRef: React.MutableRefObject<Offset>;
  className?: string;
}

const SquaresInteractive: React.FC<HoverProps> = ({
  squareSize,
  hoverFillColor = "rgba(6, 182, 212, 0.15)", // Cyan tint
  hoverStrokeColor = "rgba(56, 189, 248, 0.75)", // Sky blue border
  hoverGlowColor = "rgba(14, 165, 233, 0.45)", // Blue glow
  gridOffsetRef,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef<{ x: number; y: number } | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);

      if (hoveredRef.current) {
        const { x: gx, y: gy } = hoveredRef.current;
        const origin = originFromOffset(gridOffsetRef.current, squareSize);
        const cellX = origin.x + gx * squareSize;
        const cellY = origin.y + gy * squareSize;

        // Glow + fill
        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = hoverGlowColor;
        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(cellX, cellY, squareSize, squareSize);
        ctx.restore();

        // Border
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = hoverStrokeColor;
        ctx.strokeRect(cellX + 0.5, cellY + 0.5, squareSize - 1, squareSize - 1);

        // Highlight sheen
        const grad = ctx.createLinearGradient(cellX, cellY, cellX, cellY + squareSize);
        grad.addColorStop(0, "rgba(255,255,255,0.12)");
        grad.addColorStop(1, "rgba(255,255,255,0.01)");
        ctx.fillStyle = grad;
        ctx.fillRect(cellX, cellY, squareSize, squareSize);
      }

      raf.current = requestAnimationFrame(draw);
    };

    // Track mouse globally across window so background canvas doesn't need pointer events to intercept user clicks
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (mouseX < 0 || mouseY < 0 || mouseX > rect.width || mouseY > rect.height) {
        hoveredRef.current = null;
        return;
      }

      const origin = originFromOffset(gridOffsetRef.current, squareSize);
      const gx = Math.floor((mouseX - origin.x) / squareSize);
      const gy = Math.floor((mouseY - origin.y) / squareSize);
      hoveredRef.current = { x: gx, y: gy };
    };

    const onMouseLeave = () => {
      hoveredRef.current = null;
    };

    const resize = () => setHiDPICanvas(canvas, ctx);

    resize();
    raf.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [squareSize, hoverFillColor, hoverStrokeColor, hoverGlowColor, gridOffsetRef]);

  return <canvas ref={canvasRef} className={`block h-full w-full border-none pointer-events-none ${className}`} />;
};

/* =========================
   Final combined Blueprint Background Component
   ========================= */
type Direction = "right" | "left" | "up" | "down" | "diagonal";

interface CombinedProps {
  showGrid?: boolean;
  direction?: Direction;
  speed?: number;
  squareSize?: number;

  // Grid
  borderColor?: string;
  vignette?: boolean;

  // Hover
  hoverFillColor?: string;
  hoverStrokeColor?: string;
  hoverGlowColor?: string;

  className?: string;
}

export default function BlueprintBackground({
  showGrid = true,
  direction = "diagonal",
  speed = 0.55,
  squareSize = 44,
  className = "",
}: CombinedProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const borderColor = isDark ? "rgba(56, 189, 248, 0.22)" : "rgba(14, 165, 233, 0.35)";
  const hoverFillColor = isDark ? "rgba(14, 165, 233, 0.35)" : "rgba(14, 165, 233, 0.20)";
  const hoverStrokeColor = isDark ? "rgba(125, 211, 252, 0.95)" : "rgba(2, 132, 199, 0.90)";
  const hoverGlowColor = isDark ? "rgba(56, 189, 248, 0.65)" : "rgba(14, 165, 233, 0.45)";

  const gridOffsetRef = useRef<Offset>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const px = speed * 32 * dt;

      switch (direction) {
        case "right":
          gridOffsetRef.current.x = (gridOffsetRef.current.x - px + squareSize) % squareSize;
          break;
        case "left":
          gridOffsetRef.current.x = (gridOffsetRef.current.x + px) % squareSize;
          break;
        case "up":
          gridOffsetRef.current.y = (gridOffsetRef.current.y + px) % squareSize;
          break;
        case "down":
          gridOffsetRef.current.y = (gridOffsetRef.current.y - px + squareSize) % squareSize;
          break;
        case "diagonal":
        default:
          gridOffsetRef.current.x = (gridOffsetRef.current.x - px + squareSize) % squareSize;
          gridOffsetRef.current.y = (gridOffsetRef.current.y - px + squareSize) % squareSize;
          break;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [direction, speed, squareSize]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden select-none z-0 transition-colors duration-300 ${className}`}
      style={{
        background: isDark
          ? "linear-gradient(135deg, #07192f 0%, #030c18 50%, #01040a 100%)"
          : "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 45%, #ffffff 100%)",
      }}
    >
      {/* 1. Moving Blueprint Grid */}
      {showGrid && (
        <div className="absolute inset-0">
          <MovingGrid
            squareSize={squareSize}
            borderColor={borderColor}
            vignette={isDark}
            gridOffsetRef={gridOffsetRef}
          />
        </div>
      )}

      {/* 2. Interactive Cursor Glow Cell */}
      <div className="absolute inset-0">
        <SquaresInteractive
          squareSize={squareSize}
          hoverFillColor={hoverFillColor}
          hoverStrokeColor={hoverStrokeColor}
          hoverGlowColor={hoverGlowColor}
          gridOffsetRef={gridOffsetRef}
        />
      </div>

      {/* 3. Subtle Film Grain */}
      <Noise refresh={3} alpha={isDark ? 7 : 3} />
    </div>
  );
}

