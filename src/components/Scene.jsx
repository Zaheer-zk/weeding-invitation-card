import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Particles from './Particles'

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 38, near: 0.1, far: 50 }}
      gl={{ antialias: true, toneMappingExposure: 1.05 }}
    >
      <color attach="background" args={['#06050a']} />
      <fog attach="fog" args={['#04030a', 7, 18]} />

      <ambientLight intensity={0.4} color="#fff3d4" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#caa253" />
      <pointLight position={[2.5, 3, -2]} intensity={0.3} color="#f0d597" />

      <Suspense fallback={null}>
        <Particles count={160} />
      </Suspense>
    </Canvas>
  )
}
