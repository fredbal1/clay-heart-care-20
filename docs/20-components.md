
# Catalogue Composants - AnimaHub

## 🧱 Composants de Base

### ClayButton
**Fichier** : `src/components/ui/clay-button.tsx`
**Classe principale** : `.clay-button`

#### Variants
```tsx
variant: "default" | "secondary" | "accent" | "success" | "warning" | "error" | "ghost" | "outline"
size: "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg"  
shape: "default" | "pill" | "square"
```

#### États
- **Default** : `clay-raised` avec couleur variant
- **Hover** : `clay-floating` + `translateY(-1px)`
- **Active** : `clay-pressed` + `translateY(1px)`
- **Focus** : Anneau `hsl(var(--primary) / 0.3)`
- **Disabled** : `opacity-50` + `pointer-events-none`

#### Sélecteurs Clés
```css
.clay-button                    /* Base */
.clay-button:hover             /* Élévation */
.clay-button:active            /* Enfoncement */
.clay-button:focus-visible     /* Focus clavier */
```

#### Usage Courant
```tsx
// FAB IA (bottom-right)
<ClayButton size="icon-lg" className="clay-fab">
  <MessageCircle className="h-6 w-6" />
</ClayButton>
```

### ClayCard
**Fichier** : `src/components/ui/clay-card.tsx`
**Classes** : `.clay-card`, `.clay-raised`, `.clay-floating`

#### Props
```tsx
variant: "default" | "subtle" | "floating"
hoverable: boolean = true
```

#### Sous-composants
- `ClayCardHeader` - En-tête avec titre/actions
- `ClayCardContent` - Contenu principal  
- `ClayCardTitle` - Titre stylisé
- `ClayCardFooter` - Actions/métadonnées

#### Animations
- **Hover** : `perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02)`
- **Durée** : `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### ClayInput
**Fichier** : `src/components/ui/clay-input.tsx`
**Classe** : `.clay-input`

#### États
- **Default** : `clay-pressed` (aspect enfoncé)
- **Focus** : `clay-pressed` + anneau primary
- **Error** : Bordure rouge + message

#### Variants
```tsx
variant: "default" | "search"  // search ajoute padding-left pour icône
```

### ClayAvatar
**Fichier** : `src/components/ui/clay-avatar.tsx`

#### Tailles
```tsx
size: "sm" | "default" | "lg" | "xl"
// sm: 32px, default: 40px, lg: 48px, xl: 64px
```

#### Sélecteurs Spéciaux
```css
/* Avatar animal Dashboard (top-right) */
.pet-switcher .clay-avatar {
  width: var(--pet-card-avatar-size);
  height: var(--pet-card-avatar-size);
}

/* Avatar compte (bottom-left nav) */
.sidebar .clay-avatar {
  width: var(--account-avatar-size); 
  height: var(--account-avatar-size);
  border: var(--account-avatar-border) solid var(--account-avatar-border-color);
}
```

## 🎯 Composants Métier

### PetSwitcher  
**Fichier** : `src/components/pet/PetSwitcher.tsx`
**Usage** : Dashboard, Profil

#### Structure
```tsx
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
```

#### Sélecteur Avatar
```css
.pet-switcher .pet-avatar {
  /* Contrôlé par --pet-card-avatar-size */
}
```

### CheckableEvent
**Fichier** : `src/components/events/CheckableEvent.tsx` 
**Usage** : Dashboard événements

#### Props
```tsx
interface Event {
  id: number
  title: string
  date: string
  type: 'vaccine' | 'treatment' | 'checkup'
  done: boolean
}
```

#### Classes
```css
.event-item                    /* Container */
.event-checkbox               /* Checkbox custom */
.event-badge                  /* Badge type */
.event-badge--vaccine         /* Variant vaccin */
.event-badge--treatment       /* Variant traitement */
```

### ClayBadge
**Fichier** : `src/components/ui/clay-badge.tsx`

#### Variants
```tsx
variant: "default" | "secondary" | "success" | "warning" | "error" | "outline"
```

#### Classes States
```css
.clay-badge                   /* Base */
.clay-badge--success         /* Vert, "À jour" */
.clay-badge--warning         /* Orange, "Bientôt" */  
.clay-badge--error           /* Rouge, "Expiré" */
```

### PhotoCarousel
**Fichier** : `src/components/ui/PhotoCarousel.tsx`
**Usage** : Dashboard souvenirs

#### Contrôles
- Navigation dots en bas
- Swipe mobile natif
- Lazy loading images

#### Classes
```css
.photo-carousel               /* Container */
.photo-slide                 /* Slide individuel */
.carousel-dots               /* Navigation */
```

## 🎪 Composants Spécialisés

### AnimaBotMascot
**Fichier** : `src/components/chat/AnimaBotMascot.tsx`
**Usage** : Page chat initiale

### Status Dot (Bonjour Clara)
**Localisation** : `src/pages/dashboard/dashboard.tsx:47`
**Classe** : `.status-dot`

#### Variables CSS
```css
.status-dot {
  width: var(--status-dot-size);
  height: var(--status-dot-size);  
  background: var(--status-dot-color);
  border-radius: 50%;
  box-shadow: var(--status-dot-glow);
}
```

### FAB IA (Floating Action Button)
**Localisation** : `src/pages/dashboard/dashboard.tsx:295`
**Classes** : `.clay-fab`

#### Positionnement
```css
.clay-fab {
  position: fixed;
  bottom: var(--space-6);    /* 24px */
  right: var(--space-6);     /* 24px */
  width: var(--fab-size);
  height: var(--fab-size);
  background: var(--fab-bg);
  box-shadow: var(--fab-shadow);
}
```

## 📱 Responsive Components

### Navigation Mobile
**Classes** : `.mobile-nav`, `.mobile-nav--open`

#### Breakpoints
```css
/* Mobile Menu */
@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); }
  .sidebar--open { transform: translateX(0); }
}

/* Desktop */  
@media (min-width: 768px) {
  .mobile-nav { display: none; }
  .sidebar { position: static; transform: none; }
}
```

### Grilles Adaptatives
**Usage** : Services, Dashboard KPIs

#### Classes
```css
.responsive-grid {
  grid-template-columns: repeat(var(--grid-mobile-cols), 1fr);
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(var(--grid-tablet-cols), 1fr);
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(var(--grid-desktop-cols), 1fr);
  }
}
```

## 🎨 Classes Utilitaires Signature

### Claymorphisme
```css
.clay-raised         /* Surface surélevée par défaut */
.clay-pressed        /* Surface enfoncée (inputs) */  
.clay-floating       /* Surface flottante (hover, FAB) */
.clay-subtle         /* Ombre légère (small elements) */
```

### Animations
```css
.animate-soft-bounce     /* Entrée douce avec rebond */
.animate-fade-in         /* Apparition fade + slide up */
.animate-press-in        /* Animation de press */
.text-bubble-up          /* Texte qui remonte avec delay */
```

### Motion Utilities
```css
.clay-card              /* Hover tilt 3D automatique */
.clay-button            /* Press/release automatique */
.animate-signature-check /* Trait qui se dessine */
```

## 📊 Data Props Communes

### Mock Data Patterns
```tsx
// Animaux
const mockPet = {
  id: '1',
  name: 'Milo',
  species: 'Chien', 
  breed: 'Golden Retriever',
  age: '3 ans',
  photo: 'https://images.unsplash.com/...',
  weight: '28.5 kg',
  lastVisit: '15 janvier 2024'
}

// Événements
const mockEvent = {
  id: 1,
  title: 'Rappel vaccin Leishmaniose',
  date: '2024-02-15',
  type: 'vaccine',
  done: false
}

// Services  
const mockService = {
  name: 'Dr. Marie Dubois',
  type: 'Médecine générale',
  rating: 4.9,
  reviews: 247,
  distance: '1.2 km',
  isOpen: true,
  tags: ['Urgences', 'Chirurgie']
}
```
