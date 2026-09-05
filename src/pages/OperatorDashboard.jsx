import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, SkipForward, PauseCircle, Users, Clock, ArrowLeft, Monitor } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { Card, PrimaryButton, SecondaryButton } from '../components/ui.jsx'
import QueueGauge from '../components/QueueGauge.jsx'

export default function OperatorDashboard() {
  const { centre, currentServing, farmersAhead, estimatedWaitMin, completeToken, skipToken, holdToken, queueLog } = useApp()
  const [flash, setFlash] = useState(null)

  function handle(action, label) {
    action()
    setFlash(label)
    window.clearTimeout(handle._t)
    handle._t = window.setTimeout(() => setFlash(null), 1600)
  }

  return (
    <div className="mx-auto max-w-3xl pb-10">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
            <Monitor className="h-3.5 w-3.5" /> Operator Demo
          </p>
          <h1 className="mt-1 text-xl font-bold text-ink-900">{centre.name}</h1>
        </div>
        <Link to="/live-queue" className="flex items-center gap-1.5 text-xs font-semibold text-kisan-700 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Farmer View
        </Link>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <div className="flex justify-center">
            <QueueGauge progress={0.5} size={200} strokeWidth={16}>
              <div className="text-center">
                <p className="text-xs text-ink-400">Current Token</p>
                <p className="text-4xl font-extrabold text-ink-900">#RK{currentServing}</p>
              </div>
            </QueueGauge>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-kisan-100 p-3">
                <p className="flex items-center gap-1.5 text-[11px] text-ink-400">
                  <Users className="h-3.5 w-3.5" /> Farmers Ahead (next)
                </p>
                <p className="mt-1 text-xl font-bold text-ink-900">{farmersAhead}</p>
              </div>
              <div className="rounded-xl border border-kisan-100 p-3">
                <p className="flex items-center gap-1.5 text-[11px] text-ink-400">
                  <Clock className="h-3.5 w-3.5" /> Est. Wait (next)
                </p>
                <p className="mt-1 text-xl font-bold text-ink-900">{estimatedWaitMin} min</p>
              </div>
            </div>
            <p className="rounded-xl bg-wheat-50 p-3 text-xs text-wheat-600">
              Actions here update the farmer&rsquo;s Live Queue and Dashboard in real time via shared app state.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PrimaryButton onClick={() => handle(completeToken, `Token #RK${currentServing} completed`)}>
            <CheckCircle2 className="h-4 w-4" /> Complete Token
          </PrimaryButton>
          <SecondaryButton onClick={() => handle(skipToken, `Token #RK${currentServing} skipped`)}>
            <SkipForward className="h-4 w-4" /> Skip
          </SecondaryButton>
          <SecondaryButton onClick={() => handle(holdToken, `Token #RK${currentServing} on hold`)}>
            <PauseCircle className="h-4 w-4" /> Hold
          </SecondaryButton>
        </div>

        {flash && (
          <p className="mt-4 animate-pop rounded-xl bg-kisan-50 p-3 text-center text-sm font-semibold text-kisan-700">
            {flash}
          </p>
        )}
      </Card>

      <Card className="mt-5 p-6">
        <p className="mb-3 text-sm font-bold text-ink-900">Activity Log</p>
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
