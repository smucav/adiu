"use client";

import React, { useEffect, useRef } from "react";
import { useSpring } from "framer-motion";
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  MotionValue,
} from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Smooth Scroll Component — Lenis is desktop-only.
// On touch/mobile devices, native scroll momentum is faster and smoother
// than any JS implementation. Overriding it causes jank and high CPU usage.
export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Skip Lenis on touch devices — native scroll is always better on mobile
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 0.85,   // was 1.2 — shorter momentum ends before section-entry animations fire
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(500, 33); // Prevent skipped frames during heavy JS tasks

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, []);

  return <>{children}</>;
};

// Text Reveal Component (Line by line feel)
export const TextReveal = ({
  text,
  className,
  delay = 0,
}: {
  text: string | React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const variants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  };

  // If text is a string, we can do some basic splitting,
  // but if it's a React element, we just wrap it.
  if (typeof text !== "string") {
    return (
      <div className={className} style={{ overflow: "hidden" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
          variants={variants}
        >
          {text}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
        variants={variants}
      >
        {text}
      </motion.div>
    </div>
  );
};

// Parallax Component — disabled on touch/reduced-motion devices to avoid jank
export const Parallax = ({
  children,
  offset = 50,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
  // Also disable on touch devices — parallax causes jank on mobile
  const isTouch =
    typeof window !== "undefined" && "ontouchstart" in window;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced || isTouch ? [0, 0] : [-offset, offset]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 40,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier — no bounce
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const Antigravity = ({
  children,
  amplitude = 15,
  duration = 4,
  className,
}: {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  className?: string;
}) => {
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <motion.div
      className={className}
      animate={prefersReduced ? {} : { y: [0, -amplitude, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export const TypewriterText = ({
  text,
  speed = 25,
  delay = 0,
  className,
  as: Component = "p",
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  as?: any;
}) => {
  const [displayText, setDisplayText] = React.useState("");
  const [isComplete, setIsComplete] = React.useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, { once: true, margin: "-10px" });

  // Respect reduced motion — show full text immediately
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  React.useEffect(() => {
    if (prefersReduced) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }
    if (!isInView) return;

    let timeout: ReturnType<typeof setTimeout>;
    let currentText = "";
    let index = 0;

    const startTyping = () => {
      const type = () => {
        if (index < text.length) {
          currentText += text[index];
          setDisplayText(currentText);
          index++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };

    const initialDelay = setTimeout(startTyping, delay * 1000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeout);
    };
  }, [text, speed, delay, isInView, prefersReduced]);

  return (
    <Component className={className} ref={containerRef}>
      {displayText.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < displayText.split("\n").length - 1 && <br />}
        </React.Fragment>
      ))}
      {!isComplete && (
        <motion.span
          animate={prefersReduced ? {} : { opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            backgroundColor: "currentColor",
            marginLeft: "2px",
            verticalAlign: "middle",
          }}
        />
      )}
    </Component>
  );
};

interface CounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export const Counter = ({
  value = "0",
  className,
  duration = 2,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const safeValue = String(value || "0");
  const numericValue =
    parseFloat(safeValue.replace(/,/g, "").replace(/[^0-9.-]/g, "")) || 0;
  const suffix = safeValue.replace(/[0-9,.-]/g, "");
  const hasComma = safeValue.includes(",");

  const count = useMotionValue(0);
  const springValue = useSpring(count, {
    stiffness: 60,
    damping: 25,
  });

  useEffect(() => {
    if (isInView) {
      count.set(numericValue);
    }
  }, [isInView, numericValue, count]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const val = Math.round(latest);
        let formatted = val.toString();
        if (hasComma) {
          formatted = val.toLocaleString();
        }
        ref.current.textContent = formatted + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix, hasComma]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
};

interface ScrollCounterProps {
  value: string;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

export const ScrollCounter = ({
  value = "0",
  scrollYProgress,
  range,
  className,
}: ScrollCounterProps) => {
  // Extract number and formatting from string (e.g., "2,257" -> 2257)
  const safeValue = String(value || "0");
  const numericValue = parseInt(safeValue.replace(/,/g, ""), 10) || 0;
  const hasComma = safeValue.includes(",");
  const suffix = safeValue.replace(/[0-9,]/g, "");

  const count = useTransform(scrollYProgress, range, [0, numericValue], {
    clamp: true,
  });
  const rounded = useTransform(count, (latest) => {
    const val = Math.round(latest);
    if (hasComma) {
      return val.toLocaleString() + suffix;
    }
    return val.toString() + suffix;
  });

  return <motion.span className={className}>{rounded}</motion.span>;
};

export const MagneticEffect = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export const InteractiveTiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// PhysicsFloat — 3D tilt is desktop-only (mousemove), mobile gets a simple wrapper.
// The perpetual float animation (y: [0, -15, 0] repeat Infinity) is removed entirely
// because it forces constant GPU compositing on every frame on mobile devices.
export const PhysicsFloat = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [8, -8]);
  const rotateY = useTransform(x, [-300, 300], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // On touch/mobile, skip the expensive 3D tilt entirely — just render children
  const isTouch =
    typeof window !== "undefined" && "ontouchstart" in window;

  if (isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      transition={{
        rotateX: { type: "spring", stiffness: 80, damping: 20 },
        rotateY: { type: "spring", stiffness: 80, damping: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};
