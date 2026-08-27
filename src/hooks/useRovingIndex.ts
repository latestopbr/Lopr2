import { useMemo, useRef } from 'react'
import type { KeyboardEvent } from 'react'

/**
 * Roving tabindex + arrow-key navigation for a horizontal/wrapping group of
 * button-like elements (radiogroup or toggle grid). Only the active index is
 * tabbable; arrow keys move focus, Home/End jump to the ends.
 */
export function useRovingIndex(count: number, activeIndex: number) {
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

  const setItemRef = useMemo(
    () => (index: number) => (node: HTMLButtonElement | null) => {
      itemRefs.current[index] = node
    },
    [],
  )

  function focusIndex(index: number) {
    const clamped = (index + count) % count
    itemRefs.current[clamped]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        focusIndex(index + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        focusIndex(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusIndex(0)
        break
      case 'End':
        event.preventDefault()
        focusIndex(count - 1)
        break
      default:
        break
    }
  }

  function getTabIndex(index: number): number {
    return index === activeIndex ? 0 : -1
  }

  return { setItemRef, handleKeyDown, getTabIndex }
}
