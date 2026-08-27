import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { VisuallyHidden } from '@/components/ui/VisuallyHidden'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      aria-labelledby="modal-title"
      className="m-auto w-full max-w-lg rounded-2xl border-0 bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="glass-strong max-h-[85vh] overflow-y-auto rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#111827]/95 px-6 py-4 backdrop-blur">
          <h2 id="modal-title" className="text-lg font-bold text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <VisuallyHidden>Close</VisuallyHidden>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </dialog>
  )
}
