
# Motion Design - AnimaHub

## 🎪 Philosophie Animation

### Claymorphisme Vivant
Les animations d'AnimaHub simulent les propriétés physiques de la pâte à modeler :
- **Élasticité** : Rebonds doux sur les interactions
- **Viscosité** : Transitions fluides sans à-coups
- **Réponse tactile** : Press/release immédiat au toucher

### Courbes Signature
```css
/* Courbe principale - élasticité douce */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Claymorphisme - transitions naturelles */  
--ease-clay: cubic-bezier(0.4, 0, 0.2, 1);

/* Micro-interactions rapides */
--ease-micro: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

## ⚡ Système de Durées

### Échelle Temporelle
```css
--duration-instant: 0ms        /* Feedback immédiat */
--duration-micro: 150ms        /* Hover, focus */  
--duration-fast: 220ms         /* Buttons, badges */
--duration-normal: 300ms       /* Cards, modals */
--duration-slow: 450ms         /* Page transitions */
--duration-feature: 600ms      /* Animations signature */
```

### Usage par Contexte
- **≤150ms** : Feedback utilisateur (hover, press)
- **150-300ms** : Transitions UI (modal, drawer)
- **300-600ms** : Animations expressives (bounce, signature)
- **>600ms** : États loading, splash

## 🎯 Animations Signature

### 1. Bubble-Up Text
**Usage** : Titres, labels importants
**Fichier** : `src/index.css:144`

```css
.text-bubble-up {
  animation: bubble-up 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.text-bubble-up.animate {
  animation-delay: var(--delay, 0ms);
}

@keyframes bubble-up {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

#### Utilisation
```tsx
<h1 className="text-bubble-up animate" style={{'--delay': '0ms'}}>
  Bonjour Clara !
</h1>
<p className="text-bubble-up animate" style={{'--delay': '200ms'}}>
  Comment va Milo aujourd'hui ?
</p>
```

### 2. Soft-Bounce Entrance
**Usage** : Cards, widgets au scroll/load
**Fichier** : `src/index.css:304`

```css
@keyframes soft-bounce {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  50% {
    transform: scale(1.02) translateY(-2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-soft-bounce {
  animation: soft-bounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
```

#### Staggering
```tsx
{items.map((item, index) => (
  <Card 
    key={item.id}
    className="animate-soft-bounce"
    style={{'--delay': `${index * 100}ms`}}
  />
))}
```

### 3. Clay-Card Hover 
**Usage** : Cards interactives
**Fichier** : `src/index.css:85`

```css
.clay-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.clay-card:hover {
  box-shadow: var(--shadow-floating);
  transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02);
}
```

### 4. Signature-Check Animation  
**Usage** : Validations, confirmations
**Fichier** : `src/index.css:330`

```css
@keyframes signature-check {
  0% {
    stroke-dasharray: 0 100;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dasharray: 100 0;
    opacity: 1;
  }
}

.animate-signature-check {
  animation: signature-check 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
```

## 🎛️ Interactions Tactiles

### Button Press/Release
**Fichier** : `src/index.css:53`

```css
.clay-button {
  transition: all 0.15s ease-out;
}

.clay-button:hover {
  box-shadow: var(--shadow-floating);
  transform: translateY(-1px);
}

.clay-button:active {
  box-shadow: var(--shadow-pressed);
  transform: translateY(1px);
}

.clay-button:focus-visible {
  box-shadow: var(--shadow-raised), 0 0 0 4px hsl(var(--primary) / 0.3);
}
```

### Input Focus States
```css
.clay-input {
  transition: box-shadow 0.15s ease-out;
}

.clay-input:focus {
  box-shadow: var(--shadow-pressed), 
              inset 0 0 0 2px hsl(var(--primary) / 0.5);
}
```

### FAB Interactions
**Localisation** : `src/index.css:161`

```css
.clay-fab {
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.clay-fab:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 16px 16px 32px rgba(180, 145, 120, 0.4), 
              -8px -8px 16px rgba(255, 255, 255, 0.9);
}

.clay-fab:active {
  transform: scale(0.95) translateY(1px);
  box-shadow: var(--shadow-pressed);
}
```

## 🌊 Page Transitions

### Fade-In Entrance (Pages)
```css
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Modal/Drawer Animations
```css
/* Modal Scale-In */
.modal-enter {
  animation: scale-in 0.2s ease-out;
}

@keyframes scale-in {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Drawer Slide */
.drawer-enter {
  animation: slide-in-right 0.3s ease-out;
}

@keyframes slide-in-right {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0); }
}
```

## 🎨 Animations Spécifiques

### Blob Background Morph
**Fichier** : `src/index.css:36`

```css
body::before {
  background: radial-gradient(circle at 20% 80%, hsl(var(--secondary)) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, hsl(var(--primary)) 0%, transparent 50%);
  opacity: 0.05;
  animation: blob-morph 20s ease-in-out infinite;
}

@keyframes blob-morph {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
```

### Skeleton Loading
**Fichier** : `src/index.css:126`

```css
.clay-skeleton {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--surface)) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 200% 100%;
  animation: clay-skeleton-pulse 2s ease-in-out infinite;
}

@keyframes clay-skeleton-pulse {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Switch Toggle Animation
```css
.clay-switch-thumb {
  transition: all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.clay-switch[data-state="checked"] .clay-switch-thumb {
  transform: translateX(20px);
  background: hsl(var(--primary));
}
```

## 🌙 Dark Theme Transitions

### Theme Toggle Animation
```css
.theme-transition {
  transition: 
    background-color 0.3s ease-out,
    border-color 0.3s ease-out,
    color 0.3s ease-out,
    box-shadow 0.3s ease-out;
}

/* Éviter les transitions sur les pseudo-éléments */
*,
*::before,
*::after {
  transition: 
    background-color 0.3s ease-out,
    border-color 0.3s ease-out,
    color 0.3s ease-out;
}
```

## ♿ Accessibility & Reduced Motion

### Respect Preferences
**Fichier** : `src/index.css:354`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  body::before {
    animation: none;
  }
  
  .clay-card:hover {
    transform: none;
  }
}
```

### Alternative Motion  
```css
.reduced-motion .animate-bounce {
  animation: fade-in 0.3s ease-out;
}

.reduced-motion .clay-card:hover {
  transform: scale(1.01);      /* Subtle scale instead of 3D */
}
```

## 🎯 Performance Guidelines

### Optimisation Animations
1. **Privilégier `transform` et `opacity`** (GPU-accelerated)
2. **Éviter `width`, `height`, `top`, `left`** (layout thrashing)
3. **Max 60fps** : durées multiples de 16.67ms
4. **Limiter animations simultanées** : max 3-4 éléments

### CSS Properties Performance
```css
/* ✅ Performant */
.good {
  transform: translateX(100px) scale(1.1);
  opacity: 0.8;
}

/* ❌ Éviter */
.bad {
  width: 200px;
  margin-left: 50px;
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
}
```

### Will-Change Usage
```css
.animating-element {
  will-change: transform, opacity;
}

.animation-complete {
  will-change: auto;          /* Reset after animation */
}
```

## 📱 Motion Responsive

### Touch Feedback
```css
@media (hover: none) {
  .clay-button:hover {
    transform: none;           /* Pas de hover sur touch */
  }
  
  .clay-button:active {
    transform: scale(0.98);    /* Feedback tactile */
  }
}
```

### Animation Scaling
```css
/* Réduire les animations mobiles */
@media (max-width: 768px) {
  .animate-soft-bounce {
    animation-duration: 0.3s;  /* Plus rapide */
  }
  
  .clay-card:hover {
    transform: scale(1.01);    /* Moins prononcé */
  }
}
```
