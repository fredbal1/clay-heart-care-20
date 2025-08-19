
import React, { useState } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClaySwitch } from '@/components/ui/clay-switch'
import { ClayAvatar, ClayAvatarImage, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { ClayBadge } from '@/components/ui/clay-badge'
import { 
  Settings, 
  Bell, 
  Palette, 
  Smartphone, 
  Mail, 
  Calendar,
  Moon,
  Sun,
  Plus,
  Edit,
  Trash2,
  Heart,
  Stethoscope
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const animals = [
  {
    id: 1,
    name: 'Milo',
    species: 'Chien',
    breed: 'Golden Retriever',
    age: '3 ans',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    isActive: true
  },
  {
    id: 2,
    name: 'Misha',
    species: 'Chat',
    breed: 'Sacré de Birmanie',
    age: '5 ans',
    photo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    isActive: false
  }
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('animals')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
    veterinary: true,
    vaccination: true,
    medication: false
  })
  const { toast } = useToast()

  const tabs = [
    { id: 'animals', label: 'Mes Animaux', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Apparence', icon: Palette }
  ]

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    toast({
      title: "Préférence mise à jour ✅",
      description: "Vos paramètres de notification ont été sauvegardés.",
    })
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
    
    toast({
      title: isDarkMode ? "Mode clair activé ☀️" : "Mode sombre activé 🌙",
      description: "L'interface s'adapte à vos préférences.",
    })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'animals':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Mes compagnons</h3>
                <p className="text-sm text-muted-foreground">
                  Gérez les profils de vos animaux
                </p>
              </div>
              <ClayButton size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un animal
              </ClayButton>
            </div>

            <div className="space-y-4">
              {animals.map((animal, index) => (
                <div 
                  key={animal.id}
                  className={`clay-subtle p-4 rounded-clay animate-soft-bounce`}
                  style={{'--delay': `${index * 100}ms`} as React.CSSProperties}
                >
                  <div className="flex items-center gap-4">
                    <ClayAvatar size="lg">
                      <ClayAvatarImage src={animal.photo} alt={animal.name} />
                      <ClayAvatarFallback>
                        {animal.species === 'Chien' ? '🐕' : '🐱'}
                      </ClayAvatarFallback>
                    </ClayAvatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{animal.name}</h4>
                        {animal.isActive && (
                          <ClayBadge variant="success" shape="pill">
                            Actif
                          </ClayBadge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {animal.breed} • {animal.age}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <ClayButton variant="outline" size="icon-sm">
                        <Edit className="h-3 w-3" />
                      </ClayButton>
                      <ClayButton variant="ghost" size="icon-sm">
                        <Trash2 className="h-3 w-3" />
                      </ClayButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Choisissez comment vous souhaitez être informé
              </p>
            </div>

            <div className="space-y-4">
              <ClayCard variant="subtle">
                <ClayCardHeader>
                  <ClayCardTitle className="text-base flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Canaux de notification
                  </ClayCardTitle>
                </ClayCardHeader>
                <ClayCardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications push</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez des alertes directement sur votre appareil
                      </p>
                    </div>
                    <ClaySwitch
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationToggle('push')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications email</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez un résumé par email
                      </p>
                    </div>
                    <ClaySwitch
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationToggle('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications SMS</p>
                      <p className="text-sm text-muted-foreground">
                        Pour les rappels urgents uniquement
                      </p>
                    </div>
                    <ClaySwitch
                      checked={notifications.sms}
                      onCheckedChange={() => handleNotificationToggle('sms')}
                    />
                  </div>
                </ClayCardContent>
              </ClayCard>

              <ClayCard variant="subtle">
                <ClayCardHeader>
                  <ClayCardTitle className="text-base flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Rappels de santé
                  </ClayCardTitle>
                </ClayCardHeader>
                <ClayCardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rendez-vous vétérinaire</p>
                      <p className="text-sm text-muted-foreground">
                        Rappels 24h avant vos rendez-vous
                      </p>
                    </div>
                    <ClaySwitch
                      checked={notifications.veterinary}
                      onCheckedChange={() => handleNotificationToggle('veterinary')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Vaccinations</p>
                      <p className="text-sm text-muted-foreground">
                        Rappels pour les vaccins et rappels
                      </p>
                    </div>
                    <ClaySwitch
                      checked={notifications.vaccination}
                      onCheckedChange={() => handleNotificationToggle('vaccination')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Médicaments</p>
                      <p className="text-sm text-muted-foreground">
                        Rappels pour les traitements en cours
                      </p>
                    </div>
                    <ClaySwitch
                      checked={notifications.medication}
                      onCheckedChange={() => handleNotificationToggle('medication')}
                    />
                  </div>
                </ClayCardContent>
              </ClayCard>
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Apparence</h3>
              <p className="text-sm text-muted-foreground">
                Personnalisez l'interface selon vos préférences
              </p>
            </div>

            <ClayCard variant="subtle">
              <ClayCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 clay-raised rounded-full bg-primary/20 flex items-center justify-center">
                      {isDarkMode ? (
                        <Moon className="h-5 w-5 text-primary" />
                      ) : (
                        <Sun className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {isDarkMode ? 'Mode sombre' : 'Mode clair'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isDarkMode 
                          ? 'Interface sombre pour vos yeux' 
                          : 'Interface claire et lumineuse'
                        }
                      </p>
                    </div>
                  </div>
                  <ClaySwitch
                    checked={isDarkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
              </ClayCardContent>
            </ClayCard>

            <ClayCard variant="subtle">
              <ClayCardHeader>
                <ClayCardTitle className="text-base">Accessibilité</ClayCardTitle>
              </ClayCardHeader>
              <ClayCardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Réduire les animations</p>
                    <p className="text-sm text-muted-foreground">
                      Diminue les effets visuels pour plus de confort
                    </p>
                  </div>
                  <ClaySwitch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contraste élevé</p>
                    <p className="text-sm text-muted-foreground">
                      Améliore la lisibilité du texte
                    </p>
                  </div>
                  <ClaySwitch />
                </div>
              </ClayCardContent>
            </ClayCard>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-bubble-up animate">
          Paramètres
        </h1>
        <p className="text-muted-foreground text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
          Configurez votre expérience AnimaHub
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <ClayCard className="animate-soft-bounce" style={{'--delay': '400ms'} as React.CSSProperties}>
            <ClayCardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon
                  return (
                    <ClayButton
                      key={tab.id}
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      className={`w-full justify-start animate-soft-bounce`}
                      style={{'--delay': `${500 + index * 50}ms`} as React.CSSProperties}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {tab.label}
                    </ClayButton>
                  )
                })}
              </nav>
            </ClayCardContent>
          </ClayCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <ClayCard className="animate-soft-bounce" style={{'--delay': '600ms'} as React.CSSProperties}>
            <ClayCardContent className="p-6">
              {renderTabContent()}
            </ClayCardContent>
          </ClayCard>
        </div>
      </div>
    </div>
  )
}
