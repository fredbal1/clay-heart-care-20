
import React, { useState } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayBadge } from '@/components/ui/clay-badge'
import { ClayInput } from '@/components/ui/clay-input'
import { ClayAvatar, ClayAvatarImage, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { 
  Search,
  Filter,
  MapPin,
  Phone,
  Clock,
  Star,
  Map,
  List,
  Navigation
} from 'lucide-react'

const services = [
  {
    id: 1,
    name: 'Dr. Marie Dubois',
    type: 'Médecine générale',
    rating: 4.9,
    reviews: 247,
    address: '15 rue des Lilas, 75014 Paris',
    distance: '1.2 km',
    phone: '01 45 67 89 12',
    hours: 'Ouvert • Ferme à 19h',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100',
    tags: ['Urgences', 'Chirurgie', 'Vaccinations'],
    isOpen: true
  },
  {
    id: 2,
    name: 'Clinique Vétérinaire Mozart',
    type: 'Clinique complète',
    rating: 4.7,
    reviews: 189,
    address: '42 avenue Mozart, 75016 Paris',
    distance: '2.8 km',
    phone: '01 42 88 95 33',
    hours: 'Ouvert • Ferme à 20h',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100',
    tags: ['Imagerie', 'Laboratoire', 'Hospitalisation'],
    isOpen: true
  },
  {
    id: 3,
    name: 'Dr. Thomas Bernard',
    type: 'Spécialiste comportement',
    rating: 4.8,
    reviews: 156,
    address: '8 rue de la Paix, 75002 Paris',
    distance: '5.1 km',
    phone: '01 55 34 78 90',
    hours: 'Fermé • Ouvre demain à 9h',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100',
    tags: ['Comportement', 'Éducation', 'Thérapie'],
    isOpen: false
  },
  {
    id: 4,
    name: 'Hôpital Vétérinaire Saint-Antoine',
    type: 'Urgences 24h/24',
    rating: 4.6,
    reviews: 523,
    address: '123 boulevard Saint-Antoine, 75011 Paris',
    distance: '3.7 km',
    phone: '01 48 05 67 23',
    hours: 'Ouvert 24h/24',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=100',
    tags: ['Urgences', 'Chirurgie', 'Réanimation'],
    isOpen: true
  }
]

const filterOptions = [
  { id: 'all', name: 'Tous', count: 12 },
  { id: 'urgences', name: 'Urgences', count: 4 },
  { id: 'chirurgie', name: 'Chirurgie', count: 6 },
  { id: 'comportement', name: 'Comportement', count: 2 }
]

export function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || 
                         service.tags.some(tag => tag.toLowerCase().includes(selectedFilter))
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col h-screen lg:h-auto animate-fade-in">
      {/* Header fixe en mobile */}
      <div className="sticky top-0 z-10 bg-surface/90 backdrop-blur-lg border-b border-border/30 p-4 lg:p-6">
        <div className="space-y-4">
          {/* Titre */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-bubble-up animate">
              Services près de chez vous
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
              Trouvez les meilleurs professionnels pour le bien-être de Milo
            </p>
          </div>

          {/* Barre de recherche et vues */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <ClayInput
                placeholder="Rechercher un service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-muted/50 rounded-clay p-1">
                <ClayButton
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Liste</span>
                </ClayButton>
                <ClayButton
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="h-8 px-3"
                >
                  <Map className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Carte</span>
                </ClayButton>
              </div>
            </div>
          </div>

          {/* Filtres horizontaux */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filterOptions.map((filter) => (
              <ClayButton
                key={filter.id}
                variant={selectedFilter === filter.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className="whitespace-nowrap flex-shrink-0 h-8 px-3 text-sm"
              >
                {filter.name}
                <ClayBadge variant="secondary" className="ml-2 text-xs">
                  {filter.count}
                </ClayBadge>
              </ClayButton>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'map' ? (
          /* Vue carte mockée */
          <div className="h-full min-h-[400px] relative bg-surface/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 p-6">
                <div className="h-20 w-20 clay-floating rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Navigation className="h-10 w-10 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Carte interactive</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    La carte interactive afficherait ici tous les services vétérinaires à proximité avec leur localisation exacte.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-6 max-w-xs">
                  {services.slice(0, 4).map((service) => (
                    <div key={service.id} className="clay-card p-3 text-center">
                      <div className="h-2 w-2 bg-primary rounded-full mx-auto mb-2"></div>
                      <p className="text-xs font-medium truncate">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.distance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Vue liste */
          <div className="p-4 lg:p-6 space-y-4">
            {filteredServices.length === 0 ? (
              <ClayCard className="text-center py-12">
                <ClayCardContent>
                  <div className="h-16 w-16 clay-floating rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Aucun service trouvé</h3>
                  <p className="text-muted-foreground text-sm">
                    {searchQuery ? `Aucun résultat pour "${searchQuery}"` : 'Aucun service dans cette catégorie'}
                  </p>
                </ClayCardContent>
              </ClayCard>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredServices.map((service, index) => (
                  <ClayCard 
                    key={service.id} 
                    className={`clay-card hover:clay-floating transition-all cursor-pointer animate-soft-bounce`}
                    style={{'--delay': `${index * 100}ms`} as React.CSSProperties}
                  >
                    <ClayCardContent className="p-4">
                      <div className="flex gap-4">
                        <ClayAvatar size="lg" className="clay-raised flex-shrink-0">
                          <ClayAvatarImage src={service.image} alt={service.name} />
                          <ClayAvatarFallback>{service.name.slice(0, 2)}</ClayAvatarFallback>
                        </ClayAvatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-base truncate">{service.name}</h3>
                              <p className="text-sm text-muted-foreground">{service.type}</p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{service.rating}</span>
                              <span className="text-xs text-muted-foreground">({service.reviews})</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{service.address}</span>
                              <span className="text-primary font-medium flex-shrink-0">{service.distance}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span className={`truncate ${service.isOpen ? 'text-success' : 'text-warning'}`}>
                                {service.hours}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {service.tags.slice(0, 3).map((tag) => (
                              <ClayBadge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </ClayBadge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <ClayButton 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              asChild
                            >
                              <a href={`tel:${service.phone}`}>
                                <Phone className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Appeler</span>
                                <span className="sm:hidden">☎</span>
                              </a>
                            </ClayButton>
                            <ClayButton size="sm" className="flex-1">
                              <span className="hidden sm:inline">Voir le profil</span>
                              <span className="sm:hidden">Voir</span>
                            </ClayButton>
                          </div>
                        </div>
                      </div>
                    </ClayCardContent>
                  </ClayCard>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
