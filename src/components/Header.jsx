import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { farmer } from '../data/mockData.js'
import { FarmerAvatar } from './Illustrations.jsx'

const LANGUAGES = ['English', 'हिंदी', 'मराठी']

export default function Header({ onMenuClick }) {
  const { unreadCount } = useApp()
  const navigate = useNavigate()
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('English')

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-kisan-100 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-ink-600 hover:bg-kisan-50 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden flex-1 max-w-xl items-center gap-2 rounded-xl bg-kisan-25 px-3.5 py-2.5 ring-1 ring-inset ring-kisan-100 sm:flex">
        <Search className="h-4 w-4 text-ink-400" />
        <input
          type="text"
          placeholder="Search centre, district, crop or token..."
          className="w-full bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            onClick={() => setLangOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-kisan-100 px-3 py-2 text-sm font-medium text-ink-600 hover:bg-kisan-50"
          >
            {lang}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {langOpen && (
            <div className="absolute right-0 z-30 mt-1.5 w-32 overflow-hidden rounded-xl border border-kisan-100 bg-white py-1 shadow-popover">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l)
                    setLangOpen(false)
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-ink-600 hover:bg-kisan-50"
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/notifications')}
          className="relative rounded-lg border border-kisan-100 p-2.5 text-ink-600 hover:bg-kisan-50"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 rounded-xl border border-kisan-100 py-1.5 pl-1.5 pr-3 hover:bg-kisan-50"
        >
          <FarmerAvatar size={32} />
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-semibold text-ink-800">{farmer.firstName} Nagpure</span>
            <span className="block text-[11px] text-ink-400">Farmer · {farmer.location}</span>
          </span>
        </button>
      </div>
    </header>
  )
}
