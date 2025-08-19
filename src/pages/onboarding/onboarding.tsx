
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayInput } from '@/components/ui/clay-input'
import { ClayCard, ClayCardContent } from '@/components/ui/clay-card'
import { ChevronLeft, ChevronRight, Upload, Heart, Syringe, Check } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: "Bienvenue dans votre cocon",
    subtitle: "AnimaHub transforme le suivi de santé de votre compagnon en une expérience simple et sereine.",
    content: "welcome"
  },
  {
    id: 2,
    title: "Présentez-moi votre ami",
    subtitle: "Chaque compagnon est unique. Remplissons ensemble sa fiche pour commencer.",
    content: "profile"
  },
  {
    id: 3,
    title: "Le profil de {petName} est prêt",
    subtitle: "Pour donner vie à son histoire, ajoutons une première information. Laquelle choisissez-vous ?",
    content: "firstAction"
  }
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    photo: null as File | null
  })
  const [isCompleting, setIsCompleting] = useState(false)

  const currentStepData = steps.find(step => step.id === currentStep)!

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async (action: string) => {
    setIsCompleting(true)
    
    // Simulate completion
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    navigate('/')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPetData(prev => ({ ...prev, photo: file }))
    }
  }

  const renderStepContent = () => {
    switch (currentStepData.content) {
      case 'welcome':
        return (
          <div className="text-center space-y-8">
            {/* Lottie Animation simulée */}
            <div className="mx-auto h-48 w-48 clay-floating rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center animate-soft-bounce">
              <div className="h-24 w-24 clay-raised rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl animate-bounce">🐾</span>
              </div>
            </div>
            
            <ClayButton size="xl" onClick={handleNext} className="animate-soft-bounce" style={{'--delay': '800ms'} as React.CSSProperties}>
              Créer notre espace
              <ChevronRight className="ml-2 h-5 w-5" />
            </ClayButton>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            {/* Photo Upload */}
            <div className="text-center">
              <div className="mx-auto mb-4">
                {petData.photo ? (
                  <div className="h-32 w-32 mx-auto clay-raised rounded-full overflow-hidden">
                    <img 
                      src={URL.createObjectURL(petData.photo)} 
                      alt="Pet" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 w-32 mx-auto clay-pressed rounded-full flex items-center justify-center cursor-pointer hover:clay-raised transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Cliquez pour ajouter une photo</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom</label>
                <ClayInput
                  placeholder="Milo"
                  value={petData.name}
                  onChange={(e) => setPetData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Espèce</label>
                <ClayInput
                  placeholder="Chien"
                  value={petData.species}
                  onChange={(e) => setPetData(prev => ({ ...prev, species: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Race</label>
                <ClayInput
                  placeholder="Golden Retriever"
                  value={petData.breed}
                  onChange={(e) => setPetData(prev => ({ ...prev, breed: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date de naissance</label>
                <ClayInput
                  type="date"
                  value={petData.birthDate}
                  onChange={(e) => setPetData(prev => ({ ...prev, birthDate: e.target.value }))}
                />
              </div>
            </div>

            <ClayButton 
              size="lg" 
              onClick={handleNext}
              disabled={!petData.name}
              className="w-full"
            >
              {petData.name ? `Voici ${petData.name} !` : 'Continuer'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </ClayButton>
          </div>
        )

      case 'firstAction':
        return (
          <div className="space-y-6">
            {/* Pet Avatar */}
            <div className="text-center">
              <div className="mx-auto h-24 w-24 clay-floating rounded-full overflow-hidden mb-4 relative">
                {petData.photo ? (
                  <img 
                    src={URL.createObjectURL(petData.photo)} 
                    alt={petData.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-2xl">🐕</span>
                  </div>
                )}
                {/* Check Animation */}
                <div className="absolute -top-2 -right-2 h-8 w-8 clay-raised rounded-full bg-success flex items-center justify-center animate-bounce-in">
                  <Check className="h-4 w-4 text-success-foreground animate-signature-check" />
                </div>
              </div>
            </div>

            {/* Action Choices */}
            <div className="grid grid-cols-1 gap-4">
              <ClayButton
                variant="outline"
                size="lg"
                className="h-auto p-6 clay-card"
                onClick={() => handleComplete('vaccine')}
                disabled={isCompleting}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 clay-raised rounded-full bg-warning/20 flex items-center justify-center">
                    <Syringe className="h-6 w-6 text-warning" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Ajouter son dernier vaccin</div>
                    <div className="text-sm text-muted-foreground">Pour suivre sa protection</div>
                  </div>
                </div>
              </ClayButton>

              <ClayButton
                variant="outline"
                size="lg"
                className="h-auto p-6 clay-card"
                onClick={() => handleComplete('memory')}
                disabled={isCompleting}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 clay-raised rounded-full bg-accent/20 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Noter un souvenir marquant</div>
                    <div className="text-sm text-muted-foreground">Pour créer son histoire</div>
                  </div>
                </div>
              </ClayButton>
            </div>

            <div className="text-center">
              <ClayButton
                variant="ghost"
                onClick={() => navigate('/')}
                disabled={isCompleting}
              >
                Passer cette étape pour le moment
              </ClayButton>
            </div>

            {isCompleting && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Création de votre espace...
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const getTitle = () => {
    return currentStepData.title.replace('{petName}', petData.name || 'votre animal')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Étape {currentStep} sur {steps.length}</span>
          </div>
          <div className="clay-pressed h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out clay-raised"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <ClayCard className="animate-fade-in">
          <ClayCardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2 text-bubble-up animate">
                {getTitle()}
              </h1>
              <p className="text-muted-foreground text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="animate-soft-bounce" style={{'--delay': '400ms'} as React.CSSProperties}>
              {renderStepContent()}
            </div>
          </ClayCardContent>
        </ClayCard>

        {/* Navigation */}
        {currentStep > 1 && currentStep < 3 && (
          <div className="mt-6 flex justify-between">
            <ClayButton
              variant="ghost"
              onClick={handlePrevious}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour
            </ClayButton>
          </div>
        )}
      </div>
    </div>
  )
}
