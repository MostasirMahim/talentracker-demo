"use client"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { useTheme } from "@/store/themeStore"
import { useSidebar } from "@/store/sidebarStore"

export default function DashboardLayoutClient({ children }) {
  const { theme } = useTheme()
  const { isSidebarCollapsed } = useSidebar()

  return (
    <div className={`dashboard-container theme-${theme}`}>
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">{children}</main>
      </div>
    </div>
  )
}
