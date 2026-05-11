import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import '@/src/styles/globals.css';

const GradualBlur = dynamic(() => import('@/src/ui/GradualBlur'), {
  ssr: false,
  loading: () => null,
});

export default function App({ Component, pageProps }: AppProps) {
  const [showFooterBlur, setShowFooterBlur] = useState(false);

  useEffect(() => {
    const show = () => setShowFooterBlur(true);
    const timer = window.setTimeout(show, 2500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Component {...pageProps} />

      {showFooterBlur && (
        <GradualBlur
          preset="page-footer"
          target="page"
          position="bottom"
          zIndex={0}
          height="160px"
          desktopHeight="190px"
          tabletHeight="170px"
          responsive
          strength={1.6}
          divCount={1}
          curve="bezier"
          opacity={1}
          animated={false}
        />
      )}
    </>
  );
}
