
import React, { useState } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayInput } from '@/components/ui/clay-input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Bot,
  Stethoscope,
  Heart,
  BookOpen,
  MessageCircle,
  Camera,
  Calendar,
  AlertTriangle,
  Sparkles,
  Send,
  Paperclip,
  X,
  User
} from 'lucide-react'

const features = [
  {
    id: 1,
    title: 'Diagnostic d\'urgence',
    description: 'Analysez les symptômes de votre animal et obtenez des conseils immédiats',
    icon: AlertTriangle,
    color: 'error',
    prompt: 'Mon animal présente des symptômes inquiétants'
  },
  {
    id: 2,
    title: 'Analyse de photo',
    description: 'Envoyez une photo pour une analyse visuelle des symptômes',
    icon: Camera,
    color: 'primary',
    prompt: 'Je souhaite faire analyser une photo'
  },
  {
    id: 3,
    title: 'Conseils de soins',
    description: 'Obtenez des recommandations personnalisées pour le bien-être quotidien',
    icon: Heart,
    color: 'accent',
    prompt: 'J\'aimerais des conseils pour prendre soin de mon animal'
  },
  {
    id: 4,
    title: 'Planification santé',
    description: 'Programmez les rappels de vaccins, vermifuges et visites vétérinaires',
    icon: Calendar,
    color: 'success',
    prompt: 'Aidez-moi à planifier les soins de santé'
  },
  {
    id: 5,
    title: 'Éducation comportement',
    description: 'Comprenez et résolvez les problèmes de comportement',
    icon: BookOpen,
    color: 'secondary',
    prompt: 'Mon animal a des problèmes de comportement'
  },
  {
    id: 6,
    title: 'Questions générales',
    description: 'Posez n\'importe quelle question sur la santé et le bien-être animal',
    icon: MessageCircle,
    color: 'primary',
    prompt: 'J\'ai une question sur mon animal'
  }
]

const mockConversation = [
  {
    id: 1,
    sender: 'user',
    message: 'Bonjour ! Milo semble avoir moins d\'appétit depuis quelques jours. Que dois-je faire ?',
    timestamp: '14:32'
  },
  {
    id: 2,
    sender: 'bot',
    message: 'Bonjour ! Je comprends votre inquiétude concernant l\'appétit de Milo. Une baisse d\'appétit peut avoir plusieurs causes. Permettez-moi de vous poser quelques questions pour mieux vous aider :\n\n• Depuis combien de jours exactement avez-vous remarqué cette baisse d\'appétit ?\n• Milo boit-il normalement ?\n• A-t-il d\'autres symptômes (léthargie, vomissements, diarrhée) ?\n• Y a-t-il eu des changements récents dans son environnement ?',
    timestamp: '14:33',
    typing: false
  },
  {
    id: 3,
    sender: 'user',
    message: 'Cela fait 3 jours. Il boit normalement et n\'a pas d\'autres symptômes. On a changé sa nourriture la semaine dernière.',
    timestamp: '14:35'
  },
  {
    id: 4,
    sender: 'bot',
    message: 'Merci pour ces précisions ! Le changement de nourriture est très probablement la cause. Voici mes recommandations :\n\n🔄 **Transition alimentaire graduelle**\n• Mélangez progressivement l\'ancienne et la nouvelle nourriture\n• Jour 1-2: 75% ancienne, 25% nouvelle\n• Jour 3-4: 50% chacune\n• Jour 5-6: 25% ancienne, 75% nouvelle\n• Jour 7: 100% nouvelle nourriture\n\n⚠️ **Surveillez**\n• Reprise progressive de l\'appétit\n• Pas de troubles digestifs\n\n📞 **Consultez un vétérinaire si**\n• Pas d\'amélioration dans 2-3 jours\n• Apparition d\'autres symptômes\n\nSouhaitez-vous que je programme un rappel pour suivre l\'évolution ?',
    timestamp: '14:36',
    typing: false
  }
]

export function AnimaBotPage() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature)
    setChatOpen(true)
    setMessage(feature.prompt)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
    }, 2000)
    
    setMessage('')
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="h-16 w-16 lg:h-24 lg:w-24 clay-floating rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto animate-soft-bounce">
          <Bot className="h-8 w-8 lg:h-12 lg:w-12 text-primary animate-bounce" />
        </div>
        
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-bubble-up animate">
            AnimaBot Expert
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
            Votre assistant IA spécialisé en santé animale
          </p>
        </div>

        <div className="clay-subtle p-3 lg:p-4 rounded-clay animate-soft-bounce" style={{'--delay': '400ms'} as React.CSSProperties}>
          <p className="text-xs lg:text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 inline mr-2 text-accent" />
            Analyse avancée basée sur plus de 10 000 cas vétérinaires réels
          </p>
        </div>
      </div>

      {/* Grille des fonctionnalités - Carrousel en mobile */}
      <div className="max-w-6xl mx-auto">
        {/* Version mobile - Carrousel horizontal */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={feature.id}
                  className={`flex-shrink-0 w-72 snap-start`}
                >
                  <ClayCard 
                    className={`clay-card cursor-pointer animate-soft-bounce h-full`}
                    style={{'--delay': `${600 + index * 100}ms`} as React.CSSProperties}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <ClayCardHeader className="pb-3">
                      <div className={`h-10 w-10 clay-raised rounded-full bg-${feature.color}/20 flex items-center justify-center mb-3`}>
                        <Icon className={`h-5 w-5 text-${feature.color}`} />
                      </div>
                      <ClayCardTitle className="text-base leading-tight">{feature.title}</ClayCardTitle>
                    </ClayCardHeader>
                    <ClayCardContent className="pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </ClayCardContent>
                  </ClayCard>
                </div>
              )
            })}
          </div>
        </div>

        {/* Version desktop - Grille */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <ClayCard 
                key={feature.id}
                className={`clay-card cursor-pointer animate-soft-bounce`}
                style={{'--delay': `${600 + index * 100}ms`} as React.CSSProperties}
                onClick={() => handleFeatureClick(feature)}
              >
                <ClayCardHeader>
                  <div className={`h-12 w-12 clay-raised rounded-full bg-${feature.color}/20 flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 text-${feature.color}`} />
                  </div>
                  <ClayCardTitle className="text-lg">{feature.title}</ClayCardTitle>
                </ClayCardHeader>
                <ClayCardContent>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </ClayCardContent>
              </ClayCard>
            )
          })}
        </div>
      </div>

      {/* Accès rapide au chat */}
      <div className="text-center animate-soft-bounce" style={{'--delay': '1200ms'} as React.CSSProperties}>
        <ClayButton 
          size="lg"
          onClick={() => setChatOpen(true)}
          className="animate-soft-bounce"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Démarrer une conversation libre
        </ClayButton>
      </div>

      {/* Modal de chat - Plein écran en mobile */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="lg:max-w-2xl h-[90vh] lg:h-[600px] p-0 animate-soft-bounce max-w-[95vw] w-full">
          <DialogHeader className="p-4 lg:p-6 pb-0 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 lg:h-10 lg:w-10 clay-raised rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-lg">AnimaBot Expert</DialogTitle>
                  <p className="text-sm text-muted-foreground">Assistant IA spécialisé</p>
                </div>
              </div>
              <ClayButton 
                variant="ghost" 
                size="icon-sm" 
                onClick={() => setChatOpen(false)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </ClayButton>
            </div>
          </DialogHeader>

          {/* Zone de conversation */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 pt-0 space-y-4">
            {mockConversation.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-6 w-6 lg:h-8 lg:w-8 clay-raised rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {msg.sender === 'user' ? <User className="h-3 w-3 lg:h-4 lg:w-4" /> : <Bot className="h-3 w-3 lg:h-4 lg:w-4" />}
                </div>
                <div className={`max-w-[85%] lg:max-w-xs clay-raised p-3 rounded-clay ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-surface'}`}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.message}</p>
                  <p className={`text-xs mt-1 opacity-70`}>{msg.timestamp}</p>
                </div>
              </div>
            ))}

            {/* Animation de frappe */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="h-6 w-6 lg:h-8 lg:w-8 clay-raised rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  <Bot className="h-3 w-3 lg:h-4 lg:w-4" />
                </div>
                <div className="clay-raised p-3 rounded-clay bg-surface">
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Zone de saisie */}
          <div className="p-4 lg:p-6 pt-0 border-t border-border/30">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <ClayInput
                  placeholder="Posez votre question à AnimaBot..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-10"
                />
                <ClayButton
                  size="icon-sm"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Paperclip className="h-4 w-4" />
                </ClayButton>
              </div>
              <ClayButton onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </ClayButton>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AnimaBot peut faire des erreurs. Consultez toujours un vétérinaire pour les cas urgents.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
