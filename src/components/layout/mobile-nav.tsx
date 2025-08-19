
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, FileText, Plus, BookOpen, Bot } from 'lucide-react'
import { ClayButton } from '@/components/ui/clay-button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Dossier', href: '/health-record', icon: FileText },
  { name: 'Ajouter', href: '/add-event', icon: Plus, isAction: true },
  { name: 'Journal', href: '/journal', icon: BookOpen },
  { name: 'AnimaBot', href: '/animabot', icon: Bot },
]

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="clay-floating mx-4 mb-4 rounded-clay bg-surface/90 backdrop-blur-lg border-t border-border/50">
        <nav className="flex items-center justify-around py-2">
          {navigation.map((item) => {
            if (item.isAction) {
              return (
                <ClayButton
                  key={item.name}
                  variant="default"
                  size="icon"
                  shape="pill"
                  className="h-12 w-12 bg-primary text-primary-foreground"
                  asChild
                >
                  <NavLink to={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </NavLink>
                </ClayButton>
              )
            }

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )
                }
                end={item.href === '/'}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
