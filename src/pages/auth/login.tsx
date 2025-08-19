
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayInput } from '@/components/ui/clay-input'
import { ClayCard, ClayCardContent, ClayCardDescription, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { PawPrint, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    navigate('/')
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="inline-flex h-16 w-16 clay-floating rounded-full bg-primary items-center justify-center animate-soft-bounce">
            <PawPrint className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
              Bienvenue dans votre cocon
            </h1>
            <p className="text-muted-foreground text-bubble-up animate" style={{'--delay': '400ms'} as React.CSSProperties}>
              Connectez-vous à AnimaHub pour prendre soin de votre compagnon
            </p>
          </div>
        </div>

        {/* Login Form */}
        <ClayCard className="animate-soft-bounce" style={{'--delay': '600ms'} as React.CSSProperties}>
          <ClayCardHeader>
            <ClayCardTitle>Connexion</ClayCardTitle>
            <ClayCardDescription>
              Retrouvez l'univers de votre animal préféré
            </ClayCardDescription>
          </ClayCardHeader>
          
          <ClayCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <ClayInput
                    id="email"
                    type="email"
                    placeholder="clara@exemple.com"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <ClayInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    className="pl-10 pr-10"
                    required
                  />
                  <ClayButton
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </ClayButton>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <ClayButton
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Connexion...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </ClayButton>

              <div className="text-center text-sm text-muted-foreground">
                Pas encore de compte ?{' '}
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                  onClick={() => navigate('/register')}
                >
                  Créer un compte
                </button>
              </div>
            </form>
          </ClayCardContent>
        </ClayCard>
      </div>
    </div>
  )
}
