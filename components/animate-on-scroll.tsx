"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideUp"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export function AnimateOnScroll({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
  className = "",
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Optionally disconnect after first animation
          // observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  const getAnimationStyles = () => {
    const baseStyles = {
      transitionDelay: `${delay}ms`,
      transitionDuration: `${duration}s`,
      transitionTimingFunction: "ease-out",
    }

    if (!isVisible) {
      switch (animation) {
        case "fadeIn":
          return { ...baseStyles, opacity: 0 }
        case "fadeInUp":
          return { ...baseStyles, opacity: 0, transform: "translateY(32px)" }
        case "fadeInDown":
          return { ...baseStyles, opacity: 0, transform: "translateY(-32px)" }
        case "fadeInLeft":
          return { ...baseStyles, opacity: 0, transform: "translateX(-32px)" }
        case "fadeInRight":
          return { ...baseStyles, opacity: 0, transform: "translateX(32px)" }
        case "scaleIn":
          return { ...baseStyles, opacity: 0, transform: "scale(0.95)" }
        case "slideUp":
          return { ...baseStyles, opacity: 0, transform: "translateY(48px)" }
        default:
          return { ...baseStyles, opacity: 0, transform: "translateY(32px)" }
      }
    } else {
      switch (animation) {
        case "fadeIn":
          return { ...baseStyles, opacity: 1 }
        case "fadeInUp":
        case "fadeInDown":
        case "fadeInLeft":
        case "fadeInRight":
        case "slideUp":
          return { ...baseStyles, opacity: 1, transform: "translate(0, 0)" }
        case "scaleIn":
          return { ...baseStyles, opacity: 1, transform: "scale(1)" }
        default:
          return { ...baseStyles, opacity: 1, transform: "translate(0, 0)" }
      }
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  )
}

