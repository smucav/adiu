"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

interface CounterProps {
  value: string;
  className?: string;
}

export function Counter({ value, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const safeValue = value || "0";
  // Parse the number from the value (e.g., "2,257" -> 2257, "95%" -> 95)
  const numericValue = parseFloat(safeValue.replace(/,/g, "").replace(/%/g, ""));
  const suffix = safeValue.includes("%") ? "%" : "";
  const hasComma = safeValue.includes(",");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        let formattedValue = Math.floor(latest).toString();
        
        if (hasComma) {
          formattedValue = Math.floor(latest).toLocaleString();
        }
        
        ref.current.textContent = formattedValue + suffix;
      }
    });
  }, [springValue, suffix, hasComma]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
