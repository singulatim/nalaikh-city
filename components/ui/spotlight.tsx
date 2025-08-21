"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * A lightweight Spotlight effect inspired by Aceternity UI.
 * Renders a soft radial glow you can layer behind content.
 *
 * Usage:
 *   <div className="relative">
 *     <Spotlight className="left-0 top-[-10rem]" />
 *     ...content
 *   </div>
 */
export function Spotlight({ className, color = "#ffd166" }: { className?: string; color?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none opacity-60 blur-3xl",
        "h-[40rem] w-[40rem]",
        className,
      )}
      style={{
        background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  )
}

/**
 * A stacked variant that adds subtle depth using two spotlights.
 */
export function Spotlights({
  className,
  primary = "#ffd166",
  secondary = "#002868",
}: {
  className?: string
  primary?: string
  secondary?: string
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <Spotlight className="left-1/2 top-[-12rem] -translate-x-1/2" color={primary} />
      <Spotlight className="left-[-10rem] top-[10rem]" color={secondary} />
    </div>
  )
}

export default Spotlight
