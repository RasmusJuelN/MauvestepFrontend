'use client'

import { useState } from 'react'
import Modal from '@/components/shared/Modal'
import Button from '@/components/shared/Button'
import { ForumCategoryService } from '@/lib/services/forumCategoryService'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler'

interface CreateCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onCategoryCreated: () => void
}

export default function CreateCategoryModal({ isOpen, onClose, onCategoryCreated }: CreateCategoryModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await ForumCategoryService.create({
        name,
        description
      })
      setName('')
      setDescription('')
      onCategoryCreated()
      onClose()
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create category. Please try again.'))
      console.error('Error creating category:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setName('')
    setDescription('')
    setError('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Category">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-indigo-300 mb-1">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-indigo-900/30 border border-indigo-700 rounded-lg text-indigo-100 placeholder-indigo-400/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
            placeholder="e.g. General Discussion"
            maxLength={50}
          />
          <p className="text-xs text-indigo-400 mt-1">{name.length}/50</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-indigo-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-indigo-900/30 border border-indigo-700 rounded-lg text-indigo-100 placeholder-indigo-400/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Describe what this category is for..."
            maxLength={200}
          />
          <p className="text-xs text-indigo-400 mt-1">{description.length}/200</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="cancel"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={submitting}
            disabled={!name.trim()}
            className="flex-1"
          >
            {submitting ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
