import React, { useState } from 'react'
import { X } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'

export default function AppLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-kisan-25">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile drawer sidebar */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 animate-pop">
            <div className="relative h-full">
              <Sidebar onNavigate={() => setDrawerOpen(false)} />
              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute right-3 top-3 rounded-lg bg-white p-1.5 text-ink-500 shadow-card"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
