import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'
import { MathUtils, type Mesh } from 'three'
import type { MousePosition } from '@/hooks/useMouseRef'

export function WireframeShape({ mouseRef }: { mouseRef: React.RefObject<MousePosition> }) {
  const meshRef = useRef<Mesh>(null)
  const autoRotation = useRef(0)
  const mouseOffset = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    autoRotation.current += delta * 0.15
    mouseOffset.current.x = MathUtils.lerp(mouseOffset.current.x, mouseRef.current.y * 0.4, delta * 2)
    mouseOffset.current.y = MathUtils.lerp(mouseOffset.current.y, mouseRef.current.x * 0.4, delta * 2)

    mesh.rotation.x = autoRotation.current * 0.6 + mouseOffset.current.x
    mesh.rotation.y = autoRotation.current + mouseOffset.current.y
  })

  return (
    <Icosahedron ref={meshRef} args={[1.8, 1]} position={[1.4, 0.2, 0]}>
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.45} />
    </Icosahedron>
  )
}
