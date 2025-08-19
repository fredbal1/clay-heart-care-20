
import React, { useState, useRef, useEffect } from 'react'
import { ClayCard, ClayCardContent, ClayCardHeader, ClayCardTitle } from '@/components/ui/clay-card'
import { ClayButton } from '@/components/ui/clay-button'
import { ClayInput } from '@/components/ui/clay-input'
import { ClayAvatar, ClayAvatarFallback } from '@/components/ui/clay-avatar'
import { AnimaBotMascot } from '@/components/chat/AnimaBotMascot'
import { Send, Paperclip, Bot, User, Image } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  image?: string
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Bonjour Clara ! Je suis AnimaBot, votre assistant personnel pour le bien-être de Milo. Comment puis-je vous aider aujourd'hui ? 🐕",
    sender: 'bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  }
]

const botResponses = [
  "C'est une excellente question ! Pouvez-vous me donner plus de détails sur le comportement de Milo ?",
  "Je comprends votre préoccupation. Basé sur l'historique de Milo, je peux vous suggérer quelques pistes...",
  "Pour un Golden Retriever de 3 ans comme Milo, c'est tout à fait normal. Voici ce que je recommande :",
  "D'après les informations dans le dossier de Milo, il serait peut-être temps de consulter votre vétérinaire.",
  "Excellente initiative ! Cela va enrichir le dossier de santé de Milo. Puis-je vous poser quelques questions complémentaires ?"
]

export function AnimaBotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [showMascot, setShowMascot] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedImage) return

    // Masquer la mascotte après le premier message
    if (showMascot && messages.length === 1) {
      setShowMascot(false)
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setSelectedImage(null)
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  return (
    <div className="h-screen flex flex-col animate-fade-in bg-gradient-to-br from-background via-background to-surface/30">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-border/30 bg-surface/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <ClayAvatar size="lg" className="bg-gradient-to-br from-primary to-secondary clay-floating">
            <ClayAvatarFallback>
              <Bot className="h-6 w-6 text-primary-foreground" />
            </ClayAvatarFallback>
          </ClayAvatar>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-bubble-up animate">
              AnimaBot Expert
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground text-bubble-up animate" style={{'--delay': '200ms'} as React.CSSProperties}>
              Votre assistant IA pour le bien-être animal
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Mascotte (affichée au début) */}
        {showMascot && messages.length === 1 && (
          <div className="p-4 lg:p-6">
            <ClayCard className="clay-floating">
              <ClayCardContent className="p-0">
                <AnimaBotMascot />
              </ClayCardContent>
            </ClayCard>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-soft-bounce ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
              style={{'--delay': `${index * 100}ms`} as React.CSSProperties}
            >
              <ClayAvatar size="sm" className={
                message.sender === 'user' 
                  ? 'bg-primary clay-raised' 
                  : 'bg-gradient-to-br from-primary to-secondary clay-raised'
              }>
                <ClayAvatarFallback>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  )}
                </ClayAvatarFallback>
              </ClayAvatar>

              <div className={`max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'ml-12' : 'mr-12'
              }`}>
                <div className={`clay-raised p-4 rounded-clay transition-all duration-200 hover:clay-floating ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-surface'
                }`}>
                  {message.image && (
                    <div className="mb-3 clay-pressed rounded-clay overflow-hidden">
                      <img 
                        src={message.image} 
                        alt="Uploaded" 
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-2">
                  {message.timestamp.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <ClayAvatar size="sm" className="bg-gradient-to-br from-primary to-secondary clay-raised">
                <ClayAvatarFallback>
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </ClayAvatarFallback>
              </ClayAvatar>
              <div className="clay-raised p-4 rounded-clay bg-surface mr-12">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 lg:p-6 border-t border-border/30 bg-surface/50 backdrop-blur-sm">
        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-4">
            <div className="relative inline-block">
              <div className="clay-pressed rounded-clay overflow-hidden">
                <img 
                  src={URL.createObjectURL(selectedImage)} 
                  alt="Preview" 
                  className="h-20 w-20 object-cover"
                />
              </div>
              <ClayButton
                variant="ghost"
                size="icon-sm"
                className="absolute -top-2 -right-2 h-6 w-6 bg-error text-error-foreground clay-raised"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </ClayButton>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          
          <ClayButton
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="clay-raised hover:clay-floating flex-shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </ClayButton>

          <ClayInput
            placeholder="Tapez votre message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />

          <ClayButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() && !selectedImage}
            className="clay-raised hover:clay-floating flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </ClayButton>
        </div>
      </div>
    </div>
  )
}
