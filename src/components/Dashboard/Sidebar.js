"use client"

import Link from "next/link"
import { LayoutDashboard, Briefcase, Users, FolderOpen, Inbox, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { useSidebar } from "@/store/sidebarStore"

export default function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar()

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Jobs", icon: Briefcase, href: "/dashboard/jobs" },
    { label: "Applicants", icon: Users, href: "/dashboard/applicants" },
    { label: "Projects", icon: FolderOpen, href: "/dashboard/projects" },
    { label: "Requests", icon: Inbox, href: "/dashboard/requests" },
  ]

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">HR Admin</div>
        <button className="sidebar-toggle" onClick={toggleSidebar} title={isSidebarCollapsed ? "Expand" : "Collapse"}>
          {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} className="sidebar-item">
              <span className="sidebar-item-icon">
                <Icon size={20} />
              </span>
              <span className="sidebar-item-label">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-item" title="Settings">
          <span className="sidebar-item-icon">
            <Settings size={20} />
          </span>
          <span className="sidebar-item-label">Settings</span>
        </button>
      </div>
    </aside>
  )
}
