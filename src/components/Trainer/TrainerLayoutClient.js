"use client";

import { useState } from "react";
import { User, LogOut, UserPen, Settings } from "lucide-react";
import "./style.css";
import { usePathname, useRouter } from "next/navigation";
import { candidateLogOut } from "@/actions/auth";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/user_store";
import { MobileSidebarLayout } from "../Candidate/profile/layouts/MobileSidebar";
import { HeaderLayout } from "../Candidate/profile/layouts/HeaderLayout";
import { SidebarLayoutTrainer } from "./Layouts/SidebarLayout";

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
        href: "/trainer/profile/",
      },
      {
        id: "edit-profile",
        label: "Edit Profile",
        icon: <UserPen size={18} />,
        href: "/trainer/profile/edit/",
      },
    ],
  },
  {
    id: "chenge-password",
    label: "Change Password",
    href: "/trainer/profile/chenge-password/",
    icon: <Settings size={18} />,
  },
  {
    id: "logout",
    label: "Log Out",
    icon: <LogOut size={18} />,
  },
];

export default function TrainerLayoutClient({ children }) {
  const [expandedSections, setExpandedSections] = useState(
    new Set(navItems.map((item) => item.id))
  );
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useUserStore();

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
          toast.error("Log Out Failed");
        } else {
          router.push("/");
          setUser(null);
          toast.success("Log Out Successful");
        }
      } catch (err) {
        console.log(err);
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
        <SidebarLayoutTrainer
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
