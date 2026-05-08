import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 140 }) {
  const ref = useRef()

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sp = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
      sp[i] = 0.0008 + Math.random() * 0.0028
    }
    return { positions: pos, speeds: sp }
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i]
      arr[i * 3] += Math.sin(t * 0.4 + i) * 0.0007
      if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#e8c87a"
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
