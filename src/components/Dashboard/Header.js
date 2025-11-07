"use client"


import { useTheme } from "@/store/themeStore"
import { Sun, Moon, Cloud, Search, Bell, User } from "lucide-react"

export default function Header() {
  const { theme, setTheme } = useTheme()

  const themes = ["light", "dark", "bluish"]

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={18} />
      case "dark":
        return <Moon size={18} />
      case "bluish":
        return <Cloud size={18} />
      default:
        return <Sun size={18} />
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">HR Dashboard</h1>
        <div className="header-search">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-btn" onClick={cycleTheme} title="Toggle Theme">
          {getThemeIcon()}
        </button>

        <button className="header-icon-btn" title="Notifications">
          <Bell size={18} />
        </button>

        <div className="header-user">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <div className="user-name">Admin</div>
            <div className="user-role">HR Manager</div>
          </div>
        </div>
      </div>
    </header>
  )
}
