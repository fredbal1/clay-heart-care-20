
import React, { useState } from 'react'
import { ClayAvatar, ClayAvatarImage, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { ClayButton } from '@/components/ui/clay-button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: string
  photo: string
  weight: string
  lastVisit: string
}

const pets: Pet[] = [
  {
    id: '1',
    name: 'Milo',
    species: 'Chien',
    breed: 'Golden Retriever',
    age: '3 ans',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    weight: '28.5 kg',
    lastVisit: '15 janvier 2024'
  },
  {
    id: '2',
    name: 'Misha',
    species: 'Chat',
    breed: 'Maine Coon',
    age: '2 ans',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    weight: '5.2 kg',
    lastVisit: '8 février 2024'
  },
  {
    id: '3',
    name: 'Luna',
    species: 'Chien',
    breed: 'Border Collie',
    age: '1 an',
    photo: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400',
    weight: '18.3 kg',
    lastVisit: '20 janvier 2024'
  }
]

interface PetSwitcherProps {
  onPetChange: (pet: Pet) => void
}

export function PetSwitcher({ onPetChange }: PetSwitcherProps) {
  const [currentPetIndex, setCurrentPetIndex] = useState(0)
  const currentPet = pets[currentPetIndex]

  const handlePrevious = () => {
    const newIndex = currentPetIndex === 0 ? pets.length - 1 : currentPetIndex - 1
    setCurrentPetIndex(newIndex)
    onPetChange(pets[newIndex])
  }

  const handleNext = () => {
    const newIndex = currentPetIndex === pets.length - 1 ? 0 : currentPetIndex + 1
    setCurrentPetIndex(newIndex)
    onPetChange(pets[newIndex])
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <ClayButton
        variant="ghost"
        size="icon-sm"
        onClick={handlePrevious}
        className="h-6 w-6 clay-raised hover:clay-floating"
      >
        <ChevronLeft className="h-4 w-4" />
      </ClayButton>

      <div className="flex flex-col items-center min-w-0">
        <ClayAvatar size="xl" className="mx-auto mb-3 clay-floating">
          <ClayAvatarImage src={currentPet.photo} alt={currentPet.name} />
          <ClayAvatarFallback>{currentPet.name[0]}</ClayAvatarFallback>
        </ClayAvatar>
        <h3 className="text-xl font-semibold mb-1">{currentPet.name}</h3>
        <p className="text-muted-foreground text-sm text-center">{currentPet.breed}</p>
      </div>

      <ClayButton
        variant="ghost"
        size="icon-sm"
        onClick={handleNext}
        className="h-6 w-6 clay-raised hover:clay-floating"
      >
        <ChevronRight className="h-4 w-4" />
      </ClayButton>
    </div>
  )
}

export { pets }
export type { Pet }
