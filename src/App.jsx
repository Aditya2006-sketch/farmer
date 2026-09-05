import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BookToken from './pages/BookToken.jsx'
import MyToken from './pages/MyToken.jsx'
import LiveQueue from './pages/LiveQueue.jsx'
import ProcurementStatus from './pages/ProcurementStatus.jsx'
import FindCentres from './pages/FindCentres.jsx'
import Payments from './pages/Payments.jsx'
import OperatorDashboard from './pages/OperatorDashboard.jsx'
import Notifications from './pages/Notifications.jsx'
import Profile from './pages/Profile.jsx'
import Help from './pages/Help.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'
import { useApp } from './context/AppContext.jsx'

/** Gate for the main app: unauthenticated visitors are sent to /login.
 * Once signed in, wraps the page in the shared sidebar + header layout. */
function RequireAuth() {
  const { isAuthenticated } = useApp()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Public, full-page auth routes (no sidebar/header) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected app routes (sidebar/header + auth required) */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/book-token" element={<BookToken />} />
        <Route path="/my-token" element={<MyToken />} />
        <Route path="/live-queue" element={<LiveQueue />} />
        <Route path="/procurement-status" element={<ProcurementStatus />} />
        <Route path="/find-centres" element={<FindCentres />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/history" element={<Payments historyOnly />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/operator" element={<OperatorDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
