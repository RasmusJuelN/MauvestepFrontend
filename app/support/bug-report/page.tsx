'use client'

import { useState } from 'react'
import PageContainer from "@/components/layout/PageContainer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import Button from '@/components/shared/Button'
import { BiChevronDown, BiInfoCircle } from 'react-icons/bi'
import { BugReportService } from '@/lib/services/bugReportService'
import { BugReportSeverity } from '@/lib/DTOs/bugReport'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler'

const categoryOptions = [
  { value: "general", label: 'General' },
  { value: 'gameplay', label: 'Gameplay' },
  { value: 'graphics', label: 'Graphics' },
  { value: 'audio', label: 'Audio' },
  { value: 'ui', label: 'User Interface' },
  { value: 'performance', label: 'Performance' },
  { value: 'other', label: 'Other' }
]

export default function BugReportPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    description: '',
    severity: 'medium'
  })
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      let severityEnum: BugReportSeverity
      switch (formData.severity) {
        case 'low':
          severityEnum = BugReportSeverity.Low
          break
        case 'medium':
          severityEnum = BugReportSeverity.Medium
          break
        case 'high':
          severityEnum = BugReportSeverity.High
          break
        case 'critical':
          severityEnum = BugReportSeverity.Critical
          break
        default:
          severityEnum = BugReportSeverity.Medium
      }

      await BugReportService.create({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        severity: severityEnum
      })

      setSuccessMessage('Bug report submitted successfully! Thank you for helping us improve the game.')
      setFormData({
        title: '',
        category: 'general',
        description: '',
        severity: 'medium'
      })
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to submit bug report. Please try again.')
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageContainer>
      <div>
        <Breadcrumb items={[
          { label: 'Support', href: '/support' },
          { label: 'Bug Report' }
        ]} />
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <h2 className="text-3xl text-indigo-500 font-semibold text-center">Report a Bug</h2>
        </div>
        
        <div className="bg-indigo-900/20 border border-indigo-700/30 rounded-lg p-4 mb-6 flex gap-3 justify-center ">
          <BiInfoCircle size={28} className="text-indigo-400 my-auto" />
          <p className="text-sm text-indigo-300">
            Please provide as much detail as possible about the bug you encountered. This helps us identify and fix the issue faster.
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-300">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-300">{errorMessage}</p>
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-indigo-300 font-semibold mb-2">Bug Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-700/50 rounded text-indigo-100 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              placeholder="Brief description of the bug"
            />
          </div>

          <div className="relative">
            <label className="block text-indigo-300 font-semibold mb-2">Category *</label>
            <div>
              <span className="text-indigo-400 text-sm mb-2 block">Select the category that best fits the bug.</span>
            </div>
            <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)} 
            className="w-full px-4 py-2 bg-indigo-950 border border-indigo-700/50 rounded-md shadow-lg text-sm text-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors flex items-center justify-between cursor-pointer">
              <span>{categoryOptions.find(options => options.value === formData.category)?.label}</span>
              <BiChevronDown className={`transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-indigo-950 border border-indigo-700/50 rounded-md shadow-lg z-10">
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

          <div>
            <label className="block text-indigo-300 font-semibold mb-2">Severity *</label>
            <div className="flex gap-4">
              {['low', 'medium', 'high', 'critical'].map(level => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={formData.severity === level}
                    onChange={(e) => setFormData({...formData, severity: e.target.value})}
                    className="accent-indigo-500"
                  />
                  <span className="text-indigo-300 capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-indigo-300 font-semibold mb-2">Bug Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={5}
              className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-700/50 rounded text-indigo-100 placeholder-indigo-400/90 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              placeholder="What happened? What did you expect to happen?"
            />
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            fullWidth
          >
            {isSubmitting ? 'Submitting...' : 'Submit Bug Report'}
          </Button>
        </form>
        </div>

    </PageContainer>
  )
}