import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, CalendarDays, Clock3, Wheat, Package, Radio, Download } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { Card, PrimaryButton, SecondaryButton, StatusPill } from '../components/ui.jsx'

function QrCode({ seed }) {
  // Deterministic pseudo-QR pattern generated from the token id — purely decorative,
  // not a real scannable code, but visually communicates "QR ticket".
  const size = 11
  let s = 0
  for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i) * (i + 7)
  const cells = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      s = (s * 9301 + 49297) % 233280
      const on = s / 233280 > 0.52
      const isFinder =
        (x < 3 && y < 3) || (x > size - 4 && y < 3) || (x < 3 && y > size - 4)
      cells.push({ x, y, on: on || isFinder })
    }
  }
  const cell = 14
  return (
    <svg width={size * cell} height={size * cell} className="rounded-lg bg-white p-2">
      {cells.map((c, i) => (
        <rect key={i} x={c.x * cell} y={c.y * cell} width={cell} height={cell} fill={c.on ? '#153A1D' : '#FFFFFF'} />
      ))}
    </svg>
  )
}

export default function MyToken() {
  const { token, centre, farmersAhead, estimatedWaitMin } = useApp()

  return (
    <div className="mx-auto max-w-3xl pb-10">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink-900">My Token</h1>
        <p className="mt-1 text-sm text-ink-500">Show this at the centre gate for quick verification.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-kisan-700 to-kisan-900 p-6 text-white sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-kisan-100">Procurement Token</p>
              <p className="mt-1 text-3xl font-extrabold">#{token.id}</p>
            </div>
            <StatusPill tone="green">Active</StatusPill>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 sm:p-8">
          <div className="sm:col-span-2 space-y-4">
            <Row icon={MapPin} label="Centre" value={centre.name} />
            <Row icon={Wheat} label="Crop" value={token.crop} />
            <Row icon={Package} label="Quantity" value={token.quantity} />
            <Row icon={CalendarDays} label="Date" value={token.date} />
            <Row icon={Clock3} label="Time Slot" value={token.timeSlot} />

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl bg-kisan-50 p-3 text-center">
                <p className="text-[11px] text-ink-400">Farmers Ahead</p>
                <p className="text-lg font-bold text-ink-900">{farmersAhead}</p>
              </div>
              <div className="rounded-xl bg-wheat-50 p-3 text-center">
                <p className="text-[11px] text-ink-400">Estimated Wait</p>
                <p className="text-lg font-bold text-ink-900">{estimatedWaitMin} min</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-kisan-200 bg-kisan-25 p-4">
            <QrCode seed={token.id} />
            <p className="text-center text-[11px] text-ink-400">Scan at centre entry (demo visual)</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-kisan-100 p-6 sm:flex-row sm:p-8">
          <Link to="/live-queue" className="flex-1">
            <PrimaryButton className="w-full">
              <Radio className="h-4 w-4" /> Track Live Queue
            </PrimaryButton>
          </Link>
          <SecondaryButton className="flex-1">
            <Download className="h-4 w-4" /> Save Token
          </SecondaryButton>
        </div>
      </Card>
    </div>
  )
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-kisan-50 pb-3 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kisan-50 text-kisan-700">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] text-ink-400">{label}</p>
        <p className="text-sm font-semibold text-ink-800">{value}</p>
      </div>
    </div>
  )
}
