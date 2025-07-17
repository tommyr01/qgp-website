'use client'

import { useState } from 'react'
import { trackDownload, trackEmailCapture } from './Analytics'

interface Template {
  id: string
  name: string
  description: string
  fileName: string
  fileType: string
  icon: string
}

const templates: Template[] = [
  {
    id: 'checklist',
    name: 'Implementation Checklist',
    description: 'Step-by-step checklist to implement meeting automation in 4 weeks',
    fileName: 'meeting-automation-checklist.md',
    fileType: 'Markdown',
    icon: '✅'
  },
  {
    id: 'airtable',
    name: 'Airtable Meeting Template',
    description: 'Pre-built database structure for organizing meeting data',
    fileName: 'airtable-meeting-template.csv',
    fileType: 'CSV',
    icon: '📊'
  },
  {
    id: 'slack',
    name: 'Slack Workflow Template',
    description: 'Automated workflow for posting summaries and action items',
    fileName: 'slack-workflow-template.json',
    fileType: 'JSON',
    icon: '💬'
  }
]

export default function DownloadSection() {
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set())
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [email, setEmail] = useState('')

  const handleDownload = (template: Template) => {
    // Track download analytics
    trackDownload(template.fileName)
    
    // Track download
    setDownloadedItems(new Set([...downloadedItems, template.id]))
    
    // Trigger download
    const link = document.createElement('a')
    link.href = `/downloads/${template.fileName}`
    link.download = template.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show email capture after first download
    if (downloadedItems.size === 0) {
      setTimeout(() => setShowEmailCapture(true), 1000)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track email capture
    trackEmailCapture(email)
    
    // TODO: Send email to backend
    console.log('Email submitted:', email)
    setShowEmailCapture(false)
  }

  return (
    <div className="my-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Free Templates & Resources</h2>
        <p className="text-gray-600">
          Everything you need to get started with meeting automation
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {templates.map(template => (
          <div key={template.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{template.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Format: {template.fileType}</span>
              {downloadedItems.has(template.id) && (
                <span className="text-sm text-green-600">✓ Downloaded</span>
              )}
            </div>
            <button
              onClick={() => handleDownload(template)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download {template.fileType}
            </button>
          </div>
        ))}
      </div>

      {/* Email Capture Modal */}
      {showEmailCapture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Get More Resources</h3>
            <p className="text-gray-600 mb-6">
              Join our newsletter for weekly automation tips and exclusive templates
            </p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailCapture(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  No Thanks
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bonus Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
        <p className="text-gray-700 mb-6">
          Get personalized guidance from our automation experts
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Watch Video Tutorial
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  )
}