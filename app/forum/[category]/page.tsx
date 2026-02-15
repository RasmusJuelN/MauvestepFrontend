'use client'

import { use, useState, useEffect } from 'react'
import PageContainer from '../../../components/layout/PageContainer'
import ThreadCard from '../../../components/forum/ThreadCard'
import CreateThreadModal from '@/components/forum/CreateThreadModal'
import Link from 'next/link'
import Breadcrumb from '@/components/shared/Breadcrumb'
import { ForumCategoryService } from '@/lib/services/forumCategoryService'

import { ForumThread, ForumCategory } from '@/lib/types'
import { useAuth } from '@/lib/hooks/authContext'
import Button from '@/components/shared/Button'
import { BiPlus } from 'react-icons/bi'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler'

interface Props { 
  params: Promise<{ category: string }> 
}

export default function CategoryPage({ params }: Props) {
  const { user } = useAuth()
  const { category } = use(params)
  const [categoryData, setCategoryData] = useState<ForumCategory | null>(null)
  const [threads, setThreads] = useState<ForumThread[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateThreadModal, setShowCreateThreadModal] = useState(false)

  useEffect(() => {
    fetchCategoryAndThreads()
  }, [category])

  const fetchCategoryAndThreads = async () => {
    try {
      setLoading(true)
      // Gets all the categories to find the one matching the name
      const categories = await ForumCategoryService.getAll()
      const foundCategory = categories.find(
        c => c.name.toLowerCase() === category.toLowerCase()
      )

      if (!foundCategory) {
        setError('Category not found')
        return
      }

      setCategoryData(foundCategory)
      const threadData = await ForumCategoryService.getCategoryThreads(foundCategory.id)
      setThreads(threadData)
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load threads. Please try again.'))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }



  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumb items={[
          { label: 'Forum', href: '/forum' },
          { label: 'Categories', href: '/forum' },
          { label: category }
        ]} />
        
        <div className="relative">
          <h2 className="text-3xl text-indigo-500 font-semibold text-center capitalize">
            {categoryData?.name || category}
          </h2>
          {user && (
            <Button
              onClick={() => setShowCreateThreadModal(true)}
              className="absolute right-0 top-0 flex items-center gap-2"
            > 
              <BiPlus size={16} />
              Thread
            </Button>
          )}
        </div>
        
        {categoryData && (
          <p className="text-center text-indigo-300 mb-8">
            {categoryData.description}
          </p>
        )}

        {loading && <p className="text-center text-indigo-300">Loading threads...</p>}

        {error && (
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {!loading && threads.length === 0 && (
          <p className="text-center text-indigo-400">No threads found in this category.</p>
        )}

        <div className='space-y-2'>
          {threads.map((t) => (
            <div key={t.id}>
              <Link href={`/forum/${category}/${t.id}`}>
                <ThreadCard 
                  title={t.title} 
                  author={t.username} 
                  replies={t.postCount} 
                  date={new Date(t.createdAt).toLocaleDateString()} 
                  className="" 
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <CreateThreadModal
        isOpen={showCreateThreadModal}
        onClose={() => setShowCreateThreadModal(false)}
        category={categoryData?.id || ''}
        onThreadCreated={fetchCategoryAndThreads}
      />
    </PageContainer>
  )
}
