'use client'

import { useState } from 'react'
import Modal from '@/components/shared/Modal'
import Button from '@/components/shared/Button'
import { ForumThreadService } from '@/lib/services/forumThreadService'
import { CreateForumThreadDto } from '@/lib/types'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler'

interface CreateThreadModalProps {
  isOpen: boolean
  onClose: () => void
  category: string
  onThreadCreated: () => void
}

export default function CreateThreadModal({ isOpen, onClose, category, onThreadCreated }: CreateThreadModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    setSubmitting(true)

    try {
      const threadData: CreateForumThreadDto = {
        title,
        forumCategoryId: category,
        content
      }
      await ForumThreadService.create(threadData)
      setTitle('')
      setContent('')
      onThreadCreated()
      onClose()
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create thread. Please try again.'))
      console.error('Error creating thread:', err)
    } finally {
      setSubmitting(false)
    }
  }

  // reset form and error state when closing
  const handleClose = () => {
    setTitle('')
    setContent('')
    setError('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Thread">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-indigo-300 mb-1">
            Thread Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-indigo-900/30 border border-indigo-700 rounded-lg text-indigo-100 placeholder-indigo-400/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
            placeholder="Enter thread title..."
            maxLength={60}
          />
          <p className="text-xs text-indigo-400 mt-1">{title.length}/60</p>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-indigo-300 mb-1">
            First Post Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 bg-indigo-900/30 border border-indigo-700 rounded-lg text-indigo-100 placeholder-indigo-400/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
            placeholder="Write your first post in the thread..."
            ></textarea>
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
            disabled={!title.trim() || !content.trim()}
            className="flex-1"
          >
            {submitting ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
