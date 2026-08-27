import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { MathUtils } from 'three'
import type { Points as ThreePoints } from 'three'
import type { MousePosition } from '@/hooks/useMouseRef'

const PARTICLE_COUNT = 800

function generatePositions(): Float32Array {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 4 + Math.random() * 4
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi) * 0.4
  }
  return positions
}

export function ParticleField({ mouseRef }: { mouseRef: React.RefObject<MousePosition> }) {
  const pointsRef = useRef<ThreePoints>(null)
  const positions = useMemo(() => generatePositions(), [])
  const mouseOffset = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    const points = pointsRef.current
    if (!points) return

    points.rotation.y += delta * 0.03

    mouseOffset.current.x = MathUtils.lerp(mouseOffset.current.x, mouseRef.current.y * 0.15, delta * 1.5)
    mouseOffset.current.y = MathUtils.lerp(mouseOffset.current.y, mouseRef.current.x * 0.15, delta * 1.5)
    points.rotation.x = mouseOffset.current.x
    points.rotation.z = mouseOffset.current.y
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}
