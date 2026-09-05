import React from 'react'
import { ArrowDownToLine, Wheat, CalendarDays, Package } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { Card, StatusPill } from '../components/ui.jsx'

export default function Payments({ historyOnly = false }) {
  const { transactions, token } = useApp()

  return (
    <div className="mx-auto max-w-3xl pb-10">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink-900">{historyOnly ? 'History' : 'Payments'}</h1>
        <p className="mt-1 text-sm text-ink-500">Track earnings and past procurement payments.</p>
      </div>

      {!historyOnly && (
        <Card className="mb-5 p-6 sm:p-8">
          <p className="text-xs text-ink-400">Total Earnings</p>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <p className="text-3xl font-extrabold text-ink-900">₹99,498</p>
            <StatusPill tone="orange">Processing</StatusPill>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-kisan-50 p-4 text-sm">
            <div>
              <p className="flex items-center gap-1 text-[11px] text-ink-400">
                <Wheat className="h-3.5 w-3.5" /> Crop
              </p>
              <p className="mt-1 font-semibold text-ink-800">{token.crop}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-[11px] text-ink-400">
                <Package className="h-3.5 w-3.5" /> Quantity
              </p>
              <p className="mt-1 font-semibold text-ink-800">{token.quantity}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-[11px] text-ink-400">
                <CalendarDays className="h-3.5 w-3.5" /> Date
              </p>
              <p className="mt-1 font-semibold text-ink-800">{token.date}</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 sm:p-8">
        <p className="mb-4 text-sm font-bold text-ink-900">Recent Transactions</p>
        <ul className="space-y-1">
          {transactions.map((t) => (
            <li key={t.id} className="flex items-center justify-between border-b border-kisan-50 py-3 last:border-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-kisan-50 text-kisan-600">
                  <ArrowDownToLine className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-800">{t.label}</p>
                  <p className="text-xs text-ink-400">{t.date}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-kisan-700">+ ₹{t.amount.toLocaleString('en-IN')}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
