import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wheat, MapPin, CalendarDays, Clock3, Package, ArrowRight, PartyPopper } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { centres, crops, timeSlots } from '../data/mockData.js'
import { Card, PrimaryButton, SecondaryButton } from '../components/ui.jsx'
import { SuccessFarmerIllustration } from '../components/Illustrations.jsx'

function todayISO() {
  return new Date(2026, 8, 5).toISOString().slice(0, 10)
}

export default function BookToken() {
  const { bookToken } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    crop: crops[0],
    quantity: '40',
    centreId: centres[0].id,
    date: todayISO(),
    timeSlot: timeSlots[2],
  })
  const [confirmed, setConfirmed] = useState(null)
  const [errors, setErrors] = useState({})

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = {}
    if (!form.quantity || Number(form.quantity) <= 0) nextErrors.quantity = 'Enter a valid quantity in quintals.'
    if (!form.date) nextErrors.date = 'Please select a date.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const dateLabel = new Date(form.date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    const newToken = bookToken({ ...form, date: dateLabel })
    setConfirmed(newToken)
  }

  const selectedCentre = centres.find((c) => c.id === form.centreId)

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl pb-10 pt-6">
        <Card className="animate-pop p-8 text-center">
          <SuccessFarmerIllustration className="mx-auto h-40 w-40" />
          <p className="mt-4 flex items-center justify-center gap-2 text-lg font-bold text-kisan-800">
            <PartyPopper className="h-5 w-5 text-wheat-500" /> Token Booked Successfully
          </p>
          <p className="mt-2 text-sm text-ink-500">
            Your procurement token has been generated. Keep it handy at the centre.
          </p>
          <div className="mx-auto mt-6 max-w-xs rounded-2xl border-2 border-dashed border-kisan-300 bg-kisan-50 p-5">
            <p className="text-xs text-ink-500">Token Number</p>
            <p className="text-3xl font-extrabold text-kisan-700">#{confirmed.id}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-left text-xs">
              <div>
                <p className="text-ink-400">Crop</p>
                <p className="font-semibold text-ink-800">{confirmed.crop}</p>
              </div>
              <div>
                <p className="text-ink-400">Quantity</p>
                <p className="font-semibold text-ink-800">{confirmed.quantity}</p>
              </div>
              <div>
                <p className="text-ink-400">Centre</p>
                <p className="font-semibold text-ink-800">{selectedCentre?.name}</p>
              </div>
              <div>
                <p className="text-ink-400">Slot</p>
                <p className="font-semibold text-ink-800">{confirmed.timeSlot}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryButton onClick={() => navigate('/my-token')}>
              View My Token <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/live-queue')}>Track Live Queue</SecondaryButton>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink-900">Book Procurement Token</h1>
        <p className="mt-1 text-sm text-ink-500">Fill in your crop details to reserve a slot at your nearest centre.</p>
      </div>

      <Card className="p-6 sm:p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Field label="Crop" icon={Wheat}>
            <select
              value={form.crop}
              onChange={(e) => update('crop', e.target.value)}
              className="input"
            >
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Quantity (Quintal)" icon={Package} error={errors.quantity}>
            <input
              type="number"
              min="1"
              value={form.quantity}
              onChange={(e) => update('quantity', e.target.value)}
              className="input"
              placeholder="e.g. 42"
            />
          </Field>

          <Field label="Procurement Centre" icon={MapPin}>
            <select
              value={form.centreId}
              onChange={(e) => update('centreId', e.target.value)}
              className="input"
            >
              {centres.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.farmersInQueue} in queue
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Date" icon={CalendarDays} error={errors.date}>
              <input
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Time Slot" icon={Clock3}>
              <select
                value={form.timeSlot}
                onChange={(e) => update('timeSlot', e.target.value)}
                className="input"
              >
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <PrimaryButton type="submit" className="w-full">
            Book Token <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </form>
      </Card>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #E9ECE9;
          background: #F7FAF7;
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          color: #232823;
          outline: none;
        }
        .input:focus {
          border-color: #3F934A;
          box-shadow: 0 0 0 3px rgba(63,147,74,0.15);
        }
      `}</style>
    </div>
  )
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-600">
        <Icon className="h-3.5 w-3.5 text-kisan-600" /> {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  )
}
