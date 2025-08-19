
# AnimaHub Design System - Vue d'ensemble

## 🎯 Vision
AnimaHub utilise un design system "Claymorphisme Émotionnel" créant une expérience tactile et chaleureuse pour le suivi de santé animale. Le système combine des surfaces organiques, des ombres douces et des interactions naturelles.

## 📋 Table des Matières

### Documentation Technique
- [10-design-tokens.md](./10-design-tokens.md) - Tokens complets (couleurs, typo, ombres, transitions)
- [20-components.md](./20-components.md) - Catalogue de tous les composants avec variants
- [30-layouts.md](./30-layouts.md) - Grilles responsive et mise en page
- [40-motion.md](./40-motion.md) - Animations et micro-interactions
- [50-accessibility.md](./50-accessibility.md) - Accessibilité et inclusivité
- [60-pages-blueprints.md](./60-pages-blueprints.md) - Architecture de chaque page

### Guides Pratiques
- [70-how-to-edit.md](./70-how-to-edit.md) - Recettes pour modifications courantes
- [80-style-guide-page.md](./80-style-guide-page.md) - Guide d'utilisation du styleguide
- [99-qa-checklist.md](./99-qa-checklist.md) - Checklist qualité

### Outils Interactifs
- `/styleguide` - Preview live de tous les composants
- `/design-controls` - Panneau de contrôle des tokens

### Assets
- `tokens/design-tokens.json` - Tokens exportés en JSON
- `styles/variables.css` - Variables CSS miroir

## 🏗️ Architecture du Design System

### Fondations
- **Palette émotionnelle** : Beige chaud, vert sauge, saumon, bleu-gris
- **Claymorphisme** : Ombres doubles (raised/pressed/floating/subtle)
- **Typographie** : Outfit (300-700) pour humanité et modernité
- **Animations** : Bubble-up, soft-bounce, signature-check

### Responsive
- **Mobile First** : 360px minimum
- **Breakpoints** : 768px (tablet), 1024px (desktop)
- **Grilles adaptatives** : 1→2→3-4 colonnes

### Tokens Clés
```css
--radius: 24px              /* Générosité claymorphisme */
--shadow-raised: 8px 8px 16px rgba(180,145,120,0.2), -4px -4px 8px rgba(255,255,255,0.8)
--primary: 210 18% 55%      /* Bleu-gris doux */
--secondary: 162 19% 55%    /* Vert sauge */
--accent: 6 75% 76%         /* Saumon */
```

## 🎨 Philosophie Visuelle

### Claymorphisme Émotionnel
- **Surfaces organiques** : Comme de la pâte à modeler douce
- **Ombres naturelles** : Double éclairage (soleil/ombre)
- **Interactions tactiles** : Pressed/raised selon contexte
- **Couleurs apaisantes** : Tons terreux et naturels

### Animations Signature
- **Bubble-up** : Textes qui remontent avec élasticité
- **Clay-card hover** : Rotation 3D subtile + élévation
- **Signature-check** : Trait qui se dessine (validation)

## 🔧 Contrôles Rapides

Via `/design-controls`, vous pouvez modifier en live :

- **Avatar animal** : Taille (64-128px), forme (circle/rounded/pill)
- **FAB IA** : Couleurs, taille, ombres
- **Dot status** : Couleur, taille, glow
- **Grilles** : Colonnes par breakpoint
- **Thème** : Basculement clair/sombre

## ✅ Statut de Production

- [x] Design tokens extraits et structurés
- [x] Composants catalogués avec variants
- [x] Pages documentées avec blueprints
- [x] Responsive audit 360px→∞
- [x] A11y AA compliance
- [x] Performance optimisée
- [x] Outils de personnalisation
