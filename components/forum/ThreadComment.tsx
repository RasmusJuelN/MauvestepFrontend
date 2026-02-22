'use client'

import { useState, useRef, useEffect } from 'react'
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike, BiFlag, BiDotsHorizontalRounded, BiEdit, BiTrash } from 'react-icons/bi'
import { useAuth } from '@/lib/hooks/authContext'
import { ForumCommentService } from '@/lib/services/forumCommentService'

interface Props {
  commentId: string
  comment: string
  author: string
  date: string
  likeCount?: number
  dislikeCount?: number
  userHasLiked?: boolean | null
  onRatingChange?: (commentId: string, isLike: boolean) => void
  onCommentDelete?: (commentId: string) => void
}

export default function ThreadComment({ commentId, comment, author, date, likeCount = 0, dislikeCount = 0, userHasLiked, onRatingChange, onCommentDelete }: Props) {
  const { user } = useAuth()
  const [rating, setRating] = useState<'like' | 'dislike' | null>(
    userHasLiked === null || userHasLiked === undefined 
      ? null 
      : userHasLiked 
        ? 'like' 
        : 'dislike'
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isCommentOwner = user?.username === author

  const handleLike = async () => {
    const isLike = true
    const newRating = rating === 'like' ? null : 'like'
    setRating(newRating)

    if (onRatingChange) {
      try {
        await onRatingChange(commentId, isLike)
      } catch  {

        setRating(rating)
      }
    }
  }

  const handleDislike = async () => {
    const isLike = false
    const newReaction = rating === 'dislike' ? null : 'dislike'
    setRating(newReaction)

    if (onRatingChange) {
      try {
        await onRatingChange(commentId, isLike)
      } catch  {

        setRating(rating)
      }
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete comment?')) 
      return

    setIsDeleting(true)
    try {
      await ForumCommentService.delete(commentId)
      if (onCommentDelete) {
        onCommentDelete(commentId)
      }
    } catch  {
      alert('Failed to delete comment')
      setIsDeleting(false)
    }
  }

  return (
    <div className=" border-l-2 border-indigo-500 bg-indigo-950/40 px-6 py-4 rounded-r-lg hover:bg-indigo-900/20 hover:border-indigo-400 transition-all">

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-indigo-400"> {author}</span>
          <span className="text-sm text-indigo-400">{date}</span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-indigo-400 hover:text-indigo-300 transition-colors p-1 cursor-pointer"
          >
            <BiDotsHorizontalRounded size={18} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-indigo-950/95 border border-indigo-700/50 rounded-md shadow-lg z-10">
              {user?.username === author && (
                <>
                  <button
                    onClick={() => {
                      console.log('Edit clicked')
                      setIsDropdownOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-indigo-300 hover:bg-indigo-900/50 flex items-center gap-2 cursor-pointer"
                  >
                    <BiEdit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete()
                      setIsDropdownOpen(false)
                    }}
                    disabled={isDeleting}
                    className="w-full px-3 py-2 text-left text-xs text-indigo-300 hover:bg-indigo-900/50 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <BiTrash size={14} />
                    Delete
                  </button>
                </>
              )}
              {user?.username !== author && (
                <button
                  onClick={() => {
                    console.log('Report clicked')
                    setIsDropdownOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-indigo-300 hover:bg-indigo-900/50 flex items-center gap-2 cursor-pointer"
                >
                  <BiFlag size={14} />
                  Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <p className="text-indigo-100 mb-3 text-sm leading-relaxed">{comment}</p>
      <div className="flex items-center gap-4 text-xs">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-indigo-500 hover:text-indigo-200 transition-colors cursor-pointer"
        >
          {rating === 'like' ? <BiSolidLike size={18} /> : <BiLike size={18} />}
          <span>{likeCount}</span>
        </button>
        
        <button
          onClick={handleDislike}
          className="flex items-center gap-1 text-indigo-500 hover:text-indigo-200 transition-colors cursor-pointer"
        >
          {rating === 'dislike' ? <BiSolidDislike size={18} /> : <BiDislike size={18} />}
          <span>{dislikeCount}</span>
        </button>
      </div>
    </div>
  )
}