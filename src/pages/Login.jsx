import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  Smartphone,
  KeyRound,
  ArrowRight,
  Sprout,
  Clock,
  IndianRupee,
  ShieldCheck,
  Leaf,
  User,
  ChevronDown,
  Loader2,
  Users,
  Building2,
  BadgeCheck,
  Globe,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { FarmerHeroIllustration } from '../components/Illustrations.jsx'

const DEMO_MOBILE = '9876543210'
const DEMO_OTP = '123456'
const LANGUAGES = ['English', 'हिंदी', 'मराठी']

const FEATURES = [
  { icon: Clock, label: 'Save Time' },
  { icon: IndianRupee, label: 'Fair Prices' },
  { icon: ShieldCheck, label: 'Transparent Process' },
  { icon: Leaf, label: 'Digital India' },
]

const STATS = [
  { icon: Users, value: '10M+', label: 'Farmers Empowered' },
  { icon: Building2, value: '1,200+', label: 'Procurement Centres' },
  { icon: Sprout, value: '50+', label: 'Crops Supported' },
  { icon: BadgeCheck, value: '100%', label: 'Transparency' },
]

function onlyDigits(value, maxLen) {
  return value.replace(/\D/g, '').slice(0, maxLen)
}

export default function Login() {
  const { isAuthenticated, login } = useApp()
  const navigate = useNavigate()

  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [resendIn, setResendIn] = useState(0)
  const [error, setError] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('English')
  const otpInputRef = useRef(null)

  useEffect(() => {
    if (resendIn <= 0) return undefined
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  function isValidMobile(value) {
    return /^[6-9]\d{9}$/.test(value)
  }

  function handleSendOtp(e) {
    e?.preventDefault()
    setError('')
    if (!isValidMobile(mobile)) {
      setError('Enter a valid 10-digit mobile number.')
      return
    }
    setSending(true)
    // Simulated network delay — no real SMS/OTP API in this MVP.
    setTimeout(() => {
      setSending(false)
      setOtpSent(true)
      setResendIn(30)
      setTimeout(() => otpInputRef.current?.focus(), 50)
    }, 500)
  }

  function handleVerify(e) {
    e?.preventDefault()
    setError('')
    if (!isValidMobile(mobile)) {
      setError('Enter a valid 10-digit mobile number.')
      return
    }
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP sent to your mobile.')
      return
    }
    if (otp !== DEMO_OTP) {
      setError('Incorrect OTP. Use 123456 for this demo.')
      return
    }
    setVerifying(true)
    setTimeout(() => {
      login(mobile, { rememberMe })
      setVerifying(false)
      navigate('/', { replace: true })
    }, 400)
  }

  function handleDemoLogin() {
    setError('')
    setMobile(DEMO_MOBILE)
    setOtp(DEMO_OTP)
    setOtpSent(true)
    setVerifying(true)
    setTimeout(() => {
      login(DEMO_MOBILE, { rememberMe: true })
      setVerifying(false)
      navigate('/', { replace: true })
    }, 400)
  }

  return (
    <div className="min-h-screen bg-kisan-25">
      {/* Top utility bar */}
      <div className="flex items-center justify-end gap-3 px-4 py-3 sm:px-6 lg:px-10">
        <div className="relative">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-kisan-200 bg-white px-3 py-2 text-sm font-medium text-ink-600 hover:bg-kisan-50"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {langOpen && (
            <div className="absolute right-0 z-30 mt-1.5 w-32 overflow-hidden rounded-xl border border-kisan-100 bg-white py-1 shadow-popover">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  type="button"
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
        <div className="hidden items-center gap-1.5 rounded-lg border border-kisan-200 bg-white px-3.5 py-2 text-sm text-ink-600 sm:flex">
          New to KisanQueue?{' '}
          <Link to="/register" className="font-semibold text-kisan-700 hover:text-kisan-800">
            Create Account
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-10">
        {/* Hero panel */}
        <div className="hidden flex-col lg:flex">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-kisan-600 text-white">
              <Sprout className="h-6 w-6" strokeWidth={2.4} />
            </div>
            <div className="leading-tight">
              <p className="text-xl font-extrabold text-ink-900">KisanQueue</p>
              <p className="text-[13px] text-ink-500">Less Waiting. Smarter Procurement.</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-kisan-700">
            <span className="h-[2px] w-8 bg-kisan-600" />
            Digital Solutions for a Stronger Tomorrow
          </div>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-ink-900 xl:text-[44px]">
            Farmers First,
            <br />
            <span className="text-kisan-700">A Stronger Tomorrow</span>
          </h1>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-500">
            Book procurement tokens, track live queues, and stay informed about procurement and
            payments — all in one place.
          </p>

          <div className="mt-6 grid grid-cols-4 gap-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl bg-kisan-100/70 px-2 py-4 text-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kisan-700 shadow-sm">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold leading-tight text-ink-800">{label}</span>
              </div>
            ))}
          </div>

          <div className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-b from-kisan-100 to-kisan-200/70">
            <FarmerHeroIllustration className="h-56 w-full xl:h-64" />
            <p className="absolute left-5 top-5 max-w-[180px] font-serif text-lg italic leading-snug text-kisan-800">
              &ldquo;Kisan ki Mehnat, Desh ki Shakti&rdquo;
            </p>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-kisan-800/90 px-3.5 py-2 text-xs font-semibold text-white shadow-card">
              <Leaf className="h-3.5 w-3.5" />
              Together for a Greener, Stronger India
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5 rounded-2xl border border-kisan-100 bg-white px-3 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kisan-100 text-kisan-700">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-ink-900">{value}</p>
                  <p className="text-[10px] text-ink-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-only compact hero */}
        <div className="flex flex-col items-center text-center lg:hidden">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kisan-600 text-white">
              <Sprout className="h-5 w-5" strokeWidth={2.4} />
            </div>
            <div className="text-left leading-tight">
              <p className="text-lg font-extrabold text-ink-900">KisanQueue</p>
              <p className="text-[11px] text-ink-500">Less Waiting. Smarter Procurement.</p>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold leading-tight text-ink-900">
            Farmers First, <span className="text-kisan-700">A Stronger Tomorrow</span>
          </h1>
        </div>

        {/* Login card */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-kisan-100 bg-white p-6 shadow-popover sm:p-8">
            <div className="hidden items-center gap-2.5 lg:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kisan-600 text-white">
                <Sprout className="h-5 w-5" strokeWidth={2.4} />
              </div>
              <div className="leading-tight">
                <p className="text-lg font-extrabold text-ink-900">KisanQueue</p>
                <p className="text-[11px] text-ink-500">Less Waiting. Smarter Procurement.</p>
              </div>
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-ink-900 lg:mt-6">Welcome Back!</h2>
            <p className="mt-1 text-sm text-ink-500">Login to continue to your farmer dashboard.</p>

            <form onSubmit={otpSent ? handleVerify : handleSendOtp} className="mt-6 space-y-5">
              <div>
                <label htmlFor="mobile" className="mb-1.5 block text-sm font-semibold text-ink-800">
                  Mobile Number
                </label>
                <div className="flex items-stretch gap-2">
                  <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-kisan-200 bg-white px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-kisan-500/40">
                    <Smartphone className="h-4 w-4 shrink-0 text-ink-400" />
                    <input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="9876543210"
                      value={mobile}
                      disabled={otpSent}
                      onChange={(e) => setMobile(onlyDigits(e.target.value, 10))}
                      className="w-full bg-transparent text-sm text-ink-800 outline-none placeholder:text-ink-400 disabled:text-ink-500"
                    />
                  </div>
                  <button
                    type={otpSent ? 'button' : 'submit'}
                    onClick={otpSent ? handleSendOtp : undefined}
                    disabled={sending || resendIn > 0}
                    className="shrink-0 rounded-xl bg-kisan-100 px-4 text-sm font-semibold text-kisan-800 transition-colors hover:bg-kisan-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : resendIn > 0 ? (
                      `Resend (${resendIn}s)`
                    ) : otpSent ? (
                      'Resend OTP'
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-ink-400">Enter your registered mobile number</p>
              </div>

              {otpSent && (
                <div className="animate-pop">
                  <label htmlFor="otp" className="mb-1.5 block text-sm font-semibold text-ink-800">
                    Enter OTP
                  </label>
                  <div className="flex items-center gap-2.5 rounded-xl border border-kisan-200 bg-white px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-kisan-500/40">
                    <KeyRound className="h-4 w-4 shrink-0 text-ink-400" />
                    <input
                      id="otp"
                      ref={otpInputRef}
                      type="password"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="123456"
                      value={otp}
                      maxLength={6}
                      onChange={(e) => setOtp(onlyDigits(e.target.value, 6))}
                      className="w-full bg-transparent tracking-[0.3em] text-sm text-ink-800 outline-none placeholder:tracking-normal placeholder:text-ink-400"
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <p className="text-xs text-ink-400">Enter the 6-digit OTP (Use 123456 for demo)</p>
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{error}</p>
              )}

              {otpSent && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-ink-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-kisan-300 text-kisan-600 focus:ring-kisan-500"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setError('OTP resent. Use 123456 for this demo.')}
                    className="font-semibold text-kisan-700 underline-offset-2 hover:underline"
                  >
                    Forgot OTP?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={verifying || (!otpSent && sending)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-kisan-800 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-kisan-900 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {verifying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : otpSent ? (
                  <>
                    Verify &amp; Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-kisan-100" />
              <span className="text-xs font-semibold text-ink-400">OR</span>
              <span className="h-px flex-1 bg-kisan-100" />
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={verifying}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-kisan-100 px-4 py-3 text-sm font-semibold text-kisan-800 transition-colors hover:bg-kisan-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <User className="h-4 w-4" />
              Login with Demo Account
            </button>
            <p className="mt-1.5 text-center text-xs text-ink-400">Use demo credentials to explore the platform</p>

            <div className="mt-5 flex items-center justify-center gap-3 text-[11px] text-ink-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-kisan-600" /> Secure
              </span>
              <span className="text-kisan-200">|</span>
              <span>Simple</span>
              <span className="text-kisan-200">|</span>
              <span>For a Better Tomorrow</span>
            </div>

            <p className="mt-5 text-center text-sm text-ink-500 sm:hidden">
              New to KisanQueue?{' '}
              <Link to="/register" className="font-semibold text-kisan-700 hover:text-kisan-800">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
