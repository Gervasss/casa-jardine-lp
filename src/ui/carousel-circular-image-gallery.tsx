"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface ImageData {
  title: string;
  url: string;
}

interface ImageGalleryProps {
  images?: ImageData[];
}

declare global {
  interface Window {
    gsap: any;
    MotionPathPlugin: any;
  }
}

export function ImageGallery({ images = [] }: ImageGalleryProps) {
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin);
        setGsapReady(true);
        return;
      }
      const gsapScript = document.createElement("script");
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script");
        motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js";
        motionPathScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin);
            setGsapReady(true);
          }
        };
        document.body.appendChild(motionPathScript);
      };
      document.body.appendChild(gsapScript);
    };
    loadScripts();
  }, []);

  const next = useCallback(() => {
    if (images.length === 0) return;
    setOpened((current) => (current + 1 >= images.length ? 0 : current + 1));
  }, [images]);

  const prev = useCallback(() => {
    if (images.length === 0) return;
    setOpened((current) => (current - 1 < 0 ? images.length - 1 : current - 1));
  }, [images]);

  useEffect(() => {
    if (!gsapReady || images.length === 0) return;
    autoplayTimer.current = setInterval(next, 8000);
    return () => { if (autoplayTimer.current) clearInterval(autoplayTimer.current); };
  }, [opened, gsapReady, next, images]);

  useEffect(() => {
    setDisabled(true);
    const timeout = setTimeout(() => setDisabled(false), 1200);
    return () => clearTimeout(timeout);
  }, [opened]);

  if (images.length === 0) return null;

  return (
    <div ref={container} className="relative flex flex-col items-center justify-center bg-transparent w-full min-h-fit md:min-h-[600px] font-sans py-4 md:py-10">

      <div className="relative group flex items-center justify-center">
        <div className="relative h-[350px] w-[350px] md:h-[500px] md:w-[500px] overflow-hidden rounded-[40px]">
          {gsapReady &&
            images.map((image, i) => (
              <div
                key={`${image.url}-${i}`}
                className="absolute left-0 top-0 h-full w-full"
                style={{ zIndex: inPlace === i ? i : images.length + 1 }}
              >
                <GalleryImage
                  total={images.length}
                  id={i}
                  url={image.url}
                  title={image.title}
                  open={opened === i}
                  inPlace={inPlace === i}
                  onInPlace={setInPlace}
                  gsapReady={gsapReady}
                />
              </div>
            ))}
          <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
            <Tabs images={images} activeIndex={opened} onSelect={(idx: number) => !disabled && setOpened(idx)} />
          </div>
        </div>

        {/* BOTÕES AJUSTADOS PARA MOBILE */}
        <button
          className="absolute -left-4 md:-left-20 top-1/2 z-[101] flex h-12 w-12 md:h-14 md:w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all hover:bg-white/30 disabled:opacity-0 active:scale-90"
          onClick={prev}
          disabled={disabled}
        >
          <IoChevronBackOutline size={24} />
        </button>
        <button
          className="absolute -right-4 md:-right-20 top-1/2 z-[101] flex h-12 w-12 md:h-14 md:w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all hover:bg-white/30 disabled:opacity-0 active:scale-90"
          onClick={next}
          disabled={disabled}
        >
          <IoChevronForwardOutline size={24} />
        </button>
      </div>
    </div>
  );
}

interface GalleryImageProps {
  url: string;
  title: string;
  open: boolean;
  inPlace: boolean;
  id: number;
  onInPlace: (id: number) => void;
  total: number;
  gsapReady: boolean;
}

function GalleryImage({ url, open, inPlace, id, onInPlace, total, gsapReady }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef<SVGCircleElement>(null);

  const width = 500;
  const height = 500;
  const circleRadius = 6;
  const gap = 16;
  const bigSize = circleRadius * 800;

  const getPosSmall = () => {
    const totalW = total * (circleRadius * 2 + gap) - gap;
    const startX = (width - totalW) / 2 + circleRadius;
    return { cx: startX + id * (circleRadius * 2 + gap), cy: height - 50, r: circleRadius };
  };

  const getPosSmallAbove = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  });

  const getPosCenter = () => ({ cx: width / 2, cy: height / 2, r: circleRadius * 6 });
  const getPosEnd = () => ({ cx: width / 2 - bigSize, cy: height / 2, r: bigSize });
  const getPosStart = () => ({ cx: width / 2 + bigSize, cy: height / 2, r: bigSize });

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !clip.current || !gsapReady) return;

    setLoaded(false);
    const flipDuration = firstLoad ? 0 : 0.6;
    const bounceDuration = firstLoad ? 0.01 : 1.2;

    if (open) {
      gsap.timeline()
        .set(clip.current, getPosSmall())
        .to(clip.current, { ...getPosCenter(), duration: 0.3, ease: "power3.inOut" })
        .to(clip.current, { ...getPosEnd(), duration: flipDuration, ease: "power4.in", onComplete: () => onInPlace(id) });
    } else {
      gsap.timeline({ overwrite: true })
        .set(clip.current, getPosStart())
        .to(clip.current, { ...getPosCenter(), duration: flipDuration, ease: "power4.out" })
        .to(clip.current, {
          motionPath: { path: [getPosSmallAbove(), getPosSmall()], curviness: 1.2 },
          duration: bounceDuration,
          ease: "bounce.out",
        });
    }
  }, [open, gsapReady]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* ClipPath para arredondar a imagem (Border Radius) */}
        <clipPath id="imageRounded">
          <rect x="20" y="20" width={width - 40} height={height - 40} rx="30" />
        </clipPath>
        
        <clipPath id={`${id}_clip`}><circle ref={clip} cx="0" cy="0" r={circleRadius} /></clipPath>
        <clipPath id={`${id}_square`}><rect width={width} height={height} /></clipPath>
      </defs>

      {/* MOLDURA (Stroke externa) */}
      <rect 
        x="10" y="10" 
        width={width - 20} height={height - 20} 
        rx="40" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        strokeOpacity="0.3"
      />

      {/* IMAGEM COM MÁSCARAS APLICADAS */}
      <g clipPath="url(#imageRounded)">
        <g clipPath={`url(#${id}${inPlace ? "_square" : "_clip"})`}>
          <image width={width} height={height} href={url} preserveAspectRatio="xMidYMid slice" />
        </g>
      </g>
    </svg>
  );
}

function Tabs({ images, activeIndex, onSelect }: any) {
  const width = 500;
  const height = 500;
  const radius = 6;
  const gap = 16;
  const totalW = images.length * (radius * 2 + gap) - gap;
  const startX = (width - totalW) / 2 + radius;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full pointer-events-none">
      {images.map((img: any, i: number) => (
        <circle
          key={`${img.url}-${i}`}
          cx={startX + i * (radius * 2 + gap)}
          cy={height - 50}
          r={radius + 1}
          onClick={() => onSelect(i)}
          className={`cursor-pointer transition-all duration-500 pointer-events-auto 
            ${i === activeIndex ? 'fill-white' : 'fill-transparent stroke-white/40 hover:stroke-white'}`}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}