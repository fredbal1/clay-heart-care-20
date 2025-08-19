
import React from 'react'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Blob animé principal */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 rounded-full opacity-[0.03] animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            top: '10%',
            left: '15%',
            animationDuration: '8s',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-[0.04] animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)',
            top: '60%',
            right: '10%',
            animationDuration: '12s',
            animationDelay: '2s'
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-[0.03] animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
            bottom: '20%',
            left: '60%',
            animationDuration: '10s',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-[0.02] animate-bounce"
            style={{
              background: `hsl(var(--${['primary', 'secondary', 'accent'][i % 3]}))`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
