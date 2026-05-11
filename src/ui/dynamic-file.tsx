"use client"

import { useState, useEffect, useRef } from "react"
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
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Sincroniza Play/Pause
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isHovered) {
      videoElement.play().catch(() => {})
    } else {
      videoElement.pause()
    }
  }, [isHovered])

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "150px", // Garante que o container tenha tamanho mesmo sem o vídeo
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
        backgroundColor: "#2a2a20" // Cor de fundo para evitar o "branco"
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
            <video
              className="w-full h-full object-cover transition-all duration-700"
              src={video}
              poster={poster}
              loop
              muted
              playsInline
              // "auto" garante que o navegador tente baixar o primeiro frame 
              // para servir de "foto" enquanto o vídeo está pausado.
              preload="none"
              ref={videoRef}
              style={{ 
                opacity: 1,
                filter: isHovered ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(8px)",
                transform: isHovered ? "scale(1)" : "scale(1.1)",
                backgroundColor: "#1a1a15"
              }}
            />
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
  className,
  showFrames = false,
  hoverSize = 6,
  gapSize = 4
}: any) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

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
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        minHeight: "500px", // Crucial: dá um tamanho para o grid no mobile
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        touchAction: "pan-y" 
      }}
    >
      {initialFrames.map((frame: any) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)

        return (
          <motion.div
            key={frame.id}
            className="relative cursor-pointer"
            style={{ zIndex: hovered?.row === row && hovered?.col === col ? 10 : 1 }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleInteraction(row, col)}
          >
            <FrameComponent
              {...frame}
              showFrame={showFrames}
              isHovered={hovered?.row === row && hovered?.col === col}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
