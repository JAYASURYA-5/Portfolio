
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
  );
}

function Scene() {
  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.1} />
      
      {/* Point Light */}
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      {/* Simple floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#3730a3"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      {/* Gradient overlay as fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/30 to-background/50 pointer-events-none" />
    </div>
  );
}
