
# Design Tokens - AnimaHub Claymorphisme

## 🎨 Palette Couleurs

### Thème Clair - "Atelier Lumineux"
```css
--background: 37 25% 89%        /* #F3E9DC - Beige chaud */
--foreground: 27 22% 29%        /* #574138 - Marron foncé */
--surface: 37 25% 91%           /* Surface légèrement plus claire */

--primary: 210 18% 55%          /* #7B8FA1 - Bleu-gris doux */
--secondary: 162 19% 55%        /* #84A59D - Vert sauge */
--accent: 6 75% 76%             /* #F4978E - Saumon */

--success: 162 19% 55%          /* Vert sauge */
--warning: 6 75% 76%            /* Saumon */
--error: 0 65% 55%              /* Rouge chaleureux */

--muted: 37 15% 85%             /* Gris beige */
--border: 37 15% 82%            /* Bordures subtiles */
```

### Thème Sombre - "Cocon Nocturne"
```css
--background: 210 39% 15%       /* #1A202C - Bleu nuit profond */
--foreground: 37 25% 89%        /* #F3E9DC - Beige clair */
--surface: 210 35% 18%          /* Surface sombre */

--primary: 162 19% 55%          /* Vert sauge lumineux */
--secondary: 210 18% 55%        /* Bleu-gris */
--accent: 6 75% 76%             /* Saumon */
```

### Sélecteurs Clés
```css
.pet-card-avatar { color: hsl(var(--primary)); }
.account-avatar { border-color: hsl(var(--border)); }
.fab-button { background: hsl(var(--primary)); }
.status-dot { background: hsl(var(--success)); }
```

## ✍️ Typographie

### Familles
```css
--font-family: 'Outfit', sans-serif;
```

### Échelle (Modular Scale 1.25)
```css
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
```

### Poids
```css
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Interlignage
```css
--leading-none: 1
--leading-tight: 1.25
--leading-normal: 1.5
--leading-relaxed: 1.625
```

## 🔵 Rayons (Claymorphisme)

```css
--radius: 24px                  /* Radius généreux signature */
--radius-sm: calc(var(--radius) - 4px)    /* 20px */
--radius-md: calc(var(--radius) - 2px)    /* 22px */  
--radius-lg: var(--radius)                 /* 24px */
--radius-full: 9999px                      /* Cercles parfaits */
```

### Usage
```css
.clay-card { border-radius: var(--radius); }
.clay-button { border-radius: var(--radius); }
.clay-avatar { border-radius: var(--radius-full); }
```

## 🌑 Ombres Claymorphisme

### Système Double Éclairage
```css
/* Élévation normale */
--shadow-raised: 
  8px 8px 16px rgba(180, 145, 120, 0.2),    /* Ombre chaude */
  -4px -4px 8px rgba(255, 255, 255, 0.8);   /* Lumière froide */

/* Enfoncé (inputs, pressed) */
--shadow-pressed: 
  inset 4px 4px 8px rgba(180, 145, 120, 0.2),
  inset -2px -2px 4px rgba(255, 255, 255, 0.8);

/* Flottant (hover, FAB) */
--shadow-floating: 
  12px 12px 24px rgba(180, 145, 120, 0.3),
  -6px -6px 12px rgba(255, 255, 255, 0.9);

/* Subtile (petits éléments) */
--shadow-subtle: 
  4px 4px 8px rgba(180, 145, 120, 0.15),
  -2px -2px 4px rgba(255, 255, 255, 0.7);
```

### Classes Utilitaires
```css
.clay-raised { box-shadow: var(--shadow-raised); }
.clay-pressed { box-shadow: var(--shadow-pressed); }
.clay-floating { box-shadow: var(--shadow-floating); }
.clay-subtle { box-shadow: var(--shadow-subtle); }
```

## 📐 Espacement (Échelle 4pt)

```css
--space-1: 0.25rem      /* 4px */
--space-2: 0.5rem       /* 8px */
--space-3: 0.75rem      /* 12px */
--space-4: 1rem         /* 16px */
--space-5: 1.25rem      /* 20px */
--space-6: 1.5rem       /* 24px */
--space-8: 2rem         /* 32px */
--space-10: 2.5rem      /* 40px */
--space-12: 3rem        /* 48px */
--space-16: 4rem        /* 64px */
```

### Containers
```css
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1280px
--container-2xl: 1536px
```

## ⚡ Transitions

### Durées Standard
```css
--duration-fast: 150ms          /* Micro-interactions */
--duration-normal: 250ms        /* UI standard */
--duration-slow: 350ms          /* Page transitions */
--duration-slower: 500ms        /* Animations complexes */
```

### Courbes d'Animation
```css
--ease-linear: linear
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1) 
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)

/* Signature AnimaHub */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
--ease-clay: cubic-bezier(0.4, 0, 0.2, 1)
```

## 📚 Z-Index

```css
--z-base: 0
--z-docked: 10              /* Navigation fixe */
--z-dropdown: 1000          /* Menus déroulants */
--z-modal: 1050             /* Modales */
--z-popover: 1100          /* Popovers, tooltips */
--z-toast: 1200            /* Notifications */
--z-tooltip: 1300          /* Tooltips système */
```

## 🎪 Tokens Spécifiques AnimaHub

### Avatar Animal (Dashboard)
```css
--pet-card-avatar-size: 96px
--pet-card-avatar-shape: circle     /* circle | rounded | pill */
--pet-card-avatar-border: 3px
--pet-card-avatar-border-color: hsl(var(--border))
```

### Avatar Compte 
```css
--account-avatar-size: 40px
--account-avatar-border: 2px
--account-avatar-border-color: hsl(var(--primary))
```

### FAB IA
```css
--fab-size: 56px
--fab-bg: hsl(var(--primary))
--fab-bg-hover: hsl(var(--primary) / 0.9)
--fab-icon-color: hsl(var(--primary-foreground))
--fab-shadow: var(--shadow-floating)
```

### Status Dot
```css
--status-dot-size: 8px
--status-dot-color: hsl(var(--success))
--status-dot-glow: 0 0 8px hsl(var(--success) / 0.5)
```

### Grilles Responsive
```css
--grid-mobile-cols: 1
--grid-tablet-cols: 2  
--grid-desktop-cols: 3
--grid-gap: var(--space-6)
```
