import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  Radio,
  MapPin,
  CreditCard,
  Tags,
  History,
  Bell,
  UserCircle2,
  HelpCircle,
  LogOut,
  Sprout,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/book-token', label: 'Book Token', icon: Ticket },
  { to: '/live-queue', label: 'Live Queue', icon: Radio },
  { to: '/find-centres', label: 'Find Centres', icon: MapPin },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/my-token', label: 'My Tokens', icon: Tags },
  { to: '/history', label: 'History', icon: History },
  { to: '/notifications', label: 'Notifications', icon: Bell, badgeKey: 'unread' },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
  { to: '/help', label: 'Help & Support', icon: HelpCircle },
]

export default function Sidebar({ onNavigate }) {
  const { unreadCount, logout } = useApp()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    onNavigate?.()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-kisan-100 bg-white">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-kisan-600 text-white">
          <Sprout className="h-5 w-5" strokeWidth={2.4} />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-bold text-ink-900">KisanQueue</p>
          <p className="text-[11px] text-ink-400">Less Waiting. Smarter Procurement.</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const badge = item.badgeKey === 'unread' ? unreadCount : 0
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-kisan-600 text-white shadow-sm'
                    : 'text-ink-600 hover:bg-kisan-50 hover:text-kisan-800'
                }`
              }
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
              <span className="flex-1">{item.label}</span>
              {badge > 0 && (
                <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                  {badge}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="mx-3 mb-3 overflow-hidden rounded-2xl bg-gradient-to-b from-kisan-50 to-kisan-100 p-4 text-center">
        <p className="text-[13px] font-semibold leading-snug text-kisan-800">
          &ldquo;Kisan ki Mehnat, Desh ki Shakti&rdquo;
        </p>
        <p className="mt-2 text-[11px] leading-snug text-kisan-700">
          Together for a Greener, Stronger India
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mx-3 mb-5 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50"
      >
        <LogOut className="h-[18px] w-[18px]" strokeWidth={2.1} />
        Logout
      </button>
    </aside>
  )
}
