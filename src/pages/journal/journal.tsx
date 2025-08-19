
import React, { useState, useEffect } from 'react'
import { ClayCard, ClayCardContent } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayBadge } from '@/components/ui/clay-badge'
import { ClayInput } from '@/components/ui/clay-input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ImageModal } from '@/components/ui/ImageModal'
import { PetSelector } from '@/components/pet/PetSelector'
import { pets, Pet } from '@/components/pet/PetSwitcher'
import { 
  Plus,
  Heart,
  Stethoscope,
  Camera,
  FileText,
  Search,
  MapPin
} from 'lucide-react'

const journalEntries = [
  {
    id: 1,
    date: '2024-03-20',
    type: 'photos',
    title: 'Première fois à la plage',
    description: 'Milo a découvert la mer aujourd\'hui ! Il était d\'abord un peu craintif avec les vagues, puis il s\'est mis à courir partout dans le sable. Il a même essayé d\'attraper les mouettes (sans succès bien sûr). Une journée magique !',
    photo: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400',
    location: 'Plage de Deauville',
    icon: Heart,
    mood: 'Excellent',
    petId: '1'
  },
  {
    id: 2,
    date: '2024-03-18',
    type: 'santé',
    title: 'Visite chez le vétérinaire',
    description: 'Consultation de routine chez Dr. Dubois. Tout va parfaitement bien ! Milo a pris 200g depuis la dernière fois. Le vétérinaire est très satisfait de sa forme.',
    photo: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400',
    location: 'Clinique des Lilas',
    icon: Stethoscope,
    mood: 'Bon',
    petId: '1'
  },
  {
    id: 3,
    date: '2024-03-15',
    type: 'photos',
    title: 'Nouvelle balle favorite',
    description: 'J\'ai acheté une nouvelle balle en caoutchouc à Milo. Il ne la lâche plus ! On a joué 2 heures au parc. Il était tellement heureux qu\'il en bavait de partout.',
    photo: 'https://images.unsplash.com/photo-1601758228006-78bea3a52d34?w=400',
    location: 'Parc des Buttes-Chaumont',
    icon: Camera,
    mood: 'Excellent',
    petId: '1'
  },
  {
    id: 4,
    date: '2024-03-12',
    type: 'notes',
    title: 'Découverte des carottes',
    description: 'Milo a goûté des carottes crues pour la première fois. Au début réticent, il a fini par adorer ! C\'est maintenant sa friandise préférée. Parfait pour ses dents.',
    photo: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
    location: 'À la maison',
    icon: FileText,
    mood: 'Bon',
    petId: '1'
  },
  {
    id: 5,
    date: '2024-03-10',
    type: 'santé',
    title: 'Bain de printemps',
    description: 'Grand bain de printemps ! Milo n\'aime toujours pas ça au début, mais il finit par se détendre. Il sent bon le shampooing à la lavande maintenant.',
    photo: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=400',
    location: 'À la maison',
    icon: Stethoscope,
    mood: 'Moyen',
    petId: '1'
  },
  {
    id: 6,
    date: '2024-03-08',
    type: 'photos',
    title: 'Session photo avec Misha',
    description: 'Belle session photo avec Misha dans le jardin. Les deux s\'entendent si bien maintenant !',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    location: 'Jardin',
    icon: Camera,
    mood: 'Excellent',
    petId: '2'
  }
]

const categories = [
  { name: 'tous', label: 'Tous', icon: Heart, count: 24, color: 'default' },
  { name: 'photos', label: 'Photos', icon: Camera, count: 8, color: 'accent' },
  { name: 'santé', label: 'Santé', icon: Stethoscope, count: 6, color: 'success' },
  { name: 'notes', label: 'Notes', icon: FileText, count: 3, color: 'secondary' }
]

export function JournalPage() {
  const [selectedPet, setSelectedPet] = useState<Pet>({ id: 'all', name: 'Tous', species: '', breed: '', age: '', photo: '', weight: '', lastVisit: '' })
  const [selectedCategory, setSelectedCategory] = useState('tous')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleEntries, setVisibleEntries] = useState<number[]>([])
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null)

  const filteredEntries = journalEntries.filter(entry => {
    const matchesPet = selectedPet.id === 'all' || entry.petId === selectedPet.id
    const matchesCategory = selectedCategory === 'tous' || entry.type === selectedCategory
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPet && matchesCategory && matchesSearch
  })

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Excellent': return 'success'
      case 'Bon': return 'default'
      case 'Moyen': return 'warning'
      default: return 'secondary'
    }
  }

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt })
  }

  // Animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0')
            setVisibleEntries(prev => [...prev, id])
          }
        })
      },
      { threshold: 0.3 }
    )

    const elements = document.querySelectorAll('[data-id]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [filteredEntries])

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3 lg:space-y-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-bubble-up animate">
            Journal de Bord
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
            L'histoire de vos animaux, jour après jour
          </p>
        </div>

        {/* Barre de recherche et nouveau */}
        <div className="flex flex-col space-y-3 lg:flex-row lg:gap-4 lg:space-y-0 animate-soft-bounce" style={{'--delay': '400ms'} as React.CSSProperties}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <ClayInput
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 lg:h-10 text-sm"
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <ClayButton size="sm" className="h-9 lg:h-10 text-sm">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Nouveau souvenir</span>
                <span className="sm:hidden">Nouveau</span>
              </ClayButton>
            </DialogTrigger>
            <DialogContent className="animate-soft-bounce mx-4 rounded-clay">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau souvenir</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <ClayInput placeholder="Titre du souvenir" />
                <div className="grid grid-cols-2 gap-4">
                  <ClayInput type="date" />
                  <select className="clay-input">
                    <option>Photos</option>
                    <option>Santé</option>
                    <option>Notes</option>
                  </select>
                </div>
                <textarea 
                  className="clay-input w-full min-h-24 resize-none"
                  placeholder="Racontez ce moment..."
                />
                <ClayInput placeholder="Lieu (optionnel)" />
                <ClayButton className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Enregistrer le souvenir
                </ClayButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sélecteur d'animal */}
        <div className="animate-soft-bounce" style={{'--delay': '500ms'} as React.CSSProperties}>
          <PetSelector 
            selectedPet={selectedPet} 
            onPetChange={setSelectedPet}
            showAll={true}
          />
        </div>

        {/* Filtres par catégorie - Réduits */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-soft-bounce" style={{'--delay': '600ms'} as React.CSSProperties}>
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <ClayButton
                key={category.name}
                variant={selectedCategory === category.name ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={`animate-soft-bounce whitespace-nowrap flex-shrink-0 h-8 text-xs lg:text-sm`}
                style={{'--delay': `${700 + index * 50}ms`} as React.CSSProperties}
              >
                <Icon className="h-3 w-3 mr-1.5" />
                {category.label}
                <ClayBadge variant="secondary" className="ml-1.5 text-xs">
                  {category.count}
                </ClayBadge>
              </ClayButton>
            )
          })}
        </div>
      </div>

      {/* Timeline - Optimisé mobile */}
      <div className="relative animate-soft-bounce pb-20" style={{'--delay': '800ms'} as React.CSSProperties}>
        {/* Ligne de temps */}
        <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-0.5 bg-border animate-timeline-draw"></div>
        
        <div className="space-y-4 lg:space-y-6">
          {filteredEntries.length === 0 ? (
            <ClayCard className="animate-soft-bounce ml-12 lg:ml-16">
              <ClayCardContent className="text-center py-8 lg:py-12">
                <div className="h-12 w-12 lg:h-16 lg:w-16 clay-floating rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 lg:h-8 lg:w-8 text-accent animate-bounce" />
                </div>
                <h3 className="font-semibold mb-2 text-sm lg:text-base">Aucun souvenir trouvé</h3>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  {searchQuery ? `Aucun résultat pour "${searchQuery}"` : 'Aucun souvenir dans cette catégorie'}
                </p>
              </ClayCardContent>
            </ClayCard>
          ) : (
            filteredEntries.map((entry, index) => {
              const Icon = entry.icon
              const isVisible = visibleEntries.includes(entry.id)

              return (
                <div
                  key={entry.id}
                  data-id={entry.id}
                  className={`relative flex gap-3 lg:gap-4 ${isVisible ? 'animate-soft-bounce' : 'opacity-0'}`}
                  style={{'--delay': `${1000 + index * 200}ms`} as React.CSSProperties}
                >
                  {/* Point sur la timeline */}
                  <div className="absolute left-4 lg:left-6 -translate-x-1/2 clay-raised h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 z-10">
                    <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 ml-8 lg:ml-12">
                    <ClayCard className="clay-card h-full overflow-hidden">
                      <ClayCardContent className="p-0">
                        {entry.photo && (
                          <div 
                            className="aspect-video overflow-hidden rounded-t-clay cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => handleImageClick(entry.photo, entry.title)}
                          >
                            <img
                              src={entry.photo}
                              alt={entry.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-3 lg:p-4">
                          <div className="flex items-start justify-between mb-2 lg:mb-3 gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base lg:text-lg font-semibold mb-1 line-clamp-2">{entry.title}</h3>
                              <div className="flex items-center gap-2 text-xs lg:text-sm text-muted-foreground flex-wrap">
                                <span>{entry.date}</span>
                                {entry.location && (
                                  <>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3 flex-shrink-0" />
                                      <span className="truncate">{entry.location}</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 shrink-0">
                              <ClayBadge variant="secondary" shape="pill" className="text-xs">
                                {categories.find(c => c.name === entry.type)?.label}
                              </ClayBadge>
                              <ClayBadge variant={getMoodColor(entry.mood)} shape="pill" className="text-xs">
                                {entry.mood}
                              </ClayBadge>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-sm lg:text-base line-clamp-3">
                            {entry.description}
                          </p>
                        </div>
                      </ClayCardContent>
                    </ClayCard>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Modal pour affichage plein écran des images */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
      />
    </div>
  )
}
