import { useEffect, useRef } from 'react'

export interface MousePosition {
  x: number
  y: number
}

/** Tracks normalized (-1 to 1) mouse position in a ref, never triggering re-renders. */
export function useMouseRef() {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mouseRef
}
