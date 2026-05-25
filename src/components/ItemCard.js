"use client";

import Image from "next/image";
import { Link2, FileText, Image as ImageIcon } from "lucide-react";

export default function ItemCard({ item, isGhost }) {
  if (isGhost) {
    return (
      <div className="break-inside-avoid mb-4 inline-block w-full">
        <div className="relative bg-surface rounded-xl p-6 border border-outline-variant/30 min-h-[200px] flex flex-col justify-center items-center shadow-sm">
          <div className="w-full max-w-[80%] space-y-4">
            <div className="h-4 bg-surface-container-low rounded-full w-full animate-pulse"></div>
            <div className="h-4 bg-surface-container-low rounded-full w-5/6 animate-pulse"></div>
            <div className="h-4 bg-surface-container-low rounded-full w-4/6 animate-pulse"></div>
          </div>
          <div className="mt-8 flex items-center space-x-2 text-on-surface-variant">
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <span className="text-sm font-medium animate-pulse">Processing...</span>
          </div>
        </div>
      </div>
    );
  }

  // Determine Type
  // Note: The old DB schema uses postType (video, image, sidecar) but for Unidrop it's URL, TEXT, IMAGE
  // I will infer based on the item properties.
  const type = item.postType?.toUpperCase() || (item.url ? "URL" : "TEXT");
  const media = item.media?.[0];
  
  // Tag rendering logic
  const renderTags = () => {
    if (!item.category?.name) return null;
    return (
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-surface via-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 justify-start items-end z-20">
        <span className="px-3 py-1 bg-surface-container-low/80 backdrop-blur-md border border-outline-variant/50 rounded-full text-xs font-medium text-on-surface shadow-sm">
          {item.category.name}
        </span>
      </div>
    );
  };

  if (type === "URL" || type === "SIDECAR" || type === "VIDEO") {
    // If it has media, show the hero image. Otherwise, it might just be a link card.
    return (
      <div className="break-inside-avoid mb-4 inline-block w-full">
        <div className="relative bg-surface rounded-xl overflow-hidden border border-outline-variant/30 cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
          {media ? (
            <div className="relative w-full aspect-video bg-surface-container-low">
              <img
                src={media.url}
                alt={item.caption || "Saved URL"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="p-6 bg-surface-container-low flex items-center justify-center aspect-video">
               <Link2 className="w-12 h-12 text-outline-variant" />
            </div>
          )}
          <div className="p-4 bg-surface z-10 relative">
            <h3 className="font-semibold text-lg text-on-surface mb-1 line-clamp-2 leading-tight">
              {item.caption || "Saved Link"}
            </h3>
            {item.url && (
              <p className="text-sm text-on-surface-variant truncate">
                {new URL(item.url).hostname}
              </p>
            )}
          </div>
          {renderTags()}
        </div>
      </div>
    );
  }

  if (type === "IMAGE") {
    return (
      <div className="break-inside-avoid mb-4 inline-block w-full">
        <div className="relative bg-surface rounded-xl overflow-hidden border border-outline-variant/30 cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
           <img
            src={media?.url || item.url}
            alt={item.caption || "Saved Image"}
            className="w-full h-auto object-cover"
          />
          {renderTags()}
        </div>
      </div>
    );
  }

  // TEXT / Default fallback
  const isShortNote = (item.caption || "").length < 100;
  return (
    <div className="break-inside-avoid mb-4 inline-block w-full">
      <div className="relative bg-surface-container-low/50 rounded-xl p-6 border border-outline-variant/30 cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300 min-h-[150px] flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary/60" />
          <span className="text-xs font-medium text-on-surface-variant">Note</span>
        </div>
        <p className={`text-on-surface leading-relaxed ${isShortNote ? 'text-2xl font-medium tracking-tight' : 'text-base'}`}>
          {item.caption || item.text}
        </p>
        {renderTags()}
      </div>
    </div>
  );
}
