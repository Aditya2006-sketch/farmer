import React, { useMemo, useState } from 'react'
import { Search, MapPin, Navigation2, Users, Clock } from 'lucide-react'
import { centres } from '../data/mockData.js'
import { Card, LoadBadge, PrimaryButton } from '../components/ui.jsx'

export default function FindCentres() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(centres[0].id)

  const filtered = useMemo(
    () =>
      centres.filter((c) =>
        `${c.name} ${c.village} ${c.district}`.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  )
  const selected = centres.find((c) => c.id === selectedId) || filtered[0]

  return (
    <div className="pb-10">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink-900">Find Procurement Centres</h1>
        <p className="mt-1 text-sm text-ink-500">Nearby centres, live queue load and directions.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <Card className="p-5 xl:col-span-5">
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-kisan-25 px-3.5 py-2.5 ring-1 ring-inset ring-kisan-100">
            <Search className="h-4 w-4 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by district, village or pincode..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
            />
          </div>
          <ul className="space-y-2.5">
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full rounded-xl border px-3.5 py-3 text-left transition-colors ${
                    selectedId === c.id ? 'border-kisan-400 bg-kisan-50' : 'border-kisan-100 hover:bg-kisan-25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-ink-800">{c.name}</p>
                    <LoadBadge load={c.load} />
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-400">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {c.farmersInQueue} farmers
                    </span>
                    <span className="flex items-center gap-1">
                      <Navigation2 className="h-3.5 w-3.5" /> {c.distanceKm} km away
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {c.waitEstimate}
                    </span>
                  </div>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-ink-400">No centres match your search.</p>
            )}
          </ul>
        </Card>

        <Card className="overflow-hidden p-0 xl:col-span-7">
          <div className="relative h-72 sm:h-96">
            <BigMap selected={selected} onSelect={setSelectedId} />
          </div>
          {selected && (
            <div className="border-t border-kisan-100 p-5">
              <p className="text-sm font-bold text-ink-900">{selected.name}</p>
              <p className="mt-1 text-xs text-ink-400">
                {selected.distanceKm} km away · {selected.farmersInQueue} farmers in queue · Est. wait {selected.waitEstimate}
              </p>
              <p className="mt-2 text-xs text-ink-500">Accepts: {selected.crops.join(', ')}</p>
              <PrimaryButton className="mt-4">
                <MapPin className="h-4 w-4" /> Get Directions
              </PrimaryButton>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function BigMap({ selected, onSelect }) {
  const color = { high: '#D6423C', medium: '#D98F1F', low: '#3F934A' }
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full">
      <rect width="600" height="400" fill="#EAF4EA" />
      <path d="M0 260 Q150 220 300 255 T600 230" stroke="#D8ECD9" strokeWidth="26" fill="none" />
      <path d="M120 0 Q160 180 90 400" stroke="#D8ECD9" strokeWidth="20" fill="none" />
      <path d="M450 0 Q420 200 500 400" stroke="#D8ECD9" strokeWidth="18" fill="none" />
      {centres.map((c) => {
        const x = (parseFloat(c.position.left) / 100) * 600
        const y = (parseFloat(c.position.top) / 100) * 400
        const isSelected = c.id === selected?.id
        return (
          <g key={c.id} transform={`translate(${x},${y})`} className="cursor-pointer" onClick={() => onSelect(c.id)}>
            <circle r={isSelected ? 22 : 16} fill={color[c.load]} opacity="0.18" />
            <circle r={isSelected ? 11 : 8} fill={color[c.load]} stroke="#FFFFFF" strokeWidth="2.5" />
            {isSelected && (
              <text y="-24" textAnchor="middle" fontSize="13" fontWeight="700" fill="#171B17">
                {c.name.split(' ')[0]}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
