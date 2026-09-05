import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  centres,
  farmer,
  generateTokenId,
  initialNotifications,
  initialTransactions,
  procurementSteps,
} from '../data/mockData.js'

const AppContext = createContext(null)

const STEP_KEYS = procurementSteps.map((s) => s.key)

const AUTH_STORAGE_KEY = 'kisanqueue_auth'

function todayLabel() {
  return new Date(2026, 8, 5).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AppProvider({ children }) {
  // ----- Auth (frontend-only mock, no backend/JWT) -----
  const [authUser, setAuthUser] = useState(() => loadStoredAuth())

  const login = useCallback((mobile) => {
    const user = { mobile, name: farmer.firstName, loggedInAt: Date.now() }
    setAuthUser(user)
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } catch {
      /* localStorage unavailable — continue with in-memory auth only */
    }
    return user
  }, [])

  const registerUser = useCallback((payload) => {
    const user = {
      mobile: payload.mobile,
      name: payload.name || farmer.firstName,
      village: payload.village || '',
      loggedInAt: Date.now(),
    }
    setAuthUser(user)
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } catch {
      /* localStorage unavailable — continue with in-memory auth only */
    }
    return user
  }, [])

  const logout = useCallback(() => {
    setAuthUser(null)
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {
      /* no-op */
    }
  }, [])

  // ----- Token booking -----
  const [token, setToken] = useState({
    id: 'RK245',
    crop: 'Paddy',
    quantity: '42 Quintal',
    centreId: 'ramtek',
    date: todayLabel(),
    timeSlot: '10:00 AM – 12:00 PM',
    status: 'active',
  })

  // ----- Live queue (shared between farmer + operator view) -----
  const [currentServing, setCurrentServing] = useState(227)
  const [farmersAhead, setFarmersAhead] = useState(18)
  const [estimatedWaitMin, setEstimatedWaitMin] = useState(52)
  const [queueLog, setQueueLog] = useState([
    { id: 'q1', text: 'Queue is updated in real-time.', time: 'Just now' },
  ])

  // ----- Procurement status stepper -----
  const [completedSteps, setCompletedSteps] = useState(['booked', 'arrived', 'verification', 'quality'])
  const [currentStep, setCurrentStep] = useState('weighing')

  const [notifications, setNotifications] = useState(initialNotifications)
  const [transactions] = useState(initialTransactions)

  const centre = useMemo(
    () => centres.find((c) => c.id === token?.centreId) || centres[0],
    [token]
  )

  const bookToken = useCallback((payload) => {
    const newId = generateTokenId()
    const newToken = {
      id: newId,
      crop: payload.crop,
      quantity: `${payload.quantity} Quintal`,
      centreId: payload.centreId,
      date: payload.date,
      timeSlot: payload.timeSlot,
      status: 'active',
    }
    setToken(newToken)
    setCurrentServing(227)
    setFarmersAhead(18)
    setEstimatedWaitMin(52)
    setCompletedSteps(['booked'])
    setCurrentStep('arrived')
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: `Token #${newId} booked successfully`,
        detail: `${payload.crop} · ${centres.find((c) => c.id === payload.centreId)?.name || ''}`,
        time: 'Just now',
        type: 'token',
        unread: true,
      },
      ...prev,
    ])
    return newToken
  }, [])

  const advanceProcurementStatus = useCallback(() => {
    setCurrentStep((prevCurrent) => {
      const idx = STEP_KEYS.indexOf(prevCurrent)
      if (idx === -1 || idx >= STEP_KEYS.length - 1) return prevCurrent
      setCompletedSteps((prevCompleted) =>
        prevCompleted.includes(prevCurrent) ? prevCompleted : [...prevCompleted, prevCurrent]
      )
      return STEP_KEYS[idx + 1]
    })
  }, [])

  // ----- Operator actions -----
  const completeToken = useCallback(() => {
    setCurrentServing((prev) => prev + 1)
    setFarmersAhead((prev) => Math.max(prev - 1, 0))
    setEstimatedWaitMin((prev) => Math.max(prev - 4, 4))
    setQueueLog((prev) => [
      { id: `q-${Date.now()}`, text: `Token #RK${currentServing} marked complete.`, time: 'Just now' },
      ...prev,
    ])
  }, [currentServing])

  const skipToken = useCallback(() => {
    setCurrentServing((prev) => prev + 1)
    setQueueLog((prev) => [
      { id: `q-${Date.now()}`, text: `Token #RK${currentServing} skipped, moved to end of queue.`, time: 'Just now' },
      ...prev,
    ])
  }, [currentServing])

  const holdToken = useCallback(() => {
    setQueueLog((prev) => [
      { id: `q-${Date.now()}`, text: `Token #RK${currentServing} placed on hold.`, time: 'Just now' },
      ...prev,
    ])
  }, [currentServing])

  const markNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }, [])

  const unreadCount = notifications.filter((n) => n.unread).length

  const value = {
    isAuthenticated: !!authUser,
    authUser,
    login,
    registerUser,
    logout,
    token,
    centre,
    bookToken,
    currentServing,
    farmersAhead,
    estimatedWaitMin,
    queueLog,
    completeToken,
    skipToken,
    holdToken,
    completedSteps,
    currentStep,
    advanceProcurementStatus,
    procurementSteps,
    notifications,
    unreadCount,
    markNotificationsRead,
    transactions,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
