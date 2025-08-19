
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayBadge } from '@/components/ui/clay-badge'
import { ClayAvatar, ClayAvatarImage, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { PetSwitcher, Pet } from '@/components/pet/PetSwitcher'
import { CheckableEvent, Event } from '@/components/events/CheckableEvent'
import { PhotoCarousel } from '@/components/ui/PhotoCarousel'
import { 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  Plus, 
  ChevronRight,
  Heart,
  Activity,
  AlertCircle,
  MessageCircle
} from 'lucide-react'

// Mock data
const carouselPhotos = [
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600',
  'https://images.unsplash.com/photo-1601758228006-78bea3a52d34?w=600',
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600'
]

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Rappel vaccin Leishmaniose',
    date: '2024-02-15',
    type: 'vaccine',
    done: false
  },
  {
    id: 2,
    title: 'Traitement vermifuge',
    date: '2024-02-20',
    type: 'treatment',
    done: false
  },
  {
    id: 3,
    title: 'Visite vétérinaire annuelle',
    date: '2024-03-10',
    type: 'checkup',
    done: true
  }
]

const recentJournal = [
  {
    id: 1,
    title: 'Première balade en forêt',
    date: '2024-01-28',
    type: 'memory',
    preview: 'Il était comme fou avec toutes ces nouvelles odeurs...'
  },
  {
    id: 2,
    title: 'Observation comportementale',
    date: '2024-01-25',
    type: 'health',
    preview: 'Gratte beaucoup son oreille gauche depuis hier...'
  }
]

export function DashboardPage() {
  const [checkedEvents, setCheckedEvents] = useState<Set<number>>(new Set())
  const [currentPet, setCurrentPet] = useState<Pet>({
    id: '1',
    name: 'Milo',
    species: 'Chien',
    breed: 'Golden Retriever',
    age: '3 ans',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    weight: '28.5 kg',
    lastVisit: '15 janvier 2024'
  })

  const handleEventCheck = (eventId: number) => {
    const newChecked = new Set(checkedEvents)
    if (newChecked.has(eventId)) {
      newChecked.delete(eventId)
    } else {
      newChecked.add(eventId)
    }
    setCheckedEvents(newChecked)
  }

  const handlePetChange = (pet: Pet) => {
    setCurrentPet(pet)
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 animate-fade-in">
      {/* Header avec avatar Clara */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ClayAvatar size="lg" className="clay-floating">
            <ClayAvatarImage 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200" 
              alt="Clara Martin" 
            />
            <ClayAvatarFallback>CM</ClayAvatarFallback>
          </ClayAvatar>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-bubble-up animate">
              Bonjour Clara !
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
              Comment va {currentPet.name} aujourd'hui ?
            </p>
          </div>
        </div>
      </div>

      {/* Pet Switcher en mobile sous le header */}
      <div className="lg:hidden animate-soft-bounce" style={{'--delay': '300ms'} as React.CSSProperties}>
        <ClayCard className="clay-floating">
          <ClayCardContent className="p-4">
            <PetSwitcher onPetChange={handlePetChange} />
          </ClayCardContent>
        </ClayCard>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Column - Widgets */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Quick Stats - Optimisé mobile */}
          <div className="grid grid-cols-3 gap-2 lg:gap-4">
            <div className="clay-card clay-floating p-3 lg:p-4 animate-soft-bounce" style={{'--delay': '400ms'} as React.CSSProperties}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-8 w-8 lg:h-10 lg:w-10 clay-raised rounded-full bg-success/20 flex items-center justify-center">
                  <Activity className="h-4 w-4 lg:h-5 lg:w-5 text-success" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Poids actuel</p>
                  <p className="text-sm lg:text-xl font-semibold">{currentPet.weight}</p>
                </div>
              </div>
            </div>

            <div className="clay-card clay-floating p-3 lg:p-4 animate-soft-bounce" style={{'--delay': '500ms'} as React.CSSProperties}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-8 w-8 lg:h-10 lg:w-10 clay-raised rounded-full bg-primary/20 flex items-center justify-center">
                  <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Dernière visite</p>
                  <p className="text-xs lg:text-sm font-medium">{currentPet.lastVisit}</p>
                </div>
              </div>
            </div>

            <div className="clay-card clay-floating p-3 lg:p-4 animate-soft-bounce" style={{'--delay': '600ms'} as React.CSSProperties}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-8 w-8 lg:h-10 lg:w-10 clay-raised rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="h-4 w-4 lg:h-5 lg:w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Âge</p>
                  <p className="text-sm lg:text-xl font-semibold">{currentPet.age}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '700ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <div className="flex items-center justify-between">
                <ClayCardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Prochains événements
                </ClayCardTitle>
                <ClayButton variant="ghost" size="sm" asChild>
                  <Link to="/add-event">
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Ajouter</span>
                  </Link>
                </ClayButton>
              </div>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <CheckableEvent
                    key={event.id}
                    event={event}
                    onToggle={handleEventCheck}
                    isChecked={checkedEvents.has(event.id)}
                  />
                ))}
              </div>
            </ClayCardContent>
          </ClayCard>

          {/* Recent Journal */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '1000ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <div className="flex items-center justify-between">
                <ClayCardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5" />
                  Journal récent
                </ClayCardTitle>
                <ClayButton variant="ghost" size="sm" asChild>
                  <Link to="/journal">
                    Voir tout
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </ClayButton>
              </div>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="space-y-3">
                {recentJournal.map((entry, index) => (
                  <div 
                    key={entry.id}
                    className={`clay-subtle p-4 rounded-clay clay-card animate-soft-bounce`}
                    style={{'--delay': `${1100 + index * 100}ms`} as React.CSSProperties}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-8 w-8 clay-raised rounded-full flex items-center justify-center ${
                        entry.type === 'memory' ? 'bg-accent/20' : 'bg-warning/20'
                      }`}>
                        {entry.type === 'memory' ? (
                          <Heart className="h-4 w-4 text-accent" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{entry.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(entry.date).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">{entry.preview}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ClayCardContent>
          </ClayCard>
        </div>

        {/* Right Column */}
        <div className="space-y-4 lg:space-y-6">
          {/* Pet Profile with Switcher - Caché en mobile */}
          <div className="hidden lg:block">
            <ClayCard className="animate-soft-bounce" style={{'--delay': '300ms'} as React.CSSProperties}>
              <ClayCardContent className="p-6 text-center">
                <PetSwitcher onPetChange={handlePetChange} />
                <ClayButton variant="outline" size="sm" className="mt-4" asChild>
                  <Link to="/health-record">
                    Voir le dossier complet
                  </Link>
                </ClayButton>
              </ClayCardContent>
            </ClayCard>
          </div>

          {/* Photo Carousel amélioré */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '900ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <ClayCardTitle className="text-lg">Derniers souvenirs</ClayCardTitle>
            </ClayCardHeader>
            <ClayCardContent>
              <PhotoCarousel photos={carouselPhotos} />
            </ClayCardContent>
          </ClayCard>
        </div>
      </div>

      {/* FAB for AI */}
      <ClayButton
        size="icon-lg"
        className="clay-fab"
        asChild
      >
        <Link to="/animabot">
          <MessageCircle className="h-6 w-6" />
        </Link>
      </ClayButton>
    </div>
  )
}
