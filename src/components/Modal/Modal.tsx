import React, { useEffect, useRef, useState } from 'react'
import styles from './Modal.module.scss'
import ReactDOM from 'react-dom'
import cn from 'classnames'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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

  if (!isOpen) return null
  return mounted
    ? ReactDOM.createPortal(
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${styles.modalOverlay}`}>
          <div className={cn(styles.modal, 'mx-24')} ref={modalRef}>
            {children}
          </div>
        </div>,
        window.document.body
      )
    : null
}

export default Modal
