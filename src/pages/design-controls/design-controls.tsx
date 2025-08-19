
import React, { useState, useEffect } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayInput } from '@/components/ui/clay-input'
import { ClayBadge } from '@/components/ui/clay-badge'
import { ClaySwitch } from '@/components/ui/clay-switch'
import { 
  Palette,
  Sliders,
  Download,
  Upload,
  RotateCcw,
  Eye,
  Settings,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react'

interface DesignToken {
  key: string
  value: string | number | boolean
  type: 'color' | 'size' | 'select' | 'range' | 'switch'
  min?: number
  max?: number
  step?: number
  options?: string[]
  unit?: string
  category: string
  description: string
  cssVariable: string
  selector?: string
}

const designTokens: DesignToken[] = [
  // Images & Avatars
  {
    key: 'petAvatarSize',
    value: 96,
    type: 'range',
    min: 64,
    max: 128,
    step: 8,
    unit: 'px',
    category: 'avatars',
    description: 'Taille avatar animal (Dashboard top-right)',
    cssVariable: '--pet-card-avatar-size',
    selector: '.pet-card-avatar'
  },
  {
    key: 'petAvatarShape',
    value: 'circle',
    type: 'select',
    options: ['circle', 'rounded', 'pill', 'square'],
    category: 'avatars', 
    description: 'Forme avatar animal',
    cssVariable: '--pet-card-avatar-shape',
    selector: '.pet-card-avatar'
  },
  {
    key: 'accountAvatarSize',
    value: 40,
    type: 'range',
    min: 32,
    max: 56,
    step: 4,
    unit: 'px',
    category: 'avatars',
    description: 'Taille avatar compte (sidebar)',
    cssVariable: '--account-avatar-size',
    selector: '.account-avatar'
  },
  {
    key: 'accountAvatarBorder',
    value: 2,
    type: 'range',
    min: 0,
    max: 6,
    step: 1,
    unit: 'px',
    category: 'avatars',
    description: 'Bordure avatar compte',
    cssVariable: '--account-avatar-border',
    selector: '.account-avatar'
  },
  
  // FAB & Buttons
  {
    key: 'fabSize',
    value: 56,
    type: 'range',
    min: 48,
    max: 80,
    step: 4,
    unit: 'px',
    category: 'fab',
    description: 'Taille du FAB IA',
    cssVariable: '--fab-size',
    selector: '.clay-fab'
  },
  {
    key: 'fabBg',
    value: '#7B8FA1',
    type: 'color',
    category: 'fab',
    description: 'Couleur fond FAB',
    cssVariable: '--fab-bg',
    selector: '.clay-fab'
  },
  {
    key: 'fabIconColor',
    value: '#F3E9DC',
    type: 'color',
    category: 'fab',
    description: 'Couleur icône FAB',
    cssVariable: '--fab-icon-color',
    selector: '.clay-fab'
  },
  
  // Status & Indicators
  {
    key: 'statusDotSize',
    value: 8,
    type: 'range',
    min: 4,
    max: 16,
    step: 2,
    unit: 'px',
    category: 'status',
    description: 'Taille status dot (Bonjour Clara)',
    cssVariable: '--status-dot-size',
    selector: '.status-dot'
  },
  {
    key: 'statusDotColor',
    value: '#84A59D',
    type: 'color',
    category: 'status',
    description: 'Couleur status dot',
    cssVariable: '--status-dot-color',
    selector: '.status-dot'
  },
  {
    key: 'statusDotGlow',
    value: true,
    type: 'switch',
    category: 'status',
    description: 'Effet glow status dot',
    cssVariable: '--status-dot-glow',
    selector: '.status-dot'
  },
  
  // Grilles & Layout
  {
    key: 'gridMobileCols',
    value: 1,
    type: 'range',
    min: 1,
    max: 2,
    step: 1,
    category: 'layout',
    description: 'Colonnes mobile',
    cssVariable: '--grid-mobile-cols',
    selector: '.responsive-grid'
  },
  {
    key: 'gridTabletCols',
    value: 2,
    type: 'range',
    min: 2,
    max: 3,
    step: 1,
    category: 'layout',
    description: 'Colonnes tablet',
    cssVariable: '--grid-tablet-cols',
    selector: '.responsive-grid'
  },
  {
    key: 'gridDesktopCols',
    value: 3,
    type: 'range',
    min: 3,
    max: 5,
    step: 1,
    category: 'layout',
    description: 'Colonnes desktop',
    cssVariable: '--grid-desktop-cols',
    selector: '.responsive-grid'
  },
  {
    key: 'gridGap',
    value: 24,
    type: 'range',
    min: 8,
    max: 48,
    step: 4,
    unit: 'px',
    category: 'layout',
    description: 'Espacement grille',
    cssVariable: '--grid-gap',
    selector: '.responsive-grid'
  },
  
  // Theme Colors
  {
    key: 'primaryColor',
    value: '#7B8FA1',
    type: 'color',
    category: 'theme',
    description: 'Couleur primaire',
    cssVariable: '--primary-rgb',
    selector: ':root'
  },
  {
    key: 'secondaryColor',
    value: '#84A59D',
    type: 'color',
    category: 'theme',
    description: 'Couleur secondaire',
    cssVariable: '--secondary-rgb',
    selector: ':root'
  },
  {
    key: 'accentColor',
    value: '#F4978E',
    type: 'color',
    category: 'theme',
    description: 'Couleur accent',
    cssVariable: '--accent-rgb',
    selector: ':root'
  }
]

const categories = [
  { id: 'avatars', name: 'Images & Avatars', icon: '👤' },
  { id: 'fab', name: 'FAB & Boutons', icon: '🚀' },
  { id: 'status', name: 'Status & Badges', icon: '🔴' },
  { id: 'layout', name: 'Grilles & Layout', icon: '📐' },
  { id: 'theme', name: 'Couleurs Thème', icon: '🎨' }
]

export function DesignControlsPage() {
  const [tokens, setTokens] = useState<Record<string, string | number | boolean>>({})
  const [selectedCategory, setSelectedCategory] = useState('avatars')
  const [darkMode, setDarkMode] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  // Initialize tokens from CSS variables
  useEffect(() => {
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    
    const initialTokens: Record<string, string | number | boolean> = {}
    designTokens.forEach(token => {
      if (token.type === 'color') {
        initialTokens[token.key] = token.value
      } else if (token.type === 'switch') {
        initialTokens[token.key] = token.value
      } else {
        const cssValue = computedStyle.getPropertyValue(token.cssVariable)
        initialTokens[token.key] = cssValue ? parseFloat(cssValue) : token.value
      }
    })
    
    setTokens(initialTokens)
  }, [])

  // Apply token changes to CSS variables
  const updateToken = (key: string, value: string | number | boolean) => {
    setTokens(prev => ({ ...prev, [key]: value }))
    
    const token = designTokens.find(t => t.key === key)
    if (!token) return

    const root = document.documentElement
    
    if (token.type === 'color') {
      root.style.setProperty(token.cssVariable, value as string)
    } else if (token.type === 'size' || token.type === 'range') {
      const unit = token.unit || ''
      root.style.setProperty(token.cssVariable, `${value}${unit}`)
    } else if (token.type === 'switch') {
      if (token.key === 'statusDotGlow') {
        const glowValue = value ? '0 0 8px hsl(var(--status-dot-color) / 0.5)' : 'none'
        root.style.setProperty('--status-dot-glow', glowValue)
      }
    } else if (token.type === 'select') {
      if (token.key === 'petAvatarShape') {
        // Apply shape class to pet avatars
        const petAvatars = document.querySelectorAll('.pet-card-avatar')
        petAvatars.forEach(avatar => {
          avatar.className = avatar.className.replace(/shape-\w+/g, '')
          avatar.classList.add(`shape-${value}`)
        })
      }
    }

    // Dispatch custom event for styleguide sync
    window.dispatchEvent(new CustomEvent('design-token-change', {
      detail: { token: token.cssVariable.replace('--', ''), value }
    }))
  }

  const resetToDefaults = () => {
    designTokens.forEach(token => {
      updateToken(token.key, token.value)
    })
  }

  const exportTokens = () => {
    const exportData = {
      tokens,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'animahub-design-tokens.json'
    a.click()
    
    URL.revokeObjectURL(url)
  }

  const importTokens = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string)
        if (importedData.tokens) {
          Object.entries(importedData.tokens).forEach(([key, value]) => {
            updateToken(key, value as string | number | boolean)
          })
        }
      } catch (error) {
        console.error('Erreur import tokens:', error)
      }
    }
    reader.readAsText(file)
  }

  const renderTokenControl = (token: DesignToken) => {
    const value = tokens[token.key] ?? token.value

    switch (token.type) {
      case 'range':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">{token.description}</label>
              <ClayBadge variant="secondary" className="text-xs">
                {value}{token.unit}
              </ClayBadge>
            </div>
            <input
              type="range"
              min={token.min}
              max={token.max}
              step={token.step}
              value={value as number}
              onChange={(e) => updateToken(token.key, Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-clay appearance-none cursor-pointer clay-slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{token.min}{token.unit}</span>
              <span>{token.max}{token.unit}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              CSS: <code>{token.cssVariable}</code>
            </div>
          </div>
        )

      case 'color':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">{token.description}</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value as string}
                onChange={(e) => updateToken(token.key, e.target.value)}
                className="w-12 h-12 rounded-clay border-2 border-border cursor-pointer"
              />
              <div className="flex-1">
                <ClayInput
                  value={value as string}
                  onChange={(e) => updateToken(token.key, e.target.value)}
                  placeholder="#HEXCODE"
                  className="font-mono text-sm"
                />
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              CSS: <code>{token.cssVariable}</code>
            </div>
          </div>
        )

      case 'select':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">{token.description}</label>
            <select
              value={value as string}
              onChange={(e) => updateToken(token.key, e.target.value)}
              className="w-full clay-input"
            >
              {token.options?.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
            <div className="text-xs text-muted-foreground">
              CSS: <code>{token.cssVariable}</code>
            </div>
          </div>
        )

      case 'switch':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">{token.description}</label>
              <ClaySwitch
                checked={value as boolean}
                onCheckedChange={(checked) => updateToken(token.key, checked)}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              CSS: <code>{token.cssVariable}</code>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const filteredTokens = designTokens.filter(token => token.category === selectedCategory)

  return (
    <div className="h-screen flex bg-gradient-to-br from-background to-surface/50">
      {/* Sidebar Controls */}
      <div className="w-80 border-r border-border/30 bg-surface/50 backdrop-blur-sm overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold mb-2">Design Controls</h1>
            <p className="text-sm text-muted-foreground">
              Modifiez les tokens en temps réel
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <ClayButton variant="outline" size="sm" onClick={resetToDefaults}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </ClayButton>
            <ClayButton variant="outline" size="sm" onClick={exportTokens}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </ClayButton>
            <label className="cursor-pointer">
              <ClayButton variant="outline" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </span>
              </ClayButton>
              <input
                type="file"
                accept=".json"
                onChange={importTokens}
                className="hidden"
              />
            </label>
          </div>

          {/* Theme Toggle */}
          <ClayCard className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Thème sombre</span>
              <ClaySwitch
                checked={darkMode}
                onCheckedChange={(checked) => {
                  setDarkMode(checked)
                  document.documentElement.classList.toggle('dark', checked)
                }}
              />
            </div>
          </ClayCard>

          {/* Category Navigation */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Catégories
            </h3>
            {categories.map(category => (
              <ClayButton
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </ClayButton>
            ))}
          </div>

          {/* Token Controls */}
          <div className="space-y-6">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Contrôles
            </h3>
            {filteredTokens.map(token => (
              <ClayCard key={token.key} className="p-4">
                {renderTokenControl(token)}
              </ClayCard>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Preview Header */}
        <div className="p-4 border-b border-border/30 bg-surface/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Preview Live</h2>
            <div className="flex items-center gap-2">
              <ClayButton
                variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </ClayButton>
              <ClayButton
                variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </ClayButton>
              <ClayButton
                variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </ClayButton>
              <ClayButton variant="outline" size="sm" asChild>
                <a href="/styleguide" target="_blank">
                  <Eye className="h-4 w-4 mr-1" />
                  Styleguide
                </a>
              </ClayButton>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className={`mx-auto transition-all duration-300 ${
            previewDevice === 'mobile' ? 'max-w-sm' :
            previewDevice === 'tablet' ? 'max-w-2xl' : 
            'max-w-6xl'
          }`}>
            {/* Preview Dashboard Elements */}
            <div className="space-y-6">
              {/* Header Preview */}
              <ClayCard className="p-6">
                <div className="flex items-center gap-4">
                  <div className="account-avatar clay-floating rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold">CM</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="status-dot"></div>
                      <h2 className="text-xl font-bold">Bonjour Clara !</h2>
                    </div>
                    <p className="text-muted-foreground">Comment va Milo aujourd'hui ?</p>
                  </div>
                </div>
              </ClayCard>

              {/* Pet Avatar Preview */}
              <ClayCard className="p-6">
                <h3 className="font-semibold mb-4">Avatar Animal (Pet Switcher)</h3>
                <div className="flex items-center gap-4">
                  <div className="pet-card-avatar clay-floating bg-secondary/20 flex items-center justify-center shape-circle">
                    <span className="text-2xl">🐕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Milo</h4>
                    <p className="text-sm text-muted-foreground">Golden Retriever • 3 ans</p>
                  </div>
                </div>
              </ClayCard>

              {/* Grid Preview */}
              <ClayCard className="p-6">
                <h3 className="font-semibold mb-4">Grille Responsive</h3>
                <div className="responsive-grid">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="clay-raised p-4 rounded-clay bg-surface/50">
                      <div className="h-4 bg-primary/20 rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </ClayCard>
            </div>

            {/* FAB Preview */}
            <ClayButton className="clay-fab fixed bottom-6 right-6">
              <Settings className="h-6 w-6" />
            </ClayButton>
          </div>
        </div>
      </div>
    </div>
  )
}
