"use client";

import { ChevronDown, ChevronRight, } from "lucide-react";
import "./style.css";

export function MobileSidebarLayout({
  navItems,
  expandedSections,
  activeItemId,
  onToggleSection,
  onItemClick,
  candidate_name
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
          data-bs-dismiss="offcanvas"
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
      className="sidebar offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasSidebar"
      aria-labelledby="offcanvasSidebar"
    >
      <div className="sidebar-header">
        <span>{candidate_name}</span>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="sidebar-content">{renderNavItems(navItems)}</div>
    </aside>
  );
}
