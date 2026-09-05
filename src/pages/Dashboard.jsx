import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Users,
  Clock,
  MapPin,
  Wheat,
  Timer,
  Ticket,
  Radio,
  CreditCard,
  Tags,
  Bell,
  ChevronRight,
  Sun,
  Droplets,
  Sparkles,
  Phone,
  MessageCircle,
  FileWarning,
  CheckCircle2,
  Circle,
  Loader2,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { centres, farmer, stats, tips } from '../data/mockData.js'
import { Card, LoadBadge, PrimaryButton, SectionHeading, StatusPill } from '../components/ui.jsx'
import { FarmerHeroIllustration, TipArt, SupportAgentIllustration } from '../components/Illustrations.jsx'
import QueueGauge from '../components/QueueGauge.jsx'

export default function Dashboard() {
  const {
    token,
    centre,
    currentServing,
    farmersAhead,
    estimatedWaitMin,
    completedSteps,
    currentStep,
    procurementSteps,
    notifications,
  } = useApp()

  const progress = 1 - farmersAhead / 20

  return (
    <div className="space-y-5 pb-10">
      {/* Top row: hero + today's token + weather */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <Card className="relative overflow-hidden xl:col-span-6 2xl:col-span-7">
          <div className="grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-5 sm:p-8">
            <div className="sm:col-span-3">
              <p className="text-xl font-bold text-ink-900">
                Welcome back, {farmer.firstName}! <span aria-hidden>👋</span>
              </p>
              <h1 className="mt-1 text-2xl font-extrabold leading-tight text-kisan-800 sm:text-3xl">
                Farmers First, A Stronger Tomorrow
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
                Book tokens, track queues, get fair prices and faster payments — all in one place.
              </p>
              <Link to="/book-token">
                <PrimaryButton className="mt-5">
                  Book Procurement Token
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </Link>
            </div>
            <div className="sm:col-span-2">
              <FarmerHeroIllustration className="mx-auto w-full max-w-[280px]" />
            </div>
          </div>
        </Card>

        <Card className="p-5 xl:col-span-4 2xl:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[15px] font-bold text-ink-900">Today&rsquo;s Token</p>
            <StatusPill tone="green">Active</StatusPill>
          </div>
          <p className="flex items-center gap-1 text-2xl font-extrabold text-kisan-700">
            <span className="text-lg text-kisan-500">#</span>
            {token.id}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-[11px] text-ink-400">Crop</p>
              <p className="font-semibold text-ink-800">{token.crop}</p>
            </div>
            <div>
              <p className="text-[11px] text-ink-400">Quantity</p>
              <p className="font-semibold text-ink-800">{token.quantity}</p>
            </div>
            <div>
              <p className="text-[11px] text-ink-400">Date</p>
              <p className="font-semibold text-ink-800">{token.date}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-kisan-50 p-3">
              <p className="flex items-center gap-1.5 text-[11px] text-kisan-700">
                <Users className="h-3.5 w-3.5" /> Farmers Ahead
              </p>
              <p className="mt-1 text-xl font-bold text-ink-900">{farmersAhead}</p>
            </div>
            <div className="rounded-xl bg-wheat-50 p-3">
              <p className="flex items-center gap-1.5 text-[11px] text-wheat-600">
                <Clock className="h-3.5 w-3.5" /> Estimated Wait
              </p>
              <p className="mt-1 text-xl font-bold text-ink-900">{estimatedWaitMin} min</p>
            </div>
          </div>
          <Link to="/live-queue">
            <PrimaryButton className="mt-4 w-full">
              View Live Queue
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </Link>
        </Card>

        <div className="flex flex-col gap-5 xl:col-span-2 2xl:col-span-2">
          <Card className="p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
              <MapPin className="h-3.5 w-3.5" /> {centre.village}, {centre.district}
            </p>
            <p className="mt-2 text-xs text-ink-400">05 Sep 2026</p>
            <div className="mt-3 flex items-center gap-2">
              <Sun className="h-9 w-9 text-wheat-400" />
              <p className="text-2xl font-extrabold text-ink-900">28°C</p>
            </div>
            <p className="text-xs text-ink-500">Partly Cloudy</p>
            <div className="mt-3 space-y-1.5 border-t border-kisan-100 pt-3 text-xs text-ink-500">
              <p className="flex items-center gap-1.5">
                <Droplets className="h-3.5 w-3.5 text-blue-400" /> Humidity 62%
              </p>
              <p className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-kisan-500" /> Good for Farming
              </p>
            </div>
          </Card>
          <Card className="flex-1 bg-gradient-to-br from-kisan-700 to-kisan-900 p-4 text-white">
            <p className="text-sm font-semibold leading-snug">
              &ldquo;Better Prices, Happier Farmers, Greener Tomorrow&rdquo;
            </p>
          </Card>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => {
          const icons = [MapPin, Users, Wheat, Timer]
          const Icon = icons[i]
          const tones = ['bg-kisan-100 text-kisan-700', 'bg-blue-50 text-blue-600', 'bg-wheat-100 text-wheat-600', 'bg-purple-50 text-purple-600']
          return (
            <Card key={s.id} className="flex items-center gap-3 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[i]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-ink-900">{s.value}</p>
                <p className="text-xs text-ink-400">{s.label}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick actions */}
      <div>
        <SectionHeading title="Quick Actions" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: 'Book Token', icon: Ticket, to: '/book-token', tone: 'bg-kisan-100 text-kisan-700' },
            { label: 'Live Queue', icon: Radio, to: '/live-queue', tone: 'bg-blue-50 text-blue-600' },
            { label: 'Find Centres', icon: MapPin, to: '/find-centres', tone: 'bg-kisan-100 text-kisan-700' },
            { label: 'Payments', icon: CreditCard, to: '/payments', tone: 'bg-wheat-100 text-wheat-600' },
            { label: 'My Tokens', icon: Tags, to: '/my-token', tone: 'bg-purple-50 text-purple-600' },
            { label: 'Notifications', icon: Bell, to: '/notifications', tone: 'bg-rose-50 text-rose-500' },
          ].map((a) => (
            <Link key={a.label} to={a.to}>
              <Card className="flex items-center gap-2.5 px-3.5 py-3 hover:border-kisan-300 hover:shadow-popover">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${a.tone}`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-ink-700">{a.label}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <Card className="p-5 xl:col-span-5">
          <SectionHeading
            title="Find Procurement Centres"
            action={
              <Link to="/find-centres" className="text-xs font-semibold text-kisan-700 hover:underline">
                View All
              </Link>
            }
          />
          <div className="mb-3 h-28 overflow-hidden rounded-xl bg-kisan-50">
            <MiniMap />
          </div>
          <ul className="space-y-2.5">
            {centres.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-xl border border-kisan-100 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-800">{c.name}</p>
                  <p className="text-xs text-ink-400">{c.farmersInQueue} farmers</p>
                </div>
                <LoadBadge load={c.load} />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[15px] font-bold text-ink-900">Live Queue Tracking</p>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" /> Live
            </span>
          </div>
          <p className="mb-3 text-xs text-ink-400">{centre.name}</p>
          <div className="flex justify-center">
            <QueueGauge progress={progress} size={150} strokeWidth={12}>
              <div className="text-center">
                <p className="text-[10px] text-ink-400">Currently Serving</p>
                <p className="text-xl font-extrabold text-ink-900">#{currentServing}</p>
              </div>
            </QueueGauge>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-kisan-50 px-3.5 py-2.5">
            <div>
              <p className="text-[11px] text-ink-400">Your Token</p>
              <p className="text-sm font-bold text-kisan-800">#{token.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-ink-400">Farmers Ahead</p>
              <p className="text-sm font-bold text-ink-800">{farmersAhead}</p>
            </div>
          </div>
          <Link to="/live-queue" className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-kisan-700 hover:underline">
            Open full tracker <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Card>

        <Card className="p-5 xl:col-span-2">
          <p className="mb-4 text-[15px] font-bold text-ink-900">Procurement Status</p>
          <ol className="space-y-4">
            {procurementSteps.map((step) => {
              const done = completedSteps.includes(step.key)
              const active = currentStep === step.key
              return (
                <li key={step.key} className="flex items-start gap-2.5">
                  {done ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kisan-600" />
                  ) : active ? (
                    <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-wheat-500" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-100" />
                  )}
                  <p className={`text-xs font-semibold leading-tight ${done ? 'text-ink-700' : active ? 'text-wheat-600' : 'text-ink-300'}`}>
                    {step.label}
                  </p>
                </li>
              )
            })}
          </ol>
          <Link to="/procurement-status" className="mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-kisan-700 hover:underline">
            Details <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Card>

        <Card className="p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[15px] font-bold text-ink-900">Payment &amp; History</p>
            <Link to="/payments" className="text-xs font-semibold text-kisan-700 hover:underline">
              View All
            </Link>
          </div>
          <p className="text-[11px] text-ink-400">Total Earnings</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xl font-extrabold text-ink-900">₹99,498</p>
            <StatusPill tone="orange">Processing</StatusPill>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-kisan-50 p-3 text-xs">
            <div>
              <p className="text-ink-400">Crop</p>
              <p className="font-semibold text-ink-800">Paddy</p>
            </div>
            <div>
              <p className="text-ink-400">Qty</p>
              <p className="font-semibold text-ink-800">42 Qtl</p>
            </div>
            <div>
              <p className="text-ink-400">Date</p>
              <p className="font-semibold text-ink-800">05 Sep</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications, tips, help */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Card className="p-5 lg:col-span-4">
          <SectionHeading
            title="Latest Notifications"
            action={
              <Link to="/notifications" className="text-xs font-semibold text-kisan-700 hover:underline">
                View All
              </Link>
            }
          />
          <ul className="space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <li key={n.id} className="flex items-start justify-between gap-3 border-b border-kisan-50 pb-3 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-800">{n.title}</p>
                  <p className="truncate text-xs text-ink-400">{n.detail}</p>
                </div>
                <span className="whitespace-nowrap text-[11px] text-ink-300">{n.time}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 lg:col-span-5">
          <SectionHeading title="Tips &amp; Updates" action={<span className="text-xs font-semibold text-kisan-700">View All</span>} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {tips.map((tip, i) => (
              <div key={tip.id} className="overflow-hidden rounded-xl border border-kisan-100">
                <TipArt variant={i === 0 ? 'prices' : i === 1 ? 'msp' : 'soil'} className="h-20 w-full object-cover" />
                <div className="p-3">
                  <p className="text-xs font-semibold leading-snug text-ink-800">{tip.title}</p>
                  <p className="mt-1.5 text-[11px] text-ink-400">{tip.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col justify-between gap-4 p-5 lg:col-span-3">
          <div>
            <p className="text-[15px] font-bold text-ink-900">Need Help?</p>
            <p className="mt-1 text-xs text-ink-400">Contact our support team for any queries.</p>
          </div>
          <div className="flex items-center gap-3">
            <SupportAgentIllustration className="h-16 w-16 shrink-0 rounded-xl" />
            <div className="grid flex-1 grid-cols-1 gap-2">
              <Link to="/help" className="flex items-center gap-2 rounded-lg bg-kisan-700 px-3 py-2 text-xs font-semibold text-white hover:bg-kisan-800">
                <Phone className="h-3.5 w-3.5" /> Call Helpline
              </Link>
              <Link to="/help" className="flex items-center gap-2 rounded-lg border border-kisan-200 px-3 py-2 text-xs font-semibold text-ink-700 hover:bg-kisan-50">
                <FileWarning className="h-3.5 w-3.5" /> Raise a Complaint
              </Link>
              <Link to="/help" className="flex items-center gap-2 rounded-lg border border-kisan-200 px-3 py-2 text-xs font-semibold text-ink-700 hover:bg-kisan-50">
                <MessageCircle className="h-3.5 w-3.5" /> Chat with Us
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function MiniMap() {
  return (
    <svg viewBox="0 0 400 130" className="h-full w-full">
      <rect width="400" height="130" fill="#EAF4EA" />
      <path d="M0 90 Q100 60 200 88 T400 70" stroke="#C3E2C6" strokeWidth="10" fill="none" />
      <path d="M40 0 Q60 60 30 130" stroke="#C3E2C6" strokeWidth="8" fill="none" />
      {centres.map((c) => (
        <g key={c.id} transform={`translate(${parseFloat(c.position.left) * 4},${parseFloat(c.position.top) * 1.3})`}>
          <circle r="7" fill={c.load === 'high' ? '#D6423C' : c.load === 'medium' ? '#D98F1F' : '#3F934A'} />
          <circle r="12" fill={c.load === 'high' ? '#D6423C' : c.load === 'medium' ? '#D98F1F' : '#3F934A'} opacity="0.25" />
        </g>
      ))}
      <circle cx="150" cy="55" r="4" fill="#153A1D" />
      <circle cx="150" cy="55" r="9" fill="none" stroke="#153A1D" strokeWidth="1.5" opacity="0.4" />
    </svg>
  )
}
