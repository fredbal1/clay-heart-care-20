
# Pages Blueprints - AnimaHub

## 🏠 Dashboard (`/`)

### Structure Générale
```
┌─────────────────────────────────────┐
│ Header: Bonjour Clara + Status Dot  │
├─────────────────────────────────────┤
│ [Mobile Only] Pet Switcher Card     │
├─────────────────────────────────────┤
│ KPIs Grid (3 cols mobile/desktop)   │
├─────────────────────────────────────┤
│ ┌─────────────────┬─────────────────┐│
│ │ Events + Journal│ Pet + Photos    ││ 
│ │ (2/3 width)     │ (1/3 width)     ││
│ └─────────────────┴─────────────────┘│
├─────────────────────────────────────┤
│ FAB IA (bottom-right fixed)         │
└─────────────────────────────────────┘
```

### Composants & Sélecteurs

#### Header Section
**Localisation** : `src/pages/dashboard/dashboard.tsx:35-52`
```tsx
// Avatar utilisatrice (Clara)
<ClayAvatar size="lg" className="clay-floating">
  /* ID: clara-avatar */
  /* --account-avatar-size contrôle la taille */
</ClayAvatar>

// Status dot (à gauche de "Bonjour Clara")
<div className="status-dot" />
/* Variables CSS: --status-dot-color, --status-dot-size */
```

#### KPIs Row (3 widgets)
**Localisation** : `src/pages/dashboard/dashboard.tsx:67-106`
```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem; /* Mobile */
}

@media (min-width: 768px) {
  .stats-grid { gap: 1rem; }
}
```

#### Pet Switcher (Right Column Desktop)
**Localisation** : `src/pages/dashboard/dashboard.tsx:188-200`
```tsx
// Avatar animal principal
<PetSwitcher onPetChange={handlePetChange} />
/* Classe: .pet-card-avatar */  
/* Variables: --pet-card-avatar-size, --pet-card-avatar-shape */
```

#### FAB IA 
**Localisation** : `src/pages/dashboard/dashboard.tsx:295-302`
```tsx
<ClayButton size="icon-lg" className="clay-fab" asChild>
  <Link to="/animabot">
    <MessageCircle className="h-6 w-6" />
  </Link>
</ClayButton>
```

### Responsive Behavior
- **Mobile** (≤767px): 1 colonne, Pet Switcher card séparée
- **Desktop** (≥1024px): Grid 2/3 + 1/3, Pet Switcher dans sidebar droite

### Animations
- **Page entrance** : `animate-fade-in`
- **Header text** : `text-bubble-up` avec stagger 200ms
- **Widgets** : `animate-soft-bounce` stagger 100ms
- **Cards** : Hover tilt 3D + élévation

### Mock Data
```tsx
const mockUser = {
  name: "Clara Martin",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200"
}

const mockPet = {
  name: "Milo", 
  species: "Chien",
  breed: "Golden Retriever",
  weight: "28.5 kg",
  age: "3 ans",
  lastVisit: "15 janvier 2024"
}
```

---

## 🏥 Dossier Santé (`/health-record`)

### Structure
```
┌─────────────────────────────────────┐
│ Header: Dossier + Pet Selector      │
├─────────────────────────────────────┤
│ ┌─────────────┬─────────────────────┐│
│ │ Pet Profile │ Quick Actions       ││
│ │ Card        │ (Vaccins, Poids)    ││ 
│ └─────────────┴─────────────────────┘│
├─────────────────────────────────────┤
│ Tabs: Vaccins | Traitements | Suivi│
├─────────────────────────────────────┤
│ Content selon tab active             │
└─────────────────────────────────────┘
```

### Composants Spécifiques
- **HealthTimeline** : Ligne de temps vaccinations
- **WeightChart** : Graphique sparkline poids
- **VaccineCard** : Badge statut + prochaine échéance
- **TreatmentReminder** : Notifications traitements

### États Badges
```css
.badge-up-to-date { 
  background: hsl(var(--success));
  color: hsl(var(--success-foreground));
}

.badge-due-soon { 
  background: hsl(var(--warning));
}

.badge-overdue { 
  background: hsl(var(--error));
}
```

---

## 📔 Journal (`/journal`)

### Structure
```
┌─────────────────────────────────────┐
│ Header + Filters (Pet, Category)    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────────┐
│ │ Memory Card (Image + Text)        │
│ ├─────────────────────────────────────┤
│ │ Memory Card (Text only)           │  
│ ├─────────────────────────────────────┤
│ │ Memory Card (Image + Text)        │
│ └─────────────────────────────────────┘
│ [Load More Button]                   │
└─────────────────────────────────────┘
```

### Memory Card Component
```tsx
interface JournalEntry {
  id: string
  title: string
  content: string
  date: Date
  type: 'memory' | 'health' | 'behavior'
  photos?: string[]
  petId: string
}
```

### Layout Rules
- **Ratio images** : 16:9 ou 4:3
- **Mobile** : Full-width cards, stack
- **Desktop** : Masonry layout si multi-colonnes

---

## 🏥 Services (`/services`)

### Structure
```
┌─────────────────────────────────────┐
│ Search Bar + View Toggle (List/Map)│
├─────────────────────────────────────┤  
│ Filter Chips (Tous, Urgences...)   │
├─────────────────────────────────────┤
│ Service Cards Grid OR Map View      │
│ ┌──────────┬──────────┬──────────┐  │
│ │ Dr.Dubois│ Clinique │ Dr.Bernard│  │
│ │ ★4.9     │ ★4.7     │ ★4.8      │  │
│ └──────────┴──────────┴──────────┘  │
└─────────────────────────────────────┘
```

### Service Card Structure
```tsx
interface VetService {
  name: string
  type: string          // "Médecine générale", "Urgences 24h/24"
  rating: number
  reviews: number
  address: string
  distance: string       // "1.2 km"
  phone: string
  hours: string          // "Ouvert • Ferme à 19h"  
  isOpen: boolean
  tags: string[]         // ["Urgences", "Chirurgie"]
  image: string
}
```

### Responsive Grid
```css
.services-grid {
  grid-template-columns: 1fr;           /* Mobile */
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(var(--grid-desktop-cols), 1fr);
  }
}
```

---

## 🤖 AnimaBot (`/animabot`)

### Structure
```
┌─────────────────────────────────────┐
│ Header: AnimaBot + Status           │
├─────────────────────────────────────┤
│ [Conditional] Mascot Welcome        │
├─────────────────────────────────────┤
│ Chat Messages (flex-1 overflow)     │
│ ┌─────────┐ ┌─────────────────────┐│
│ │ Bot Msg │ │            User Msg ││
│ └─────────┘ └─────────────────────┘│
├─────────────────────────────────────┤
│ Input Bar + Attach + Send           │
└─────────────────────────────────────┘
```

### Message Component
```tsx
interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  image?: string          // Upload utilisateur
}
```

### Chat Behaviors
- **Mascot** : Visible si premier message seulement
- **Auto-scroll** : Vers le bas à chaque message
- **Typing indicator** : 3 dots animés pendant réponse bot
- **Image preview** : Avant envoi, avec bouton suppression

---

## 👤 Profil (`/profile`)

### Structure
```
┌─────────────────────────────────────┐
│ Avatar + Nom Centered               │
├─────────────────────────────────────┤
│ Informations Personnelles Card      │
│ [Edit Mode: Inputs | View Mode]     │
├─────────────────────────────────────┤  
│ Sécurité Card                      │
│ (Change Password, 2FA)             │
├─────────────────────────────────────┤
│ Actions Compte                     │
│ (Logout, Delete Account)           │
└─────────────────────────────────────┘
```

### Edit Mode Toggle
```tsx
const [isEditing, setIsEditing] = useState(false)

// Mode View: Divs avec clay-pressed
// Mode Edit: ClayInput avec validation
```

### Form Validation
- **Real-time** : onChange validation
- **Submit** : Async avec loading spinner
- **Toast** : Confirmation succès

---

## ⚙️ Paramètres (`/settings`)

### Tab Structure  
```
┌─────────────────────────────────────┐
│ Tabs: Animaux | Notifications | UI  │
├─────────────────────────────────────┤
│ Tab Content:                        │
│                                     │
│ [Mes Animaux]                      │
│ ┌─────────────────────────────────┐ │
│ │ Milo (Actif) [Edit] [Delete]   │ │
│ │ Luna (Inactif) [Activate]      │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Pet Management
- **Active pet** : Badge vert, photo normale
- **Inactive pets** : Badge gris, photo désaturée
- **Actions** : Edit inline, Delete avec confirmation

---

## 🚀 Onboarding (`/onboarding`)

### 3 Étapes Structure
```
Step 1: Welcome
┌─────────────────────────────────────┐
│ Progress: ████░░ (1/3)             │
├─────────────────────────────────────┤
│ Lottie Animation Placeholder       │ 
│ "Bienvenue dans votre cocon"       │
│                                    │
│ [Créer notre espace →]            │
└─────────────────────────────────────┘

Step 2: Pet Profile  
┌─────────────────────────────────────┐
│ Progress: ████████░░ (2/3)         │
├─────────────────────────────────────┤
│ Photo Upload (Circle)              │
│ Form: Nom, Espèce, Race, Date      │
│                                    │
│ [← Retour]      [Voici Milo! →]   │
└─────────────────────────────────────┘

Step 3: First Action
┌─────────────────────────────────────┐
│ Progress: ████████████ (3/3)       │
├─────────────────────────────────────┤  
│ Pet Avatar + Check Animation        │
│ "Le profil de Milo est prêt"       │
│                                    │
│ [Ajouter vaccin] [Noter souvenir]  │
│ [Passer cette étape]               │
└─────────────────────────────────────┘
```

### Animations Spécifiques
- **Step transition** : Slide left/right
- **Progress bar** : Width animate 500ms
- **Success check** : `animate-signature-check`
- **Photo upload** : Hover clay-raised → clay-floating

### Validation & Flow
- **Step 2** : Nom requis pour continuer
- **Step 3** : Actions optionnelles, "Passer" disponible
- **Completion** : Loader 2s → Redirect dashboard

---

## 📋 Patterns Transversaux

### Page Headers
```tsx
// Pattern standard
<div className="p-4 lg:p-6 space-y-4">
  <div>
    <h1 className="text-2xl lg:text-3xl font-bold text-bubble-up animate">
      {pageTitle}
    </h1>
    <p className="text-muted-foreground text-bubble-up animate" 
       style={{'--delay': '200ms'}}>
      {pageSubtitle}
    </p>
  </div>
  {/* Page content */}
</div>
```

### Loading States
```tsx
// Skeleton pattern
<div className="space-y-4">
  {Array(3).fill(0).map((_, i) => (
    <ClaySkeleton key={i} className="h-20 w-full" />
  ))}
</div>

// Spinner pattern  
<div className="flex items-center justify-center py-8">
  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
</div>
```

### Empty States
```tsx
<ClayCard className="text-center py-12">
  <ClayCardContent>
    <div className="h-16 w-16 clay-floating rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
      <SearchIcon className="h-8 w-8 text-accent" />
    </div>
    <h3 className="font-semibold mb-2">Aucun résultat</h3>
    <p className="text-muted-foreground text-sm">
      Essayez de modifier vos critères de recherche
    </p>
  </ClayCardContent>
</ClayCard>
```

### Error Boundaries
```tsx
<div role="alert" className="clay-card p-6 border-error">
  <div className="flex items-start gap-4">
    <AlertTriangle className="h-6 w-6 text-error flex-shrink-0" />
    <div>
      <h3 className="font-semibold text-error mb-2">Une erreur est survenue</h3>
      <p className="text-sm text-muted-foreground mb-4">{errorMessage}</p>
      <ClayButton variant="outline" onClick={handleRetry}>
        Réessayer
      </ClayButton>
    </div>
  </div>
</div>
```
