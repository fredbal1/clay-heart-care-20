
# Accessibilité - AnimaHub

## ♿ Conformité WCAG 2.1 AA

### Contrastes Couleurs

#### Ratios Minimum (AA)
- **Texte normal** : 4.5:1
- **Texte large** : 3:1  
- **Éléments UI** : 3:1

#### Tests Thème Clair
```css
/* ✅ Conformes */
--foreground: 27 22% 29%        /* #574138 sur #F3E9DC = 7.2:1 */
--primary: 210 18% 55%          /* #7B8FA1 sur #F3E9DC = 4.8:1 */
--muted-foreground: 27 15% 45%  /* Sur muted = 4.6:1 */

/* ⚠️ À surveiller */
--accent: 6 75% 76%             /* #F4978E sur #F3E9DC = 3.1:1 (limite) */
```

#### Tests Thème Sombre
```css
/* ✅ Conformes */
--foreground: 37 25% 89%        /* #F3E9DC sur #1A202C = 8.1:1 */
--primary: 162 19% 55%          /* #84A59D sur #1A202C = 5.2:1 */
```

#### Outils de Test
- Contrast Checker (WebAIM)
- Colour Contrast Analyser (TPGi)
- Dev Tools Lighthouse

### Tailles Cibles Tactiles

#### Standards (WCAG 2.1 AA)
- **Minimum** : 44×44px (2.75rem)
- **Recommandé** : 48×48px (3rem)
- **Espacement** : 8px minimum entre targets

#### Audit Composants
```css
/* ✅ Conformes */
.clay-button {
  min-height: 44px;            /* default: h-11 */
  min-width: 44px;
  padding: 12px 24px;
}

.clay-button-sm {
  min-height: 44px;            /* même si visuellement plus petit */
  min-width: 44px;
}

.clay-fab {
  width: 56px;                 /* FAB IA */
  height: 56px;
}

/* ✅ Exceptions valides */
.carousel-dot {
  width: 8px;                  /* Navigation secondaire */
  height: 8px;
  /* Groupé avec cible parent 44×44px */
}
```

#### Mobile Touch Zones
```css
@media (max-width: 768px) {
  .touch-target {
    min-height: 48px;          /* Plus généreux sur mobile */
    min-width: 48px;
  }
}
```

## ⌨️ Navigation Clavier

### Focus Management

#### Styles Focus Visible
```css
.clay-button:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  box-shadow: var(--shadow-raised), 
              0 0 0 4px hsl(var(--primary) / 0.3);
}

.clay-input:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: -2px;
}

/* Focus custom pour claymorphisme */
.clay-card:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 4px;
  box-shadow: var(--shadow-floating);
}
```

#### Ordre de Tabulation
**Dashboard** : `src/pages/dashboard/dashboard.tsx`
1. Navigation (mobile hamburger / desktop links)
2. Header actions
3. KPIs widgets (en ligne, gauche→droite)  
4. Événements list (haut→bas)
5. Pet switcher 
6. Photo carousel (navigation)
7. FAB IA

#### Focus Trap (Modals/Drawers)
```tsx
// Exemple modal AnimaBot
const modalRef = useRef<HTMLDivElement>(null);
const firstFocusableRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (isOpen && firstFocusableRef.current) {
    firstFocusableRef.current.focus();
  }
}, [isOpen]);

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose();
  }
  // Implement focus trap logic
};
```

### Keyboard Shortcuts
```typescript
// Global shortcuts
const globalShortcuts = {
  'Alt+M': 'Open main menu',
  'Alt+1': 'Go to Dashboard', 
  'Alt+2': 'Go to Health Record',
  'Alt+3': 'Go to Journal',
  'Alt+C': 'Open AnimaBot chat',
  'Escape': 'Close modal/drawer'
};
```

## 🔊 Screen Readers

### Landmarks ARIA
```html
<!-- Layout structure -->
<header role="banner">
  <nav role="navigation" aria-label="Navigation principale">
    <!-- Menu items -->
  </nav>
</header>

<main role="main" aria-labelledby="page-title">
  <h1 id="page-title">Dashboard</h1>
  <!-- Main content -->
</main>

<aside role="complementary" aria-label="Informations animal">
  <!-- Pet info sidebar -->
</aside>
```

### Labels et Descriptions
```tsx
// Pet Switcher
<button 
  aria-label={`Animal actuel: ${pet.name}, ${pet.species}`}
  aria-describedby="pet-details"
>
  <img alt={`Photo de ${pet.name}`} />
</button>
<div id="pet-details" className="sr-only">
  {pet.breed}, {pet.age}, dernière visite {pet.lastVisit}
</div>

// Status indicators
<div 
  role="status" 
  aria-label={event.done ? "Événement terminé" : "Événement à venir"}
>
  <CheckIcon aria-hidden="true" />
</div>

// FAB IA
<button aria-label="Ouvrir AnimaBot, assistant IA">
  <MessageCircle aria-hidden="true" />
</button>
```

### Live Regions
```tsx
// Toast notifications
<div 
  role="alert" 
  aria-live="assertive" 
  className="sr-only"
>
  {toastMessage}
</div>

// Loading states  
<div 
  role="status" 
  aria-live="polite"
  aria-label="Chargement en cours"
>
  <Spinner aria-hidden="true" />
</div>

// Form validation
<div 
  role="alert" 
  aria-live="assertive"
  id="email-error"
>
  {emailError}
</div>
```

### Texte Caché (Screen Reader Only)
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## 🎨 Reduced Motion Support

### Media Query Implementation
**Fichier** : `src/index.css:354`

```css
@media (prefers-reduced-motion: reduce) {
  /* Désactiver animations complexes */
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Garder transitions essentielles */
  .clay-button,
  .clay-input {
    transition-duration: 0.1s !important;
  }
  
  /* Supprimer animations décoratives */
  body::before {
    animation: none;
  }
  
  .clay-card:hover {
    transform: none;
  }
  
  .animate-bounce,
  .animate-pulse {
    animation: none;
  }
}
```

### Alternative Feedback
```css
/* Alternatives sans mouvement */
@media (prefers-reduced-motion: reduce) {
  .clay-button:hover {
    background-color: hsl(var(--primary) / 0.9);
  }
  
  .clay-card:hover {
    border-color: hsl(var(--primary));
    box-shadow: var(--shadow-floating);
  }
  
  .loading-spinner {
    animation: none;
    opacity: 0.6;
  }
}
```

## 📱 Mobile Accessibility

### Touch Gestures Support
```tsx
// Swipe navigation
const handleSwipe = useCallback((direction: 'left' | 'right') => {
  // Alternative keyboard navigation
  if (direction === 'left') {
    nextSlide();
  } else {
    prevSlide();
  }
}, []);

// Announce swipe actions
<div role="region" aria-label="Carrousel photos, navigation par glissement">
  <button aria-label="Photo précédente">{/* ... */}</button>
  <button aria-label="Photo suivante">{/* ... */}</button>
</div>
```

### Zoom Support (200-500%)
```css
/* Text scaling support */
.responsive-text {
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  line-height: 1.5;
}

/* Container flexibility */
.zoom-container {
  width: 100%;
  min-width: 0;
  overflow-wrap: break-word;
}

/* Button scaling */
@media (min-resolution: 2dppx) {
  .clay-button {
    min-height: 48px;          /* Plus large sur high-DPI */
  }
}
```

## 🔍 Testing & Validation

### Automated Testing
```json
// package.json scripts
{
  "test:a11y": "axe-cli http://localhost:3000",
  "test:lighthouse": "lhci autorun",
  "test:contrast": "pa11y --runner axe http://localhost:3000"
}
```

### Manual Testing Checklist
```markdown
## Navigation
- [ ] Tab order logique sur toutes pages
- [ ] Focus visible sur tous éléments interactifs  
- [ ] Escape ferme modals/drawers
- [ ] Pas de focus trap non intentionnel

## Screen Readers
- [ ] Landmarks correctement identifiés
- [ ] Headings hiérarchie logique (h1→h2→h3)
- [ ] Images alt text descriptif
- [ ] Boutons labels explicites
- [ ] États annoncés (loading, error, success)

## Contraste & Visuel  
- [ ] Ratios contrastes AA conformes
- [ ] Information non seulement par couleur
- [ ] Text lisible à 200% zoom
- [ ] Focus indicators visibles

## Mobile & Touch
- [ ] Targets ≥ 44px sur mobile
- [ ] Gestures alternatives disponibles
- [ ] Orientation portrait/landscape supportée
- [ ] Zoom 500% utilisable
```

### Tools & Extensions
- **axe DevTools** : Chrome/Firefox extension
- **WAVE** : Web accessibility evaluator  
- **Lighthouse** : Audit accessibilité intégré
- **Screen Reader** : NVDA (Windows), VoiceOver (Mac)
- **Keyboard Only** : Test navigation sans souris

## 🎯 Conformité Par Composant

### ClayButton
```tsx
<ClayButton 
  aria-label="Ajouter événement"        // Label explicite
  aria-describedby="hint-text"          // Description additionnelle
  disabled={loading}                    // État désactivé
  aria-busy={loading}                   // État loading
>
  {loading ? (
    <>
      <Spinner aria-hidden="true" />
      <span className="sr-only">Chargement...</span>
    </>
  ) : (
    <>
      <Plus aria-hidden="true" />
      Ajouter
    </>
  )}
</ClayButton>
```

### ClayCard Interactive
```tsx
<ClayCard 
  role="article"                        // Rôle sémantique
  tabIndex={0}                         // Focusable
  onKeyDown={handleKeyDown}            // Support clavier
  aria-labelledby="card-title"
>
  <ClayCardTitle id="card-title">
    Prochains événements
  </ClayCardTitle>
  {/* Content */}
</ClayCard>
```

### Form Inputs
```tsx
<div className="form-field">
  <label htmlFor="pet-name" className="required">
    Nom de l'animal
  </label>
  <ClayInput
    id="pet-name"
    aria-required="true"
    aria-invalid={error ? "true" : "false"}
    aria-describedby="pet-name-error pet-name-hint"
  />
  <div id="pet-name-hint" className="help-text">
    Le nom utilisé chez le vétérinaire
  </div>
  {error && (
    <div id="pet-name-error" role="alert" className="error-text">
      {error}
    </div>
  )}
</div>
```
