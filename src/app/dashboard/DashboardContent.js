"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search } from "lucide-react";
import ItemCard from "@/components/ItemCard";

export default function DashboardContent({ token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // Filter state for search
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        // Assume API returns { posts: [...] } based on previous CategoryPageClient
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const isUrl = inputValue.startsWith("http://") || inputValue.startsWith("https://");
      
      // If it's a URL or we just want to save it as a text drop
      // Trigger save
      setIsSaving(true);
      const urlToSave = inputValue.trim();
      setInputValue(""); // Clear input immediately for UX

      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ inputUrl: urlToSave }),
        });
        
        if (res.ok) {
          // Re-fetch to get the finalized item with category tags
          await fetchPosts();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (post.caption && post.caption.toLowerCase().includes(q)) ||
      (post.url && post.url.toLowerCase().includes(q)) ||
      (post.category?.name && post.category.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Glassmorphic Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 transition-all duration-300">
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-[1440px] mx-auto w-full">
          {/* Logo / Title */}
          <div className="font-display text-2xl font-semibold tracking-tighter text-on-surface shrink-0 mr-4">
            Unidrop
          </div>

          {/* Search / Save Input */}
          <div className="flex-grow max-w-2xl mx-4">
            <div className="relative group w-full">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setSearchQuery(e.target.value); // Real-time search if not hitting enter
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search or paste anything..."
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-3 pl-12 pr-6 text-base md:text-lg text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center shrink-0">
            <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:opacity-90 transition-opacity duration-300 shadow-sm">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Stage: Masonry Grid */}
      <main className="pt-28 px-4 md:px-8 pb-20 max-w-[1440px] mx-auto min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {(filteredPosts.length > 0 || isSaving) ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {/* Optimistic Ghost Card */}
                {isSaving && <ItemCard isGhost={true} />}

                {/* Render Posts */}
                {filteredPosts.map((post) => (
                  <ItemCard key={post.id} item={post} />
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-20 text-on-surface-variant">
                <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-lg">No drops found.</p>
                <p className="text-sm opacity-70">Paste a link or note above to start saving.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
