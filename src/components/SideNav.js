"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Layers, FileText, Settings, Hash, Search, Plus, Archive, Image as ImageIcon, Link2, User, X } from "lucide-react";

export default function SideNav() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Hide entirely on auth pages
  if (pathname === "/signin" || pathname === "/signup" || pathname === "/") return null;

  return (
    <>
      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-surface/60 backdrop-blur-3xl flex flex-col items-center justify-start pt-32 px-4 transition-all duration-300 ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="w-full max-w-2xl transform transition-transform duration-500 delay-100 ${searchOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'}">
          <input 
            className="w-full bg-transparent border-none focus:ring-0 text-3xl md:text-5xl font-display text-on-surface placeholder:text-on-surface-variant/30 text-center outline-none" 
            placeholder="Search archive..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={searchOpen}
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['#architecture', '#minimalism', '#typography', '#ai'].map(tag => (
              <span key={tag} className="px-5 py-2 bg-surface-container-high rounded-full text-sm font-medium cursor-pointer hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button 
          className="absolute top-10 right-10 p-3 hover:bg-surface-container rounded-full transition-colors"
          onClick={() => setSearchOpen(false)}
        >
          <X className="w-8 h-8 text-on-surface" />
        </button>
      </div>

      {/* Desktop Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-low flex flex-col p-4 space-y-2 shadow-sm hidden md:flex pt-32 border-r border-outline-variant/20">
        <div className="px-3 mb-8">
          <h2 className="text-xl font-medium text-on-surface font-display tracking-tight">Library</h2>
          <p className="text-xs font-medium text-on-surface-variant opacity-60 uppercase tracking-widest mt-1">Organized by AI</p>
        </div>
        <div className="flex flex-col space-y-1">
          <Link 
            href="/dashboard"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname === '/dashboard' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-variant'}`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-sm font-medium">All Drops</span>
          </Link>
          <Link 
            href="/collections"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname.includes('/collections') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-variant'}`}
          >
            <Hash className="w-5 h-5" />
            <span className="text-sm font-medium">Collections</span>
          </Link>
          <Link 
            href="/notes"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname.includes('/notes') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-variant'}`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">Notes</span>
          </Link>
          <Link 
            href="/dashboard"
            className="flex items-center space-x-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg"
          >
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Images</span>
          </Link>
          <Link 
            href="/dashboard"
            className="flex items-center space-x-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg"
          >
            <Link2 className="w-5 h-5" />
            <span className="text-sm font-medium">Links</span>
          </Link>
          <Link 
            href="/dashboard"
            className="flex items-center space-x-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg"
          >
            <Archive className="w-5 h-5" />
            <span className="text-sm font-medium">Archive</span>
          </Link>
          <Link 
            href="/settings"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname.includes('/settings') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-variant'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
        <div className="mt-auto px-3 pt-6 border-t border-outline-variant/10">
          <button 
            className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-sm hover:shadow active:scale-95"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-4 h-4" />
            Search Archive
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (from Design Spec) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-xl border-t border-outline-variant/10 z-50 px-4 py-3 flex justify-around items-center">
        <Link href="/dashboard" className={`flex flex-col items-center space-y-1 ${pathname === '/dashboard' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-medium">All</span>
        </Link>
        <Link href="/collections" className={`flex flex-col items-center space-y-1 ${pathname.includes('/collections') ? 'text-primary' : 'text-on-surface-variant'}`}>
          <Hash className="w-5 h-5" />
          <span className="text-[10px] font-medium">Collections</span>
        </Link>
        
        {/* Floating Action Button for Mobile */}
        <div className="mb-8 relative z-50">
          <button 
            className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
        
        <Link href="/notes" className={`flex flex-col items-center space-y-1 ${pathname.includes('/notes') ? 'text-primary' : 'text-on-surface-variant'}`}>
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-medium">Notes</span>
        </Link>
        <Link href="/settings" className={`flex flex-col items-center space-y-1 ${pathname.includes('/settings') ? 'text-primary' : 'text-on-surface-variant'}`}>
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>
    </>
  );
}
