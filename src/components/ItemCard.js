"use client";

import { useState } from "react";
import Image from "next/image";
import { Link2, FileText, Image as ImageIcon, X, Trash2, ExternalLink, Copy, Share } from "lucide-react";

export default function ItemCard({ item, isGhost }) {
  const [modalOpen, setModalOpen] = useState(false);
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

  // Determine Type directly from the new schema
  const type = item.type || "TEXT";
  const mediaUrl = item.imageUrl;
  
  // Tag rendering logic
  const renderTags = () => {
    if (!item.tags || item.tags.length === 0) return null;
    return (
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-surface via-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-wrap gap-2 justify-start items-end z-20">
        {item.tags.map(tag => (
          <span key={tag.id} className="px-3 py-1 bg-surface-container-low/80 backdrop-blur-md border border-outline-variant/50 rounded-full text-xs font-medium text-on-surface shadow-sm">
            {tag.name}
          </span>
        ))}
      </div>
    );
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCardContent = () => {
    if (type === "URL") {
      let hostname = "";
      try { hostname = new URL(item.content).hostname; } catch(e){}

      return (
        <div 
          onClick={() => setModalOpen(true)}
          className="relative bg-surface rounded-xl overflow-hidden border border-outline-variant/30 cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        >
          {mediaUrl ? (
            <div className="relative w-full aspect-video bg-surface-container-low">
              <img
                src={mediaUrl}
                alt={item.title || "Saved URL"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="p-6 bg-surface-container-low flex flex-col justify-between aspect-video relative overflow-hidden group">
               <div className="flex justify-between items-start w-full relative z-10">
                 {hostname ? (
                   <img 
                     src={`https://www.google.com/s2/favicons?sz=128&domain=${hostname}`} 
                     alt={hostname} 
                     className="w-10 h-10 rounded-xl bg-white p-1.5 shadow-sm border border-outline-variant/25"
                     onError={(e) => {
                       e.target.style.display = 'none';
                     }}
                   />
                 ) : (
                   <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-outline-variant/25">
                     <Link2 className="w-5 h-5 text-on-surface-variant" />
                   </div>
                 )}
                 <Link2 className="w-4 h-4 text-on-surface-variant/40" />
               </div>
               
               <div className="relative z-10 text-left">
                 <span className="text-on-surface-variant/50 text-[10px] font-bold tracking-widest uppercase">Link</span>
                 <p className="text-on-surface font-display text-base font-semibold tracking-tight line-clamp-1 mt-0.5">{hostname || "Web URL"}</p>
               </div>
            </div>
          )}
          <div className="p-4 bg-surface z-10 relative">
            <h3 className="font-semibold text-lg text-on-surface mb-1 line-clamp-2 leading-tight">
              {item.title || "Saved Link"}
            </h3>
            {hostname && (
              <p className="text-sm text-on-surface-variant truncate">
                {hostname}
              </p>
            )}
          </div>
          {renderTags()}
        </div>
      );
    }

    if (type === "IMAGE") {
      return (
        <div 
          onClick={() => setModalOpen(true)}
          className="relative bg-surface rounded-xl overflow-hidden border border-outline-variant/30 cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        >
           <img
            src={mediaUrl || item.content}
            alt={item.title || "Saved Image"}
            className="w-full h-auto object-cover"
          />
          {renderTags()}
        </div>
      );
    }

    // TEXT / Default fallback
    const isShortNote = (item.content || "").length < 100;
    return (
      <div 
        onClick={() => setModalOpen(true)}
        className="relative bg-surface-container-low/50 rounded-xl p-6 border border-outline-variant/30 cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300 min-h-[150px] flex flex-col justify-center"
      >
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary/60" />
          <span className="text-xs font-medium text-on-surface-variant">Note</span>
        </div>
        <p className={`text-on-surface leading-relaxed ${isShortNote ? 'text-2xl font-medium tracking-tight' : 'text-base'}`}>
          {item.content}
        </p>
        {renderTags()}
      </div>
    );
  };

  let hostname = "";
  if (type === "URL") {
    try { hostname = new URL(item.content).hostname; } catch(e){}
  }

  return (
    <>
      <div className="break-inside-avoid mb-4 inline-block w-full">
        {renderCardContent()}
      </div>

      {/* Full View Detail Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 transition-all duration-500 ease-in-out bg-black/40 backdrop-blur-md">
          <div className="relative w-full max-w-6xl h-[85vh] bg-surface-container-lowest rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col md:flex-row">
            <button 
              className="absolute top-6 right-6 z-[60] w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors duration-300" 
              onClick={() => setModalOpen(false)}
            >
              <X className="w-5 h-5 text-on-surface-variant" />
            </button>
            <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden bg-surface-container-high flex items-center justify-center">
              {type === "IMAGE" ? (
                <img 
                  className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-1000 ease-out" 
                  src={mediaUrl || item.content} 
                  alt={item.title || "Detail View"} 
                />
              ) : mediaUrl ? (
                <img 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out" 
                  src={mediaUrl} 
                  alt={item.title || "Detail View"} 
                />
              ) : (
                <div className="p-8 md:p-16 h-full flex flex-col justify-center overflow-y-auto w-full relative bg-surface-container text-on-surface">
                   {type === "URL" ? (
                     <>
                       <Link2 className="w-16 h-16 text-primary/30 mb-6 shrink-0 relative z-10" />
                       <h2 className="font-display text-2xl md:text-4xl text-on-surface font-bold leading-relaxed break-all mb-4 relative z-10">{hostname || "Saved Link"}</h2>
                       <p className="text-on-surface-variant text-sm font-medium tracking-wide break-all relative z-10 max-w-xl">{item.content}</p>
                     </>
                   ) : (
                     <>
                       <FileText className="w-12 h-12 text-primary/30 mb-6 shrink-0" />
                       <p className="font-display text-2xl md:text-4xl leading-relaxed break-words">{item.content}</p>
                     </>
                   )}
                </div>
              )}
            </div>
            <div className="w-full md:w-2/5 h-1/2 md:h-full flex flex-col p-6 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary-container rounded flex items-center justify-center overflow-hidden">
                   {type === "URL" ? (
                     <Link2 className="w-3 h-3 text-on-primary-container" />
                   ) : type === "IMAGE" ? (
                     <ImageIcon className="w-3 h-3 text-on-primary-container" />
                   ) : (
                     <FileText className="w-3 h-3 text-on-primary-container" />
                   )}
                </div>
                <span className="font-medium text-sm text-on-surface-variant tracking-wide">
                  {type === 'URL' ? 'Saved Link' : type === 'IMAGE' ? 'Saved Image' : 'Memory Drop'}
                </span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl text-on-surface mb-6 leading-tight">
                {item.title || (type === 'TEXT' ? 'Text Note' : type === 'IMAGE' ? 'Image Drop' : 'Saved Link')}
              </h1>
              
              <section className="mt-8 pt-8 border-t border-surface-variant">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-primary font-bold">✨</span>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">Grok Insights</h2>
                </div>
                <p className="text-base text-on-surface-variant mb-8 leading-relaxed">
                  {item.summary || (type === 'URL' ? 'A link saved to your archive without a generated summary.' : 'This memory drop was processed but no detailed summary was generated by the AI.')}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-12">
                  {item.tags?.map(tag => (
                    <span key={tag.id} className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-medium hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </section>
              
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-surface-variant/50">
                <div className="flex gap-4">
                  {type === 'URL' && (
                    <a 
                      href={item.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 hover:opacity-70 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
                      <span className="text-xs font-medium text-on-surface-variant">Open Link</span>
                    </a>
                  )}
                  <button onClick={handleCopy} className="group flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <Copy className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
                    <span className="text-xs font-medium text-on-surface-variant">
                      {copied ? "Copied!" : "Copy Link"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
