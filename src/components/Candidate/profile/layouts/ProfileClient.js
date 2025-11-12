"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Mail,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import "./style.css";
import { HeaderLayout } from "./HeaderLayout";
import { SidebarLayout } from "./SidebarLayout";
import { MobileSidebarLayout } from "./MobileSidebar";
import { usePathname, useRouter } from "next/navigation";
import { candidateLogOut } from "@/actions/auth";
import { toast } from "react-toastify";

const navItems = [
  {
    id: "manage-profile",
    label: "MANAGE PROFILE",
    icon: <User size={18} />,
    children: [
      {
        id: "view-profile",
        label: "View Profile",
        icon: <User size={18} />,
        href: "/candidate/profile/",
      },
      {
        id: "edit-profile",
        label: "Edit Profile",
        icon: <User size={18} />,
        href: "/candidate/profile/edit/",
      },
      {
        id: "applied-jobs",
        label: "Applied Jobs",
        icon: <Mail size={18} />,
        href: "/candidate/applied-jobs/",
      },
    ],
  },
  {
    id: "logout",
    label: "Log Out",
    icon: <LogOut size={18} />,
  },
];

export default function ProfileClient({ children }) {
  const [expandedSections, setExpandedSections] = useState(
    new Set(navItems.map((item) => item.id))
  );
  const router = useRouter();
  const pathname = usePathname();

  const findActiveItem = () => {
    for (const item of navItems) {
      if (item.href === pathname) return item.id;
      if (item.children) {
        const child = item.children.find((c) => c.href === pathname);
        if (child) return child.id;
      }
    }
    return "";
  };

  const getHeaderTitle = () => {
    for (const item of navItems) {
      if (item.href === pathname) return item.label;
      if (item.children) {
        const child = item.children.find((c) => c.href === pathname);
        if (child) return child.label;
      }
    }
    return "Dashboard";
  };
  const [activeItemId, setActiveItemId] = useState(findActiveItem());
  const [headerTitle, setHeaderTitle] = useState(getHeaderTitle());
  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleItemClick = async (item) => {
    if (item.id === "logout") {
      try {
        const result = await candidateLogOut();
        if (result.error) {
          console.log(result);
          toast.error("Log Out Failed");
        } else {
          router.push("/");
          toast.success("Log Out Successful");
        }
      } catch (err) {
        console.log(result);
        toast.error("Log Out Failed");
      }
    } else {
      setActiveItemId(item.id);
      setHeaderTitle(item.label);
      if (item.href) {
        router.push(item.href);
      }
    }
  };

  return (
    <div className="client-layout">
      <MobileSidebarLayout
        navItems={navItems}
        expandedSections={expandedSections}
        activeItemId={activeItemId}
        onToggleSection={toggleSection}
        onItemClick={handleItemClick}
      />
      <div className="hide-on-mobile">
        <SidebarLayout
          navItems={navItems}
          expandedSections={expandedSections}
          activeItemId={activeItemId}
          onToggleSection={toggleSection}
          onItemClick={handleItemClick}
        />
      </div>

      <div className="main-content">
        <HeaderLayout title={headerTitle} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
