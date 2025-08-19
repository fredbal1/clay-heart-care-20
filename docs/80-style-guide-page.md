
# Guide Styleguide Page - AnimaHub

## 📖 Vue d'ensemble

La page `/styleguide` est votre référence visuelle complète pour reproduire ou personnaliser le design system AnimaHub. Elle présente tous les composants, tokens et patterns dans leurs différents états.

## 🎯 Sections du Styleguide

### 1. Design Tokens
**URL** : `/styleguide#tokens`

#### Palette Couleurs
- **Cartes couleurs** avec codes HEX, RGB, HSL
- **Contrastes** AA/AAA affichés
- **Thème clair/sombre** avec toggle live
- **Usage** : Où chaque couleur est utilisée

```
┌─────────────────────────────────────┐
│ 🎨 Palette Couleurs                 │
├─────────────────────────────────────┤
│ Primary   #7B8FA1  HSL(210,18%,55%)│
│ Used in: Buttons, Links, Focus      │
│ ██████████ Contrast: 4.8:1 (AA ✓)  │
├─────────────────────────────────────┤  
│ Secondary #84A59D  HSL(162,19%,55%)│
│ Used in: Success states, Nature     │
│ ██████████ Contrast: 4.6:1 (AA ✓)  │
└─────────────────────────────────────┘
```

#### Typographie  
- **Échelle complète** : xs (12px) → 3xl (30px)
- **Poids disponibles** : Light (300) → Bold (700)
- **Interlignage** : Tight → Relaxed
- **Exemple textes** avec vraies phrases

#### Espacement & Layout
- **Grille 4pt** : Visualisation 4px → 64px
- **Containers** : Largeurs max par breakpoint
- **Z-index** : Couches avec exemples superposés

### 2. Composants Interactifs
**URL** : `/styleguide#components`

#### Structure par Composant
```
ClayButton
├── Variants (7): Default, Secondary, Accent, Success, Warning, Error, Ghost, Outline
├── Sizes (5): SM, Default, LG, XL, Icon
├── States (5): Default, Hover, Focus, Active, Disabled  
├── Shapes (3): Default, Pill, Square
└── Code Snippet: <ClayButton variant="accent" size="lg">Text</ClayButton>
```

#### États Dynamiques
- **Hover** : Survol automatique toutes les 3s
- **Focus** : Simulation focus clavier 
- **Loading** : Spinner + disabled state
- **Error** : États d'erreur avec messages

### 3. Layout Patterns
**URL** : `/styleguide#layouts`

#### Grilles Responsives
```
Mobile (360px)     Tablet (768px)     Desktop (1024px+)
┌──────────────┐   ┌─────────┬──────┐  ┌───┬───┬───┬───┐
│      1       │   │    1    │  2   │  │ 1 │ 2 │ 3 │ 4 │
├──────────────┤   ├─────────┼──────┤  ├───┼───┼───┼───┤
│      2       │   │    3    │  4   │  │ 5 │ 6 │ 7 │ 8 │
├──────────────┤   └─────────┴──────┘  └───┴───┴───┴───┘
│      3       │
└──────────────┘
```

#### Containers & Spacing
- **Padding progression** : Mobile 16px → Desktop 32px
- **Gaps** : Entre cards, widgets, sections
- **Breakpoints visuels** : Lignes guides sur resize

### 4. Animations & Motion
**URL** : `/styleguide#motion`

#### Galerie d'Animations
```
┌─────────────────────────────────────┐
│ ▶️ Bubble-Up Text                   │
│ "Bonjour Clara !" remonte + bounce  │
├─────────────────────────────────────┤
│ ▶️ Soft-Bounce Cards                │
│ Entrée séquentielle avec délai     │  
├─────────────────────────────────────┤
│ ▶️ Clay-Card Hover                  │
│ Rotation 3D + élévation            │
├─────────────────────────────────────┤
│ ▶️ Signature-Check                  │  
│ Trait qui se dessine (validation)   │
└─────────────────────────────────────┘
```

#### Contrôles Animation
- **Play/Pause** : Lancer animation manuellement
- **Speed** : 0.5x, 1x, 2x vitesse
- **Reduced Motion** : Toggle pour tester accessibilité

### 5. Claymorphisme Showcase  
**URL** : `/styleguide#claymorphisme`

#### Système d'Ombres
```
Raised (Default)        Pressed (Inputs)        Floating (Hover)
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │░░░░░░░░░░░░░░░░░│    │                 │
│   Surface       │    │░ Enfoncé      ░│    │   Élevé         │
│   Élevée        │    │░              ░│    │   Maximum       │
│                 │    │░░░░░░░░░░░░░░░░░│    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
   8px + (-4px)         inset 4px + (-2px)      12px + (-6px)
```

#### Interactive Playground
- **Sliders** : Ajuster blur, spread, opacity des ombres
- **Color picker** : Couleur d'ombre personnalisée  
- **Preview live** : Card mise à jour en temps réel

## 🎮 Features Interactives

### Theme Switcher
```tsx
// Toggle clair/sombre avec animation
<ClayButton 
  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  className="theme-toggle"
>
  {theme === 'light' ? <Moon /> : <Sun />}
</ClayButton>
```

### Responsive Preview
```tsx
// Bascule Device frames
const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },  
  { name: 'Desktop', width: 1440, height: 900 }
]
```

### Copy-Paste Code
```tsx
// Chaque exemple a un bouton "Copy Code"
<ClayButton 
  variant="ghost" 
  size="sm"
  onClick={() => copyToClipboard(componentCode)}
>
  <Copy className="h-4 w-4" />
</ClayButton>
```

## 🔍 Navigation & Recherche

### Menu Ancré
```
┌─────────────┐
│ 🔗 Tokens   │ ← Active section
├─────────────┤
│ 🧱 Components│
├─────────────┤  
│ 📐 Layouts  │
├─────────────┤
│ ⚡ Motion   │
├─────────────┤
│ 🎨 Clay     │
└─────────────┘
```

### Search Box
```tsx
<ClayInput
  placeholder="Rechercher composant, token..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="search-styleguide"
/>
// Filtre en temps réel les sections/composants
```

### Filters  
- **By Category** : Buttons, Cards, Inputs, Navigation
- **By Status** : Stable, Beta, Deprecated
- **By Platform** : Mobile, Desktop, Touch

## 📱 Responsive Design

### Mobile Styleguide
```css
@media (max-width: 768px) {
  .styleguide-layout {
    flex-direction: column;
  }
  
  .component-showcase {
    padding: var(--space-4);
  }
  
  .code-preview {
    font-size: 14px;           /* Plus petit sur mobile */
    overflow-x: auto;
  }
}
```

### Touch Interactions
- **Swipe** : Navigation entre sections
- **Long press** : Copy code/couleur
- **Pinch zoom** : Sur exemples complexes

## 🎯 Sections Clés à Implémenter

### Avatar Showcase (Pet + Account)
```tsx
const AvatarShowcase = () => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <h3>Pet Avatar (Dashboard)</h3>
      <ClayAvatar 
        size="xl" 
        className="pet-card-avatar"
        style={{
          '--pet-card-avatar-size': '96px',
          '--pet-card-avatar-shape': 'circle'
        }}
      >
        <ClayAvatarImage src="/milo.jpg" alt="Milo" />
      </ClayAvatar>
      <p>Size: --pet-card-avatar-size</p>
      <p>Shape: --pet-card-avatar-shape</p>
    </div>
    
    <div>
      <h3>Account Avatar (Sidebar)</h3>
      <ClayAvatar className="account-avatar">
        <ClayAvatarImage src="/clara.jpg" alt="Clara" />
      </ClayAvatar>
      <p>Size: --account-avatar-size</p>
      <p>Border: --account-avatar-border</p>
    </div>
  </div>
)
```

### FAB Gallery
```tsx
const FABShowcase = () => (
  <div className="relative h-48 bg-surface/30 rounded-clay">
    <ClayButton className="clay-fab" style={{ position: 'absolute' }}>
      <MessageCircle />
    </ClayButton>
    <div className="controls">
      <label>FAB Color: --fab-bg</label>
      <input type="color" onChange={updateFabColor} />
      <label>FAB Size: --fab-size</label>
      <input type="range" min="48" max="72" onChange={updateFabSize} />
    </div>
  </div>
)
```

### Status Dot Demo
```tsx
const StatusDotDemo = () => (
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2">
      <div className="status-dot" />
      <span>Bonjour Clara !</span>
    </div>
    <div className="controls">
      <ColorPicker 
        value={statusDotColor}
        onChange={setStatusDotColor}
        label="Couleur status dot"
      />
    </div>
  </div>
)
```

## 🔧 Intégration Design Controls

### Sync avec Controls Page
```tsx
// Variables partagées entre styleguide et design-controls
const useDesignTokens = () => {
  const [tokens, setTokens] = useLocalStorage('design-tokens', defaultTokens)
  
  return {
    tokens,
    updateToken: (key: string, value: string) => {
      setTokens(prev => ({ ...prev, [key]: value }))
      // Apply to CSS variables immédiatement
      document.documentElement.style.setProperty(`--${key}`, value)
    }
  }
}
```

### Live Preview Updates
```tsx
// Écouter changements depuis design-controls
useEffect(() => {
  const handleTokenChange = (event: CustomEvent) => {
    const { token, value } = event.detail
    document.documentElement.style.setProperty(`--${token}`, value)
  }
  
  window.addEventListener('design-token-change', handleTokenChange)
  return () => window.removeEventListener('design-token-change', handleTokenChange)
}, [])
```

## 📊 Performance & SEO

### Code Splitting
```tsx
// Lazy load sections lourdes
const MotionShowcase = lazy(() => import('./sections/MotionShowcase'))
const ComponentGallery = lazy(() => import('./sections/ComponentGallery'))
```

### Image Optimization  
```tsx
// Lazy load images exemples
<img 
  src="/placeholder.jpg"
  data-src="/real-example.jpg" 
  className="lazy-load"
  loading="lazy"
/>
```

### Search Indexing
```html
<!-- Meta tags pour référencement interne -->
<meta name="description" content="AnimaHub Design System - Composants, tokens et patterns" />
<meta name="keywords" content="claymorphisme, design system, react, tailwind" />
```

Le styleguide devient ainsi votre source de vérité visuelle et votre outil principal pour maintenir la cohérence du design system AnimaHub !
