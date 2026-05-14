"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './FisheyeGrid.module.css';

interface Point {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

interface FisheyeGridProps {
  dotColor?: string;
  gridSpacing?: number;
  dotSize?: number;
  magnification?: number;
  radius?: number;
}

const MAX_POINTS = 600; // Cap grid density for performance

export function FisheyeGrid({
  dotColor = 'rgba(20, 184, 166, 0.4)',
  gridSpacing = 40,
  dotSize = 2.0,
  magnification = 0.8,
  radius = 350,
}: FisheyeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const points = useRef<Point[]>([]);
  const mouse = useRef({ x: -2000, y: -2000 });
  const isVisible = useRef(true);
  const isMouseActive = useRef(false);
  const lastMouseMove = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // IntersectionObserver to pause when offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    // Debounce resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 200);
    };
    window.addEventListener('resize', debouncedResize);

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        isMouseActive.current = true;
        lastMouseMove.current = performance.now();
      }
    };

    const handleGlobalMouseLeave = () => {
      mouse.current = { x: -2000, y: -2000 };
      isMouseActive.current = false;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const cols = Math.ceil(dimensions.width / gridSpacing) + 2;
    const rows = Math.ceil(dimensions.height / gridSpacing) + 2;
    const totalPoints = Math.min(cols * rows, MAX_POINTS);
    const newPoints: Point[] = [];
    const jitter = gridSpacing * 0.4;

    // Calculate how many cols/rows we can afford within the cap
    const effectiveCols = Math.ceil(Math.sqrt(totalPoints * (dimensions.width / dimensions.height)));
    const effectiveRows = Math.ceil(totalPoints / effectiveCols);
    const effectiveSpacingX = dimensions.width / effectiveCols;
    const effectiveSpacingY = dimensions.height / effectiveRows;

    for (let i = 0; i < effectiveCols; i++) {
      for (let j = 0; j < effectiveRows; j++) {
        if (newPoints.length >= MAX_POINTS) break;
        const x = i * effectiveSpacingX + (Math.random() - 0.5) * jitter;
        const y = j * effectiveSpacingY + (Math.random() - 0.5) * jitter;
        newPoints.push({
          x, y,
          ox: x, oy: y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2
        });
      }
    }
    points.current = newPoints;
  }, [dimensions, gridSpacing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let lastRenderTime = 0;
    let time = 0;

    // Throttle to ~30fps when idle, full 60fps when interacting
    const IDLE_FRAME_INTERVAL = 33; // ~30fps

    const render = (now: number) => {
      // Skip rendering when offscreen
      if (!isVisible.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Auto-detect idle state: no mouse movement for 2s
      const timeSinceMouseMove = now - lastMouseMove.current;
      if (timeSinceMouseMove > 2000) {
        isMouseActive.current = false;
      }

      // Throttle framerate when idle
      if (!isMouseActive.current) {
        const elapsed = now - lastRenderTime;
        if (elapsed < IDLE_FRAME_INTERVAL) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }
      }
      lastRenderTime = now;

      const delta = (now - lastTime) / 1000;
      lastTime = now;
      time += delta * 2.5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      const voiceIntensity = Math.sin(time * 0.5) * 0.5 + 0.5;

      const connectionRange = gridSpacing * 2.2;
      const connectionRangeSq = connectionRange * connectionRange;
      const radiusSq = radius * radius;

      points.current.forEach((p, index) => {
        const wave1 = Math.sin(time * 1.5 + p.ox * 0.02) * 5;
        const wave2 = Math.cos(time * 0.8 + p.oy * 0.02) * 5;
        const wave3 = Math.sin(time * 2.1 + (p.ox + p.oy) * 0.01) * 3;

        const flowX = (wave1 + wave3) * voiceIntensity;
        const flowY = (wave2 + wave3) * voiceIntensity;

        const dx = mx - p.x;
        const dy = my - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        let opacity = 0.3;
        let currentDotSize = dotSize;
        let interactionX = 0;
        let interactionY = 0;

        if (distSq < radiusSq) {
          const angle = Math.atan2(dy, dx);
          const force = Math.pow((radius - dist) / radius, 1.2);

          const repelStrength = force * radius * magnification;
          interactionX = -Math.cos(angle) * repelStrength;
          interactionY = -Math.sin(angle) * repelStrength;

          opacity = 0.4 + force * 0.5;
          currentDotSize = dotSize * (1 + force * 1.8);
        } else {
          const pulse = Math.sin(time * 2 + index * 0.1) * 0.1;
          opacity = 0.2 + pulse + (voiceIntensity * 0.2);
        }

        const targetX = p.ox + flowX + interactionX;
        const targetY = p.oy + flowY + interactionY;

        p.vx = (targetX - p.x) * 0.2;
        p.vy = (targetY - p.y) * 0.2;

        p.x += p.vx;
        p.y += p.vy;

        // Use colors from the new palette
        const isAccent = index % 3 === 0;
        const isGlow = index % 3 === 1;

        let colorBase = 'rgba(0, 230, 161, '; // Accent Green
        if (isGlow) colorBase = 'rgba(125, 249, 200, '; // Glow Green
        if (!isAccent && !isGlow) colorBase = 'rgba(232, 181, 103, '; // Warm Accent

        // Only draw glow when mouse is near (skip expensive shadow otherwise)
        if (distSq < radiusSq) {
          const glowIntensity = Math.pow((radius - dist) / radius, 2);
          ctx.shadowBlur = 20 + glowIntensity * 20;
          ctx.shadowColor = colorBase + '0.9)';
        }

        ctx.fillStyle = `${colorBase}${opacity.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentDotSize, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        if (distSq < radiusSq) {
          ctx.shadowBlur = 0;
        }

        // Only draw connections for points near the mouse to avoid O(n²) all-pairs
        const isPointNearMouse = distSq < radiusSq * 4; // Extended range for connections
        if (!isPointNearMouse && !isMouseActive.current) return; // Skip connections when idle and far

        // Limit connection checks to nearby indices (spatial locality optimization)
        const maxCheckDistance = Math.min(points.current.length, index + 30);
        for (let k = index + 1; k < maxCheckDistance; k++) {
          const p2 = points.current[k];
          const dx_conn = p2.x - p.x;
          const dy_conn = p2.y - p.y;
          const distSqConn = dx_conn * dx_conn + dy_conn * dy_conn;

          if (distSqConn < connectionRangeSq) {
            const dist_conn = Math.sqrt(distSqConn);
            const lineOpacity = (1 - dist_conn / connectionRange) * 0.2;

            const mouseDist1Sq = (mx - p.x) ** 2 + (my - p.y) ** 2;
            const mouseDist2Sq = (mx - p2.x) ** 2 + (my - p2.y) ** 2;
            const isNearMouse = mouseDist1Sq < radiusSq || mouseDist2Sq < radiusSq;

            ctx.strokeStyle = isNearMouse
              ? `${colorBase}${(lineOpacity * 3).toFixed(2)})`
              : `${colorBase}${lineOpacity.toFixed(2)})`;

            ctx.lineWidth = isNearMouse ? 1.2 : 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, dotColor, dotSize, radius, magnification, gridSpacing]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className={styles.canvas}
      />
    </div>
  );
}
