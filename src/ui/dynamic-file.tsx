"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface FrameComponentProps {
  video: string
  poster: string
  className?: string
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  showFrame: boolean
  isHovered: boolean
  isRevealed: boolean
}

interface FrameData extends Omit<FrameComponentProps, "showFrame" | "isHovered" | "isRevealed"> {
  id: number
  defaultPos: {
    x: number
    y: number
    w: number
    h: number
  }
}

interface DynamicFrameLayoutProps {
  frames: FrameData[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
  revealInterval?: number
}

function FrameComponent({
  video,
  poster,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness,
  borderSize,
  showFrame,
  isHovered,
  isRevealed,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement || !isRevealed) return

    if (isHovered) {
      videoElement.play().catch(() => {})
    } else {
      videoElement.pause()
    }
  }, [isHovered, isRevealed])

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "150px",
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
        backgroundColor: "#2a2a20",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden relative"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {isRevealed && (
              <video
                className="w-full h-full object-cover transition-all duration-700"
                src={video}
                poster={poster}
                loop
                muted
                playsInline
                preload={isHovered ? "auto" : "metadata"}
                ref={videoRef}
                style={{
                  opacity: 1,
                  filter: isHovered ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(8px)",
                  transform: isHovered ? "scale(1)" : "scale(1.1)",
                  backgroundColor: "#1a1a15",
                }}
              />
            )}
          </div>
        </div>

        {showFrame && (
          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            <div className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${corner})` }} />
            <div className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }} />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }} />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }} />
            <div className="absolute top-0 left-16 right-16 h-16" style={{ backgroundImage: `url(${edgeHorizontal})`, backgroundSize: "auto 64px", backgroundRepeat: "repeat-x" }} />
            <div className="absolute bottom-0 left-16 right-16 h-16" style={{ backgroundImage: `url(${edgeHorizontal})`, backgroundSize: "auto 64px", backgroundRepeat: "repeat-x", transform: "rotate(180deg)" }} />
            <div className="absolute left-0 top-16 bottom-16 w-16" style={{ backgroundImage: `url(${edgeVertical})`, backgroundSize: "64px auto", backgroundRepeat: "repeat-y" }} />
            <div className="absolute right-0 top-16 bottom-16 w-16" style={{ backgroundImage: `url(${edgeVertical})`, backgroundSize: "64px auto", backgroundRepeat: "repeat-y", transform: "scaleX(-1)" }} />
          </div>
        )}
      </div>
    </div>
  )
}

export function DynamicFrameLayout({
  frames: initialFrames,
  className = "",
  showFrames = false,
  hoverSize = 6,
  gapSize = 4,
  revealInterval = 180,
}: DynamicFrameLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hasStartedReveal, setHasStartedReveal] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const container = containerRef.current

    if (!container || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setHasStartedReveal(true))
      return () => window.cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStartedReveal(true)
          observer.disconnect()
        }
      },
      { rootMargin: "120px 0px", threshold: 0.2 }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStartedReveal) return

    const timers = initialFrames.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCount((current) => Math.max(current, index + 1))
      }, index * revealInterval)
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [hasStartedReveal, initialFrames, revealInterval])

  const handleInteraction = (row: number, col: number) => {
    if (hovered?.row === row && hovered?.col === col) {
      setHovered(null)
    } else {
      setHovered({ row, col })
    }
  }

  const getRowSizes = () => {
    if (hovered === null) return "1fr 1fr 1fr"
    const { row } = hovered
    const size = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${size}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return "1fr 1fr 1fr"
    const { col } = hovered
    const size = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${size}fr`)).join(" ")
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        minHeight: "500px",
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        touchAction: "pan-y",
      }}
    >
      {initialFrames.map((frame, index) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const isRevealed = index < visibleCount

        return (
          <motion.div
            key={frame.id}
            className="relative cursor-pointer"
            initial={false}
            animate={{
              opacity: isRevealed ? 1 : 0,
              scale: isRevealed ? 1 : 0.92,
              y: isRevealed ? 0 : 18,
            }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              zIndex: hovered?.row === row && hovered?.col === col ? 10 : 1,
              pointerEvents: isRevealed ? "auto" : "none",
            }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleInteraction(row, col)}
          >
            <FrameComponent
              {...frame}
              showFrame={showFrames}
              isHovered={hovered?.row === row && hovered?.col === col}
              isRevealed={isRevealed}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
