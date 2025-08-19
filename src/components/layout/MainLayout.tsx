
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { ClayButton } from '@/components/ui/clay-button'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { Menu } from 'lucide-react'

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/30 bg-surface/50 backdrop-blur-sm">
        <ClayButton
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </ClayButton>
        <h1 className="font-semibold">AnimaHub</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 min-h-screen lg:pl-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
