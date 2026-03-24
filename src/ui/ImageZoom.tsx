"use client"

import Image, { type ImageProps } from "next/image"
import { type ImgHTMLAttributes } from "react"
import Zoom, { type UncontrolledProps } from "react-medium-image-zoom"
import styles from "./ImageZoom.module.css"
import { cn } from "@/src/lib/utils"
import 'react-medium-image-zoom/dist/styles.css'

export interface ImageZoomProps extends ImageProps {
  zoomInProps?: ImgHTMLAttributes<HTMLImageElement>
  zoomProps?: UncontrolledProps
  className?: string
}

function getImageSrc(src: ImageProps["src"]): string {
  if (typeof src === "string") return src
  if ("default" in src) return src.default.src
  return src.src
}

export function ImageZoom({
  zoomInProps,
  zoomProps,
  className,
  children,
  ...props
}: ImageZoomProps) {
  return (
    <Zoom
      classDialog={styles['zoom-dialog']}
      classOverlay={styles['zoom-overlay']}
      closeText="Fechar"
      zoomMargin={20}
      wrapElement="span"
      {...zoomProps}
      zoomImg={{
        src: getImageSrc(props.src),
        sizes: undefined,
        className: cn(
          styles['zoom-image-high-res'],
          zoomInProps?.className
        ),
        ...zoomInProps,
      }}
    >
      {children ?? (
        <Image
          className={cn(styles['zoom-trigger-image'], className)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
          {...props}
        />
      )}
    </Zoom>
  )
}