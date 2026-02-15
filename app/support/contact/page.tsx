'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/authContext'
import { SupportTicketService } from '@/lib/services/supportTicketService'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler';import PageContainer from "@/components/layout/PageContainer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import Button from '@/components/shared/Button'


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await SupportTicketService.create(formData)
      setSubmitStatus({ 
        type: 'success', 
        message: 'Your support ticket has been submitted successfully! We\'ll get back to you soon.' 
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to submit contact form. Please try again.');
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
          { label: 'Contact' }
        ]} />
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <h2 className="text-3xl text-indigo-500 font-semibold text-center">Support ticket</h2>
        </div>
        
        <p className="text-center text-indigo-300 mb-8">
          Need help? Send us a message and we&apos;ll get back to you as soon as possible.
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
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-indigo-950/50 border border-indigo-700/30 rounded text-indigo-200 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-indigo-300 font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-indigo-950/50 border border-indigo-700/30 rounded text-indigo-200 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-indigo-300 font-semibold mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-indigo-950/50 border border-indigo-700/30 rounded text-indigo-200 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Brief description of your inquiry"
              />
            </div>

            <div>
              <label className="block text-indigo-300 font-semibold mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-indigo-950/50 border border-indigo-700/30 rounded text-indigo-200 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-indigo-900/20 border border-indigo-700/30 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-300 mb-3">Response Time</h3>
            <p className="text-indigo-200 text-sm">
              We typically respond within 24-48 hours. For urgent issues, please check our{' '}
              <a href="/support/faq" className="text-indigo-400 hover:underline">FAQ</a> for immediate answers.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}