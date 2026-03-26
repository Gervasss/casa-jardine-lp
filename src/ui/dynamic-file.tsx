"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Frame {
  id: number
  video: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  isHovered: boolean
}

interface FrameComponentProps {
  video: string
  width: number | string
  height: number | string
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
  width,
  height,
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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // Gerencia o Play/Pause baseado no estado de interação
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isHovered) {
      videoElement.play().catch(() => {})
    } else {
      videoElement.pause()
    }
  }, [isHovered])

  // Define o caminho da thumbnail (ajustado para .png como solicitado)
  const posterUrl = video.replace('.mp4', '.png')

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
        backgroundColor: "#1a1a15" 
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
            {/* THUMBNAIL ESTÁTICA - Com Blur e P&B quando pausado */}
            <img 
              src={posterUrl} 
              alt="Casa Jardine preview"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              style={{ 
                opacity: isVideoLoaded && isHovered ? 0 : 1,
                filter: isHovered ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(4px)",
                transform: isHovered ? "scale(1)" : "scale(1.1)", 
                zIndex: 2
              }}
            />

            {/* VÍDEO REAL - Ganha foco e cor ao interagir */}
            <video
              className="w-full h-full object-cover transition-all duration-500"
              src={video}
              loop
              muted
              playsInline
              preload="metadata"
              ref={videoRef}
              onPlay={() => setIsVideoLoaded(true)}
              style={{ 
                zIndex: 1,
                filter: isHovered ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(10px)",
                transform: isHovered ? "scale(1)" : "scale(1.1)"
              }}
            />
          </div>
        </div>

        {/* Molduras decorativas (Showcase Frame) */}
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

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({ 
  frames: initialFrames, 
  className,
  showFrames = false,
  hoverSize = 6,
  gapSize = 4
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  // Função para simular hover através do toque no Mobile
  const handleInteraction = (row: number, col: number) => {
    if (hovered?.row === row && hovered?.col === col) {
      setHovered(null) // Fecha ao tocar novamente
    } else {
      setHovered({ row, col }) // Abre e dá play no primeiro toque
    }
  }

  const getRowSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        touchAction: "pan-y" 
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

        return (
          <motion.div
            key={frame.id}
            className="relative cursor-pointer"
            style={{
              transformOrigin,
              transition: "transform 0.4s ease",
              zIndex: hovered?.row === row && hovered?.col === col ? 10 : 1
            }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleInteraction(row, col)}
          >
            <FrameComponent
              video={frame.video}
              width="100%"
              height="100%"
              className="absolute inset-0"
              corner={frame.corner}
              edgeHorizontal={frame.edgeHorizontal}
              edgeVertical={frame.edgeVertical}
              mediaSize={frame.mediaSize}
              borderThickness={frame.borderThickness}
              borderSize={frame.borderSize}
              showFrame={showFrames}
              isHovered={hovered?.row === row && hovered?.col === col}
            />
          </motion.div>
        )
      })}
    </div>
  )
}