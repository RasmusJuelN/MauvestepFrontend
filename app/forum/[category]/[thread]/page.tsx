'use client'

import { use, useState, useEffect } from 'react'
import Breadcrumb from '@/components/shared/Breadcrumb'
import PageHeader from '@/components/shared/PageHeader'
import PageContainer from '../../../../components/layout/PageContainer'

import ThreadComment from '../../../../components/forum/ThreadComment'
import ThreadPost from '../../../../components/forum/ThreadPost'
import CreatePostModal from '@/components/forum/CreatePostModal'
import Button from '@/components/shared/Button'
import { BiInfoCircle, BiPlus } from 'react-icons/bi'
import { BiChevronRight, BiChevronDown } from 'react-icons/bi'
import { ForumThreadService } from '@/lib/services/forumThreadService'
import { ForumPostService } from '@/lib/services/forumPostService'
import { ForumCommentService } from '@/lib/services/forumCommentService'
import { ForumThread, ForumPost, ForumComment, CreateForumCommentDto } from '@/lib/types'
import { useAuth } from '@/lib/hooks/authContext'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler'




interface PostWithComments extends ForumPost {
  comments: ForumComment[]
}
interface Props { 
  params: Promise<{ category: string; thread: string }> 
}
export default function ThreadPage({ params }: Props) {
  // Uses the dynamic route parameters to fetch the correct thread and its posts/comments
  const { category, thread } = use(params)
  const { user } = useAuth()
  
  const [threadData, setThreadData] = useState<ForumThread | null>(null)
  const [posts, setPosts] = useState<PostWithComments[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreatePostModal, setShowCreatePostModal] = useState(false)
  const [commentingOnPost, setCommentingOnPost] = useState<string | null>(null)
  const [commentData, setCommentData] = useState<CreateForumCommentDto>({
    forumPostId: '',
    content: ''
  })
  const [commentSubmitting, setCommentSubmitting] = useState(false)
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchThreadData()
  }, [thread])

  // Making three separate API calls to get thread, posts and comments. 
  // TODO: optimize to make a single API call that returns eveyrthing
  const fetchThreadData = async () => {
    try {
      setLoading(true)
      const threadData = await ForumThreadService.getById(thread)
      setThreadData(threadData)

      const threadPosts = await ForumThreadService.getThreadPosts(thread)

      const postsWithComments = await Promise.all(
        threadPosts.map(async (post) => {
          const comments = await ForumPostService.getPostComments(post.id)
          return { ...post, comments }
        })
      )

      setPosts(postsWithComments)
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load thread data. Please try again."))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateComment = async (e: React.FormEvent, postId: string) => {
    e.preventDefault()
    setCommentSubmitting(true)

    try {
      // console.log('creating comment with data:', commentData)
      // console.log('endpoint:', '/api/forumcomments')
      const result = await ForumCommentService.create(commentData)
      // console.log('comment created:', result)
      setCommentingOnPost(null)
      setCommentData({ forumPostId: '', content: '' })
      await fetchThreadData()
      // Automatically expand the comments to show the new comment
      setExpandedPosts(prev => new Set(prev).add(postId))
    } catch (err) {
      alert(getErrorMessage(err, "Failed to create comment. Please try again."))
      console.error(err)
    } finally {
      setCommentSubmitting(false)
    }
  }

  const handleCommentClick = (postId: string) => {
    if (commentingOnPost === postId) {
      setCommentingOnPost(null)
      setCommentData({ forumPostId: '', content: '' })
    } else {
      setCommentingOnPost(postId)
      setCommentData({ forumPostId: postId, content: '' })
    }
  }

  const handleRatingUpdatesForPost = async (postId: string, isLike: boolean) => {
    try {
      const updatedPost = await ForumPostService.rate(postId, isLike)
      // Update the post in the list with new rating counts
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.id === postId 
            ? { ...p, likeCount: updatedPost.likeCount, dislikeCount: updatedPost.dislikeCount } 
            : p
        )
      )
    } catch (err) {
      console.error('Failed to rate post:', err)
    }
  }

  const handleCommentRatingUpdatesForComment = async (commentId: string, isLike: boolean) => {
    try {
      const updatedComment = await ForumCommentService.rate(commentId, isLike)
      // Update the comment in the list with new rating counts
      setPosts(prevPosts => 
        prevPosts.map(post => ({
          ...post, comments: post.comments.map(c => 
            c.id === commentId 
              ? { ...c, likeCount: updatedComment.likeCount, dislikeCount: updatedComment.dislikeCount }
              : c
          )
        }))
      )
    } catch (err) {
      console.error('Failed to rate comment:', err)
    }
  }

  const showCommentsOnPost = (postId: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <PageContainer>
      <div>
        <Breadcrumb items={[
          { label: 'Forum', href: '/forum' },
          { label: 'Categories', href: '/forum' },
          { label: category, href: `/forum/${category}` },
          { label: threadData?.title || 'Thread' }
        ]} />
        
        <div className="relative">
          <PageHeader title={threadData?.title || 'Loading...'} />
          {user && threadData && (
            <Button
              onClick={() => setShowCreatePostModal(true)}
              className="absolute right-0 top-0 flex items-center gap-2"
            >
              <BiPlus size={16} />
              Post
            </Button>
          )}
        </div>
        
        <div className="bg-indigo-900/20 border border-indigo-700/30 rounded-lg p-3 mb-6 flex gap-3 items-center">
          <BiInfoCircle size={24} className="text-indigo-400 my-auto" />
          <p className="text-sm text-indigo-300">
            Keep a respectful and constructive tone while participating in forum discussions.
          </p>
        </div>

        {loading && <p className="text-center text-indigo-300">Loading posts...</p>}
        {!loading && posts.length === 0 && (
          <p className="text-center text-indigo-400">No posts found in this thread.</p>
        )}

        <div>
          {posts.map((post) => (
            <div key={post.id} className="mt-2  border-1 border-indigo-700/70 bg-indigo-900/10 rounded-lg mb-4">
              <ThreadPost
                postId={post.id}
                author={post.username}
                authorProfilePic={post.userProfilePictureUrl}
                authorPostCount={post.userPostCount}
                content={post.content}
                createdAt={new Date(post.createdAt).toLocaleDateString()}
                likeCount={post.likeCount}
                dislikeCount={post.dislikeCount}
                commentCount={post.comments?.length || 0}
                userHasLiked={post.userHasLiked}
                onComment={() => handleCommentClick(post.id)}
                onReport={() => console.log('Report clicked')}
                onDelete={() => fetchThreadData()}
                onRatingChange={handleRatingUpdatesForPost}
              />

              {post.comments && post.comments.length > 0 && (
                <div className="m-4">
                  <button
                    onClick={() => showCommentsOnPost(post.id)}
                    className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 cursor-pointer"
                  >
                    {expandedPosts.has(post.id) ? 
                    <BiChevronDown size={18} /> : 
                    <BiChevronRight size={18} />}
                    {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
                  </button>
                </div>
              )}

              {user && commentingOnPost === post.id && (
                <div>
                  <form onSubmit={(e) => handleCreateComment(e, post.id)} className="space-y-3 px-4">
                    <textarea
                      value={commentData.content}
                      onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 bg-indigo-900/30 border border-indigo-700 rounded-lg text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="Write your comment..."
                      required
                    />
                    <div className="flex gap-2 pb-4">
                      <Button
                        type="button"
                        variant="cancel"
                        onClick={() => {
                          setCommentingOnPost(null)
                          setCommentData({ forumPostId: '', content: '' })
                        }}
                        className="text-sm px-3 py-1.5"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        loading={commentSubmitting}
                        className="text-sm px-3 py-1.5"
                      >
                        {commentSubmitting ? 'Commenting...' : 'Comment'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {post.comments && post.comments.length > 0 && expandedPosts.has(post.id) && (
                <div className=" mt-3 space-y-3 ">
                  {post.comments.map((comment) => (
                    <div key={comment.id}>
                      <ThreadComment 
                        commentId={comment.id}
                        comment={comment.content} 
                        author={comment.username} 
                        date={new Date(comment.createdAt).toLocaleDateString()}
                        likeCount={comment.likeCount}
                        dislikeCount={comment.dislikeCount}
                        userHasLiked={comment.userHasLiked}
                        onRatingChange={handleCommentRatingUpdatesForComment}
                        onCommentDelete={() => fetchThreadData()}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* {index < posts.length - 1 && <Separator />} */}
            </div>
          ))}
        </div>
      </div>


      <CreatePostModal 
        isOpen={showCreatePostModal} 
        onClose={() => setShowCreatePostModal(false)} 
        thread={thread} 
        onPostCreated={fetchThreadData}
      />
    </PageContainer>
  )
}
