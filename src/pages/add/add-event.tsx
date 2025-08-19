
import React, { useState } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayInput } from '@/components/ui/clay-input'
import { Calendar, Syringe, Pill, Stethoscope, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const eventTypes = [
  { id: 'vaccine', name: 'Vaccination', icon: Syringe, color: 'primary' },
  { id: 'treatment', name: 'Traitement', icon: Pill, color: 'success' },
  { id: 'checkup', name: 'Visite vétérinaire', icon: Stethoscope, color: 'accent' }
]

export function AddEventPage() {
  const [selectedType, setSelectedType] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    veterinarian: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Événement ajouté:', { ...formData, type: selectedType })
    // Ici on ajouterait la logique pour sauvegarder l'événement
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <ClayButton variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </ClayButton>
        <div>
          <h1 className="text-3xl font-bold">Ajouter un événement</h1>
          <p className="text-muted-foreground">Planifiez un nouveau soin pour Milo</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Sélection du type d'événement */}
        <ClayCard>
          <ClayCardHeader>
            <ClayCardTitle>Type d'événement</ClayCardTitle>
          </ClayCardHeader>
          <ClayCardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {eventTypes.map((type) => {
                const Icon = type.icon
                return (
                  <div
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 clay-card cursor-pointer text-center transition-all ${
                      selectedType === type.id ? 'clay-floating ring-2 ring-primary' : 'clay-subtle hover:clay-raised'
                    }`}
                  >
                    <div className={`h-12 w-12 clay-raised rounded-full bg-${type.color}/20 flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`h-6 w-6 text-${type.color}`} />
                    </div>
                    <h3 className="font-medium">{type.name}</h3>
                  </div>
                )
              })}
            </div>
          </ClayCardContent>
        </ClayCard>

        {/* Formulaire */}
        {selectedType && (
          <ClayCard>
            <ClayCardHeader>
              <ClayCardTitle>Détails de l'événement</ClayCardTitle>
            </ClayCardHeader>
            <ClayCardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Titre</label>
                  <ClayInput
                    placeholder="Ex: Rappel vaccination rage"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Date prévue</label>
                  <ClayInput
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Vétérinaire</label>
                  <ClayInput
                    placeholder="Ex: Dr. Marie Dubois"
                    value={formData.veterinarian}
                    onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Notes (optionnel)</label>
                  <textarea
                    className="clay-input w-full min-h-24 resize-none"
                    placeholder="Informations supplémentaires..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <ClayButton type="submit" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Ajouter l'événement
                  </ClayButton>
                  <ClayButton variant="outline" type="button" asChild>
                    <Link to="/">Annuler</Link>
                  </ClayButton>
                </div>
              </form>
            </ClayCardContent>
          </ClayCard>
        )}
      </div>
    </div>
  )
}
