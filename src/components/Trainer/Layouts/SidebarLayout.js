"use client";

import { ChevronDown, ChevronRight, HatGlasses } from "lucide-react";
import "./style.css";

export function SidebarLayoutTrainer({
  navItems,
  expandedSections,
  activeItemId,
  onToggleSection,
  onItemClick,
}) {
  const renderNavItems = (items, depth = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedSections.has(item.id);
      const isActive = activeItemId === item.id;

      if (hasChildren) {
        return (
          <div key={item.id} className="sidebar-section">
            <div
              className={`sidebar-section-header ${
                isExpanded ? "expanded" : ""
              }`}
              onClick={() => onToggleSection(item.id)}
            >
              <div className="flex items-center gap-2">
                {item.icon && (
                  <span className="sidebar-item-icon">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </div>
              <span className="sidebar-chevron">
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            </div>
            <div
              className={`sidebar-section-items ${
                isExpanded ? "expanded" : ""
              }`}
            >
              {renderNavItems(item.children, depth + 1)}
            </div>
          </div>
        );
      }

      return (
        <div
          key={item.id}
          className={`sidebar-item ${isActive ? "active" : ""}`}
          onClick={() => onItemClick(item)}
          style={{ cursor: "pointer" }}
        >
          {item.icon && <span className="sidebar-item-icon">{item.icon}</span>}
          <span className="sidebar-item-label">{item.label}</span>
        </div>
      );
    });
  };

  return (
    <aside
      className="sidebar"
    >
      <div className="sidebar-header">
        <HatGlasses size={20} />
        <span>Trainer Dashboard</span>
      </div>
      <div className="sidebar-content">{renderNavItems(navItems)}</div>
    </aside>
  );
}
