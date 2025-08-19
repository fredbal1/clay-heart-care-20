
# Layouts & Responsive - AnimaHub

## 📱 Stratégie Mobile-First

### Breakpoints
```css
/* Mobile (default) */
@media (min-width: 0) { /* 360px minimum */ }

/* Tablet */  
@media (min-width: 768px) { /* md */ }

/* Desktop */
@media (min-width: 1024px) { /* lg */ }

/* Large Desktop */
@media (min-width: 1280px) { /* xl */ }
```

### Container System
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;           /* 16px mobile */
}

@media (min-width: 768px) {
  .container { 
    padding: 0 1.5rem;       /* 24px tablet */
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container { 
    padding: 0 2rem;         /* 32px desktop */
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## 🏗️ Layout Architecture

### App Shell
```
┌─────────────────────────┐
│     Mobile Header       │ ← Visible < 768px
├─────────────────────────┤
│                         │
│     Main Content        │ ← Full width mobile
│                         │ ← Avec sidebar desktop
│                         │
└─────────────────────────┘
```

### Desktop Layout (≥768px)
```
┌──────────┬──────────────────┐
│          │                  │
│ Sidebar  │   Main Content   │
│ (280px)  │   (flex-1)       │
│          │                  │
│          │                  │
└──────────┴──────────────────┘
```

#### Structure
- **Sidebar** : `w-70` (280px) fixe, `lg:translate-x-0`
- **Main** : `flex-1`, `lg:pl-0` (pas de padding gauche)
- **Overlay** : Mobile seulement, `backdrop-blur-sm`

### Sidebar Component
**Fichier** : `src/components/layout/sidebar.tsx`

#### États
```tsx
interface SidebarProps {
  isOpen: boolean      // Mobile toggle
  setIsOpen: (open: boolean) => void
}
```

#### Classes Responsives
```css
/* Mobile (hidden by default) */
.sidebar {
  position: fixed;
  top: 0;
  left: 0; 
  height: 100vh;
  width: 280px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  z-index: 40;
}

/* Mobile Open */
.sidebar--open {
  transform: translateX(0);
}

/* Desktop */
@media (min-width: 768px) {
  .sidebar {
    position: static;
    transform: translateX(0);
  }
}
```

## 📐 Grilles Adaptatives

### Dashboard KPIs (3 colonnes)
**Localisation** : `src/pages/dashboard/dashboard.tsx:67`

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* Mobile: 3 cols serrées */
  gap: 0.5rem;                            /* 8px mobile */
}

@media (min-width: 768px) {
  .stats-grid {
    gap: 1rem;                            /* 16px tablet+ */
  }
}
```

### Dashboard Main Grid
**Localisation** : `src/pages/dashboard/dashboard.tsx:135`

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;             /* Mobile: 1 colonne */
  gap: 1rem;
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 2fr 1fr;       /* Desktop: 2/3 + 1/3 */
    gap: 1.5rem;
  }
}
```

### Services Grid
**Localisation** : `src/pages/services/services.tsx:215`

```css
.services-grid {
  display: grid;
  grid-template-columns: 1fr;             /* Mobile: 1 col */
  gap: 1rem;
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 cols */
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(var(--grid-desktop-cols), 1fr);
  }
}
```

### Variables de Contrôle
```css
:root {
  --grid-mobile-cols: 1;
  --grid-tablet-cols: 2; 
  --grid-desktop-cols: 3;
  --grid-gap: var(--space-4);    /* 16px */
}
```

## 🎯 Composants Responsifs Clés

### Pet Switcher (Dashboard)
**Localisation** : `src/pages/dashboard/dashboard.tsx:53`

#### Comportement
- **Mobile** : Affiché dans une card séparée sous le header
- **Desktop** : Intégré dans la sidebar droite

```css
/* Mobile: Card visible */
.pet-switcher-mobile {
  display: block;
}

/* Desktop: Card cachée, utilise sidebar */
@media (min-width: 1024px) {
  .pet-switcher-mobile {
    display: none;
  }
}
```

### Navigation Actions
**Localisation** : Mobile header, Sidebar desktop

#### Mobile Header
```css
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid hsl(var(--border) / 0.3);
}

@media (min-width: 768px) {
  .mobile-header {
    display: none;
  }
}
```

### Photo Carousel
**Responsive Behavior**
- **Mobile** : Swipe natif, dots navigation
- **Tablet+** : Hover navigation, indicateurs latéraux

## 📋 Padding & Spacing Rules

### Page Containers
```css
/* Mobile */
.page-container {
  padding: 1rem;                          /* 16px */
}

/* Tablet */
@media (min-width: 768px) {
  .page-container {
    padding: 1.5rem;                      /* 24px */
  }
}

/* Desktop */  
@media (min-width: 1024px) {
  .page-container {
    padding: 2rem;                        /* 32px */
  }
}
```

### Cards Spacing
```css
.card-grid {
  gap: 1rem;                              /* Mobile: 16px */
}

@media (min-width: 768px) {
  .card-grid {
    gap: 1.5rem;                          /* Tablet: 24px */
  }
}

@media (min-width: 1024px) {
  .card-grid {  
    gap: 2rem;                            /* Desktop: 32px */
  }
}
```

## 🎨 Layout Utilities

### Flex Utilities
```css
.stack-mobile {
  flex-direction: column;
}

@media (min-width: 768px) {
  .stack-mobile {
    flex-direction: row;
    align-items: center;
  }
}
```

### Hide/Show Responsive
```css
.hidden-mobile {
  display: none;
}

@media (min-width: 768px) {
  .hidden-mobile {
    display: block;
  }
}

.visible-mobile {
  display: block;
}

@media (min-width: 768px) {
  .visible-mobile {
    display: none;
  }
}
```

## ⚡ Performance Layout

### CSS Grid Performance
- Utilisation préférentielle de `grid-template-columns`
- Éviter `grid-auto-fit` pour performances
- Variables CSS pour grilles dynamiques

### Flexbox Patterns
```css
/* Preferred: Explicit flex */
.flex-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Avoid: Auto-sizing complex */
.avoid {
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
}
```

### Overflow Prevention
```css
.safe-container {
  width: 100%;
  min-width: 0;                           /* Prevent overflow */
  overflow-wrap: break-word;
}

.truncate-mobile {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 🎯 Layout Checklist

### Mobile (360px→767px)
- [x] Aucun scroll horizontal
- [x] Touch targets ≥ 44px
- [x] Navigation hamburger accessible
- [x] Cards full-width avec margin

### Tablet (768px→1023px)  
- [x] Grilles 2 colonnes optimales
- [x] Sidebar si pertinent 
- [x] Spacing augmenté

### Desktop (1024px+)
- [x] Sidebar fixe visible
- [x] Grilles 3-4 colonnes max
- [x] Hover states actifs
- [x] Navigation clavier fluide
