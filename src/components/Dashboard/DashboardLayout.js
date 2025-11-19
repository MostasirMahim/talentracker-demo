"use client";

import { useEffect, useState } from "react";
import { Menu, Home, LogOut, Bell, Search, ChevronRight, ChevronLeft, ChevronDown, FilePenLine, UserPlus, LinkIcon, Flower, Contact, Quote, UserCheck } from 'lucide-react';
import Link from "next/link";
import { useLayoutTransitionStore } from "@/stores/layout_transition_store";
import { useUserStore } from "@/stores/user_store";
import { candidateLogOut, get_me } from "@/actions/auth";
import { toast } from "react-toastify";
import Image from "next/image";
import "./style.css"
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const { layoutTransition, setLayoutTransitionOff } =
    useLayoutTransitionStore();

  useEffect(() => {
    if (layoutTransition) {
      window.location.reload();
      setLayoutTransitionOff();
    }
  }, [layoutTransition]);

  const { setUser, user: data } = useUserStore();
  const user = data?.error === false ? true : "";
  const handleFetchData = async () => {
    const fetchedData = await get_me();
    setUser(fetchedData);
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    {
      icon: UserPlus,
      label: "Onboarding",
      href: "/dashboard/registration/email",
      urls: ["/dashboard/registration/"],
    },
    {
      href: "#",
      label: "Jobs",
      icon: Flower,
      children: [
        { href: "/dashboard/jobs/job_types/create", label: "Set Job type" },
        {
          href: "/dashboard/jobs/job_categories/create",
          label: "Set Job category",
        },
        {
          href: "/dashboard/jobs/job_locations/create",
          label: "Set Job locations",
        },
        { href: "/dashboard/jobs/post", label: "Post Job" },
        { href: "/dashboard/jobs/job_types/view", label: "View job types" },
        {
          href: "/dashboard/jobs/job_categories/view",
          label: "View job category",
        },
        {
          href: "/dashboard/jobs/job_locations/view",
          label: "View job locations",
        },
        { href: "/dashboard/jobs/", label: "View all jobs" },
      ],
    },
    {
      href: "#",
      label: "Blogs",
      icon: FilePenLine,
      children: [
        {
          href: "/dashboard/blogs/categories/create",
          label: "Set Blog Category",
        },
        { href: "/dashboard/blogs/tags/create", label: "Set Blog Tags" },
        { href: "/dashboard/blogs/post", label: "Post Blog" },
        {
          href: "/dashboard/blogs/categories/view",
          label: "View Blog Categories",
        },
        { href: "/dashboard/blogs/tags/view", label: "View Blog Tags" },
        { href: "/dashboard/blogs/", label: "View all Blogs" },
      ],
    },
    {
      href: "/dashboard/hooks/",
      label: "View all Hooks",
      icon: LinkIcon,
    },
    {
      href: "/dashboard/contacts/",
      label: "View all Contacts",
      icon: Contact,
    },
    {
      href: "/dashboard/quotes/",
      label: "View all Quotes",
      icon: Quote,
    },
    {
      icon: UserCheck,
      label: "Registered candidates",
      href: "/dashboard/candidates/",
      urls: ["/dashboard/candidates/"],
    },
    {
      icon : UserCheck,
      label : "View all Users",
      href: "/dashboard/users/",
      urls: ["/dashboard/users/"]
    

    },
  ];

  const handleParentClick = (e, item, index) => {
    if (item.children && item.children.length > 0) {
      e.preventDefault();
      setExpandedItems((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
      if (collapsed) {
        setCollapsed(false);
      }
    } else if (item.href && item.href !== "#") {
      return;
    }
  };

  const handleIconClick = (e, item, index) => {
    if (collapsed && window.innerWidth < 1024) {
      e.preventDefault();
      if (item.children && item.children.length > 0) {
        setExpandedItems((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      } else if (item.href && item.href !== "#") {
        window.location.href = item.href;
      }
    }
  };
  const handleLogOut = async () => {
    try {
      const result = await candidateLogOut();
      if (result.error) {
        toast.error("Log Out Failed");
      } else {
        setUser(null);
        router.push("/auth/admin/login");
        toast.success("Log Out Successful");
      }
    } catch (err) {
      console.log(err);
      toast.error("Log Out Failed");
    }
  };

  const hasChildren = (item) => item.children && item.children.length > 0;

  return (
    <div className="flex h-screen w-screen bg-linear-to-b from-blue-50 to-white overflow-hidden">
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
        <nav className="flex-1 overflow-y-auto sidebar-scrollbar py-6 px-0 overflow-x-hidden">
          {navItems.map((item, i) => (
            <div key={i}>
              {!hasChildren(item) ? (
                <Link
                  href={item.href}
                  className={`flex hover:bg-blue-500/50 transition-colors group duration-200 items-center py-3 relative w-full ${
                    collapsed ? "justify-center px-2" : "px-4"
                  }`}
                >
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                    <item.icon size={20} className="text-white" />
                  </div>
                  {!collapsed && (
                    <span className="text-white text-sm font-medium ml-4 truncate group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {item.label}
                    </div>
                  )}
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    handleParentClick(e, item, i);
                    handleIconClick(e, item, i);
                  }}
                  className={`flex hover:bg-blue-500/50 transition-colors group duration-200 items-center py-3 relative w-full cursor-pointer ${
                    collapsed ? "justify-center px-2" : "px-4"
                  }`}
                >
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                    <item.icon size={20} className="text-white" />
                  </div>
                  {!collapsed && (
                    <div className="flex items-center flex-1">
                      <span className="text-white text-sm font-medium ml-4 truncate group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                      {hasChildren(item) && (
                        <ChevronDown
                          size={16}
                          className={`text-white ml-auto transition-transform duration-300 ${
                            expandedItems[i] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {item.label}
                    </div>
                  )}
                </button>
              )}

              {hasChildren(item) && expandedItems[i] && !collapsed && (
                <div className="bg-blue-700/30 border-l-2 border-blue-400">
                  {item.children.map((child, childIdx) => (
                    <Link
                      key={childIdx}
                      href={child.href}
                      className="flex items-center py-2 px-4 ml-4 text-white text-sm hover:bg-blue-500/50 transition-colors group rounded-r"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-300 shrink-0 mr-3" />
                      <span className="truncate group-hover:translate-x-1 transition-transform">
                        {child.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div
          className={`border-t border-blue-700 p-4 shrink-0 h-16 flex items-center justify-center ${
            collapsed ? "px-2" : ""
          }`}
        >
          {!collapsed ? (
            <div className="flex items-center gap-4 w-full hover:bg-blue-500/50 px-4 py-3 rounded-lg transition-colors">
              <button
                onClick={handleLogOut}
                className="w-10 h-10 cursor-pointer rounded-full bg-white/30 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors"
              >
                <LogOut size={16} />
              </button>
              <div className="text-left">
                <p className="text-sm font-medium text-white">
                  {data?.data?.user?.email}
                </p>
                <p className="text-xs text-blue-200">
                  {data?.data?.user?.user_type?.toUpperCase()}
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogOut}
              className="w-8 h-8 cursor-pointer rounded-full bg-white/30 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>
      <div className="hidden lg:flex lg:flex-1 lg:flex-col w-full h-full overflow-hidden">
        <header className="sticky top-0 z-20 h-16 bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200 shadow-sm flex items-center justify-between px-6 shrink-0">
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
            <div className="w-9 h-9 rounded-full border-2 border-blue-500 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-shadow">
              <Image
                src="/images/TTL_Fav.png"
                width={30}
                height={30}
                alt="User"
                className="rounded-full"
              />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <div className="flex lg:hidden flex-1 flex-col w-full h-full overflow-hidden">
        <header className="sticky top-0 z-20 h-16 bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200 shadow-sm flex items-center justify-between px-6 shrink-0">
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
            <div className="w-9 h-9 rounded-full border-2 border-blue-500 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-shadow">
              <Image
                src="/images/TTL_Fav.png"
                width={30}
                height={30}
                alt="User"
                className="rounded-full"
              />
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
