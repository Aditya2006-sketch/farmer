import React from 'react'
import { Phone, MapPin, Wheat, BadgeCheck, Edit3 } from 'lucide-react'
import { farmer } from '../data/mockData.js'
import { Card, SecondaryButton } from '../components/ui.jsx'
import { FarmerCropBadge } from '../components/Illustrations.jsx'

export default function Profile() {
  return (
    <div className="mx-auto max-w-2xl pb-10">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink-900">Profile</h1>
        <p className="mt-1 text-sm text-ink-500">Your farmer account details (demo data).</p>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <FarmerCropBadge className="h-28 w-28 shrink-0 rounded-2xl" />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-lg font-bold text-ink-900">{farmer.name}</p>
            <p className="text-sm text-ink-500">{farmer.role}</p>
            <SecondaryButton className="mt-3">
              <Edit3 className="h-3.5 w-3.5" /> Edit Profile
            </SecondaryButton>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-kisan-100 pt-6 sm:grid-cols-2">
          <InfoRow icon={Phone} label="Phone Number" value={farmer.phone} />
          <InfoRow icon={MapPin} label="Village / District" value={`${farmer.village}, ${farmer.district}`} />
          <InfoRow icon={Wheat} label="Primary Crops" value="Paddy, Wheat, Soybean" />
          <InfoRow icon={BadgeCheck} label="Farmer ID" value="KQ-2026-84213" />
        </div>
      </Card>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-kisan-25 p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-kisan-700 shadow-sm">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] text-ink-400">{label}</p>
        <p className="text-sm font-semibold text-ink-800">{value}</p>
      </div>
    </div>
  )
}
