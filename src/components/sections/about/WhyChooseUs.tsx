"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import styles from "./WhyChooseUs.module.css";
import { FadeIn } from "../../animations/ScrollAnimations";
import { SanityAboutPage } from "@/sanity/lib/types";

interface WhyChooseUsProps {
  data: SanityAboutPage | null;
}

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Detect touch-based mobile devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      // Clear the canvas if it was already drawn and stop
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number, dpr: number;
    let nodes: any[] = [];
    let edges: any[] = [];

    // Reduce node count on mobile for performance (O(n²) edge computation)
    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 35 : 60; // was 80 — fewer nodes = fewer O(n²) edge pairs
    const MAX_DIST = 130;
    const GLOW_RADIUS = 110;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      W = canvas.width = rect.width * dpr;
      H = canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      init();
    };

    const init = () => {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3 * dpr,
          vy: (Math.random() - 0.5) * 0.3 * dpr,
          r: (1.5 + Math.random() * 1.5) * dpr,
        });
      }
    };

    const buildEdges = () => {
      edges = [];
      const d = MAX_DIST * dpr;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < d) edges.push({ a: i, b: j, dist });
        }
      }
    };

    const distToSegment = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
      const dx = bx - ax, dy = by - ay;
      const lenSq = dx * dx + dy * dy;
      if (lenSq === 0) return Math.hypot(px - ax, py - ay);
      const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
      return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
    };

    let animationFrame: number;
    let frameCount = 0;
    let isVisible = false;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x * dpr;
      const my = mouse.current.y * dpr;
      const gr = GLOW_RADIUS * dpr;
      const maxD = MAX_DIST * dpr;

      /* move nodes */
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      /* rebuild edges only every 4 frames — O(n²) Math.sqrt is the main perf culprit */
      if (frameCount % 4 === 0) buildEdges();
      frameCount++;

      /* edges */
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        const edgeFade = 1 - e.dist / maxD;
        const dist = distToSegment(mx, my, a.x, a.y, b.x, b.y);
        const strength = Math.max(0, 1 - dist / gr);

        const baseAlpha = edgeFade * 0.13;
        const glowAlpha = baseAlpha + strength * 0.75;

        /* base line */
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(30,80,40,${glowAlpha})`;
        ctx.lineWidth = (0.5 + strength * 1.8) * dpr;
        ctx.lineCap = "round";
        ctx.stroke();

        /* glow overlay */
        if (strength > 0.15) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(120,230,140,${strength * 0.6})`;
          ctx.lineWidth = (0.4 + strength * 0.9) * dpr;
          ctx.stroke();
        }
      }

      /* nodes */
      for (const n of nodes) {
        const dn = Math.hypot(mx - n.x, my - n.y);
        const ns = Math.max(0, 1 - dn / gr);
        const na = 0.18 + ns * 0.82;

        /* halo */
        if (ns > 0.2) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (1 + ns * 2.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140,240,160,${ns * 0.35})`;
          ctx.fill();
        }

        /* dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + ns * 1.2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30,90,45,${na})`;
        ctx.fill();
      }

      if (!isVisible || isScrolling) {
        animationFrame = 0;
        return; // stop RAF when section is off-screen or actively scrolling
      }
      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = e.touches[0].clientX - rect.left;
      mouse.current.y = e.touches[0].clientY - rect.top;
    };

    // Pause canvas RAF when section scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrame && !isScrolling) draw(); // restart loop when re-entering view
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Pause canvas RAF during active scrolling to prevent lag
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        if (isVisible && !animationFrame) draw();
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    resize();
    isVisible = true;
    draw();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card} ref={containerRef}>
          {data?.whyChooseUsBackgroundImage && (
            <Image
              src={urlForImage(data.whyChooseUsBackgroundImage).url()}
              alt={data.whyChooseUsBackgroundImage.alt || "Why Choose Us"}
              fill
              style={{ objectFit: "cover", opacity: 0.15 }}
              priority
            />
          )}
          <canvas ref={canvasRef} className={styles.canvas} />
          <FadeIn direction="up" distance={50} className={styles.content}>
            <p className={styles.subtitle}>{data?.whyChooseUsSubtitle || "why choose us"}</p>
            <h2 className={styles.heading}>
              {data?.whyChooseUsHeading || (
                <>
                  With over a decade of experience, we deliver tailored solutions that empower
                  your business to grow
                </>
              )}
            </h2>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
