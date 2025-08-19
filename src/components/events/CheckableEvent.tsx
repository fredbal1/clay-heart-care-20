
import React, { useState } from 'react'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayBadge } from '@/components/ui/clay-badge'
import { CheckCircle2 } from 'lucide-react'

interface Event {
  id: number
  title: string
  date: string
  type: 'vaccine' | 'treatment' | 'checkup'
  done: boolean
}

interface CheckableEventProps {
  event: Event
  onToggle: (eventId: number) => void
  isChecked: boolean
}

export function CheckableEvent({ event, onToggle, isChecked }: CheckableEventProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCheck = () => {
    setIsAnimating(true)
    onToggle(event.id)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const getBadgeEmoji = (type: string) => {
    switch (type) {
      case 'vaccine': return '💉'
      case 'treatment': return '💊'
      case 'checkup': return '🩺'
      default: return '📝'
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'vaccine': return 'warning'
      case 'treatment': return 'secondary'
      case 'checkup': return 'default'
      default: return 'secondary'
    }
  }

  return (
    <div className={`flex items-center gap-3 p-3 clay-subtle rounded-clay transition-all duration-300 ${
      isChecked || event.done ? 'opacity-75' : 'opacity-100'
    } ${isAnimating ? 'animate-soft-bounce' : ''}`}>
      <ClayButton
        variant="ghost"
        size="icon-sm"
        className={`h-7 w-7 rounded-full clay-raised transition-all duration-200 ${
          isChecked || event.done 
            ? 'bg-success text-success-foreground clay-floating shadow-success/20' 
            : 'clay-pressed hover:clay-raised'
        }`}
        onClick={handleCheck}
      >
        {(isChecked || event.done) && (
          <CheckCircle2 className="h-4 w-4 animate-signature-check" />
        )}
      </ClayButton>
      
      <div className="flex-1">
        <p className={`font-medium text-sm transition-all duration-200 ${
          isChecked || event.done 
            ? 'line-through text-muted-foreground' 
            : ''
        }`}>
          {event.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(event.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long'
          })}
        </p>
      </div>
      
      <ClayBadge 
        variant={getBadgeVariant(event.type)}
        shape="pill"
        className="transition-opacity duration-200"
      >
        {getBadgeEmoji(event.type)}
      </ClayBadge>
    </div>
  )
}

export type { Event }
