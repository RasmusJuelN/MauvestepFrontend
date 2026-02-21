'use client'

import { useState, useEffect } from 'react'
import { FAQService } from '@/lib/services/faqService'
import { FAQ } from '@/lib/types'
import PageContainer from "@/components/layout/PageContainer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import FaqCard from '@/components/support/faq/FaqCard'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler'
import Separator from '@/components/shared/Separator'
import PageHeader from '@/components/shared/PageHeader'

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFAQs = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await FAQService.getAll()
      setFaqs(data)
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load FAQs. Please try again."))
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFAQs()
  }, [])

  const categories = [...new Set(faqs.map(faq => faq.category))]

  return (
    <PageContainer>
      <div>
        <Breadcrumb items={[
          { label: 'Support', href: '/support' },
          { label: 'FAQ' }
        ]} />
        
        <PageHeader title="Frequently Asked Questions" />
        
        <p className="text-center text-indigo-300 mb-8">
          Find quick answers to common questions about the forum and game.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-600/50 text-red-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-indigo-300">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-8 text-indigo-400">No FAQs available.</div>
        ) : (
          <div>
            <div className="space-y-8">
              {categories.map(category => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-semibold text-indigo-400 mb-4">{category}</h3>
                  {faqs.filter(faq => faq.category === category).map(faq => (
                    <FaqCard
                      key={faq.id}
                      id={faq.id}
                      category={faq.category}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openId === faq.id}
                      onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-indigo-900/20 border border-indigo-700/30 rounded-lg text-center">
              <p className="text-indigo-300 mb-4">Didn&apos;t find what you&apos;re looking for?</p>
              <a
                href="/support/contact"
                className="inline-block px-6 py-2 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold rounded transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        )}
      </div>
      
    </PageContainer>
  )
}