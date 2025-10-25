"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Home, User, Briefcase, Settings, Mail, LogIn, UserPlus, LogOut, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage, translations } from "@/components/language-provider"
import { cn } from "@/lib/utils"

interface NavItem {
  key: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const navItems: NavItem[] = [
  { key: "home", href: "#home", icon: Home },
  { key: "about", href: "#about", icon: User },
  { key: "projects", href: "#projects", icon: Briefcase, badge: "New" },
  { key: "services", href: "#services", icon: Settings },
  { key: "contacts", href: "#contacts", icon: Mail },
]

// Mock auth state - replace with your actual auth logic
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState<{ name: string; email: string; avatar?: string } | null>(null)

  // Simulate auth check
  React.useEffect(() => {
    // Replace with actual auth check
    const checkAuth = () => {
      const mockUser = localStorage.getItem('user')
      if (mockUser) {
        setUser(JSON.parse(mockUser))
        setIsLoggedIn(true)
      }
    }
    checkAuth()
  }, [])

  const login = (userData: { name: string; email: string; avatar?: string }) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }

  return { isLoggedIn, user, login, logout }
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const { language } = useLanguage()
  const { isLoggedIn, user, logout } = useAuth()

  const t = translations[language]

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.substring(1))
      let currentSection = "home"

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element && element.offsetTop <= window.scrollY + 100) {
          currentSection = section
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const AuthButtons = () => {
    if (isLoggedIn && user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user.name}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
          <Link href="/login" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/signup" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Up</span>
          </Link>
        </Button>
      </div>
    )
  }

  const NavItemComponent = ({ item, isMobile = false }: { item: NavItem; isMobile?: boolean }) => {
    const Icon = item.icon
    const isActive = activeSection === item.href.substring(1)

    return (
      <button
        onClick={() => scrollToSection(item.href)}
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 group relative",
          isMobile ? "w-full justify-start" : "",
          isActive
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-foreground hover:bg-muted hover:scale-105",
        )}
      >
        <Icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
        <span>{t[item.key as keyof typeof t]}</span>
        {item.badge && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {item.badge}
          </Badge>
        )}
        {isActive && !isMobile && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
        )}
      </button>
    )
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border/50"
          : "bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-xl">IB</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                IMANARIYO
              </span>
              <div className="text-xs text-muted-foreground font-medium">Baptiste</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItemComponent key={item.key} item={item} />
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>

            <AuthButtons />

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden relative">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">IB</span>
                    </div>
                    Navigation
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-2 mt-8">
                  {navItems.map((item) => (
                    <NavItemComponent key={item.key} item={item} isMobile />
                  ))}

                  <div className="pt-6 mt-6 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground">Settings</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <LanguageSwitcher />
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}