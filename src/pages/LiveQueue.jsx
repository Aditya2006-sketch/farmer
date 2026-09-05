import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Clock, Bell, CheckCircle2, Monitor } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { Card, PrimaryButton, SecondaryButton } from '../components/ui.jsx'
import QueueGauge from '../components/QueueGauge.jsx'

export default function LiveQueue() {
  const { token, centre, currentServing, farmersAhead, estimatedWaitMin, queueLog } = useApp()
  const [notifyOn, setNotifyOn] = useState(false)
  const progress = 1 - farmersAhead / 20

  return (
    <div className="mx-auto max-w-3xl pb-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink-900">Live Queue Tracking</h1>
          <p className="mt-1 text-sm text-ink-500">{centre.name}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" /> Live
        </span>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <div className="flex justify-center">
            <QueueGauge progress={progress} size={220} strokeWidth={16}>
              <div className="text-center">
                <p className="text-xs text-ink-400">Currently Serving</p>
                <p className="text-4xl font-extrabold text-ink-900">#{currentServing}</p>
              </div>
            </QueueGauge>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-kisan-50 p-4">
              <p className="text-[11px] text-ink-400">Your Token</p>
              <p className="text-2xl font-extrabold text-kisan-700">#{token.id}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-kisan-100 p-3">
                <p className="flex items-center gap-1.5 text-[11px] text-ink-400">
                  <Users className="h-3.5 w-3.5" /> Farmers Ahead
                </p>
                <p className="mt-1 text-xl font-bold text-ink-900">{farmersAhead}</p>
              </div>
              <div className="rounded-xl border border-kisan-100 p-3">
                <p className="flex items-center gap-1.5 text-[11px] text-ink-400">
                  <Clock className="h-3.5 w-3.5" /> Est. Waiting Time
                </p>
                <p className="mt-1 text-xl font-bold text-ink-900">{estimatedWaitMin} min</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-kisan-25 p-4 text-center text-sm text-ink-500">
          Queue is updated in real-time. Stay nearby and get notified when it&rsquo;s your turn.
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton className="flex-1" onClick={() => setNotifyOn(true)} disabled={notifyOn}>
            {notifyOn ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> We&rsquo;ll Notify You
              </>
            ) : (
              <>
                <Bell className="h-4 w-4" /> Notify Me
              </>
            )}
          </PrimaryButton>
          <Link to="/operator" className="flex-1">
            <SecondaryButton className="w-full">
              <Monitor className="h-4 w-4" /> Open Operator Demo
            </SecondaryButton>
          </Link>
        </div>
      </Card>

      <Card className="mt-5 p-6">
        <p className="mb-3 text-sm font-bold text-ink-900">Queue Activity</p>
        <ul className="space-y-3">
          {queueLog.map((log) => (
            <li key={log.id} className="flex items-center justify-between border-b border-kisan-50 pb-3 text-sm last:border-0 last:pb-0">
              <span className="text-ink-600">{log.text}</span>
              <span className="whitespace-nowrap text-xs text-ink-300">{log.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
