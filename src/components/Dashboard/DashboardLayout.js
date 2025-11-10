"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  Home,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  FilePenLine,
  Flower,
} from "lucide-react";
import { useLayoutTransitionStore } from "@/stores/layout_transition_store";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const { layoutTransition, setLayoutTransitionOff } =
    useLayoutTransitionStore();

  useEffect(() => {
    if (layoutTransition) {
      window.location.reload();
      setLayoutTransitionOff();
    }
  }, [layoutTransition]);

  const navItems = [
    { href: "#", label: "Home", icon: Home },
    { href: "#", label: "Users", icon: Users },
    { href: "#", label: "Settings", icon: Settings },
    { href: "#", label: "Jobs", icon: Flower },
    { href: "#", label: "Blogs", icon: FilePenLine },
    { href: "#", label: "Analytics", icon: Settings },
    { href: "#", label: "Teams", icon: Users },
  ];

  return (
    <div className="flex h-screen w-screen bg-linear-to-b from-blue-50 to-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:relative pb-2 top-0 left-0 h-screen z-40 flex flex-col bg-linear-to-b from-blue-600 via-blue-500 to-blue-700 transition-all duration-300 overflow-hidden ${
          sidebarOpen
            ? collapsed
              ? "w-20"
              : "w-64"
            : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "w-20" : "w-64"}`}
      >
        <div
          className={`flex items-center justify-between px-4 py-4 border-b border-blue-700 shrink-0 h-16`}
        >
          {!collapsed && (
            <h1 className="text-white font-bold text-lg">TalenTracker Ltd.</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
          >
            {collapsed ? <ChevronRight size={25} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-0 overflow-x-hidden">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className={`flex hover:bg-blue-500/50  transition-colors group duration-200 items-center py-3  relative w-full ${
                collapsed ? "justify-center px-2" : "px-4"
              }`}
            >
              <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                <item.icon size={20} className="text-white" />
              </div>
              {!collapsed && (
                <span className="text-white  text-sm font-medium ml-4 truncate group-hover:translate-x-1 transition-transform">
                  {item.label}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              )}
            </a>
          ))}
        </nav>
        <div
          className={`border-t border-blue-700 p-4 shrink-0 h-16 flex items-center justify-center ${
            collapsed ? "px-2" : ""
          }`}
        >
          {!collapsed ? (
            <button className="flex items-center gap-4 w-full hover:bg-blue-500/50 px-4 py-3 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-sky-400 shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Mahim Rahad</p>
                <p className="text-xs text-blue-200">Admin</p>
              </div>
            </button>
          ) : (
            <button className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/40 text-white flex items-center justify-center transition-colors">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>
      <div className="flex-1 flex flex-col w-full">
        <header className="sticky top-0 z-20 h-16 bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-lg flex-1 max-w-md">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-blue-200 rounded-lg transition-colors text-blue-600 cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-shadow">
              M
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
