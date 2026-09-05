import React from 'react'

const LOAD_STYLES = {
  high: 'bg-rose-50 text-rose-600',
  medium: 'bg-wheat-100 text-wheat-600',
  low: 'bg-kisan-100 text-kisan-700',
}

const LOAD_LABEL = {
  high: 'High Queue',
  medium: 'Medium Queue',
  low: 'Low Queue',
}

export function LoadBadge({ load }) {
  return (
    <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${LOAD_STYLES[load]}`}>
      {LOAD_LABEL[load]}
    </span>
  )
}

export function StatusPill({ children, tone = 'green' }) {
  const tones = {
    green: 'bg-kisan-100 text-kisan-700',
    orange: 'bg-wheat-100 text-wheat-600',
    red: 'bg-rose-50 text-rose-600',
    blue: 'bg-blue-50 text-blue-600',
  }
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>
}

export function Card({ children, className = '', ...rest }) {
  return (
    <div className={`rounded-2xl border border-kisan-100 bg-white shadow-card ${className}`} {...rest}>
      {children}
    </div>
  )
}

export function SectionHeading({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-[15px] font-bold text-ink-900">{title}</h2>
      {action}
    </div>
  )
}

export function PrimaryButton({ children, className = '', ...rest }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-kisan-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-kisan-800 active:bg-kisan-900 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({ children, className = '', ...rest }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-kisan-200 bg-white px-4 py-2.5 text-sm font-semibold text-kisan-800 transition-colors hover:bg-kisan-50 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
