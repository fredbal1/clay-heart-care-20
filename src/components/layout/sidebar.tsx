
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  Home, 
  FileText, 
  BookOpen, 
  Search, 
  Bot,
  User,
  Settings,
  PawPrint,
  Menu,
  X
} from 'lucide-react'
import { ClayButton } from '@/components/ui/clay-button'
import { cn } from '@/lib/utils'

const primaryNavigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Dossier Santé', href: '/health-record', icon: FileText },
  { name: 'Journal de Bord', href: '/journal', icon: BookOpen },
  { name: 'Services', href: '/services', icon: Search },
  { name: 'AnimaBot Expert', href: '/animabot', icon: Bot },
]

const accountNavigation = [
  { name: 'Profil', href: '/profile', icon: User },
  { name: 'Paramètres', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const NavItem = ({ item, active }: { item: typeof primaryNavigation[0], active: boolean }) => (
    <NavLink
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-clay transition-all duration-200",
        active 
          ? "clay-pressed bg-primary/10 text-primary" 
          : "text-muted-foreground hover:text-foreground clay-button hover:clay-floating"
      )}
      onClick={() => setIsOpen(false)}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      <span className="truncate">{item.name}</span>
    </NavLink>
  )

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 clay-raised bg-surface/90 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 clay-raised rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <PawPrint className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AnimaHub
              </span>
            </div>
            <ClayButton
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </ClayButton>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col justify-between p-4">
            {/* Section principale */}
            <div className="space-y-1">
              <div className="mb-4">
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {primaryNavigation.map((item) => (
                    <NavItem key={item.name} item={item} active={isActive(item.href)} />
                  ))}
                </div>
              </div>
            </div>

            {/* Section compte */}
            <div className="space-y-1 border-t border-border/30 pt-4">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Compte
              </h3>
              <div className="space-y-1">
                {accountNavigation.map((item) => (
                  <NavItem key={item.name} item={item} active={isActive(item.href)} />
                ))}
              </div>
            </div>
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-border/30">
            <div className="flex items-center gap-3 p-3 clay-subtle rounded-clay">
              <div className="h-10 w-10 clay-raised rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <span className="text-sm font-medium text-secondary-foreground">CM</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Clara Martin</p>
                <p className="text-xs text-muted-foreground truncate">clara@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
