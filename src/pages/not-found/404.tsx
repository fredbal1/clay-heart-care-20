
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClayButton } from '@/components/ui/clay-button'
import { Home } from 'lucide-react'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="text-center space-y-6 max-w-md">
        {/* Lottie Animation simulée */}
        <div className="mx-auto h-48 w-48 clay-floating rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center animate-soft-bounce">
          <div className="text-6xl animate-bounce">🐕</div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-bubble-up animate">
            Oups, chemin inconnu
          </h1>
          <p className="text-muted-foreground text-lg text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
            Il semblerait que Milo se soit un peu égaré. Pas de panique, nous pouvons le ramener au tableau de bord.
          </p>
        </div>

        <ClayButton
          size="xl"
          onClick={() => navigate('/')}
          className="animate-soft-bounce"
          style={{'--delay': '400ms'} as React.CSSProperties}
        >
          <Home className="mr-2 h-5 w-5" />
          Retour au tableau de bord
        </ClayButton>
      </div>
    </div>
  )
}
