import { ReactNode } from "react";
import styles from "./Button.module.css";
import { MagneticEffect } from "../animations/ScrollAnimations";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Button({ children, variant = "primary", size = "md", href, className = "", ...props }: ButtonProps) {
  const baseClass = `${styles.btn} ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]} ${className}`;
  
  if (href) {
    return (
      <MagneticEffect>
        <a href={href} className={baseClass}>
          {children}
        </a>
      </MagneticEffect>
    );
  }

  return (
    <MagneticEffect>
      <button className={baseClass} {...props}>
        {children}
      </button>
    </MagneticEffect>
  );
}
