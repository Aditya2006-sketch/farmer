import React from 'react'
import { Bell, CreditCard, Info, CheckCheck } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { Card, PrimaryButton } from '../components/ui.jsx'

const ICONS = { token: Bell, payment: CreditCard, info: Info }

export default function Notifications() {
  const { notifications, markNotificationsRead } = useApp()

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink-900">Notifications</h1>
          <p className="mt-1 text-sm text-ink-500">Updates about your tokens, payments and centres.</p>
        </div>
        <PrimaryButton onClick={markNotificationsRead} className="text-xs">
          <CheckCheck className="h-4 w-4" /> Mark all read
        </PrimaryButton>
      </div>

      <Card className="p-2 sm:p-3">
        <ul>
          {notifications.map((n) => {
            const Icon = ICONS[n.type] || Bell
            return (
              <li key={n.id} className={`flex items-start gap-3 rounded-xl p-3.5 ${n.unread ? 'bg-kisan-25' : ''}`}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kisan-100 text-kisan-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-ink-800">{n.title}</p>
                    {n.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />}
                  </div>
                  <p className="mt-0.5 text-xs text-ink-500">{n.detail}</p>
                  <p className="mt-1 text-[11px] text-ink-300">{n.time}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
