
# QA Checklist - AnimaHub

## ✅ Pages & Fonctionnalités

### Dashboard (`/`)
- [ ] Header "Bonjour Clara" avec status dot affiché
- [ ] Avatar Clara (top-left) clickable et bien proportionné  
- [ ] KPIs (3 widgets) responsive : 3 cols mobile, alignés desktop
- [ ] Pet switcher visible mobile (card), masqué desktop ≥1024px
- [ ] Pet avatar contrôlé par `--pet-card-avatar-size` et `--pet-card-avatar-shape`
- [ ] Événements list : badges couleurs correctes, checkboxes fonctionnelles
- [ ] Journal récent : cards hover avec tilt 3D
- [ ] Photo carousel : navigation dots, swipe mobile
- [ ] FAB IA (bottom-right) : couleur contrôlée par `--fab-bg`, hover élévation
- [ ] Animations : bubble-up text, soft-bounce cards, stagger 100ms

### Dossier Santé (`/health-record`) 
- [ ] Navigation tabs fonctionnelle
- [ ] Timeline vaccinations avec badges statuts
- [ ] Graphiques poids (sparklines) si données disponibles
- [ ] Actions quick (Ajouter vaccin, traitement) accessibles
- [ ] Export PDF modal opérationnelle
- [ ] Responsive : sidebar → stack mobile

### Journal (`/journal`)
- [ ] Filtres par animal et catégorie actifs
- [ ] Memory cards : ratio images 16:9, hover effects
- [ ] Bouton "Nouveau souvenir" redirige vers création
- [ ] Pagination ou infinite scroll fonctionnel
- [ ] Images lazy loading sur mobile

### Services (`/services`)
- [ ] Barre recherche filtre résultats en temps réel
- [ ] Toggle Liste/Carte opérationnel
- [ ] Cards services : tous champs affichés (rating, distance, horaires)
- [ ] Badges "Ouvert/Fermé" cohérents avec horaires
- [ ] Actions "Appeler" ouvrent `tel:`, "Voir profil" navigue
- [ ] Grid responsive : 1 col mobile → 2 tablet → 3+ desktop

### AnimaBot (`/animabot`)
- [ ] Mascot visible au premier message seulement
- [ ] Messages bubble left/right selon sender
- [ ] Input + upload image fonctionnels
- [ ] Auto-scroll vers bas à chaque nouveau message
- [ ] Typing indicator pendant simulation réponse
- [ ] Escape ferme modal/revient dashboard

### Profil (`/profile`)
- [ ] Avatar upload fonctionnel avec preview
- [ ] Mode édition toggle : inputs ↔ divs readonly
- [ ] Validation form temps réel
- [ ] Save avec loader + toast confirmation
- [ ] Actions sécurité (mot de passe, 2FA) mockées mais présentes

### Paramètres (`/settings`)
- [ ] Tabs navigation fluide
- [ ] Liste animaux : statut actif/inactif visuels
- [ ] Actions éditer/supprimer avec confirmations
- [ ] Paramètres notifications mockés mais cohérents
- [ ] Thème toggle (si implémenté) persiste entre sessions

### Onboarding (`/onboarding`)
- [ ] 3 étapes navigation linéaire
- [ ] Progress bar animate à chaque étape
- [ ] Photo upload étape 2 avec preview
- [ ] Validation : nom requis pour continuer
- [ ] Étape 3 : actions optionnelles, "Passer" disponible
- [ ] Completion : loader → redirect dashboard

## 📱 Responsive (Breakpoints)

### Mobile (360px → 767px)
- [ ] Aucun scroll horizontal à 360px minimum
- [ ] Hamburger menu accessible et fonctionnel
- [ ] Cards full-width avec padding approprié
- [ ] Touch targets ≥ 44px (boutons, liens, FAB)
- [ ] FAB position n'obstrue pas contenu principal
- [ ] Navigation tabs scrollable horizontalement si nécessaire
- [ ] Status dot visible et proportionné

### Tablet (768px → 1023px)  
- [ ] Grilles 2 colonnes équilibrées
- [ ] Sidebar si utilisée (services, paramètres) accessible
- [ ] Padding augmenté vs mobile (24px vs 16px)
- [ ] Hover states actifs (non-touch devices)
- [ ] Pet switcher comportement intermédiaire approprié

### Desktop (1024px+)
- [ ] Sidebar fixe visible (navigation principale)
- [ ] Grilles 3-4 colonnes sans surcharge visuelle
- [ ] Hover animations fluides (clay-card tilt, button élévation)
- [ ] Focus visible pour navigation clavier
- [ ] Pet switcher dans layout desktop (dashboard right column)
- [ ] FAB n'interfère pas avec sidebar

## ♿ Accessibilité (WCAG 2.1 AA)

### Contrastes & Visuel
- [ ] Ratios contrastes ≥ 4.5:1 texte normal, ≥ 3:1 UI elements
- [ ] Focus visible sur tous éléments interactifs
- [ ] Information non véhiculée uniquement par couleur
- [ ] Text lisible à 200% zoom sans scroll horizontal
- [ ] Thème sombre maintient contrastes conformes

### Navigation Clavier
- [ ] Tab order logique sur toutes pages
- [ ] Escape ferme modals/drawers
- [ ] Enter/Space activent boutons et liens
- [ ] Focus trap dans modals (AnimaBot, confirmations)
- [ ] Skip links pour navigation rapide (optionnel)

### Screen Readers
- [ ] Landmarks correctement identifiés (`main`, `nav`, `aside`)
- [ ] Headings hiérarchie logique (h1 → h2 → h3)
- [ ] Images `alt` descriptif et pertinent
- [ ] Boutons labels explicites (`aria-label` si nécessaire)
- [ ] États annoncés (loading, error, success) via `role="status"` ou `role="alert"`
- [ ] Live regions pour changements dynamiques

### Reduced Motion
- [ ] `prefers-reduced-motion: reduce` respecté
- [ ] Animations complexes désactivées, transitions essentielles conservées
- [ ] Alternatives statiques pour feedback utilisateur
- [ ] Pas de animations infinies ou clignotements

## 🎨 Design System & Tokens

### Variables CSS Fonctionnelles
- [ ] `--pet-card-avatar-size` modifie taille avatar animal dashboard
- [ ] `--pet-card-avatar-shape` applique forme (circle, rounded, pill)
- [ ] `--account-avatar-size` contrôle avatar compte navigation
- [ ] `--fab-bg`, `--fab-size` personnalisent FAB IA
- [ ] `--status-dot-color`, `--status-dot-size` modifient dot header
- [ ] `--grid-mobile-cols`, `--grid-tablet-cols`, `--grid-desktop-cols` ajustent grilles

### Claymorphisme
- [ ] Ombres doubles cohérentes (raised, pressed, floating, subtle)
- [ ] Transitions clay-button : hover élévation, active enfoncement
- [ ] Clay-card hover : rotation 3D + scale sans débordement
- [ ] Radius généreux (24px) appliqué uniformément
- [ ] Couleurs palette respectées (beige, vert sauge, saumon, bleu-gris)

### Typographie
- [ ] Outfit font chargée et appliquée
- [ ] Échelle modulaire respectée (12px → 30px)
- [ ] Line-height approprié (1.5 base, 1.25 titres)
- [ ] Text-bubble-up animation sur titres principaux

## ⚡ Motion & Animations

### Animations Signature
- [ ] Bubble-up text : titres remontent avec élasticité
- [ ] Soft-bounce cards : entrée séquentielle avec stagger
- [ ] Clay-card hover : rotation 3D perspective 1000px
- [ ] Signature-check : validation trait qui se dessine
- [ ] FAB interactions : scale + translateY smooth

### Performance Animation
- [ ] 60fps maintenu sur interactions fréquentes
- [ ] Pas plus de 3-4 animations simultanées
- [ ] `will-change` appliqué et reset après animation
- [ ] Durées appropriées : ≤150ms micro, ≤300ms UI, ≤600ms expressif

### Responsive Motion
- [ ] Animations réduites sur mobile (durées plus courtes)
- [ ] Pas d'hover effects sur touch devices
- [ ] Feedback tactile (scale) sur touch interactions

## 🔧 Performance & Technique

### Loading & States
- [ ] Skeleton loading pour contenus dynamiques
- [ ] États vides avec illustrations/messages appropriés
- [ ] Error boundaries avec messages utilisateur clairs
- [ ] Loading spinners cohérents avec design system

### Images & Assets
- [ ] Images optimisées (WebP si supporté, tailles appropriées)
- [ ] Lazy loading sur images non-critiques
- [ ] Fallbacks avatar (initiales) si photos indisponibles
- [ ] Responsive images (srcset) pour différents DPR

### Code & Build
- [ ] Pas d'erreurs console (errors, warnings critiques)
- [ ] Bundle size raisonnable (<500KB initial)
- [ ] Tree-shaking effectif (composants non-utilisés exclus)
- [ ] CSS purged (classes unused supprimées)

## 🌙 Thèmes & Personnalisation

### Thème Sombre (si implémenté)
- [ ] Toggle smooth entre clair/sombre
- [ ] Toutes surfaces adaptées (cards, inputs, backgrounds)
- [ ] Contrastes maintenus AA conformes
- [ ] Ombres ajustées pour thème sombre
- [ ] Préférence système respectée au premier chargement

### Design Controls (`/design-controls`)
- [ ] Tous sliders/contrôles fonctionnels et liés aux CSS variables
- [ ] Changements répercutés immédiatement sur UI
- [ ] Reset bouton restaure valeurs par défaut
- [ ] Export/import tokens fonctionnel

### Styleguide (`/styleguide`)
- [ ] Tous composants présentés dans états multiples
- [ ] Code snippets copyables et corrects
- [ ] Navigation sections fluide
- [ ] Responsive preview device frames
- [ ] Recherche/filtres opérationnels

## 🎯 Expérience Utilisateur

### Feedback & States
- [ ] Toast notifications appropriés (succès, erreur, info)
- [ ] Loading states pendant actions asynchrones
- [ ] Confirmations pour actions destructives
- [ ] Validation form feedback immédiat et clair

### Navigation & Flow
- [ ] Breadcrumbs ou indicateurs position si pertinent
- [ ] Boutons retour/annuler accessibles
- [ ] Deep linking fonctionnel (URL reflect état)
- [ ] 404 page custom avec navigation retour

### Content & Copy
- [ ] Textes français corrects et cohérents
- [ ] Placeholders et labels explicites
- [ ] Messages d'erreur utiles et actionnables
- [ ] Microcopy chaleureux aligné avec ton AnimaHub

---

## 🎪 Checklist Finale Déploiement

### Pré-Production
- [ ] Audit Lighthouse ≥90 Performance, A11y, Best Practices
- [ ] Test cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Test devices physiques (iPhone, Android, iPad)
- [ ] Validation HTML/CSS (W3C)
- [ ] SEO meta tags appropriés

### Production Ready
- [ ] Environment variables configurées
- [ ] Error monitoring configuré (optionnel)
- [ ] Analytics setup si requis
- [ ] Cache strategies optimales
- [ ] CDN pour assets statiques (optionnel)

**Score cible** : 100% Mobile, 95% Desktop, 0 erreurs critiques
**Délai acceptable** : First Contentful Paint <2s, Largest Contentful Paint <4s
