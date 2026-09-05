import React, { useState } from 'react'
import { Phone, MessageCircle, FileWarning, CheckCircle2 } from 'lucide-react'
import { Card, PrimaryButton, SecondaryButton } from '../components/ui.jsx'
import { SupportAgentIllustration } from '../components/Illustrations.jsx'

export default function Help() {
  const [complaint, setComplaint] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (!complaint.trim()) return
    setSent(true)
    setComplaint('')
  }

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink-900">Help &amp; Support</h1>
        <p className="mt-1 text-sm text-ink-500">We&rsquo;re here for every farmer, every step of the way.</p>
      </div>

      <Card className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left sm:p-8">
        <SupportAgentIllustration className="h-20 w-20 shrink-0 rounded-2xl" />
        <div>
          <p className="text-sm font-bold text-ink-900">Talk to our support team</p>
          <p className="mt-1 text-xs text-ink-500">Available 9 AM – 9 PM, all days of the week.</p>
        </div>
      </Card>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <a href="tel:1800123456" className="block">
          <Card className="flex h-full flex-col items-center gap-2 p-5 text-center hover:border-kisan-300">
            <Phone className="h-6 w-6 text-kisan-600" />
            <p className="text-sm font-semibold text-ink-800">Call Helpline</p>
            <p className="text-xs text-ink-400">1800-123-4567</p>
          </Card>
        </a>
        <button className="block text-left" type="button">
          <Card className="flex h-full flex-col items-center gap-2 p-5 text-center hover:border-kisan-300">
            <MessageCircle className="h-6 w-6 text-kisan-600" />
            <p className="text-sm font-semibold text-ink-800">Chat with Us</p>
            <p className="text-xs text-ink-400">Avg. reply in 2 min</p>
          </Card>
        </button>
        <div>
          <Card className="flex h-full flex-col items-center gap-2 p-5 text-center">
            <FileWarning className="h-6 w-6 text-kisan-600" />
            <p className="text-sm font-semibold text-ink-800">Raise a Complaint</p>
            <p className="text-xs text-ink-400">Use the form below</p>
          </Card>
        </div>
      </div>

      <Card className="mt-5 p-6 sm:p-8">
        <p className="mb-3 text-sm font-bold text-ink-900">Raise a Complaint</p>
        {sent ? (
          <p className="flex items-center gap-2 rounded-xl bg-kisan-50 p-4 text-sm font-semibold text-kisan-700">
            <CheckCircle2 className="h-5 w-5" /> Your complaint has been submitted. Our team will reach out shortly.
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              rows={4}
              placeholder="Describe the issue you're facing..."
              className="w-full rounded-xl border border-kisan-100 bg-kisan-25 p-3.5 text-sm outline-none focus:border-kisan-400"
            />
            <div className="flex gap-3">
              <PrimaryButton type="submit">Submit Complaint</PrimaryButton>
              <SecondaryButton type="button" onClick={() => setComplaint('')}>
                Clear
              </SecondaryButton>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}
