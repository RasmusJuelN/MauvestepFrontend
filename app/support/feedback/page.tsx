'use client'

import { useState } from 'react'
import { FeedbackService } from '@/lib/services/feedbackService'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler';import PageContainer from "@/components/layout/PageContainer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import Button from '@/components/shared/Button'
import { BiStar, BiSolidStar, BiChevronDown } from 'react-icons/bi'

const categoryOptions = [
  { value: 'general', label: 'General Feedback' },
  { value: 'gameplay', label: 'Gameplay' },
  { value: 'graphics', label: 'Graphics & UI' },
  { value: 'audio', label: 'Audio & Music' },
  { value: 'community', label: 'Community & Forum' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'other', label: 'Other' }
]

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    rating: 5,
    email: '',
    content: ''
  })
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await FeedbackService.create({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        rating: formData.rating
      })
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your feedback! We appreciate your input.' 
      })
      // Reset form
      setFormData({
        title: '',
        category: 'general',
        rating: 5,
        email: '',
        content: ''
      })
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to submit feedback. Please try again.');
      setSubmitStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageContainer>
      <div>
        <Breadcrumb items={[
          { label: 'Support', href: '/support' },
          { label: 'Feedback' }
        ]} />
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <h2 className="text-3xl text-indigo-500 font-semibold text-center">Share Your Feedback</h2>
        </div>
        
        <p className="text-center text-indigo-300 mb-8">
          Your feedback helps us improve. Tell us what you think!
        </p>

        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === 'success' 
              ? 'bg-green-900/30 border border-green-600/50 text-green-200' 
              : 'bg-red-900/30 border border-red-600/50 text-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <div className="mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-indigo-300 font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-indigo-950/50 border border-indigo-700/30 rounded text-indigo-200 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Brief summary of your feedback"
              />
            </div>

            <div className="relative">
              <label className="block text-indigo-300 font-semibold mb-2">
                Feedback Category *
              </label>
              <button
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full px-4 py-2 bg-indigo-950 border border-indigo-700/50 rounded-md shadow-lg text-sm text-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors flex items-center justify-between"
              >
                <span>{categoryOptions.find(options => options.value === formData.category)?.label}</span>
                <BiChevronDown className={`transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryDropdownOpen && (
                <div className="absolute w-full mt-1 bg-indigo-950 border border-indigo-700/50 rounded-md shadow-lg z-10">
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, category: option.value }) // Spread Operator - Keep existing formData properties
                        setIsCategoryDropdownOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-indigo-300 hover:bg-indigo-900 transition-colors cursor-pointer"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

           <div >
            <label className="block text-indigo-300 font-semibold mb-3">
                Overall Satisfaction *
              </label>
              <div className="flex justify-center gap-2 ">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="transition-transform hover:scale-110 cursor-pointer"
                  >
                    {star <= formData.rating ? (
                      <BiSolidStar size={36} className="text-indigo-600" />
                    ) : (
                      <BiStar size={36} className="text-indigo-700/80" />
                    )}
                  </button>
                ))}
              </div>
            </div>
              
            <div>
                <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-indigo-950/50 border border-indigo-700/30 rounded text-indigo-200 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="Share your thoughts, suggestions, or ideas..."
              />
            </div>
             
            <div>
              <label className="block text-indigo-300 font-semibold mb-2">
                Email (Optional)
              </label>
              <input type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-indigo-950/50 border border-indigo-700/30 rounded text-indigo-200 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="your.email@example.com"
              />
              <p className="text-indigo-400 text-sm mt-2">
                Provide your email if you&apos;d like us to follow up on your feedback.
              </p>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-indigo-900/20 border border-indigo-700/30 rounded-lg text-center">
            <p className="text-indigo-300 font-semibold mb-2">Thank you for helping us improve!</p>
            <p className="text-indigo-200 text-sm">
              Every piece of feedback is reviewed by our development team.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}