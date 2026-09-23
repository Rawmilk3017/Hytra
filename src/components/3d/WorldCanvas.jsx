import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import DynamicLighting from './DynamicLighting';
import BackgroundVoid from './BackgroundVoid';
import NeuralArchitecture from './NeuralArchitecture';
import CameraController from './CameraController';
import ContactMonolith from './ContactMonolith';
import { useQuality } from '../../context/QualityContext';

// Error boundary to gracefully catch WebGL or shader errors
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("WebGL Canvas encountered an issue; rendering CSS fallback.", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Gorgeous CSS / SVG mesh fallback when WebGL is unavailable
function StaticFallback() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-void">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-violet/15 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-magenta/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/5 w-[400px] h-[400px] rounded-full bg-accent-crimson/10 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#A855F7_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  );
}

export default function WorldCanvas({ mouse, scrollProgress, activeSection }) {
  const { hasWebGL, dpr } = useQuality();

  if (!hasWebGL) {
    return <StaticFallback />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <WebGLErrorBoundary fallback={<StaticFallback />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          dpr={dpr}
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          className="pointer-events-none"
        >
          <Suspense fallback={null}>
            <CameraController
              mouse={mouse}
              scrollProgress={scrollProgress}
              activeSection={activeSection}
            />
            <DynamicLighting mouse={mouse} />
            <BackgroundVoid mouse={mouse} />

            {/* Centerpiece Neural Architecture in Hero & About */}
            <NeuralArchitecture
              mouse={mouse}
              scrollProgress={scrollProgress}
            />

            {/* Looming Monolith in Contact Scene */}
            {scrollProgress > 0.82 && (
              <ContactMonolith progress={scrollProgress} />
            )}
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
