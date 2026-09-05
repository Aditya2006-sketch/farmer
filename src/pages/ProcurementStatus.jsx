import React from 'react'
import { CheckCircle2, Circle, Loader2, ArrowRightCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { Card, PrimaryButton } from '../components/ui.jsx'

export default function ProcurementStatus() {
  const { token, centre, completedSteps, currentStep, procurementSteps, advanceProcurementStatus } = useApp()
  const isFinished = currentStep === procurementSteps[procurementSteps.length - 1].key && completedSteps.includes(currentStep)

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink-900">Procurement Status</h1>
        <p className="mt-1 text-sm text-ink-500">
          Token #{token.id} · {centre.name}
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <ol className="space-y-0">
          {procurementSteps.map((step, i) => {
            const done = completedSteps.includes(step.key)
            const active = currentStep === step.key
            const isLast = i === procurementSteps.length - 1
            return (
              <li key={step.key} className="relative flex gap-4 pb-8 last:pb-0">
                {!isLast && (
                  <span
                    className={`absolute left-[15px] top-8 h-full w-0.5 ${
                      done ? 'bg-kisan-500' : 'bg-ink-100'
                    }`}
                  />
                )}
                <span className="relative z-10 shrink-0">
                  {done ? (
                    <CheckCircle2 className="h-8 w-8 text-kisan-600" />
                  ) : active ? (
                    <Loader2 className="h-8 w-8 animate-spin text-wheat-500" />
                  ) : (
                    <Circle className="h-8 w-8 text-ink-100" />
                  )}
                </span>
                <div className="pt-1">
                  <p className={`text-sm font-bold ${done ? 'text-ink-800' : active ? 'text-wheat-600' : 'text-ink-300'}`}>
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-400">
                    {done ? 'Completed' : active ? 'In progress · at the centre' : 'Pending'}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        {!isFinished ? (
          <>
            <PrimaryButton className="mt-2 w-full" onClick={advanceProcurementStatus}>
              <ArrowRightCircle className="h-4 w-4" /> Advance to Next Step (Demo)
            </PrimaryButton>
            <p className="mt-3 rounded-xl bg-wheat-50 p-3 text-center text-xs text-wheat-600">
              You will be notified at each step. Please stay at the centre.
            </p>
          </>
        ) : (
          <p className="mt-2 rounded-xl bg-kisan-50 p-4 text-center text-sm font-semibold text-kisan-700">
            All steps completed — payment has been processed for this token. 🎉
          </p>
        )}
      </Card>
    </div>
  )
}
