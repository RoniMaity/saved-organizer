"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, FileText, Settings, Hash } from "lucide-react";

export default function SideNav() {
  const pathname = usePathname();
  
  // Hide on auth pages
  if (pathname === "/signin" || pathname === "/signup" || pathname === "/") return null;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-low flex flex-col p-4 pt-28 hidden md:flex border-r border-outline-variant/30">
      <div className="mb-6 px-2">
        <h2 className="text-xl font-semibold text-on-surface font-display">Library</h2>
        <p className="text-sm text-on-surface-variant">Organized by AI</p>
      </div>
      <nav className="space-y-1">
        <Link 
          href="/dashboard"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-high'}`}
        >
          <Layers className="w-4 h-4" />
          <span>All Drops</span>
        </Link>
        <Link 
          href="/collections"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname.includes('/collections') ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-high'}`}
        >
          <Hash className="w-4 h-4" />
          <span>Collections</span>
        </Link>
        <Link 
          href="/notes"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname.includes('/notes') ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-high'}`}
        >
          <FileText className="w-4 h-4" />
          <span>Notes</span>
        </Link>
      </nav>
      <div className="mt-auto">
         <Link 
          href="/settings"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname.includes('/settings') ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'text-on-surface hover:bg-surface-container-high'}`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
