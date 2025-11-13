"use client";

import { Menu, X } from "lucide-react";
import "./style.css";

export function HeaderLayout({ title, isSidebarOpen, onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-toggle"
           data-bs-toggle="offcanvas"
           data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <h1 className="header-title">{title}</h1>
      </div>
  
    </header>
  );
}
