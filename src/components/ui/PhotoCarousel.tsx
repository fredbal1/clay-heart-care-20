
import React, { useState, useEffect } from 'react'
import { ClayButton } from '@/components/ui/clay-button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PhotoCarouselProps {
  photos: string[]
  className?: string
}

export function PhotoCarousel({ photos, className = '' }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [photos.length, isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="aspect-square clay-pressed rounded-clay overflow-hidden mb-4 relative group">
        <img
          src={photos[currentIndex]}
          alt="Souvenir"
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        />
        
        {/* Navigation buttons - visible on hover */}
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ClayButton
            variant="ghost"
            size="icon-sm"
            onClick={goToPrevious}
            className="clay-floating bg-surface/80 backdrop-blur-sm h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </ClayButton>
          
          <ClayButton
            variant="ghost"
            size="icon-sm"
            onClick={goToNext}
            className="clay-floating bg-surface/80 backdrop-blur-sm h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </ClayButton>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      
      {/* Indicators */}
      <div className="flex items-center justify-center gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentIndex(index)
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary clay-raised w-6' 
                : 'bg-muted clay-pressed hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
