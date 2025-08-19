
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Sidebar } from './sidebar'
import { MobileNav } from './mobile-nav'
import { ClayButton } from '@/components/ui/clay-button'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/30 bg-surface/80 backdrop-blur-lg px-4 lg:hidden">
        <ClayButton
          variant="ghost"
          size="icon-sm"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </ClayButton>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 clay-raised rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs text-primary-foreground">🐾</span>
          </div>
          <span className="font-semibold">AnimaHub</span>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] lg:h-screen">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
