import React, { useState } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayBadge } from '@/components/ui/clay-badge'
import { ClayAvatar, ClayAvatarImage, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { ClayInput } from '@/components/ui/clay-input'
import { ClaySkeleton } from '@/components/ui/clay-skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PDFExportModal } from '@/components/health/PDFExportModal'
import { PetSelector } from '@/components/pet/PetSelector'
import { pets, Pet } from '@/components/pet/PetSwitcher'
import { 
  Plus,
  Heart,
  Stethoscope,
  FileText,
  Calendar,
  Weight,
  Syringe,
  Pill,
  Shield,
  User,
  Edit2,
  TrendingUp,
  Download
} from 'lucide-react'

const vaccinations = [
  {
    id: 1,
    name: 'Rage',
    date: '2024-03-15',
    nextDue: '2025-03-15',
    status: 'À jour',
    veterinarian: 'Dr. Marie Dubois'
  },
  {
    id: 2,
    name: 'CHPP (Carré, Hépatite, Parainfluenza, Parvovirose)',
    date: '2024-02-10',
    nextDue: '2025-02-10',
    status: 'À jour',
    veterinarian: 'Dr. Marie Dubois'
  },
  {
    id: 3,
    name: 'Leishmaniose',
    date: '2023-11-20',
    nextDue: '2024-11-20',
    status: 'Bientôt échu',
    veterinarian: 'Dr. Thomas Bernard'
  }
]

const treatments = [
  {
    id: 1,
    name: 'Milbemax (Vermifuge)',
    type: 'Comprimé',
    frequency: 'Tous les 3 mois',
    lastGiven: '2024-01-15',
    nextDue: '2024-04-15',
    status: 'En cours'
  },
  {
    id: 2,
    name: 'Frontline (Anti-puces/tiques)',
    type: 'Pipette',
    frequency: 'Mensuel',
    lastGiven: '2024-03-01',
    nextDue: '2024-04-01',
    status: 'À jour'
  }
]

const timeline = [
  {
    id: 1,
    date: '2024-03-15',
    type: 'Vaccination',
    title: 'Vaccination rage',
    description: 'Vaccination annuelle contre la rage',
    veterinarian: 'Dr. Marie Dubois',
    icon: Syringe
  },
  {
    id: 2,
    date: '2024-02-28',
    type: 'Consultation',
    title: 'Visite de routine',
    description: 'Examen général - tout va bien',
    veterinarian: 'Dr. Marie Dubois',
    icon: Stethoscope
  },
  {
    id: 3,
    date: '2024-02-10',
    type: 'Vaccination',
    title: 'Rappel CHPP',
    description: 'Vaccination combinée',
    veterinarian: 'Dr. Marie Dubois',
    icon: Syringe
  },
  {
    id: 4,
    date: '2024-01-15',
    type: 'Traitement',
    title: 'Vermifuge',
    description: 'Administration Milbemax',
    veterinarian: 'Clara Martin',
    icon: Pill
  }
]

const weightData = [
  { month: 'Jan', weight: 28.5 },
  { month: 'Fév', weight: 29.1 },
  { month: 'Mar', weight: 28.8 },
  { month: 'Avr', weight: 29.3 },
  { month: 'Mai', weight: 29.0 },
  { month: 'Jun', weight: 29.2 }
]

export function HealthRecordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPet, setSelectedPet] = useState<Pet>(pets[0])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'à jour': return 'success'
      case 'bientôt échu': return 'warning'
      case 'échu': return 'error'
      default: return 'secondary'
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 animate-fade-in">
      {/* Header avec sélecteur d'animal */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-bubble-up animate">
            Dossier Santé
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
            Toutes les informations médicales de {selectedPet.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <PDFExportModal />
        </div>
      </div>

      {/* Sélecteur d'animal */}
      <div className="animate-soft-bounce" style={{'--delay': '400ms'} as React.CSSProperties}>
        <PetSelector 
          selectedPet={selectedPet} 
          onPetChange={setSelectedPet}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Fiche d'identité avec bouton d'édition */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '600ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ClayAvatar size="xl">
                    <ClayAvatarImage src={selectedPet.photo} alt={selectedPet.name} />
                    <ClayAvatarFallback>🐕</ClayAvatarFallback>
                  </ClayAvatar>
                  <div className="flex-1">
                    <ClayCardTitle>{selectedPet.name}</ClayCardTitle>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Race:</span> {selectedPet.breed}
                      </div>
                      <div>
                        <span className="font-medium">Âge:</span> {selectedPet.age}
                      </div>
                      <div>
                        <span className="font-medium">Sexe:</span> Mâle castré
                      </div>
                      <div>
                        <span className="font-medium">Poids:</span> {selectedPet.weight}
                      </div>
                      <div>
                        <span className="font-medium">Puce:</span> 250268500123456
                      </div>
                      <div>
                        <span className="font-medium">Couleur:</span> Doré
                      </div>
                    </div>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <ClayButton size="icon-sm" variant="ghost">
                      <Edit2 className="h-4 w-4" />
                    </ClayButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier les informations</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ClayInput placeholder="Nom" defaultValue={selectedPet.name} />
                      <ClayInput placeholder="Race" defaultValue={selectedPet.breed} />
                      <ClayInput placeholder="Âge" defaultValue={selectedPet.age} />
                      <ClayInput placeholder="Poids" defaultValue={selectedPet.weight} />
                      <ClayButton className="w-full">Sauvegarder</ClayButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </ClayCardHeader>
          </ClayCard>

          {/* Vaccinations */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '800ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <div className="flex items-center justify-between">
                <ClayCardTitle className="flex items-center gap-2">
                  <Syringe className="h-5 w-5" />
                  Vaccinations
                </ClayCardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <ClayButton size="icon-sm">
                      <Plus className="h-4 w-4" />
                    </ClayButton>
                  </DialogTrigger>
                  <DialogContent className="animate-soft-bounce">
                    <DialogHeader>
                      <DialogTitle>Ajouter une vaccination</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ClayInput placeholder="Nom de la vaccination" />
                      <ClayInput type="date" />
                      <ClayInput placeholder="Vétérinaire" />
                      <ClayButton className="w-full">
                        Enregistrer
                      </ClayButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="space-y-3">
                {vaccinations.map((vaccination, index) => (
                  <div key={vaccination.id} className={`flex items-center justify-between p-3 clay-subtle rounded-clay animate-soft-bounce`} style={{'--delay': `${900 + index * 100}ms`} as React.CSSProperties}>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{vaccination.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Dernière: {vaccination.date} • Prochaine: {vaccination.nextDue}
                      </p>
                      <p className="text-xs text-muted-foreground">{vaccination.veterinarian}</p>
                    </div>
                    <ClayBadge variant={getStatusColor(vaccination.status)} shape="pill">
                      {vaccination.status}
                    </ClayBadge>
                  </div>
                ))}
              </div>
            </ClayCardContent>
          </ClayCard>

          {/* Traitements */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '1200ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <div className="flex items-center justify-between">
                <ClayCardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Traitements
                </ClayCardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <ClayButton size="icon-sm">
                      <Plus className="h-4 w-4" />
                    </ClayButton>
                  </DialogTrigger>
                  <DialogContent className="animate-soft-bounce">
                    <DialogHeader>
                      <DialogTitle>Ajouter un traitement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ClayInput placeholder="Nom du traitement" />
                      <ClayInput placeholder="Fréquence" />
                      <ClayInput type="date" placeholder="Dernière administration" />
                      <ClayButton className="w-full">
                        Enregistrer
                      </ClayButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="space-y-3">
                {treatments.map((treatment, index) => (
                  <div key={treatment.id} className={`flex items-center justify-between p-3 clay-subtle rounded-clay animate-soft-bounce`} style={{'--delay': `${1300 + index * 100}ms`} as React.CSSProperties}>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{treatment.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {treatment.frequency} • {treatment.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dernière: {treatment.lastGiven} • Prochaine: {treatment.nextDue}
                      </p>
                    </div>
                    <ClayBadge variant={getStatusColor(treatment.status)} shape="pill">
                      {treatment.status}
                    </ClayBadge>
                  </div>
                ))}
              </div>
            </ClayCardContent>
          </ClayCard>

          {/* Historique Timeline */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '1500ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <ClayCardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Historique médical
              </ClayCardTitle>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border animate-timeline-draw"></div>
                <div className="space-y-4">
                  {timeline.map((event, index) => {
                    const Icon = event.icon
                    return (
                      <div key={event.id} className={`relative flex gap-4 animate-soft-bounce`} style={{'--delay': `${1600 + index * 150}ms`} as React.CSSProperties}>
                        <div className="clay-raised h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <ClayBadge variant="secondary" shape="pill">{event.type}</ClayBadge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{event.date}</span>
                            <span>•</span>
                            <span>{event.veterinarian}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </ClayCardContent>
          </ClayCard>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-4 lg:space-y-6">
          {/* Assurance avec bouton d'édition */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '700ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <div className="flex items-center justify-between">
                <ClayCardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Assurance
                </ClayCardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <ClayButton size="icon-sm" variant="ghost">
                      <Edit2 className="h-4 w-4" />
                    </ClayButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier l'assurance</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ClayInput placeholder="Assureur" defaultValue="SantéVet Premium" />
                      <ClayInput placeholder="Numéro de contrat" defaultValue="SV2024789123" />
                      <ClayInput placeholder="Formule" defaultValue="Intégrale+" />
                      <ClayButton className="w-full">Sauvegarder</ClayButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">SantéVet Premium</p>
                  <p className="text-sm text-muted-foreground">Contrat n° SV2024789123</p>
                </div>
                <div>
                  <p className="text-sm"><span className="font-medium">Formule:</span> Intégrale+</p>
                  <p className="text-sm"><span className="font-medium">Franchise:</span> 50€</p>
                  <p className="text-sm"><span className="font-medium">Remboursement:</span> 90%</p>
                </div>
                <ClayBadge variant="success" shape="pill">
                  Active
                </ClayBadge>
              </div>
            </ClayCardContent>
          </ClayCard>

          {/* Vétérinaire avec bouton d'édition */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '900ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <div className="flex items-center justify-between">
                <ClayCardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Vétérinaire
                </ClayCardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <ClayButton size="icon-sm" variant="ghost">
                      <Edit2 className="h-4 w-4" />
                    </ClayButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier le vétérinaire</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ClayInput placeholder="Nom" defaultValue="Dr. Marie Dubois" />
                      <ClayInput placeholder="Clinique" defaultValue="Clinique Vétérinaire des Lilas" />
                      <ClayInput placeholder="Téléphone" defaultValue="01 45 67 89 12" />
                      <ClayButton className="w-full">Sauvegarder</ClayButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="flex items-center gap-3">
                <ClayAvatar>
                  <ClayAvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100" alt="Dr. Marie Dubois" />
                  <ClayAvatarFallback>MD</ClayAvatarFallback>
                </ClayAvatar>
                <div>
                  <p className="font-medium">Dr. Marie Dubois</p>
                  <p className="text-sm text-muted-foreground">Clinique Vétérinaire des Lilas</p>
                  <p className="text-sm text-muted-foreground">01 45 67 89 12</p>
                </div>
              </div>
            </ClayCardContent>
          </ClayCard>

          {/* Suivi du poids */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '1100ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <ClayCardTitle className="flex items-center gap-2">
                <Weight className="h-5 w-5" />
                Suivi du poids
              </ClayCardTitle>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">29.2 kg</span>
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+0.2kg</span>
                  </div>
                </div>
                
                {/* Graphique simulé */}
                <div className="h-32 clay-pressed rounded-clay p-4 bg-background">
                  <div className="h-full flex items-end justify-between gap-2">
                    {weightData.map((data, index) => (
                      <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                        <div 
                          className={`w-full clay-raised rounded-sm bg-primary animate-soft-bounce`}
                          style={{
                            height: `${(data.weight - 28) * 40}px`,
                            '--delay': `${1200 + index * 50}ms`
                          } as React.CSSProperties}
                        ></div>
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <ClayButton variant="outline" size="sm" className="w-full">
                      <Plus className="h-3 w-3 mr-2" />
                      Ajouter une pesée
                    </ClayButton>
                  </DialogTrigger>
                  <DialogContent className="animate-soft-bounce">
                    <DialogHeader>
                      <DialogTitle>Nouvelle pesée</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ClayInput type="number" step="0.1" placeholder="Poids (kg)" />
                      <ClayInput type="date" />
                      <ClayButton className="w-full">
                        Enregistrer
                      </ClayButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </ClayCardContent>
          </ClayCard>

          {/* Notes */}
          <ClayCard className="animate-soft-bounce" style={{'--delay': '1400ms'} as React.CSSProperties}>
            <ClayCardHeader>
              <div className="flex items-center justify-between">
                <ClayCardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes
                </ClayCardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <ClayButton size="icon-sm">
                      <Plus className="h-4 w-4" />
                    </ClayButton>
                  </DialogTrigger>
                  <DialogContent className="animate-soft-bounce">
                    <DialogHeader>
                      <DialogTitle>Ajouter une note</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <ClayInput placeholder="Titre de la note" />
                      <textarea 
                        className="clay-input w-full min-h-24 resize-none"
                        placeholder="Votre note..."
                      />
                      <ClayButton className="w-full">
                        Enregistrer
                      </ClayButton>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </ClayCardHeader>
            <ClayCardContent>
              <div className="space-y-3">
                <div className="p-3 clay-subtle rounded-clay">
                  <h4 className="font-medium text-sm">Comportement récent</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Milo semble un peu fatigué ces derniers jours. À surveiller.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">15 mars 2024</p>
                </div>
                <div className="p-3 clay-subtle rounded-clay">
                  <h4 className="font-medium text-sm">Allergie alimentaire</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Réaction allergique au poulet confirmée. Éviter tous les aliments à base de volaille.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">2 février 2024</p>
                </div>
              </div>
            </ClayCardContent>
          </ClayCard>
        </div>
      </div>
    </div>
  )
}
