'use client'

import { useState } from 'react'
import Modal from '@/components/shared/Modal'
import Button from '@/components/shared/Button'
import { ForumPostService } from '@/lib/services/forumPostService'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler'
import { CreateForumPostDto } from '@/lib/types'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  thread: string
  onPostCreated: () => void
}

export default function CreatePostModal({ isOpen, onClose, thread, onPostCreated }: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    setSubmitting(true)

    try {
      const postData: CreateForumPostDto = {
        forumThreadId: thread,
        content
      }
      await ForumPostService.create(postData)
      setContent('')
      onPostCreated()
      onClose()
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create post. Please try again.'))
      console.error('Error creating post:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setContent('')
    setError('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Post">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-indigo-300 mb-1">
            Post Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 bg-indigo-900/30 border border-indigo-700 rounded-lg text-indigo-100 placeholder-indigo-400/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
            placeholder="Post content..."
          />
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
            disabled={!content.trim()}
            className="flex-1"
          >
            {submitting ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
