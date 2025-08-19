
import React from 'react'
import { Bot, Sparkles, Heart } from 'lucide-react'

export function AnimaBotMascot() {
  return (
    <div className="relative flex flex-col items-center justify-center py-8 px-6">
      {/* Fond décoratif animé */}
      <div className="absolute inset-0 overflow-hidden rounded-clay">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Mascotte centrale */}
      <div className="relative z-10 clay-floating rounded-full p-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 mb-6">
        <div className="relative">
          {/* Corps principal du bot */}
          <div className="w-16 h-16 clay-raised rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
          
          {/* Particules flottantes */}
          <div className="absolute -top-2 -right-2 animate-bounce">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <div className="absolute -bottom-1 -left-2 animate-bounce" style={{animationDelay: '0.5s'}}>
            <Heart className="h-3 w-3 text-success" />
          </div>
        </div>
      </div>
      
      {/* Message d'accueil */}
      <div className="text-center space-y-2 relative z-10">
        <h2 className="text-xl font-semibold text-foreground">
          Bonjour Clara ! 👋
        </h2>
        <p className="text-muted-foreground text-sm max-w-md">
          Je suis AnimaBot, votre assistant IA spécialisé dans le bien-être animal. 
          Comment puis-je vous aider avec Milo aujourd'hui ?
        </p>
      </div>
      
      {/* Suggestions rapides */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center relative z-10">
        {[
          "Conseils santé 🏥",
          "Comportement 🐾",
          "Alimentation 🍖",
          "Jeux & exercices 🎾"
        ].map((suggestion, index) => (
          <div
            key={suggestion}
            className="px-3 py-1.5 clay-subtle rounded-full text-xs text-muted-foreground cursor-pointer hover:clay-raised transition-all duration-200 animate-soft-bounce"
            style={{'--delay': `${index * 100}ms`} as React.CSSProperties}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  )
}
