"use client";

import styles from "./ActionBanner.module.css";
import { Button } from "../ui/Button";
import { FadeIn } from "../animations/ScrollAnimations";
import { useEffect, useRef } from "react";

import { SanityHomePage } from "@/sanity/lib/types";

interface ActionBannerProps {
  data: SanityHomePage | null;
}

const NetworkGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      w: number;
      h: number;

      constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.w) this.vx = -this.vx;
        if (this.y < 0 || this.y > this.h) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(130, 195, 65, 0.7)";
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const divisor = isMobile ? 25000 : 12000;
      const maxParticles = isMobile ? 25 : 100;
      
      const numParticles = Math.min(
        Math.floor((canvas.width * canvas.height) / divisor),
        maxParticles
      );

      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    let mouse = { x: -1000, y: -1000 };
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(parent);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip heavy calculations and drawing if not visible
      if (!isVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(130, 195, 65, ${0.25 - dist / 150 * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 200) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(130, 195, 65, ${0.6 - distMouse / 200 * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export function ActionBanner({ data }: ActionBannerProps) {
  return (
    <section className={`section`}>
      <div className={`container`}>
        <div className={styles.banner}>
          
          {/* Custom Interactive Node Network */}
          <NetworkGraph />

          <div className={styles.content}>
            <FadeIn direction="up" distance={30}>
              <h2 className={styles.heading}>
                {data?.actionBannerHeading || (
                  <>
                    Accelerate your
                    <br />
                    infrastructure growth
                  </>
                )}
              </h2>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={0.1}>
              <p className={styles.description}>
                {data?.actionBannerDescription ||
                  "Lorem ipsum dolor sit amet consectetur viverra velit faucibus pharetra lorem sed scelerisque sit in nec arcu malesuada."}
              </p>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={0.2}>
              <Button
                href={data?.actionBannerCtaLink || "/contact"}
                variant="primary"
              >
                {data?.actionBannerCtaText || "Start deployment"}{" "}
                <span className={styles.arrow}>&rsaquo;</span>
              </Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
