
import React, { useState, useEffect } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayInput } from '@/components/ui/clay-input'
import { ClayBadge } from '@/components/ui/clay-badge'
import { ClayAvatar, ClayAvatarFallback, ClayAvatarImage } from '@/components/ui/clay-avatar'
import { ClaySwitch } from '@/components/ui/clay-switch'
import { ClaySkeleton } from '@/components/ui/clay-skeleton'
import { 
  Palette,
  Code,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Check,
  Sun,
  Moon,
  Search,
  Filter,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Heart,
  Calendar,
  MessageCircle,
  User
} from 'lucide-react'

interface ColorToken {
  name: string
  variable: string
  hex: string
  hsl: string
  usage: string
  contrast?: string
}

interface ComponentExample {
  name: string
  component: React.ReactNode
  code: string
  description: string
  category: string
}

const colorTokens: ColorToken[] = [
  {
    name: 'Background',
    variable: '--background',
    hex: '#F3E9DC',
    hsl: '37 25% 89%',
    usage: 'Fond principal, base',
    contrast: '7.2:1'
  },
  {
    name: 'Primary',
    variable: '--primary',
    hex: '#7B8FA1', 
    hsl: '210 18% 55%',
    usage: 'Boutons, liens, focus',
    contrast: '4.8:1'
  },
  {
    name: 'Secondary',
    variable: '--secondary',
    hex: '#84A59D',
    hsl: '162 19% 55%',
    usage: 'Nature, succès, apaisement',
    contrast: '4.6:1'
  },
  {
    name: 'Accent',
    variable: '--accent', 
    hex: '#F4978E',
    hsl: '6 75% 76%',
    usage: 'Chaleur, highlights',
    contrast: '3.1:1'
  },
  {
    name: 'Surface',
    variable: '--surface',
    hex: '#F7EDDF',
    hsl: '37 25% 91%',
    usage: 'Cards, surfaces élevées'
  },
  {
    name: 'Muted',
    variable: '--muted',
    hex: '#E6DDD1', 
    hsl: '37 15% 85%',
    usage: 'Backgrounds subtils'
  }
]

const typographySizes = [
  { name: 'XS', size: '0.75rem', px: '12px', usage: 'Badges, metadata' },
  { name: 'SM', size: '0.875rem', px: '14px', usage: 'Boutons, labels' },
  { name: 'Base', size: '1rem', px: '16px', usage: 'Texte corps' },
  { name: 'LG', size: '1.125rem', px: '18px', usage: 'Texte emphasis' },
  { name: 'XL', size: '1.25rem', px: '20px', usage: 'Titres cards' },
  { name: '2XL', size: '1.5rem', px: '24px', usage: 'Titres sections' },
  { name: '3XL', size: '1.875rem', px: '30px', usage: 'Titres pages' }
]

const spacingScale = [
  { name: 'Space 1', value: '4px', usage: 'Micro-spacing' },
  { name: 'Space 2', value: '8px', usage: 'Badges, icons' },
  { name: 'Space 3', value: '12px', usage: 'Groupements' },
  { name: 'Space 4', value: '16px', usage: 'Standard padding' },
  { name: 'Space 6', value: '24px', usage: 'Cards, sections' },
  { name: 'Space 8', value: '32px', usage: 'Layout desktop' }
]

const shadowLevels = [
  {
    name: 'Raised',
    css: 'var(--shadow-raised)', 
    usage: 'État normal surfaces'
  },
  {
    name: 'Pressed', 
    css: 'var(--shadow-pressed)',
    usage: 'Inputs, boutons actifs'
  },
  {
    name: 'Floating',
    css: 'var(--shadow-floating)',
    usage: 'Hover, FAB, élevation max'
  },
  {
    name: 'Subtle',
    css: 'var(--shadow-subtle)',
    usage: 'Badges, petits éléments'
  }
]

export function StyleguidePage() {
  const [activeSection, setActiveSection] = useState('tokens')
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [animationsPlaying, setAnimationsPlaying] = useState(false)
  const [copiedCode, setCopiedCode] = useState('')

  useEffect(() => {
    // Auto-scroll to active section
    const element = document.getElementById(activeSection)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeSection])

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const componentExamples: ComponentExample[] = [
    {
      name: 'ClayButton Variants',
      category: 'buttons',
      description: 'Tous les variants disponibles avec états',
      code: `<ClayButton variant="default">Default</ClayButton>
<ClayButton variant="secondary">Secondary</ClayButton>
<ClayButton variant="accent">Accent</ClayButton>
<ClayButton variant="success">Success</ClayButton>
<ClayButton variant="outline">Outline</ClayButton>`,
      component: (
        <div className="flex flex-wrap gap-2">
          <ClayButton variant="default">Default</ClayButton>
          <ClayButton variant="secondary">Secondary</ClayButton>
          <ClayButton variant="accent">Accent</ClayButton>
          <ClayButton variant="success">Success</ClayButton>
          <ClayButton variant="outline">Outline</ClayButton>
        </div>
      )
    },
    {
      name: 'ClayButton Sizes',
      category: 'buttons',
      description: 'Tailles disponibles',
      code: `<ClayButton size="sm">Small</ClayButton>
<ClayButton size="default">Default</ClayButton>
<ClayButton size="lg">Large</ClayButton>
<ClayButton size="icon"><Heart /></ClayButton>`,
      component: (
        <div className="flex items-center gap-2">
          <ClayButton size="sm">Small</ClayButton>
          <ClayButton size="default">Default</ClayButton>
          <ClayButton size="lg">Large</ClayButton>
          <ClayButton size="icon">
            <Heart className="h-4 w-4" />
          </ClayButton>
        </div>
      )
    },
    {
      name: 'Avatar Showcase',
      category: 'avatars',
      description: 'Avatars AnimaHub avec contrôles',
      code: `// Pet Avatar (Dashboard)
<ClayAvatar className="pet-card-avatar">
  <ClayAvatarImage src="/milo.jpg" />
  <ClayAvatarFallback>🐕</ClayAvatarFallback>
</ClayAvatar>

// Account Avatar (Sidebar)
<ClayAvatar className="account-avatar">
  <ClayAvatarImage src="/clara.jpg" />
  <ClayAvatarFallback>CM</ClayAvatarFallback>
</ClayAvatar>`,
      component: (
        <div className="flex items-center gap-6">
          <div className="text-center">
            <ClayAvatar size="xl" className="pet-card-avatar mb-2">
              <ClayAvatarFallback className="text-2xl">🐕</ClayAvatarFallback>
            </ClayAvatar>
            <p className="text-sm text-muted-foreground">Pet Avatar</p>
            <code className="text-xs">--pet-card-avatar-size</code>
          </div>
          <div className="text-center">
            <ClayAvatar className="account-avatar mb-2">
              <ClayAvatarFallback>CM</ClayAvatarFallback>
            </ClayAvatar>
            <p className="text-sm text-muted-foreground">Account Avatar</p>
            <code className="text-xs">--account-avatar-size</code>
          </div>
        </div>
      )
    },
    {
      name: 'FAB IA',
      category: 'fab',
      description: 'Floating Action Button avec contrôles',
      code: `<ClayButton className="clay-fab">
  <MessageCircle className="h-6 w-6" />
</ClayButton>`,
      component: (
        <div className="relative h-32 bg-surface/30 rounded-clay flex items-center justify-center">
          <ClayButton className="clay-fab relative">
            <MessageCircle className="h-6 w-6" />
          </ClayButton>
          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
            CSS: --fab-bg, --fab-size
          </div>
        </div>
      )
    },
    {
      name: 'Status Indicators',
      category: 'status',
      description: 'Status dot et badges',
      code: `<div className="flex items-center gap-2">
  <div className="status-dot" />
  <span>Bonjour Clara !</span>
</div>

<ClayBadge variant="success">À jour</ClayBadge>
<ClayBadge variant="warning">Bientôt</ClayBadge>
<ClayBadge variant="error">Expiré</ClayBadge>`,
      component: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="status-dot" />
            <span>Bonjour Clara !</span>
          </div>
          <div className="flex gap-2">
            <ClayBadge variant="success">À jour</ClayBadge>
            <ClayBadge variant="warning">Bientôt</ClayBadge>
            <ClayBadge variant="error">Expiré</ClayBadge>
          </div>
        </div>
      )
    },
    {
      name: 'Claymorphisme Showcase',
      category: 'clay',
      description: 'Système d\'ombres signature',
      code: `<div className="clay-raised">Raised</div>
<div className="clay-pressed">Pressed</div>  
<div className="clay-floating">Floating</div>
<div className="clay-subtle">Subtle</div>`,
      component: (
        <div className="grid grid-cols-2 gap-4">
          {shadowLevels.map(shadow => (
            <div key={shadow.name} className="text-center">
              <div 
                className="h-16 w-16 mx-auto mb-2 rounded-clay flex items-center justify-center bg-surface"
                style={{ boxShadow: shadow.css }}
              >
                <span className="text-xs font-semibold">{shadow.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{shadow.usage}</p>
            </div>
          ))}
        </div>
      )
    }
  ]

  const filteredExamples = componentExamples.filter(example =>
    example.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    example.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sections = [
    { id: 'tokens', name: 'Design Tokens', icon: Palette },
    { id: 'components', name: 'Composants', icon: Code },
    { id: 'layouts', name: 'Layouts', icon: Monitor },
    { id: 'motion', name: 'Motion', icon: Play }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface/30">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface/90 backdrop-blur-lg border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AnimaHub Styleguide</h1>
              <p className="text-sm text-muted-foreground">Design System Claymorphisme</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <ClayInput
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {/* Device Toggle */}
              <div className="flex items-center gap-1 bg-muted/50 rounded-clay p-1">
                <ClayButton
                  variant={device === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDevice('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </ClayButton>
                <ClayButton
                  variant={device === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDevice('tablet')}
                >
                  <Tablet className="h-4 w-4" />
                </ClayButton>
                <ClayButton
                  variant={device === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDevice('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </ClayButton>
              </div>
              
              {/* Theme Toggle */}
              <ClayButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setDarkMode(!darkMode)
                  document.documentElement.classList.toggle('dark')
                }}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </ClayButton>
              
              {/* Controls Link */}
              <ClayButton variant="outline" size="sm" asChild>
                <a href="/design-controls" target="_blank">
                  <Settings className="h-4 w-4 mr-1" />
                  Controls
                </a>
              </ClayButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r border-border/30 bg-surface/50 backdrop-blur-sm h-screen sticky top-0 overflow-y-auto">
          <div className="p-6 space-y-2">
            {sections.map(section => {
              const Icon = section.icon
              return (
                <ClayButton
                  key={section.id}
                  variant={activeSection === section.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {section.name}
                </ClayButton>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className={`mx-auto p-6 transition-all duration-300 ${
            device === 'mobile' ? 'max-w-sm' :
            device === 'tablet' ? 'max-w-2xl' : 
            'max-w-6xl'
          }`}>
            
            {/* Design Tokens Section */}
            <section id="tokens" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 text-bubble-up animate">Design Tokens</h2>
                <p className="text-muted-foreground">Fondations du design system AnimaHub</p>
              </div>

              {/* Color Palette */}
              <ClayCard className="mb-8">
                <ClayCardHeader>
                  <ClayCardTitle>Palette Couleurs</ClayCardTitle>
                </ClayCardHeader>
                <ClayCardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colorTokens.map(color => (
                      <div key={color.name} className="clay-subtle p-4 rounded-clay">
                        <div 
                          className="h-12 w-full rounded-clay mb-3"
                          style={{ backgroundColor: color.hex }}
                        />
                        <h4 className="font-semibold">{color.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{color.usage}</p>
                        <div className="space-y-1 text-xs font-mono">
                          <div>HEX: {color.hex}</div>
                          <div>HSL: {color.hsl}</div>
                          <div>CSS: <code>{color.variable}</code></div>
                          {color.contrast && (
                            <ClayBadge variant="success" className="text-xs">
                              {color.contrast} AA ✓
                            </ClayBadge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ClayCardContent>
              </ClayCard>

              {/* Typography Scale */}
              <ClayCard className="mb-8">
                <ClayCardHeader>
                  <ClayCardTitle>Échelle Typographique</ClayCardTitle>
                </ClayCardHeader>
                <ClayCardContent>
                  <div className="space-y-4">
                    {typographySizes.map(typo => (
                      <div key={typo.name} className="flex items-center justify-between p-4 clay-subtle rounded-clay">
                        <div>
                          <div 
                            className="font-semibold"
                            style={{ fontSize: typo.size }}
                          >
                            The quick brown fox jumps
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {typo.name} • {typo.px} • {typo.usage}
                          </div>
                        </div>
                        <div className="text-xs font-mono text-muted-foreground">
                          {typo.size}
                        </div>
                      </div>
                    ))}
                  </div>
                </ClayCardContent>
              </ClayCard>

              {/* Spacing Scale */}
              <ClayCard className="mb-8">
                <ClayCardHeader>
                  <ClayCardTitle>Échelle Espacement (4pt)</ClayCardTitle>
                </ClayCardHeader>
                <ClayCardContent>
                  <div className="space-y-3">
                    {spacingScale.map(space => (
                      <div key={space.name} className="flex items-center gap-4">
                        <div 
                          className="bg-primary/20 rounded"
                          style={{ 
                            width: space.value, 
                            height: '16px',
                            minWidth: space.value
                          }}
                        />
                        <div className="flex-1">
                          <span className="font-semibold">{space.name}</span>
                          <span className="text-muted-foreground ml-2">({space.value})</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{space.usage}</div>
                      </div>
                    ))}
                  </div>
                </ClayCardContent>
              </ClayCard>
            </section>

            {/* Components Section */}
            <section id="components" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Composants</h2>
                <p className="text-muted-foreground">Bibliothèque complète avec variants et états</p>
              </div>

              <div className="space-y-8">
                {filteredExamples.map(example => (
                  <ClayCard key={example.name}>
                    <ClayCardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <ClayCardTitle>{example.name}</ClayCardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {example.description}
                          </p>
                        </div>
                        <ClayButton
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(example.code)}
                        >
                          {copiedCode === example.code ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </ClayButton>
                      </div>
                    </ClayCardHeader>
                    <ClayCardContent>
                      <div className="space-y-4">
                        {/* Live Component */}
                        <div className="p-6 clay-subtle rounded-clay">
                          {example.component}
                        </div>
                        
                        {/* Code Preview */}
                        <div className="relative">
                          <pre className="clay-pressed p-4 rounded-clay bg-muted/30 text-sm overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      </div>
                    </ClayCardContent>
                  </ClayCard>
                ))}
              </div>
            </section>

            {/* Layouts Section */}
            <section id="layouts" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Layouts</h2>
                <p className="text-muted-foreground">Grilles et mise en page responsive</p>
              </div>

              <ClayCard className="mb-8">
                <ClayCardHeader>
                  <ClayCardTitle>Grille Responsive</ClayCardTitle>
                </ClayCardHeader>
                <ClayCardContent>
                  <div className="space-y-6">
                    {/* Mobile Preview */}
                    <div>
                      <h4 className="font-semibold mb-3">Mobile (1 colonne)</h4>
                      <div className="grid grid-cols-1 gap-3 max-w-sm">
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className="h-16 clay-raised rounded-clay bg-surface/50" />
                        ))}
                      </div>
                    </div>

                    {/* Tablet Preview */}
                    <div>
                      <h4 className="font-semibold mb-3">Tablet (2 colonnes)</h4>
                      <div className="grid grid-cols-2 gap-4 max-w-lg">
                        {Array(4).fill(0).map((_, i) => (
                          <div key={i} className="h-16 clay-raised rounded-clay bg-surface/50" />
                        ))}
                      </div>
                    </div>

                    {/* Desktop Preview */}
                    <div>
                      <h4 className="font-semibold mb-3">Desktop (3+ colonnes)</h4>
                      <div className="responsive-grid">
                        {Array(6).fill(0).map((_, i) => (
                          <div key={i} className="h-16 clay-raised rounded-clay bg-surface/50" />
                        ))}
                      </div>
                    </div>
                  </div>
                </ClayCardContent>
              </ClayCard>
            </section>

            {/* Motion Section */}
            <section id="motion" className="mb-16">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Motion Design</h2>
                    <p className="text-muted-foreground">Animations et micro-interactions</p>
                  </div>
                  <ClayButton
                    onClick={() => setAnimationsPlaying(!animationsPlaying)}
                    variant="outline"
                  >
                    {animationsPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </ClayButton>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bubble-up Animation */}
                <ClayCard>
                  <ClayCardHeader>
                    <ClayCardTitle>Bubble-up Text</ClayCardTitle>
                  </ClayCardHeader>
                  <ClayCardContent>
                    <div className="space-y-2">
                      <h3 className={`text-xl font-bold ${animationsPlaying ? 'text-bubble-up animate' : ''}`}>
                        Bonjour Clara !
                      </h3>
                      <p className={`text-muted-foreground ${animationsPlaying ? 'text-bubble-up animate' : ''}`} 
                         style={animationsPlaying ? {'--delay': '200ms'} as React.CSSProperties : {}}>
                        Comment va Milo aujourd'hui ?
                      </p>
                    </div>
                    <pre className="mt-4 text-xs clay-pressed p-3 rounded">
{`<h1 className="text-bubble-up animate">
  Bonjour Clara !
</h1>`}
                    </pre>
                  </ClayCardContent>
                </ClayCard>

                {/* Clay Card Hover */}
                <ClayCard>
                  <ClayCardHeader>
                    <ClayCardTitle>Clay Card Hover</ClayCardTitle>
                  </ClayCardHeader>
                  <ClayCardContent>
                    <div className="clay-card clay-raised p-4 rounded-clay cursor-pointer">
                      <div className="h-4 bg-primary/20 rounded mb-2" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Hover pour voir l'effet 3D
                      </p>
                    </div>
                    <pre className="mt-4 text-xs clay-pressed p-3 rounded">
{`.clay-card:hover {
  transform: perspective(1000px) 
    rotateX(2deg) rotateY(2deg) 
    scale(1.02);
}`}
                    </pre>
                  </ClayCardContent>
                </ClayCard>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
