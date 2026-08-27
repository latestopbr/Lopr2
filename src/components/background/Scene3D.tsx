import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { WireframeShape } from '@/components/background/WireframeShape'
import { ParticleField } from '@/components/background/ParticleField'
import { useMouseRef } from '@/hooks/useMouseRef'

function useIsTabVisible(): boolean {
  const [isVisible, setIsVisible] = useState(() => document.visibilityState === 'visible')

  useEffect(() => {
    function handleVisibilityChange() {
      setIsVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

export default function Scene3D() {
  const mouseRef = useMouseRef()
  const isTabVisible = useIsTabVisible()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-base">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={isTabVisible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#ec4899" />
        <WireframeShape mouseRef={mouseRef} />
        <ParticleField mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
