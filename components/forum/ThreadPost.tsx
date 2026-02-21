'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike, BiFlag, BiDotsHorizontalRounded, BiEdit, BiTrash, BiSolidComment, BiSolidCommentAdd, BiSolidCommentDots } from 'react-icons/bi'
import { useAuth } from '@/lib/hooks/authContext'
import { ForumPostService } from '@/lib/services/forumPostService'

interface Props {
  postId: string
  author: string
  authorProfilePic?: string
  authorPostCount?: number
  content: string
  createdAt: string
  likeCount?: number
  dislikeCount?: number
  commentCount?: number
  userHasLiked?: boolean | null
  onComment?: () => void
  onReport?: () => void
  onDelete?: () => void
  onRatingChange?: (postId: string, isLike: boolean) => void
}

export default function ThreadPost({ 
  postId,
  author,
  authorProfilePic,
  authorPostCount = 0,
  content, 
  createdAt, 
  likeCount = 0, 
  dislikeCount = 0,
  commentCount = 0,
  userHasLiked,
  onComment,
  onReport,
  onDelete,
  onRatingChange
}: Props) {
  const { user } = useAuth()
  const [rating, setRating] = useState<'like' | 'dislike' | null>(
    userHasLiked === null || userHasLiked === undefined 
      ? null 
      : userHasLiked 
        ? 'like' 
        : 'dislike'
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)

      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLike = async () => {
    const isLike = true
    const newRating = rating === 'like' ? null : 'like'
    setRating(newRating)

    if (onRatingChange) {
      try {
        await onRatingChange(postId, isLike)
      } catch  {
        setRating(rating)
      }
    }
  }

  const handleDislike = async () => {
    const isLike = false
    const newRating = rating === 'dislike' ? null : 'dislike'
    setRating(newRating)

    if (onRatingChange) {
      try {
        await onRatingChange(postId, isLike)
      } catch  {
        setRating(rating)
      }
    }
  }

  return (
    <div className="border-b border-indigo-700/30 p-2 pb-4 last:border-b-0 ">

      <div className="flex gap-3">

        <div className="flex flex-col items-center pt-1 flex-shrink-0 space-y-1">
          {authorProfilePic ? (
            <Image
              src={authorProfilePic}
              alt={author}
              width={48}
              height={48}
              className="rounded-full border border-indigo-600"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-indigo-700 border border-indigo-600 flex items-center justify-center text-sm font-semibold text-indigo-200">
              {author.charAt(0).toUpperCase()}
            </div>
          )}
          {authorPostCount !== undefined && (
            <span className="text-xs text-indigo-400 mt-1">{authorPostCount} posts</span>
          )}
        </div>

        <div className="flex-1 min-w-0 ">

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-sm text-indigo-200">{author}</div>
              <div className="text-xs text-indigo-400">{createdAt}</div>
            </div>
            {/* Dropdown menu */}
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
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this post?')) {
                            try {
                              await ForumPostService.delete(postId)
                              setIsDropdownOpen(false)
                              if (onDelete) onDelete()
                            } catch (error) {
                              console.error('Failed to delete post:', error)
                              alert('Failed to delete post. Please try again.')
                            }
                          }
                        }}
                        className="w-full px-3 py-2 text-left text-xs text-indigo-300 hover:bg-indigo-900/50 flex items-center gap-2 cursor-pointer "
                      >
                        <BiTrash size={14} />
                        Delete
                      </button>
                    </>
                  )}
                  {user?.username !== author && (
                    <button
                      onClick={() => {
                        if (onReport) onReport()
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

          <p className="text-indigo-100 mb-3 leading-relaxed">{content}</p>

          <div className="flex items-center gap-5 text-sm">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-200 transition-colors cursor-pointer"
            >
              {rating === 'like' ? <BiSolidLike size={18} /> : <BiLike size={18} />}
              <span>{likeCount}</span>
            </button>

            <button
              onClick={handleDislike}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-200 transition-colors cursor-pointer"
            >
              {rating === 'dislike' ? <BiSolidDislike size={18} /> : <BiDislike size={18} />}
              <span>{dislikeCount}</span>
            </button>

            <button
              onClick={onComment}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-200 transition-colors cursor-pointer"
            >
              <BiSolidCommentDots size={18} />
              <span>{commentCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
