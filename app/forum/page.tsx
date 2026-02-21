'use client'

import { useState, useEffect } from 'react'
import PageContainer from '../../components/layout/PageContainer'
import CategoryCard from '../../components/forum/CategoryCard'
import CreateCategoryModal from '@/components/forum/CreateCategoryModal'
import Link from 'next/link'
import Breadcrumb from '@/components/shared/Breadcrumb'
import PageHeader from '@/components/shared/PageHeader'
import { ForumCategoryService } from '@/lib/services/forumCategoryService'
import { ForumCategory } from '@/lib/types'
import { useAuth } from '@/lib/hooks/authContext'
import Button from '@/components/shared/Button'
import { BiPlus } from 'react-icons/bi'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler'

export default function ForumIndex() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await ForumCategoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load forum categories. Please try again.'))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }



  return (
    <PageContainer>
      <div className="space-y-4 ">
        <Breadcrumb items={[
        { label: 'Forum', href: '/forum' },
        { label: 'Categories'}
      ]} />
        
        
        <div className="relative mb-4">
          <PageHeader title="Categories" />
          {user?.role === 'Admin' && (
            <Button
              onClick={() => setShowCreateCategoryModal(true)}
              className="absolute right-0 top-0 flex items-center gap-2"
            >
              <BiPlus size={16} />Category
            </Button>
          )}
        </div>
        
        <p className="text-center text-indigo-300 mb-8">
          Use the forum to discuss game strategies, in-game events or connect with other players. Choose a category below to get started.
        </p>

        {loading && <p className="text-center text-indigo-300">Loading categories...</p>}

        {error && (
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {!loading && categories.length === 0 && (
          <p className="text-center text-indigo-400">No categories found.</p>
        )}

        <div className='space-y-2'>
          {categories.map((c) => (
            <div key={c.id} >
              <Link href={`/forum/${c.name.toLowerCase()}`}>
                <CategoryCard name={c.name} description={c.description} threads={c.threadCount} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <CreateCategoryModal
        isOpen={showCreateCategoryModal}
        onClose={() => setShowCreateCategoryModal(false)}
        onCategoryCreated={fetchCategories}
      />
    </PageContainer>
  )
}
