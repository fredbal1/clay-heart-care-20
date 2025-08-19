
# Guide de Modification - AnimaHub

## 🖼️ Avatar Animal (Dashboard, card haut droite)

### Localisation
**Fichier** : `src/pages/dashboard/dashboard.tsx`  
**Ligne** : ~188-200 (PetSwitcher component)
**Classe** : `.pet-card-avatar`

### Variables de Contrôle
```css
:root {
  --pet-card-avatar-size: 96px;         /* Taille par défaut */
  --pet-card-avatar-shape: circle;      /* circle | rounded | pill */
  --pet-card-avatar-border: 3px;
  --pet-card-avatar-border-color: hsl(var(--border));
}
```

### Modification Taille
```css
/* Petit avatar (64px) */
:root {
  --pet-card-avatar-size: 64px;
}

/* Grand avatar (128px) */  
:root {
  --pet-card-avatar-size: 128px;
}
```

### Modification Forme
```css
/* Cercle parfait */
.pet-card-avatar {
  border-radius: 50%;
}

/* Coins arrondis */  
.pet-card-avatar {
  border-radius: var(--radius);         /* 24px */
}

/* Pilule */
.pet-card-avatar {
  border-radius: 9999px;
}

/* Carré avec petits coins */
.pet-card-avatar {
  border-radius: 8px;
}
```

### Application via Design Controls
**Page** : `/design-controls`
**Section** : "Images & Avatars"
**Contrôles** :
- Slider "Pet Avatar Size" (64px → 128px)
- Select "Pet Avatar Shape" (Circle, Rounded, Pill, Square)

---

## 👤 Avatar Compte (Navigation bas gauche)

### Localisation  
**Fichier** : `src/components/layout/sidebar.tsx`
**Classe** : `.account-avatar`  

### Variables de Contrôle
```css
:root {
  --account-avatar-size: 40px;
  --account-avatar-border: 2px;
  --account-avatar-border-color: hsl(var(--primary));
}
```

### Remplacer la Photo
#### Méthode 1 : URL directe
```tsx
// Dans sidebar.tsx, remplacer:
<ClayAvatarImage 
  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400"
  alt="Clara Martin" 
/>

// Par votre URL:
<ClayAvatarImage 
  src="/path/to/your-photo.jpg"
  alt="Votre Nom" 
/>
```

#### Méthode 2 : Via Upload (ProfilePage)
1. Aller sur `/profile`
2. Cliquer sur l'avatar pour upload
3. L'image sera automatiquement synchronisée

### Ajuster Taille & Bordure
```css
/* Avatar plus grand */
:root {
  --account-avatar-size: 48px;
  --account-avatar-border: 3px;
}

/* Sans bordure */
:root {
  --account-avatar-border: 0px;
}

/* Bordure colorée */
:root {
  --account-avatar-border-color: hsl(var(--accent));
}
```

---

## 🚀 FAB IA (Bouton flottant bottom-right)

### Localisation
**Fichier** : `src/pages/dashboard/dashboard.tsx`
**Ligne** : ~295-302
**Classe** : `.clay-fab`

### Variables de Contrôle
```css
:root {
  --fab-size: 56px;                     /* Taille du bouton */
  --fab-bg: hsl(var(--primary));        /* Couleur fond */
  --fab-bg-hover: hsl(var(--primary) / 0.9);
  --fab-icon-color: hsl(var(--primary-foreground));
  --fab-shadow: var(--shadow-floating);
}
```

### Changer la Couleur (du gris actuel)
```css
/* Vert sauge */
:root {
  --fab-bg: hsl(var(--secondary));      /* #84A59D */
  --fab-icon-color: white;
}

/* Saumon */
:root {
  --fab-bg: hsl(var(--accent));         /* #F4978E */
  --fab-icon-color: hsl(var(--accent-foreground));
}

/* Couleur custom */
:root {
  --fab-bg: hsl(280 100% 70%);          /* Violet */
  --fab-icon-color: white;
}
```

### Modifier Taille & Position
```css
/* FAB plus grand */
:root {
  --fab-size: 72px;
}

/* Position différente */
.clay-fab {
  bottom: var(--space-8);                /* Plus haut */
  right: var(--space-8);                 /* Plus à gauche */
}

/* Position gauche */
.clay-fab {
  left: var(--space-6);
  right: auto;
}
```

### Changer l'Icône
```tsx
// Dans dashboard.tsx, remplacer MessageCircle par:
<Heart className="h-6 w-6" />           /* Cœur */
<PlusCircle className="h-6 w-6" />      /* Plus */
<Camera className="h-6 w-6" />          /* Appareil photo */
<Settings className="h-6 w-6" />        /* Paramètres */
```

---

## 🔴 Status Dot ("Bonjour Clara…")

### Localisation
**Fichier** : `src/pages/dashboard/dashboard.tsx`
**Ligne** : ~47 (avant le texte "Bonjour Clara")
**Classe** : `.status-dot`

### Variables de Contrôle
```css
:root {
  --status-dot-size: 8px;
  --status-dot-color: hsl(var(--success));     /* Vert par défaut */
  --status-dot-glow: 0 0 8px hsl(var(--success) / 0.5);
}
```

### Changer la Couleur
```css
/* Orange (en ligne) */
:root {
  --status-dot-color: hsl(var(--warning));
  --status-dot-glow: 0 0 8px hsl(var(--warning) / 0.5);
}

/* Rouge (urgence) */
:root {
  --status-dot-color: hsl(var(--error));
  --status-dot-glow: 0 0 8px hsl(var(--error) / 0.5);
}

/* Bleu (neutre) */  
:root {
  --status-dot-color: hsl(var(--primary));
  --status-dot-glow: 0 0 8px hsl(var(--primary) / 0.5);
}

/* Couleur custom */
:root {
  --status-dot-color: hsl(300 70% 60%);          /* Violet */
  --status-dot-glow: 0 0 12px hsl(300 70% 60% / 0.6);
}
```

### Ajuster Taille & Effet
```css
/* Plus grand */
:root {
  --status-dot-size: 12px;
  --status-dot-glow: 0 0 16px hsl(var(--status-dot-color) / 0.6);
}

/* Plus petit */
:root {
  --status-dot-size: 6px;
  --status-dot-glow: none;                       /* Sans glow */
}

/* Pulsation */
.status-dot {
  animation: pulse 2s ease-in-out infinite;
}
```

### Repositionner ou Cacher
```css
/* Cacher complètement */
.status-dot {
  display: none;
}

/* Déplacer à droite du texte */
.status-dot {
  order: 2;
  margin-left: var(--space-2);
  margin-right: 0;
}
```

---

## 📐 Grilles & Colonnes (Cards par ligne)

### Variables Globales
```css
:root {
  --grid-mobile-cols: 1;                /* Mobile: 1 colonne */
  --grid-tablet-cols: 2;                /* Tablet: 2 colonnes */  
  --grid-desktop-cols: 3;               /* Desktop: 3 colonnes */
  --grid-gap: var(--space-6);           /* Espacement: 24px */
}
```

### Services Page Grid
**Fichier** : `src/pages/services/services.tsx`
**Ligne** : ~215

```css
/* Plus de colonnes desktop */
:root {
  --grid-desktop-cols: 4;               /* 4 cards par ligne */
}

/* Tablet en 3 colonnes */
:root {
  --grid-tablet-cols: 3;
}

/* Mobile en 2 colonnes serrées */
:root {
  --grid-mobile-cols: 2;
  --grid-gap: var(--space-3);           /* 12px plus serré */
}
```

### Dashboard KPIs (3 widgets en haut)
**Ligne** : ~67-106

```css
/* KPIs en 1 colonne mobile */
.stats-grid {
  grid-template-columns: 1fr;
}

/* KPIs plus espacés */
.stats-grid {
  gap: var(--space-4);                  /* 16px au lieu de 8px */
}
```

### Applications via Design Controls
**Page** : `/design-controls`
**Section** : "Grilles & Layout"
**Contrôles** :
- Slider "Mobile Columns" (1-2)
- Slider "Tablet Columns" (2-3) 
- Slider "Desktop Columns" (3-5)
- Slider "Grid Gap" (8px-32px)

---

## 🎨 Couleurs de Thème

### Palette Principale
```css
:root {
  /* Couleurs actuelles */
  --primary: 210 18% 55%;               /* Bleu-gris */
  --secondary: 162 19% 55%;             /* Vert sauge */
  --accent: 6 75% 76%;                  /* Saumon */
}
```

### Variantes Populaires
```css
/* Thème Océan */
:root {
  --primary: 200 100% 60%;              /* Bleu océan */
  --secondary: 180 50% 50%;             /* Turquoise */
  --accent: 35 100% 65%;                /* Corail */
}

/* Thème Forêt */  
:root {
  --primary: 140 30% 40%;               /* Vert foncé */
  --secondary: 80 40% 60%;              /* Vert clair */
  --accent: 25 70% 60%;                 /* Orange terre */
}

/* Thème Coucher de Soleil */
:root {
  --primary: 340 60% 55%;               /* Rose */
  --secondary: 25 70% 60%;              /* Orange */
  --accent: 45 100% 70%;                /* Jaune */
}
```

### Application Globale
Les couleurs se répercutent automatiquement sur :
- Boutons (primary, secondary, accent variants)
- FAB IA (--fab-bg utilise --primary)
- Status dot (peut utiliser --success = --secondary)
- Badges et états (success, warning, error)
- Focus rings et highlights

---

## 📏 Tailles de Cards, Badges, Elements

### Card Padding & Spacing
```css
:root {
  --card-padding: var(--space-6);       /* 24px par défaut */
  --card-gap: var(--space-4);           /* Entre cards: 16px */
}

/* Cards plus compactes */
:root {
  --card-padding: var(--space-4);       /* 16px */
  --card-gap: var(--space-3);           /* 12px */
}

/* Cards plus aérées */
:root {
  --card-padding: var(--space-8);       /* 32px */  
  --card-gap: var(--space-6);           /* 24px */
}
```

### Badge Sizes
```css
/* Badges plus petits */
.clay-badge {
  padding: var(--space-1) var(--space-2);    /* 4px 8px */
  font-size: 0.75rem;                         /* 12px */
}

/* Badges plus gros */
.clay-badge {
  padding: var(--space-2) var(--space-4);    /* 8px 16px */  
  font-size: 0.875rem;                        /* 14px */
}
```

### Button Sizes Override
```css
/* Buttons plus compacts */
.clay-button {
  min-height: 36px;                     /* Au lieu de 44px */
  padding: var(--space-2) var(--space-4);
}

/* Buttons plus généreux */
.clay-button {
  min-height: 52px;
  padding: var(--space-4) var(--space-8);
}
```

---

## ⚡ Quick Fixes Fréquents

### Augmenter Contrastes Texte
```css
:root {
  --muted-foreground: 27 25% 35%;       /* Plus sombre */
  --foreground: 27 30% 20%;             /* Texte principal plus noir */
}
```

### Réduire Ombres (Performance)
```css
:root {
  --shadow-raised: 4px 4px 8px rgba(180, 145, 120, 0.15);
  --shadow-floating: 6px 6px 12px rgba(180, 145, 120, 0.2);
}
```

### Désactiver Animations 3D
```css
.clay-card:hover {
  transform: scale(1.02);               /* Au lieu de perspective 3D */
}

.clay-button:hover {
  transform: translateY(-1px);          /* Garder élévation simple */
}
```

### Mobile Plus Compact
```css
@media (max-width: 768px) {
  :root {
    --space-base: 12px;                 /* Au lieu de 16px */
    --card-padding: var(--space-3);     /* 12px au lieu de 24px */
  }
}
```

### Typographie Plus Lisible
```css
:root {
  --font-size-base: 1.125rem;           /* 18px au lieu de 16px */
  --line-height-base: 1.6;              /* Plus d'interlignage */
}
```

---

## 🛠️ Outils de Développement

### Chrome DevTools
1. **F12** → Elements tab
2. Chercher classe `.pet-card-avatar`, `.clay-fab`, etc.
3. Modifier CSS variables en live
4. Copier changements vers `/design-controls`

### Variables CSS Inspector
```javascript
// Console browser pour voir toutes les variables
const root = document.documentElement;
const styles = getComputedStyle(root);
console.log('Avatar size:', styles.getPropertyValue('--pet-card-avatar-size'));
```

### Hot Reload Testing
1. Ouvrir `/design-controls`
2. Ajuster sliders → voir changements live
3. Copier valeurs finales vers CSS/config final

Tous ces changements peuvent être testés via la page `/design-controls` avant application définitive !
