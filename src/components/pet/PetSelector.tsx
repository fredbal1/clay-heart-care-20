
import React from 'react'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayAvatar, ClayAvatarImage, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { pets, Pet } from '@/components/pet/PetSwitcher'

interface PetSelectorProps {
  selectedPet: Pet
  onPetChange: (pet: Pet) => void
  showAll?: boolean
}

export function PetSelector({ selectedPet, onPetChange, showAll = false }: PetSelectorProps) {
  const allPets = showAll ? [{ id: 'all', name: 'Tous', species: '', breed: '', age: '', photo: '', weight: '', lastVisit: '' }, ...pets] : pets

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {allPets.map((pet) => (
        <ClayButton
          key={pet.id}
          variant={selectedPet.id === pet.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onPetChange(pet)}
          className="flex-shrink-0 flex items-center gap-2"
        >
          {pet.id !== 'all' ? (
            <ClayAvatar size="sm">
              <ClayAvatarImage src={pet.photo} alt={pet.name} />
              <ClayAvatarFallback>{pet.name[0]}</ClayAvatarFallback>
            </ClayAvatar>
          ) : (
            <div className="h-6 w-6 clay-raised rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs">🐾</span>
            </div>
          )}
          {pet.name}
        </ClayButton>
      ))}
    </div>
  )
}
