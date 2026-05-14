"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

interface CounterProps {
  value: string;
  className?: string;
}

export function Counter({ value, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Use a smaller margin for mobile compatibility
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  
  const safeValue = String(value || "0");
  // More robust number extraction
  const numericValue = parseFloat(safeValue.replace(/,/g, "").replace(/[^0-9.-]/g, "")) || 0;
  // Extract suffix (anything that isn't a digit, comma, dot, or minus)
  const suffix = safeValue.replace(/[0-9,.-]/g, "");
  const hasComma = safeValue.includes(",");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60, // Slower, more premium feel
    damping: 25,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        let val = Math.round(latest);
        let formattedValue = val.toString();
        
        if (hasComma) {
          formattedValue = val.toLocaleString();
        }
        
        ref.current.textContent = formattedValue + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix, hasComma]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
