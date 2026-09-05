# KisanQueue — Frontend MVP

A frontend-only, clickable MVP for an agricultural procurement token & queue
management platform. **No backend, no database, no real auth/payments** —
everything runs on mock data and React state.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- lucide-react icons
- react-router-dom
- Original hand-built SVG illustrations (no stock photography)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a static production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx                 # App entry point, router + context providers
  App.jsx                  # Route definitions
  index.css                # Tailwind directives + global styles
  data/mockData.js         # All mock data (centres, tips, notifications, ...)
  context/AppContext.jsx   # Shared app state (token, queue, procurement status)
  components/
    Sidebar.jsx            # Left navigation
    Header.jsx             # Top bar: search, language, notifications, profile
    QueueGauge.jsx          # Circular queue-progress visualization
    Illustrations.jsx      # Original SVG farmer/agriculture illustrations
    ui.jsx                 # Small shared UI primitives (buttons, badges, cards)
  layouts/AppLayout.jsx    # Sidebar + header shell used by every page
  pages/
    Dashboard.jsx
    BookToken.jsx
    MyToken.jsx
    LiveQueue.jsx
    ProcurementStatus.jsx
    FindCentres.jsx
    Payments.jsx
    OperatorDashboard.jsx
    Notifications.jsx
    Profile.jsx
    Help.jsx
    Login.jsx
    NotFound.jsx
```

## Demo flow

The most important interactive flow for demonstrations:

1. **Dashboard** → click **Book Procurement Token**
2. Fill the **Book Token** form → submit → a new mock token (e.g. `#RK245`) is
   generated and a confirmation screen is shown
3. Go to **Live Queue** to see the circular queue tracker for your token
4. Open **Operator Dashboard** (via the "Open Operator Demo" button on the
   Live Queue page, or `/operator`)
5. Click **Complete Token** — the currently-serving token advances, farmers
   ahead decreases, and estimated wait drops
6. Go back to the farmer's **Dashboard** / **Live Queue** — the numbers have
   updated live, because both views read from the same shared React context

**Procurement Status** has its own "Advance to Next Step (Demo)" button so you
can walk a token through Booked → Arrived → Verification → Quality Check →
Weighing → Procurement → Payment.

## Notes

- All data is defined in `src/data/mockData.js` and `src/context/AppContext.jsx`.
  There is no network activity anywhere in the app.
- Farmer/agriculture visuals are original SVG illustrations (see
  `src/components/Illustrations.jsx`), not stock photography.
- The QR code on the "My Token" page is a decorative, deterministically
  generated pattern for visual purposes only — it is not a real scannable code.
