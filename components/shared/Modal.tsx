'use client'

import { ReactNode } from 'react'
import { BiX } from 'react-icons/bi'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  maxWidth?: string
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`bg-indigo-950 border border-indigo-700 rounded-lg p-6 w-full ${maxWidth}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-indigo-100">{title}</h3>
          <button
            onClick={onClose}
            className="text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
          >
            <BiX size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
