import React from 'react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl font-extrabold text-kisan-200">404</p>
      <p className="mt-2 text-sm text-ink-500">This page doesn&rsquo;t exist in the KisanQueue demo.</p>
      <Link to="/">
        <PrimaryButton className="mt-5">Back to Dashboard</PrimaryButton>
      </Link>
    </div>
  )
}
