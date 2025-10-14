"use client"

import * as React from "react"

type Language = "en" | "fr" | "rw"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
}

const LanguageProviderContext = React.createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "ui-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = React.useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Language
      return stored || defaultLanguage
    }
    return defaultLanguage
  })

  const value = {
    language,
    setLanguage: (language: Language) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, language)
      }
      setLanguage(language)
    },
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = React.useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}

// Translation helper
export const translations = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    services: "Services",
    testimonial: "Testimonial",
    blog: "Blog",
    contacts: "Contacts",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    custom: "Custom",
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    services: "Services",
    testimonial: "Témoignage",
    blog: "Blog",
    contacts: "Contacts",
    theme: "Thème",
    language: "Langue",
    light: "Clair",
    dark: "Sombre",
    custom: "Personnalisé",
  },
  rw: {
    home: "Ahabanza",
    about: "Ibyerekeye",
    projects: "Imishinga",
    services: "Serivisi",
    testimonial: "Ubuhamya",
    blog: "Blog",
    contacts: "Aho Tubarizwa",
    theme: "Insanganyamatsiko",
    language: "Ururimi",
    light: "Urumuri",
    dark: "Umwijima",
    custom: "Guhindura",
  },
}

export const languageNames = {
  en: "English",
  fr: "Français",
  rw: "Kinyarwanda",
}
