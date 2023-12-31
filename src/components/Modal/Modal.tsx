import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactElement
  className?: string
  backdrop?: boolean
  closeOnOutsideClick?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  backdrop = true,
  className = 'bg-white',
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleFocus = (event: FocusEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )

        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('focus', handleFocus, true)
    }
    setMounted(true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focus', handleFocus, true)
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOutsideClick) {
      onClose()
    }
  }
  if (!isOpen) return null
  return mounted
    ? ReactDOM.createPortal(
        <div
          className={`fixed inset-0 z-30 flex items-center justify-center ${
            backdrop && 'bg-gray-800/30 backdrop-blur-sm'
          }`}
          onClick={handleOverlayClick}>
          <div
            className={cn(
              'max-h-[800px] max-w-[1024px] overflow-hidden rounded-2xl p-6',
              !className ? 'bg-white' : className,
              'mx-24 border-4 border-gray-30 backdrop-blur-sm'
            )}
            ref={modalRef}>
            {children}
          </div>
        </div>,
        window.document.getElementById('font-container')!
      )
    : null
}

export default Modal
