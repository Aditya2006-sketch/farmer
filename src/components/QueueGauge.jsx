import React from 'react'

/**
 * Circular gauge visualizing how close the farmer's token is to being served.
 * progress: 0..1 (higher = closer to being served)
 */
export default function QueueGauge({ progress = 0.3, size = 176, strokeWidth = 14, children }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(Math.max(progress, 0.03), 1)
  const dashOffset = circumference * (1 - clamped)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E9ECE9"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3F934A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="animate-dash"
          style={{ '--dash-start': circumference, '--dash-end': dashOffset }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}
