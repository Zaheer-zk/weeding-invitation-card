import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vTwinkle;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.3 + aPhase);
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mv.z) * (0.6 + 0.4 * vTwinkle);
    gl_Position = projectionMatrix * mv;
  }
`

const fragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vTwinkle;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.2);
    gl_FragColor = vec4(uColor, glow * vTwinkle * 0.85);
  }
`

export default function Particles({ count = 160 }) {
  const ref = useRef()
  const matRef = useRef()

  const { positions, sizes, phases, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const ph = new Float32Array(count)
    const sp = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
      // mostly small motes, a few brighter "embers"
      sz[i] = Math.random() < 0.12 ? 0.10 + Math.random() * 0.12 : 0.03 + Math.random() * 0.05
      ph[i] = Math.random() * Math.PI * 2
      sp[i] = 0.0008 + Math.random() * 0.0028
    }
    return { positions: pos, sizes: sz, phases: ph, speeds: sp }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#e8c87a') },
      uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
    }),
    []
  )

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    if (matRef.current) matRef.current.uniforms.uTime.value = t
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
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={count} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-aPhase" count={count} array={phases} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
