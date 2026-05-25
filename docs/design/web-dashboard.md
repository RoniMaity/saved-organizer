# Web Dashboard Design Specification: Zenith Archive (MyMind Clone)

## Part 1: UI/UX Master Specification (Phase 0)

### 1. Global Layout Blueprint
The "MyMind" clone follows a **Minimalist Zen** philosophy. The UI should be invisible until needed, ensuring the user's saved content remains the primary focus.

* **Macro Structure:** * **Persistent Top Bar:** A floating, semi-transparent blurred (backdrop-filter) bar containing a centered, expansive search input. The search bar is the primary interaction point for both "Saving" (via paste) and "Finding."
    * **Collapsible Navigation (Hidden by Default):** A subtle slide-out drawer or a bottom-fixed mobile-style nav for desktop, housing "All Items," "Collections" (AI-grouped), and "Settings."
    * **Main Stage:** A fluid **Masonry Grid** (using `columns-1 sm:columns-2 md:columns-3 lg:columns-4`) with generous, consistent gutter spacing (Gap-4 or Gap-6).
* **Design Tokens:** * **Background:** Neutral-50 or Pure White.
    * **Typography:** Inter or Geist (Next.js default) for high legibility.
    * **Shadows:** Soft, diffused elevation (shadcn/ui `shadow-sm` or `shadow-md`).

### 2. Component Level Breakdown
Each card is a "Meme" (a unit of memory).

#### Card Variations
* **URL Card:**
    * **Visuals:** Hero image from OpenGraph meta, bold title, and a subtle domain favicon/label at the bottom.
    * **Processing State:** A skeleton pulse overlay while Apify/Grok is active.
* **Raw Text/Note Card:**
    * **Visuals:** Dynamic font size based on character count (shorter notes = larger text). Minimalist background tint based on AI-detected sentiment or category.
    * **Structure:** No title, just the content.
* **Image Card:**
    * **Visuals:** Full-bleed image with a slight zoom effect on hover. Aspect ratio is preserved (Masonry logic).

#### AI Tag Placement (Grok)
* **Invisible by Default:** Tags do not appear on the grid to prevent visual clutter.
* **On-Hover / Modal:** Tags reveal themselves in a subtle, semi-transparent row at the bottom of the card on hover, or inside the "Full View" modal.
* **Color-Coded Logic:** Grok-assigned categories (e.g., "Architecture," "Code," "Philosophical") use a monochromatic pill style.

### 3. The "Save" Interaction Flow (Asynchronous)
1.  **Trigger:** User pastes a URL into the search bar or presses `CMD+V` anywhere.
2.  **Immediate Feedback:** A "Ghost Card" (Skeleton) instantly appears at the top-left of the masonry grid. It shows a subtle "Processing..." micro-animation.
3.  **Background Processing:** * **Step 1 (Scraping):** Apify extracts metadata. The card updates with a title/image as soon as it's available.
    * **Step 2 (Analysis):** Grok processes the content and tags it.
4.  **Completion:** The "Processing" state fades out, and the card's final form snaps into place. The user is never blocked from continuing their search or saving another item.

### 4. Responsive Strategy
* **Masonry Grid:** Collapses from 4 columns (Desktop) to 2 columns (Tablet) and 1 column (Mobile). 
* **Top Bar:** The search bar expands to fill the screen width on mobile, with the filter/settings icons moving to a bottom navigation bar for easier thumb reach (Bottom-Up Design).
* **Interactions:** Hover-based tag reveals switch to "Long-press" or "Single-tap to open" on touch devices.

### 5. Technology Stack Alignment
* **Framework:** Next.js (App Router).
* **Styling:** Tailwind CSS.
* **UI Library:** shadcn/ui (Radix UI primitives).
* **Animations:** Framer Motion (for layout transitions).

---

## Part 2: High-Fidelity Prototypes (Reference Implementations)
The following HTML blocks represent the functional Tailwind layout references for the various states of the web dashboard.

### 2.1 Main Dashboard (Masonry View)
```html
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>MyMind Clone Dashboard</title>
<script src="[https://cdn.tailwindcss.com?plugins=forms,container-queries](https://cdn.tailwindcss.com?plugins=forms,container-queries)"></script>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com](https://fonts.googleapis.com)" rel="preconnect"/>
<link crossorigin="" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" rel="preconnect"/>
<link href="[https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap](https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-primary-container": "#7d8497",
                        "surface": "#f9f9f9",
                        "on-surface": "#1a1c1c",
                        "on-primary-fixed": "#141b2b",
                        "surface-container": "#eeeeee",
                        "inverse-surface": "#2f3131",
                        "secondary-fixed-dim": "#c0c7d6",
                        "secondary-container": "#dce2f3",
                        "error": "#ba1a1a",
                        "surface-tint": "#575e70",
                        "on-secondary-fixed-variant": "#404754",
                        "on-tertiary": "#ffffff",
                        "primary-container": "#141b2b",
                        "on-primary-fixed-variant": "#404758",
                        "surface-container-lowest": "#ffffff",
                        "inverse-on-surface": "#f0f1f1",
                        "on-tertiary-fixed": "#191c1e",
                        "on-error-container": "#93000a",
                        "tertiary-container": "#191c1e",
                        "error-container": "#ffdad6",
                        "primary": "#000000",
                        "tertiary-fixed-dim": "#c5c6c8",
                        "on-surface-variant": "#45464c",
                        "surface-container-low": "#f3f3f4",
                        "primary-fixed": "#dce2f7",
                        "surface-bright": "#f9f9f9",
                        "primary-fixed-dim": "#c0c6db",
                        "surface-container-highest": "#e2e2e2",
                        "on-background": "#1a1c1c",
                        "on-tertiary-container": "#828486",
                        "tertiary-fixed": "#e1e2e4",
                        "secondary-fixed": "#dce2f3",
                        "on-secondary-fixed": "#151c27",
                        "background": "#f9f9f9",
                        "secondary": "#585f6c",
                        "outline": "#76777d",
                        "tertiary": "#000000",
                        "on-primary": "#ffffff",
                        "outline-variant": "#c6c6cd",
                        "surface-container-high": "#e8e8e8",
                        "surface-variant": "#e2e2e2",
                        "surface-dim": "#dadada",
                        "inverse-primary": "#c0c6db",
                        "on-secondary-container": "#5e6572",
                        "on-secondary": "#ffffff",
                        "on-error": "#ffffff",
                        "on-tertiary-fixed-variant": "#444749"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "base": "4px",
                        "xs": "8px",
                        "lg": "40px",
                        "md": "24px",
                        "xl": "64px",
                        "sm": "16px",
                        "margin-mobile": "20px",
                        "gutter": "16px",
                        "margin-desktop": "60px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Geist"],
                        "body-lg": ["Geist"],
                        "headline-lg-mobile": ["Geist"],
                        "display": ["Geist"],
                        "headline-md": ["Geist"],
                        "body-md": ["Geist"],
                        "label-sm": ["Geist"],
                        "label-md": ["Geist"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500" }],
                        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "headline-lg-mobile": ["24px", { "lineHeight": "1.2", "fontWeight": "500" }],
                        "display": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600" }],
                        "headline-md": ["20px", { "lineHeight": "1.4", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "label-sm": ["12px", { "lineHeight": "1", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "1", "letterSpacing": "0.01em", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: #ffffff;
            color: #1a1c1c;
        }
        
        .masonry-grid {
            column-count: 1;
            column-gap: 16px;
        }
        @media (min-width: 640px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
        @media (min-width: 1280px) { .masonry-grid { column-count: 4; } }
        
        .masonry-item {
            break-inside: avoid;
            margin-bottom: 16px;
        }

        .card-hover {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
            transform: scale(1.02);
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
        }

        .tags-overlay {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .card-hover:hover .tags-overlay {
            opacity: 1;
            transform: translateY(0);
        }

        /* Hide scrollbar for top nav input if needed */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="font-body-md text-body-md antialiased min-h-screen">
<header class="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl bg-transparent flat no shadows transition-all duration-500 ease-in-out">
<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-md max-w-[1440px] mx-auto w-full">
<div class="font-display text-headline-md md:text-display text-on-surface dark:text-surface-bright tracking-tighter shrink-0 mr-sm">
                Unidrop
            </div>
<div class="flex-grow max-w-2xl mx-sm">
<div class="relative group w-full">
<input class="w-full bg-surface-container-low/50 border-none rounded-full py-sm pl-md pr-12 font-headline-md text-headline-md md:text-headline-lg text-on-surface placeholder:text-on-surface-variant focus:ring-0 focus:outline-none focus:bg-surface-container-low transition-colors no-scrollbar" placeholder="Search or paste anything..." type="text"/>
<button class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="search" style="font-variation-settings: 'FILL' 0;">search</span>
</button>
</div>
</div>
<div class="flex items-center space-x-sm shrink-0">
<button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-primary-container hover:opacity-70 transition-opacity duration-300">
<span class="material-symbols-outlined" data-icon="add">add</span>
</button>
</div>
</div>
</header>
<main class="pt-[140px] px-margin-mobile md:px-margin-desktop pb-xl max-w-[1440px] mx-auto min-h-screen">
<div class="masonry-grid w-full">
<div class="masonry-item">
<div class="relative bg-surface rounded-xl overflow-hidden card-hover border border-surface-container-low cursor-pointer group">
<img alt="Architectural visualization of a modern concrete home" class="w-full h-auto object-cover aspect-video bg-surface-container" data-alt="A striking architectural visualization of a modern, brutalist concrete home with large glass windows. The building is surrounded by lush green foliage and bathed in soft, diffused natural sunlight. The aesthetic is ultra-minimalist, highlighting the geometric shapes and raw textures of the materials. The overall mood is serene and highly refined, perfectly aligned with a light-mode high-end gallery interface." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuAOfH1SSXB5x0SJnQATMqqyIpsmtkBn8q4aPbvBA2-oaVOefmFo_CzUvYv42SnlRh3ybwoHIpBhBCktbVyNzD4MfkdRRWpNK4gem_T6JlYNwFID0HdjPjBm_dHvb2klH4hifoay2SH-ItmET02zdTS8Ia4jLfrBGYjl47Qfb9jYcejjYy-PvigLnltpzqEdqN2u10nLyQq5hj1ckFjMBnNvha3NhmLvW-AxlBb6N99R1gLn3F9xzEOCGB7FAC2Q2VziAuF2Xt0NlkTK](https://lh3.googleusercontent.com/aida-public/AB6AXuAOfH1SSXB5x0SJnQATMqqyIpsmtkBn8q4aPbvBA2-oaVOefmFo_CzUvYv42SnlRh3ybwoHIpBhBCktbVyNzD4MfkdRRWpNK4gem_T6JlYNwFID0HdjPjBm_dHvb2klH4hifoay2SH-ItmET02zdTS8Ia4jLfrBGYjl47Qfb9jYcejjYy-PvigLnltpzqEdqN2u10nLyQq5hj1ckFjMBnNvha3NhmLvW-AxlBb6N99R1gLn3F9xzEOCGB7FAC2Q2VziAuF2Xt0NlkTK)"/>
<div class="p-md">
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs line-clamp-2">The Philosophy of Brutalist Architecture in Modern Web Design</h3>
<p class="font-label-md text-label-md text-on-surface-variant">archdaily.com</p>
</div>
<div class="absolute bottom-0 left-0 right-0 p-sm bg-gradient-to-t from-surface to-transparent tags-overlay flex gap-2">
<span class="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-on-surface-variant">Architecture</span>
<span class="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-on-surface-variant">Design</span>
</div>
</div>
</div>
<div class="masonry-item">
<div class="relative rounded-xl overflow-hidden card-hover cursor-pointer bg-surface-container">
<img alt="Minimalist landscape photo" class="w-full h-auto object-cover" data-alt="A stunning, ultra-minimalist landscape photography shot featuring a vast, empty white desert under a clear, pale sky. The composition is highly asymmetric, with a single, small, dark geometric rock formation in the lower right third. The lighting is bright and high-key, creating a clean, pristine light-mode aesthetic. The mood is silent, expansive, and deeply calming." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuC7jKOKAjg7g9UdktYE5YmH74bU5lGyRO1c85QUC6P32YM9fqRDDEbWZq7cWC5euExE5J85_4wCp2LtP26ICO13TgmKveWA48NsnjjVdqTIl23mBlm56SojhvcJ16AHevCjELobDcHDlWvzVXbg3XgbIa3mLhCAU5x6Z_YG_c8XkDBnCu_x0-UhzLP1czkZcnYENUYnydXpSadHgFoDRB5IMDrehXRlhHKI-BrRqpN-sk-Mm5r8OMB7ugSo49iZQsmqQJdNsI22QBXO](https://lh3.googleusercontent.com/aida-public/AB6AXuC7jKOKAjg7g9UdktYE5YmH74bU5lGyRO1c85QUC6P32YM9fqRDDEbWZq7cWC5euExE5J85_4wCp2LtP26ICO13TgmKveWA48NsnjjVdqTIl23mBlm56SojhvcJ16AHevCjELobDcHDlWvzVXbg3XgbIa3mLhCAU5x6Z_YG_c8XkDBnCu_x0-UhzLP1czkZcnYENUYnydXpSadHgFoDRB5IMDrehXRlhHKI-BrRqpN-sk-Mm5r8OMB7ugSo49iZQsmqQJdNsI22QBXO)"/>
<div class="absolute bottom-0 left-0 right-0 p-sm bg-gradient-to-t from-black/50 to-transparent tags-overlay flex gap-2">
<span class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-label-sm text-label-sm text-white">Landscape</span>
<span class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-label-sm text-label-sm text-white">Inspiration</span>
</div>
</div>
</div>
<div class="masonry-item">
<div class="relative bg-primary-fixed rounded-xl p-lg card-hover cursor-pointer border border-primary-fixed-dim/20 flex flex-col justify-center min-h-[300px]">
<blockquote class="font-headline-lg text-headline-lg text-on-primary-fixed mb-md">
                        "Design is not just what it looks like and feels like. Design is how it works."
                    </blockquote>
<cite class="font-label-md text-label-md text-on-primary-fixed-variant not-italic mt-auto">Steve Jobs</cite>
<div class="absolute bottom-0 left-0 right-0 p-sm tags-overlay flex gap-2 bg-gradient-to-t from-primary-fixed to-transparent">
<span class="px-3 py-1 bg-white/30 rounded-full font-label-sm text-label-sm text-on-primary-fixed-variant">Quote</span>
<span class="px-3 py-1 bg-white/30 rounded-full font-label-sm text-label-sm text-on-primary-fixed-variant">Philosophy</span>
</div>
</div>
</div>
<div class="masonry-item">
<div class="relative bg-surface rounded-xl p-md border border-surface-container-low min-h-[200px] flex flex-col justify-center items-center">
<div class="w-full max-w-[80%] space-y-4">
<div class="h-4 bg-surface-container rounded-full w-full animate-pulse"></div>
<div class="h-4 bg-surface-container rounded-full w-5/6 animate-pulse"></div>
<div class="h-4 bg-surface-container rounded-full w-4/6 animate-pulse"></div>
</div>
<div class="mt-lg flex items-center space-x-2 text-on-surface-variant">
<span class="material-symbols-outlined animate-spin" data-icon="sync">sync</span>
<span class="font-label-md text-label-md animate-pulse">Analyzing content...</span>
</div>
</div>
</div>
<div class="masonry-item">
<div class="relative bg-surface rounded-xl overflow-hidden card-hover border border-surface-container-low cursor-pointer group">
<img alt="Abstract 3D render" class="w-full h-auto object-cover aspect-[4/3] bg-surface-container" data-alt="A clean, abstract 3D render featuring soft, matte geometric primitives (spheres, cubes, and cylinders) arranged asymmetrically on a pure white seamless backdrop. The scene is lit with gentle, diffused global illumination, casting very soft, organic shadows. The color palette is strictly monochromatic, using only whites, pale grays, and a single subtle accent of muted silver. The mood is clinical yet beautiful." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuANO4u9HOgxRfFQ7z4qERp47g-7O9feKjmaAiU2ZRUXQ6lA7EUq6oAe3URsi2wvay9qts4lTaAYF-5MRYXo0dxbvNiaDTjWNVlwtiyeXKiB4zxx8w6CLF1dU7zY_14wj4nrpFzkh4zEs8dynjFi-UsPsdWa4sxBNyZhc4IKUymUDXsT1W3Ls31Yxm-59Hj_XMjV46wcBc7iGoXyXjDi8ndfJndq5E2PrVqjrGtNpkN71tMZb9Jf079PjmkcjWa34IWbAEypOari1dAm](https://lh3.googleusercontent.com/aida-public/AB6AXuANO4u9HOgxRfFQ7z4qERp47g-7O9feKjmaAiU2ZRUXQ6lA7EUq6oAe3URsi2wvay9qts4lTaAYF-5MRYXo0dxbvNiaDTjWNVlwtiyeXKiB4zxx8w6CLF1dU7zY_14wj4nrpFzkh4zEs8dynjFi-UsPsdWa4sxBNyZhc4IKUymUDXsT1W3Ls31Yxm-59Hj_XMjV46wcBc7iGoXyXjDi8ndfJndq5E2PrVqjrGtNpkN71tMZb9Jf079PjmkcjWa34IWbAEypOari1dAm)"/>
<div class="p-md">
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs line-clamp-2">Spatial Interfaces: The Next Paradigm</h3>
<p class="font-label-md text-label-md text-on-surface-variant">uxdesign.cc</p>
</div>
<div class="absolute bottom-0 left-0 right-0 p-sm bg-gradient-to-t from-surface to-transparent tags-overlay flex gap-2">
<span class="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-on-surface-variant">UX</span>
<span class="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-on-surface-variant">Future</span>
</div>
</div>
</div>
</div>
</main>
</body></html>

```

### 2.2 All Drops Library

```html
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="[https://cdn.tailwindcss.com?plugins=forms,container-queries](https://cdn.tailwindcss.com?plugins=forms,container-queries)"></script>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<link href="[https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/style.css](https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/style.css)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-fixed": "#dce2f7",
                        "outline-variant": "#c6c6cd",
                        "on-tertiary-container": "#828486",
                        "surface": "#f9f9f9",
                        "primary-fixed-dim": "#c0c6db",
                        "on-surface-variant": "#45464c",
                        "on-surface": "#1a1c1c",
                        "tertiary-container": "#191c1e",
                        "primary-container": "#141b2b",
                        "on-secondary-fixed-variant": "#404754",
                        "on-secondary": "#ffffff",
                        "surface-container": "#eeeeee",
                        "secondary": "#585f6c",
                        "on-tertiary-fixed": "#191c1e",
                        "on-primary-fixed": "#141b2b",
                        "surface-bright": "#f9f9f9",
                        "secondary-fixed": "#dce2f3",
                        "error": "#ba1a1a",
                        "on-secondary-container": "#5e6572",
                        "outline": "#76777d",
                        "tertiary-fixed-dim": "#c5c6c8",
                        "on-secondary-fixed": "#151c27",
                        "surface-container-high": "#e8e8e8",
                        "surface-container-lowest": "#ffffff",
                        "on-error": "#ffffff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed-variant": "#404758",
                        "on-tertiary": "#ffffff",
                        "inverse-surface": "#2f3131",
                        "surface-variant": "#e2e2e2",
                        "on-primary": "#ffffff",
                        "secondary-fixed-dim": "#c0c7d6",
                        "tertiary": "#000000",
                        "on-error-container": "#93000a",
                        "on-background": "#1a1c1c",
                        "inverse-primary": "#c0c6db",
                        "on-tertiary-fixed-variant": "#444749",
                        "on-primary-container": "#7d8497",
                        "background": "#f9f9f9",
                        "surface-container-low": "#f3f3f4",
                        "inverse-on-surface": "#f0f1f1",
                        "tertiary-fixed": "#e1e2e4",
                        "surface-container-highest": "#e2e2e2",
                        "surface-dim": "#dadada",
                        "secondary-container": "#dce2f3",
                        "primary": "#000000",
                        "surface-tint": "#575e70"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "xs": "8px",
                        "xl": "64px",
                        "gutter": "16px",
                        "lg": "40px",
                        "md": "24px",
                        "margin-mobile": "20px",
                        "sm": "16px",
                        "margin-desktop": "60px",
                        "base": "4px"
                    },
                    "fontFamily": {
                        "headline-lg-mobile": ["Geist"],
                        "label-md": ["Geist"],
                        "headline-md": ["Geist"],
                        "headline-lg": ["Geist"],
                        "label-sm": ["Geist"],
                        "body-md": ["Geist"],
                        "display": ["Geist"],
                        "body-lg": ["Geist"]
                    },
                    "fontSize": {
                        "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "headline-md": ["20px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "400"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "display": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Geist', sans-serif; }
        .masonry-grid {
            column-count: 1;
            column-gap: 16px;
        }
        @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
        @media (min-width: 1440px) { .masonry-grid { column-count: 4; } }
        
        .masonry-item {
            break-inside: avoid;
            margin-bottom: 16px;
        }

        .glass-nav {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .card-hover {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
            transform: scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.04);
        }
    </style>
</head>
<body class="bg-surface text-on-surface selection:bg-primary-fixed selection:text-primary">
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl transition-all duration-500 ease-in-out">
<div class="flex justify-between items-center px-margin-desktop py-md max-w-[1440px] mx-auto">
<div class="flex items-center gap-xl">
<span class="font-display text-display text-on-surface tracking-tighter">Unidrop</span>
</div>
<div class="flex-1 max-w-2xl mx-xl relative group">
<div class="absolute inset-y-0 left-md flex items-center pointer-events-none text-outline">
<span class="material-symbols-outlined">search</span>
</div>
<input class="w-full bg-surface-container-low border-none rounded-full py-sm pl-xl pr-md font-body-md text-on-surface focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant" placeholder="Search or paste anything..." type="text"/>
</div>
<div class="flex items-center gap-md">
<button class="flex items-center gap-xs text-on-surface-variant hover:opacity-70 transition-opacity duration-300">
<span class="material-symbols-outlined" data-icon="add">add</span>
</button>
<div class="w-8 h-8 rounded-full bg-secondary-container overflow-hidden">
<img alt="User" class="w-full h-full object-cover" src="[https://lh3.googleusercontent.com/aida-public/AB6AXuDBnMG6fDfzKHD0XMEBJ_rb6xE_RQbjq3Tb2Wfz5EgO3XlBOjrVl4t4wEFxs3ZJpFlQb3AoZpf_zv7J_uZ9kSg3Il1HzEs8aNRrsVJzVxUThpftkPwWzcrC-sqj7Y9dGTYkgkHOWE8ZQT2ylLBbVRfdrFf6P7ePWY97InyKb7Fx6_lw_e1Q9Gdy4yuHSIKzAKxpaMOgMLGLIc-k2DH_2AOOVrClAUosMgN0OJe7vHE4SIQXcPw7_T5BC-8POiM-tS3NzSuCNHseL9_F](https://lh3.googleusercontent.com/aida-public/AB6AXuDBnMG6fDfzKHD0XMEBJ_rb6xE_RQbjq3Tb2Wfz5EgO3XlBOjrVl4t4wEFxs3ZJpFlQb3AoZpf_zv7J_uZ9kSg3Il1HzEs8aNRrsVJzVxUThpftkPwWzcrC-sqj7Y9dGTYkgkHOWE8ZQT2ylLBbVRfdrFf6P7ePWY97InyKb7Fx6_lw_e1Q9Gdy4yuHSIKzAKxpaMOgMLGLIc-k2DH_2AOOVrClAUosMgN0OJe7vHE4SIQXcPw7_T5BC-8POiM-tS3NzSuCNHseL9_F)"/>
</div>
</div>
</div>
</header>
<aside class="fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-low flex flex-col p-sm space-y-xs pt-32 hidden md:flex shadow-sm">
<div class="px-md mb-lg">
<h2 class="font-headline-md text-headline-md text-on-surface">Library</h2>
<p class="font-label-sm text-label-sm text-on-surface-variant">Organized by AI</p>
</div>
<nav class="space-y-base">
<a class="flex items-center gap-sm px-md py-sm bg-secondary-container text-on-secondary-container rounded-lg font-label-md text-label-md group transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="all_inclusive">all_inclusive</span>
<span>All Drops</span>
</a>
<a class="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md group transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span>Notes</span>
</a>
<a class="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md group transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="image">image</span>
<span>Images</span>
</a>
<a class="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md group transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="link">link</span>
<span>Links</span>
</a>
<a class="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md group transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="archive">archive</span>
<span>Archive</span>
</a>
</nav>
<div class="mt-auto p-md">
<button class="w-full py-sm px-md bg-primary text-on-primary rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity">
                New Collection
            </button>
</div>
</aside>
<main class="md:ml-64 pt-32 px-margin-mobile md:px-margin-desktop pb-xl">
<div class="max-w-[1440px] mx-auto">
<div class="flex gap-sm mb-lg overflow-x-auto no-scrollbar">
<span class="px-md py-xs bg-primary text-on-primary rounded-full font-label-sm text-label-sm whitespace-nowrap cursor-pointer">Everything</span>
<span class="px-md py-xs bg-surface-container-highest text-on-surface-variant rounded-full font-label-sm text-label-sm whitespace-nowrap cursor-pointer hover:bg-surface-variant transition-colors">Recently Added</span>
<span class="px-md py-xs bg-surface-container-highest text-on-surface-variant rounded-full font-label-sm text-label-sm whitespace-nowrap cursor-pointer hover:bg-surface-variant transition-colors">Design Resources</span>
<span class="px-md py-xs bg-surface-container-highest text-on-surface-variant rounded-full font-label-sm text-label-sm whitespace-nowrap cursor-pointer hover:bg-surface-variant transition-colors">Reading List</span>
</div>
<div class="masonry-grid">
<div class="masonry-item">
<div class="card-hover relative group bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden cursor-zoom-in">
<img class="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" data-alt="A high-end architectural photograph of a minimalist white concrete building against a clear blue sky. The composition highlights sharp geometric shadows and clean lines, embodying an ultra-modern aesthetic. The lighting is bright and natural, creating a serene and expansive atmosphere that reflects a premium design philosophy." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuBoVvmWdP4P4eHN3PAcohuh4MxoJwnkGMSjZvZ7e780XxHD3Ff3K9IkcNONTfn3xc62MpoeiRY43UP6tiIlrkhZbeuY9cyHwaqkBJmADM9BPS6LJ98js6oPJipD6PPwgCGjr0WxitXadyHS6qANHKgaSwCyrpi4mU4n_x7Ew7VDtkjblXGWw3XgTW8L9oK1BfaTxZ3La43W8BvAs9lbf3rSgNIWs6kltDxIdneNXjjOEiIS4ie7YZWUkF173ybOQu3-t_U3SEkQNNKz](https://lh3.googleusercontent.com/aida-public/AB6AXuBoVvmWdP4P4eHN3PAcohuh4MxoJwnkGMSjZvZ7e780XxHD3Ff3K9IkcNONTfn3xc62MpoeiRY43UP6tiIlrkhZbeuY9cyHwaqkBJmADM9BPS6LJ98js6oPJipD6PPwgCGjr0WxitXadyHS6qANHKgaSwCyrpi4mU4n_x7Ew7VDtkjblXGWw3XgTW8L9oK1BfaTxZ3La43W8BvAs9lbf3rSgNIWs6kltDxIdneNXjjOEiIS4ie7YZWUkF173ybOQu3-t_U3SEkQNNKz)"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-md">
<p class="text-white font-label-md text-label-md">Minimalism in Arch</p>
<span class="text-white/70 font-label-sm text-label-sm">Inspiration</span>
</div>
</div>
</div>
<div class="masonry-item">
<div class="card-hover p-md bg-surface-container-lowest border border-outline-variant/10 rounded-xl">
<div class="flex items-center gap-xs mb-sm">
<span class="material-symbols-outlined text-primary text-[18px]" data-icon="description">description</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Note • 2h ago</span>
</div>
<p class="font-headline-lg text-headline-lg tracking-tight mb-md">Architecture is a visual art, and the buildings speak for themselves.</p>
<div class="flex flex-wrap gap-xs">
<span class="px-xs py-[2px] bg-surface-container text-on-surface-variant rounded text-[10px] uppercase font-bold tracking-wider">Design</span>
<span class="px-xs py-[2px] bg-surface-container text-on-surface-variant rounded text-[10px] uppercase font-bold tracking-wider">Quotes</span>
</div>
</div>
</div>
<div class="masonry-item">
<div class="card-hover bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden group">
<div class="aspect-video overflow-hidden">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A sophisticated digital rendering of abstract 3D fluid shapes in shades of deep charcoal and soft silver. The texture appears velvety and metallic under soft studio lighting, creating a luxurious and high-tech feel. The background is a clean, neutral grey, maintaining the minimalist gallery aesthetic of the interface." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuAdH6abTWQ7pUEm7pVfhOM-0xRmRoc3asvFDuzguQWm9gQQ0uEm58T4dqU4WFZj3m3gL6ui8mBucpgHPu1Ars_OMVAIwyafCn-6fWnKfNGdQ2yCCNGbZOjglWM4c6bSvYqRgZsmF9zUv3h_nPXwi4k0bDFcMx_dc-dA2RAGWbbTFSNpUw1U6QhAZdiXFZ0WRfs3TmFQqnr1YNDtcFxMMKDtuTMlc2nCnTDYviPsxWuYs-6iTkqGLJD-3IYk28ROtPjj-WEp6yjRWA-7](https://lh3.googleusercontent.com/aida-public/AB6AXuAdH6abTWQ7pUEm7pVfhOM-0xRmRoc3asvFDuzguQWm9gQQ0uEm58T4dqU4WFZj3m3gL6ui8mBucpgHPu1Ars_OMVAIwyafCn-6fWnKfNGdQ2yCCNGbZOjglWM4c6bSvYqRgZsmF9zUv3h_nPXwi4k0bDFcMx_dc-dA2RAGWbbTFSNpUw1U6QhAZdiXFZ0WRfs3TmFQqnr1YNDtcFxMMKDtuTMlc2nCnTDYviPsxWuYs-6iTkqGLJD-3IYk28ROtPjj-WEp6yjRWA-7)"/>
</div>
<div class="p-md">
<div class="flex items-center gap-xs mb-xs">
<span class="material-symbols-outlined text-primary text-[16px]" data-icon="link">link</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">linear.app</span>
</div>
<h3 class="font-headline-md text-headline-md mb-xs">The secret to better software is better tools</h3>
<p class="font-body-md text-body-md text-on-surface-variant line-clamp-2">A guide to modern product management and how we build at Linear.</p>
</div>
</div>
</div>
<div class="masonry-item">
<div class="card-hover relative group bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden">
<img class="w-full h-auto object-cover" data-alt="A clean, minimalist interior shot of a single designer lamp casting a soft warm glow on a white wall in a dimly lit room. The composition is extremely simple, focusing on the interplay of light and shadow. The mood is calm and contemplative, fitting for a sophisticated workspace or library application." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuDCcbVZOB3NkjZcyJRhh9gnMg_rGUeflo-A6_mDqxgOhtfYB-d1G5gtJs_zL8UJKH8w59PAnYATk_r2ue0US4HaVa-o-U8gl0DTa-S1ZspbWdElPEUz0bs9wjYE9rnZt4rtFAnSZKciDtmKzrBzQiPpu38-Vwz1LRiLX15M9kZXEvDWcczR868CykTFk-mfcm1v-7EPj1FJ1d2gCJ5rKiVll9dBQTr3qam5X7jgcIUIDA8rg49uGanGcJkjvB5YZoVc_Q6tlTwSh15p](https://lh3.googleusercontent.com/aida-public/AB6AXuDCcbVZOB3NkjZcyJRhh9gnMg_rGUeflo-A6_mDqxgOhtfYB-d1G5gtJs_zL8UJKH8w59PAnYATk_r2ue0US4HaVa-o-U8gl0DTa-S1ZspbWdElPEUz0bs9wjYE9rnZt4rtFAnSZKciDtmKzrBzQiPpu38-Vwz1LRiLX15M9kZXEvDWcczR868CykTFk-mfcm1v-7EPj1FJ1d2gCJ5rKiVll9dBQTr3qam5X7jgcIUIDA8rg49uGanGcJkjvB5YZoVc_Q6tlTwSh15p)"/>
<div class="absolute top-md right-md">
<span class="material-symbols-outlined text-white drop-shadow-md" data-icon="favorite" data-weight="fill" style="font-variation-settings: 'FILL' 1;">favorite</span>
</div>
</div>
</div>
<div class="masonry-item">
<div class="card-hover p-md bg-secondary-container/30 border border-secondary-container/50 rounded-xl">
<p class="font-body-lg text-body-lg italic">"Simplicity is the ultimate sophistication." — Leonardo da Vinci</p>
</div>
</div>
<div class="masonry-item">
<div class="card-hover bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden group">
<div class="p-lg">
<span class="material-symbols-outlined text-primary text-[32px] mb-md" data-icon="language">language</span>
<h3 class="font-display text-display text-[28px] mb-md">The Future of Invisible User Interfaces</h3>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-xl">Exploring how AI-driven experiences are removing the friction between thought and action.</p>
<div class="flex items-center justify-between">
<div class="flex -space-x-2">
<div class="w-6 h-6 rounded-full border-2 border-surface bg-gray-200"></div>
<div class="w-6 h-6 rounded-full border-2 border-surface bg-gray-300"></div>
</div>
<span class="font-label-sm text-label-sm text-on-tertiary-container">Shared with 2 teams</span>
</div>
</div>
</div>
</div>
<div class="masonry-item">
<div class="card-hover relative group bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden">
<img class="w-full h-auto object-cover" data-alt="A towering glass and steel skyscraper reflecting a dramatic sunset sky with hues of deep orange and indigo. The sharp perspective looking up creates a sense of immense scale and modern ambition. The overall visual style is sleek and corporate, with a focus on high-contrast lighting and industrial textures." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuCM6vZPu-fUttHUddnYxSLyrXK0PgTACU0vXHopR2rR_yg_rFWLaSMMEDhKbbT8NPdzO9Z34VXH6bazH8c9wciEfItwt4VFslptZS8pJ6cDxbES8b-9YQS-XtoNMs0y_ZeNxWQXNQKlCH8XbhnDXCnddv6XIcbnNKkBc86n48umTa-8nUxezPEEQJvBDWMmhu5vsNVJjDojdzvzuamPg96wXySoRBGl62Mj3TpBU-FqDv8jQVS0Bj5K1T32BU5BUn9FU6XBp72rgXBA](https://lh3.googleusercontent.com/aida-public/AB6AXuCM6vZPu-fUttHUddnYxSLyrXK0PgTACU0vXHopR2rR_yg_rFWLaSMMEDhKbbT8NPdzO9Z34VXH6bazH8c9wciEfItwt4VFslptZS8pJ6cDxbES8b-9YQS-XtoNMs0y_ZeNxWQXNQKlCH8XbhnDXCnddv6XIcbnNKkBc86n48umTa-8nUxezPEEQJvBDWMmhu5vsNVJjDojdzvzuamPg96wXySoRBGl62Mj3TpBU-FqDv8jQVS0Bj5K1T32BU5BUn9FU6XBp72rgXBA)"/>
</div>
</div>
<div class="masonry-item">
<div class="card-hover p-md bg-surface-container-low border border-outline-variant/10 rounded-xl">
<div class="flex items-center justify-between mb-md">
<span class="font-label-md text-label-md">Checklist</span>
<span class="material-symbols-outlined text-outline text-[20px]" data-icon="more_horiz">more_horiz</span>
</div>
<ul class="space-y-sm">
<li class="flex items-center gap-sm">
<div class="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center bg-primary">
<span class="material-symbols-outlined text-white text-[14px]">check</span>
</div>
<span class="font-body-md text-body-md text-on-surface/50 line-through">Buy domain for archive</span>
</li>
<li class="flex items-center gap-sm">
<div class="w-5 h-5 rounded-full border-2 border-outline transition-colors hover:border-primary"></div>
<span class="font-body-md text-body-md">Refine masonry logic</span>
</li>
<li class="flex items-center gap-sm">
<div class="w-5 h-5 rounded-full border-2 border-outline transition-colors hover:border-primary"></div>
<span class="font-body-md text-body-md">Export assets for developer handoff</span>
</li>
</ul>
</div>
</div>
</div>
</div>
</main>
<button class="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform active:scale-95 z-50">
<span class="material-symbols-outlined text-[28px] transition-transform duration-500 group-hover:rotate-90" data-icon="add">add</span>
</button>
<nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-xl flex justify-around py-sm px-md z-50">
<a class="flex flex-col items-center gap-1 text-primary" href="#">
<span class="material-symbols-outlined" data-icon="all_inclusive">all_inclusive</span>
<span class="text-[10px] font-medium">Drops</span>
</a>
<a class="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="search">search</span>
<span class="text-[10px] font-medium">Search</span>
</a>
<a class="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span class="text-[10px] font-medium">Notes</span>
</a>
<a class="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="text-[10px] font-medium">Profile</span>
</a>
</nav>
<script>
        // Micro-interaction: Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 20) {
                header.classList.add('shadow-sm', 'py-sm');
                header.classList.remove('py-md');
            } else {
                header.classList.remove('shadow-sm', 'py-sm');
                header.classList.add('py-md');
            }
        });

        // Search bar activation simulation
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('scale-[1.01]');
        });
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('scale-[1.01]');
        });

        // Dynamic Masonry Item interactions
        document.querySelectorAll('.card-hover').forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Subtle lift handled by CSS
            });
        });
    </script>
</body></html>

```

### 2.3 Notes Archive

```html
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Zenith Archive | Notes</title>
<script src="[https://cdn.tailwindcss.com?plugins=forms,container-queries](https://cdn.tailwindcss.com?plugins=forms,container-queries)"></script>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<link href="[https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist.css](https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist.css)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-fixed": "#dce2f7",
                        "outline-variant": "#c6c6cd",
                        "on-tertiary-container": "#828486",
                        "surface": "#f9f9f9",
                        "primary-fixed-dim": "#c0c6db",
                        "on-surface-variant": "#45464c",
                        "on-surface": "#1a1c1c",
                        "tertiary-container": "#191c1e",
                        "primary-container": "#141b2b",
                        "on-secondary-fixed-variant": "#404754",
                        "on-secondary": "#ffffff",
                        "surface-container": "#eeeeee",
                        "secondary": "#585f6c",
                        "on-tertiary-fixed": "#191c1e",
                        "on-primary-fixed": "#141b2b",
                        "surface-bright": "#f9f9f9",
                        "secondary-fixed": "#dce2f3",
                        "error": "#ba1a1a",
                        "on-secondary-container": "#5e6572",
                        "outline": "#76777d",
                        "tertiary-fixed-dim": "#c5c6c8",
                        "on-secondary-fixed": "#151c27",
                        "surface-container-high": "#e8e8e8",
                        "surface-container-lowest": "#ffffff",
                        "on-error": "#ffffff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed-variant": "#404758",
                        "on-tertiary": "#ffffff",
                        "inverse-surface": "#2f3131",
                        "surface-variant": "#e2e2e2",
                        "on-primary": "#ffffff",
                        "secondary-fixed-dim": "#c0c7d6",
                        "tertiary": "#000000",
                        "on-error-container": "#93000a",
                        "on-background": "#1a1c1c",
                        "inverse-primary": "#c0c6db",
                        "on-tertiary-fixed-variant": "#444749",
                        "on-primary-container": "#7d8497",
                        "background": "#f9f9f9",
                        "surface-container-low": "#f3f3f4",
                        "inverse-on-surface": "#f0f1f1",
                        "tertiary-fixed": "#e1e2e4",
                        "surface-container-highest": "#e2e2e2",
                        "surface-dim": "#dadada",
                        "secondary-container": "#dce2f3",
                        "primary": "#000000",
                        "surface-tint": "#575e70"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "xs": "8px",
                        "xl": "64px",
                        "gutter": "16px",
                        "lg": "40px",
                        "md": "24px",
                        "margin-mobile": "20px",
                        "sm": "16px",
                        "margin-desktop": "60px",
                        "base": "4px"
                    },
                    "fontFamily": {
                        "headline-lg-mobile": ["Geist"],
                        "label-md": ["Geist"],
                        "headline-md": ["Geist"],
                        "headline-lg": ["Geist"],
                        "label-sm": ["Geist"],
                        "body-md": ["Geist"],
                        "display": ["Geist"],
                        "body-lg": ["Geist"]
                    },
                    "fontSize": {
                        "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "headline-md": ["20px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "400"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "display": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Geist', sans-serif;
            background-color: #f9f9f9;
        }
        .masonry-container {
            column-count: 1;
            column-gap: 16px;
        }
        @media (min-width: 768px) { .masonry-container { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-container { column-count: 3; } }
        @media (min-width: 1440px) { .masonry-container { column-count: 4; } }
        
        .masonry-item {
            break-inside: avoid;
            margin-bottom: 16px;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .masonry-item:hover {
            transform: scale(1.02);
            box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
            z-index: 10;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
    </style>
</head>
<body class="bg-surface text-on-surface antialiased">
<nav class="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl flex justify-between items-center px-margin-desktop py-md max-w-[1440px] left-1/2 -translate-x-1/2">
<div class="flex items-center gap-md">
<span class="font-display text-display text-on-surface dark:text-surface-bright tracking-tighter">Unidrop</span>
</div>
<div class="hidden md:flex items-center space-x-lg">
<div class="relative group">
<input class="bg-surface-container-low border-none rounded-full px-md py-xs w-64 focus:ring-1 focus:ring-primary transition-all duration-300 font-body-md text-body-md" placeholder="Search archives..." type="text"/>
<span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50">search</span>
</div>
<div class="flex items-center space-x-md">
<button class="hover:opacity-70 transition-opacity duration-300">
<span class="material-symbols-outlined text-primary" data-icon="add">add</span>
</button>
<button class="hover:opacity-70 transition-opacity duration-300">
<span class="material-symbols-outlined text-primary" data-icon="search">search</span>
</button>
</div>
</div>
</nav>
<aside class="fixed left-0 top-0 h-full w-64 z-40 bg-surface dark:bg-inverse-surface shadow-sm flex flex-col p-sm space-y-xs hidden md:flex">
<div class="px-md pt-xl pb-lg">
<h2 class="font-headline-md text-headline-md text-on-surface">Library</h2>
<p class="font-label-sm text-label-sm text-on-surface-variant">Organized by AI</p>
</div>
<nav class="flex-1 space-y-base">
<a class="flex items-center space-x-sm px-md py-sm text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg group" href="#">
<span class="material-symbols-outlined" data-icon="all_inclusive">all_inclusive</span>
<span class="font-label-md text-label-md">All Drops</span>
</a>
<a class="flex items-center space-x-sm px-md py-sm bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-lg font-medium" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span class="font-label-md text-label-md">Notes</span>
</a>
<a class="flex items-center space-x-sm px-md py-sm text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg group" href="#">
<span class="material-symbols-outlined" data-icon="image">image</span>
<span class="font-label-md text-label-md">Images</span>
</a>
<a class="flex items-center space-x-sm px-md py-sm text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg group" href="#">
<span class="material-symbols-outlined" data-icon="link">link</span>
<span class="font-label-md text-label-md">Links</span>
</a>
<a class="flex items-center space-x-sm px-md py-sm text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg group" href="#">
<span class="material-symbols-outlined" data-icon="archive">archive</span>
<span class="font-label-md text-label-md">Archive</span>
</a>
</nav>
<div class="mt-auto px-sm pb-md">
<button class="w-full bg-primary text-on-primary py-sm rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity">
                New Collection
            </button>
</div>
</aside>
<main class="md:ml-64 pt-xl min-h-screen px-margin-mobile md:px-margin-desktop">
<header class="py-xl max-w-[1200px] mx-auto">
<div class="flex items-end justify-between">
<div>
<h1 class="font-display text-display text-on-surface mb-xs">Notes</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Your digital subconscious, captured as text-based memes and ephemeral thoughts.</p>
</div>
<div class="hidden lg:block">
<div class="flex -space-x-xs">
<div class="h-8 w-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">AI</div>
<div class="h-8 w-8 rounded-full border-2 border-surface bg-primary text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-sm" style="font-size: 14px;">auto_awesome</span>
</div>
</div>
</div>
</div>
</header>
<div class="masonry-container max-w-[1200px] mx-auto pb-xl">
<div class="masonry-item p-md rounded-xl bg-[#f0f4f9] border border-outline-variant/20">
<p class="font-headline-lg text-headline-lg text-primary mb-md">Reality is just a collective hallucination with better resolution.</p>
<div class="flex items-center justify-between mt-sm opacity-50">
<span class="font-label-sm text-label-sm">#philosophy</span>
<span class="material-symbols-outlined text-sm" style="font-size: 16px;">sentiment_satisfied</span>
</div>
</div>
<div class="masonry-item p-md rounded-xl bg-surface-container-low border border-outline-variant/20">
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    The way we interact with information is changing. We no longer seek data; we seek patterns that resonate with our internal state. This archive serves as a mirror for those patterns, reflecting back the subtle shifts in our attention and focus over time.
                </p>
<div class="flex items-center justify-between mt-lg opacity-40">
<span class="font-label-sm text-label-sm">#meta-thought</span>
<span class="material-symbols-outlined text-sm" style="font-size: 16px;">monitoring</span>
</div>
</div>
<div class="masonry-item p-md rounded-xl bg-[#faf7f2] border border-outline-variant/20">
<p class="font-headline-md text-headline-md text-primary mb-sm italic">"The invisible is the real architecture of the visible."</p>
<div class="flex items-center justify-between mt-sm opacity-50">
<span class="font-label-sm text-label-sm">#quotes</span>
<span class="material-symbols-outlined text-sm" style="font-size: 16px;">lightbulb</span>
</div>
</div>
<div class="masonry-item p-md rounded-xl bg-[#eff6ff] border border-outline-variant/20">
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    If we treat every digital interaction as a "drop" in the ocean of our memory, the interface must be the calm surface that allows us to see clearly. Zenith is built on this principle of transparency.
                </p>
<div class="flex items-center justify-between mt-md opacity-40">
<span class="font-label-sm text-label-sm">#design-logic</span>
<span class="material-symbols-outlined text-sm" style="font-size: 16px;">visibility</span>
</div>
</div>
<div class="masonry-item p-md rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
<p class="font-display text-headline-lg-mobile text-primary tracking-tight">Simplicity is the ultimate sophistication.</p>
<div class="flex items-center justify-between mt-md">
<span class="px-xs py-[2px] bg-primary text-on-primary rounded-full font-label-sm text-[10px]">VERIFIED</span>
<span class="material-symbols-outlined text-sm" style="font-size: 16px;">check_circle</span>
</div>
</div>
<div class="masonry-item p-md rounded-xl bg-[#fdfaf2] border border-outline-variant/20">
<p class="font-body-lg text-body-lg text-primary font-medium mb-xs">Forget the noise. Focus on the signal.</p>
<p class="font-body-md text-body-md text-on-surface-variant">The hardest part of modern living is selective ignorance.</p>
<div class="flex items-center justify-between mt-md opacity-50">
<span class="font-label-sm text-label-sm">#productivity</span>
<span class="material-symbols-outlined text-sm" style="font-size: 16px;">graphic_eq</span>
</div>
</div>
<div class="masonry-item p-md rounded-xl bg-[#f5f7fa] border border-outline-variant/20">
<p class="font-body-md text-body-md text-on-surface-variant">
                    Why do we keep notes? Not to remember everything, but to have the permission to forget. Once it's captured here, your brain can release the tension of holding onto it.
                </p>
<div class="flex items-center justify-between mt-md opacity-40">
<span class="font-label-sm text-label-sm">#psychology</span>
<span class="material-symbols-outlined text-sm" style="font-size: 16px;">psychology</span>
</div>
</div>
<div class="masonry-item p-md rounded-xl bg-inverse-surface border border-outline-variant/20">
<p class="font-display text-headline-lg-mobile text-on-primary tracking-tighter uppercase italic">Stay Hungry.</p>
<div class="flex items-center justify-between mt-md opacity-70">
<span class="font-label-sm text-label-sm text-surface-variant">#mantra</span>
<span class="material-symbols-outlined text-on-primary text-sm" style="font-size: 16px;">bolt</span>
</div>
</div>
<div class="masonry-item p-md rounded-xl bg-surface-container border border-outline-variant/20">
<p class="font-body-md text-body-md text-on-surface">The space between thoughts is where the real answers hide. We just need to stop talking long enough to hear them.</p>
<div class="mt-md pt-sm border-t border-outline-variant/10">
<span class="font-label-sm text-label-sm text-on-surface-variant">Dec 12, 2023 • 2:44 PM</span>
</div>
</div>
</div>
</main>
<nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg border-t border-outline-variant/10 flex justify-around items-center py-sm z-50">
<a class="flex flex-col items-center space-y-base text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="all_inclusive">all_inclusive</span>
<span class="text-[10px] font-label-md">Drops</span>
</a>
<a class="flex flex-col items-center space-y-base text-primary" href="#">
<span class="material-symbols-outlined" data-icon="description" style="font-variation-settings: 'FILL' 1;">description</span>
<span class="text-[10px] font-label-md">Notes</span>
</a>
<a class="flex flex-col items-center space-y-base text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="image">image</span>
<span class="text-[10px] font-label-md">Gallery</span>
</a>
<a class="flex flex-col items-center space-y-base text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="archive">archive</span>
<span class="text-[10px] font-label-md">Archived</span>
</a>
</nav>
<script>
        // Simple micro-interaction for the search bar expansion if desired
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.addEventListener('focus', () => {
                searchInput.classList.add('w-80');
            });
            searchInput.addEventListener('blur', () => {
                searchInput.classList.remove('w-80');
            });
        }

        // Add a subtle parallax-ish effect to the masonry cards on scroll
        window.addEventListener('scroll', () => {
            const items = document.querySelectorAll('.masonry-item');
            const scrolled = window.pageYOffset;
            items.forEach((item, index) => {
                const speed = 0.05 + (index % 3) * 0.02;
                const yPos = -(scrolled * speed);
                // Subtle lift only
                // item.style.transform = `translateY(${yPos}px)`;
            });
        });
    </script>
</body></html>

```

### 2.4 AI Collections Overview

```html
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Zenith Archive - Collections</title>
<script src="[https://cdn.tailwindcss.com?plugins=forms,container-queries](https://cdn.tailwindcss.com?plugins=forms,container-queries)"></script>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap](https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-fixed": "#dce2f7",
                        "outline-variant": "#c6c6cd",
                        "on-tertiary-container": "#828486",
                        "surface": "#f9f9f9",
                        "primary-fixed-dim": "#c0c6db",
                        "on-surface-variant": "#45464c",
                        "on-surface": "#1a1c1c",
                        "tertiary-container": "#191c1e",
                        "primary-container": "#141b2b",
                        "on-secondary-fixed-variant": "#404754",
                        "on-secondary": "#ffffff",
                        "surface-container": "#eeeeee",
                        "secondary": "#585f6c",
                        "on-tertiary-fixed": "#191c1e",
                        "on-primary-fixed": "#141b2b",
                        "surface-bright": "#f9f9f9",
                        "secondary-fixed": "#dce2f3",
                        "error": "#ba1a1a",
                        "on-secondary-container": "#5e6572",
                        "outline": "#76777d",
                        "tertiary-fixed-dim": "#c5c6c8",
                        "on-secondary-fixed": "#151c27",
                        "surface-container-high": "#e8e8e8",
                        "surface-container-lowest": "#ffffff",
                        "on-error": "#ffffff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed-variant": "#404758",
                        "on-tertiary": "#ffffff",
                        "inverse-surface": "#2f3131",
                        "surface-variant": "#e2e2e2",
                        "on-primary": "#ffffff",
                        "secondary-fixed-dim": "#c0c7d6",
                        "tertiary": "#000000",
                        "on-error-container": "#93000a",
                        "on-background": "#1a1c1c",
                        "inverse-primary": "#c0c6db",
                        "on-tertiary-fixed-variant": "#444749",
                        "on-primary-container": "#7d8497",
                        "background": "#f9f9f9",
                        "surface-container-low": "#f3f3f4",
                        "inverse-on-surface": "#f0f1f1",
                        "tertiary-fixed": "#e1e2e4",
                        "surface-container-highest": "#e2e2e2",
                        "surface-dim": "#dadada",
                        "secondary-container": "#dce2f3",
                        "primary": "#000000",
                        "surface-tint": "#575e70"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "xs": "8px",
                        "xl": "64px",
                        "gutter": "16px",
                        "lg": "40px",
                        "md": "24px",
                        "margin-mobile": "20px",
                        "sm": "16px",
                        "margin-desktop": "60px",
                        "base": "4px"
                    },
                    "fontFamily": {
                        "headline-lg-mobile": ["Geist"],
                        "label-md": ["Geist"],
                        "headline-md": ["Geist"],
                        "headline-lg": ["Geist"],
                        "label-sm": ["Geist"],
                        "body-md": ["Geist"],
                        "display": ["Geist"],
                        "body-lg": ["Geist"]
                    },
                    "fontSize": {
                        "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "headline-md": ["20px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "400"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "display": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        body { background-color: #f9f9f9; color: #1a1c1c; -webkit-font-smoothing: antialiased; }
        .masonry-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px; }
        .glass-blur { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .transition-premium { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; vertical-align: middle; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05); }
    </style>
</head>
<body class="font-body-md text-body-md overflow-x-hidden">
<header class="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl transition-all duration-500 ease-in-out">
<div class="flex justify-between items-center px-margin-desktop py-md max-w-[1440px] mx-auto">
<div class="font-display text-display text-on-surface dark:text-surface-bright tracking-tighter">Unidrop</div>
<div class="flex items-center space-x-lg">
<div class="hidden md:flex items-center space-x-md">
<span class="font-body-md text-body-md text-on-surface-variant dark:text-on-primary-container hover:opacity-70 transition-opacity duration-300 cursor-pointer">Archive</span>
<span class="font-body-md text-body-md text-primary dark:text-on-primary font-medium hover:opacity-70 transition-opacity duration-300 cursor-pointer">Collections</span>
</div>
<div class="flex items-center space-x-sm">
<button class="p-base text-on-surface hover:opacity-70 transition-opacity duration-300">
<span class="material-symbols-outlined" data-icon="search">search</span>
</button>
<button class="p-base text-on-surface hover:opacity-70 transition-opacity duration-300">
<span class="material-symbols-outlined" data-icon="add">add</span>
</button>
</div>
</div>
</div>
</header>
<nav class="fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-low dark:bg-tertiary-container flex flex-col p-sm space-y-xs shadow-sm hidden md:flex pt-32">
<div class="px-sm mb-lg">
<h2 class="font-headline-md text-headline-md text-on-surface">Library</h2>
<p class="text-label-sm font-label-sm text-on-surface-variant opacity-60">Organized by AI</p>
</div>
<div class="flex flex-col space-y-base">
<a class="flex items-center space-x-sm px-sm py-xs text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="all_inclusive">all_inclusive</span>
<span class="font-label-md text-label-md">All Drops</span>
</a>
<a class="flex items-center space-x-sm px-sm py-xs bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="folder_copy">folder_copy</span>
<span class="font-label-md text-label-md">Collections</span>
</a>
<a class="flex items-center space-x-sm px-sm py-xs text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span class="font-label-md text-label-md">Notes</span>
</a>
<a class="flex items-center space-x-sm px-sm py-xs text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="image">image</span>
<span class="font-label-md text-label-md">Images</span>
</a>
<a class="flex items-center space-x-sm px-sm py-xs text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="link">link</span>
<span class="font-label-md text-label-md">Links</span>
</a>
<a class="flex items-center space-x-sm px-sm py-xs text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-variant dark:hover:bg-on-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="archive">archive</span>
<span class="font-label-md text-label-md">Archive</span>
</a>
</div>
<div class="mt-auto px-sm pt-md border-t border-outline-variant/10">
<button class="w-full bg-primary text-on-primary py-sm rounded-full font-label-md text-label-md hover:opacity-90 transition-premium">
                New Collection
            </button>
</div>
</nav>
<main class="md:ml-64 pt-32 pb-xl px-margin-mobile md:px-margin-desktop min-h-screen">
<header class="mb-xl max-w-[1440px] mx-auto">
<div class="flex items-end justify-between">
<div>
<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tighter">Collections</h1>
<p class="text-on-surface-variant mt-xs opacity-70">Curated by AI intelligence from your recent drops.</p>
</div>
<div class="flex space-x-sm">
<span class="px-sm py-base bg-surface-container rounded-full text-label-sm font-label-sm cursor-pointer hover:bg-surface-variant transition-premium">Recent</span>
<span class="px-sm py-base text-label-sm font-label-sm cursor-pointer hover:opacity-60 transition-premium">A-Z</span>
</div>
</div>
</header>
<section class="masonry-grid max-w-[1440px] mx-auto">
<div class="group cursor-pointer transition-premium">
<div class="aspect-[4/5] bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden mb-sm relative card-hover transition-premium">
<div class="grid grid-cols-2 grid-rows-2 h-full gap-[2px] bg-surface-container">
<div class="overflow-hidden bg-surface-container-high">
<img alt="Architecture 1" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="A minimalist architectural detail of a modern concrete building with sharp shadows and clean lines. The lighting is bright and high-contrast, creating a serene and sophisticated atmosphere consistent with a luxury design aesthetic." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuCT823F4sgMy9X0MwlW6WxFjMuDgV1SmHKvOQMV97Xxowa4PzB8QaqbdK8geRvSkYwEf4MmnqTdOpAbT3bIgLggfrVgzUS-VsPfM4yUwh8Z4mWmyAYJR56_vU6q1i6SMFrRcYM5MSFd5ocYOB9SZKDRo50zUBS0pnBeiAOTH0ZCiavM7-0Mu0ABkqh921ehjpWflNyzYX5ZUinI0Kij92QG4e-vOh9FcS0QIEv0mCnaCLvFBF78Ag_IsZzHJTAPrkkhgLWI_3XIoDqs](https://lh3.googleusercontent.com/aida-public/AB6AXuCT823F4sgMy9X0MwlW6WxFjMuDgV1SmHKvOQMV97Xxowa4PzB8QaqbdK8geRvSkYwEf4MmnqTdOpAbT3bIgLggfrVgzUS-VsPfM4yUwh8Z4mWmyAYJR56_vU6q1i6SMFrRcYM5MSFd5ocYOB9SZKDRo50zUBS0pnBeiAOTH0ZCiavM7-0Mu0ABkqh921ehjpWflNyzYX5ZUinI0Kij92QG4e-vOh9FcS0QIEv0mCnaCLvFBF78Ag_IsZzHJTAPrkkhgLWI_3XIoDqs)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Architecture 2" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="Close-up of a spiral staircase in a minimalist white interior, showcasing organic curves and soft lighting. The visual style is airy and clean, emphasizing spatial clarity and high-end architectural design." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuC8aLSislz6jPJjVaOV7w7Ke_ZqeGDCK4ySB63RMP4qQiS-BxYj2vLxUiNx2YuLAxoPyQuAjFIjJe-M3oFgwv0f0d3Pldi8cmileJkjlYp9fXVgdJAdhTkwdLcz3yMHRarQQpb6Mwx4h_DfaH5_FDQR_74ZS5GCPG8JSzMUhIB_mw-286Gv8Fb_s3yp39HvS7P-u0Q7ZZz7EaNzdf97TJd0kf7XhJsj5-3wPmtyWKaer-56bRyY_1EEfCwuDqBrxxRPgn_L90jCkQEP](https://lh3.googleusercontent.com/aida-public/AB6AXuC8aLSislz6jPJjVaOV7w7Ke_ZqeGDCK4ySB63RMP4qQiS-BxYj2vLxUiNx2YuLAxoPyQuAjFIjJe-M3oFgwv0f0d3Pldi8cmileJkjlYp9fXVgdJAdhTkwdLcz3yMHRarQQpb6Mwx4h_DfaH5_FDQR_74ZS5GCPG8JSzMUhIB_mw-286Gv8Fb_s3yp39HvS7P-u0Q7ZZz7EaNzdf97TJd0kf7XhJsj5-3wPmtyWKaer-56bRyY_1EEfCwuDqBrxxRPgn_L90jCkQEP)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Architecture 3" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="The exterior of a luxury modern villa with large glass panels and a minimalist garden. The scene is captured during golden hour, producing soft warm glows on the white surfaces, embodying a calm and wealthy lifestyle." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuBphktpnVmPJbOaBLWwkdAm4TiUnwPSXMJjUL9uLP4MxUg0zE8OnZqYqhmeYoM28koeOwhuPEHbcJtqWTnNYSxpr-kW8ugAQTKoUYHnT-Eoqyp0swqCTF2fYoDJg6hDKQq2bsWCVUjk7DsAz7pGrmEU1JQ2tP9X6RKZCXxM4nQUNJcIND0pHiKsgASDx2zFFjXKgUFe1oJgCXdcdudZ9ER5Cpn6aAlKbUJ8H2CZmWFadoLn1bsdY-aK9w9nZWfcDyZghpF5W5QJD3tT](https://lh3.googleusercontent.com/aida-public/AB6AXuBphktpnVmPJbOaBLWwkdAm4TiUnwPSXMJjUL9uLP4MxUg0zE8OnZqYqhmeYoM28koeOwhuPEHbcJtqWTnNYSxpr-kW8ugAQTKoUYHnT-Eoqyp0swqCTF2fYoDJg6hDKQq2bsWCVUjk7DsAz7pGrmEU1JQ2tP9X6RKZCXxM4nQUNJcIND0pHiKsgASDx2zFFjXKgUFe1oJgCXdcdudZ9ER5Cpn6aAlKbUJ8H2CZmWFadoLn1bsdY-aK9w9nZWfcDyZghpF5W5QJD3tT)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Architecture 4" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="An interior shot of a minimalist living room featuring high-end designer furniture and vast open space. The palette is monochromatic with rich textures, illuminated by natural diffused light coming from large floor-to-ceiling windows." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuDZK8Lr_hTOhFBsotALiLfe8sdcXd8Hs9TtvOu3NP8ZaP_eU9hWSEAx1oljjfvcSizyaSs80Bv1im4rCx_QQxzzQfUaPlHsx_6AcdfVL7wARdcO2pFCogYkFnuvgwuFds1csj6akzZOf31GBybLzKHh4khsYEiPC-8L3W3V-N7-Pu_CIyKDXHWqIRPDWR-ssD83sTe7XXZH0K-c72rN-oNtMU3rROl3DIZ6lBsJOZMPqC4DxqyKoZHhs8P7PLVW9yFfloVXxFsQttPh](https://lh3.googleusercontent.com/aida-public/AB6AXuDZK8Lr_hTOhFBsotALiLfe8sdcXd8Hs9TtvOu3NP8ZaP_eU9hWSEAx1oljjfvcSizyaSs80Bv1im4rCx_QQxzzQfUaPlHsx_6AcdfVL7wARdcO2pFCogYkFnuvgwuFds1csj6akzZOf31GBybLzKHh4khsYEiPC-8L3W3V-N7-Pu_CIyKDXHWqIRPDWR-ssD83sTe7XXZH0K-c72rN-oNtMU3rROl3DIZ6lBsJOZMPqC4DxqyKoZHhs8P7PLVW9yFfloVXxFsQttPh)"/>
</div>
</div>
</div>
<div class="px-base">
<h3 class="font-headline-md text-headline-md text-on-surface">Architecture Inspiration</h3>
<div class="flex items-center space-x-sm mt-base">
<span class="text-label-sm font-label-sm text-on-surface-variant">24 Items</span>
<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
<span class="text-label-sm font-label-sm text-on-surface-variant">Updated 2h ago</span>
</div>
</div>
</div>
<div class="group cursor-pointer transition-premium">
<div class="aspect-[4/5] bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden mb-sm relative card-hover transition-premium">
<div class="grid grid-cols-2 grid-rows-2 h-full gap-[2px] bg-surface-container">
<div class="overflow-hidden bg-surface-container-high">
<img alt="Tech 1" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="A high-tech laptop sitting on a clean desk, displaying lines of code. The environment is a professional, minimalist home office with cool blue and grey tones, creating a focused and technologically advanced mood." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuDYAsw4Qri1s4ijzQN1BKwE6p0jTbHSuFlOlvEUnTZ2UobORmqsW4z2HHmtPxgG9het9CITDsA5W6BBHVUW1kHuWj47ny_UZf4NVflhUrrz2btEkrCUX2Cr1frMZ5DEIVbi0weALkjNFSjcNAB97t1jKAiDXYzZriwCAYVx9379btX3Qgm1EJhP_n3z1Dremc9xddgv3QKRn0OSE9QhM6V6vsbz1ihWgBinn8wLIj-57D91tUWrUJcml9-nSS3nh9Vbc_Dcl3xlrvge](https://lh3.googleusercontent.com/aida-public/AB6AXuDYAsw4Qri1s4ijzQN1BKwE6p0jTbHSuFlOlvEUnTZ2UobORmqsW4z2HHmtPxgG9het9CITDsA5W6BBHVUW1kHuWj47ny_UZf4NVflhUrrz2btEkrCUX2Cr1frMZ5DEIVbi0weALkjNFSjcNAB97t1jKAiDXYzZriwCAYVx9379btX3Qgm1EJhP_n3z1Dremc9xddgv3QKRn0OSE9QhM6V6vsbz1ihWgBinn8wLIj-57D91tUWrUJcml9-nSS3nh9Vbc_Dcl3xlrvge)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Tech 2" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="Abstract macro shot of a sleek silver circuit board with glowing blue light paths. The visual style is futuristic and ultra-clean, representing high-end tech engineering and digital innovation in a minimalist archive style." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuBlDlxT5AVTMCXdPLomeUHEgUePJdwzVVYww7p17ogk2kkzO3lJi190fX5JZhEb3QXoJ2xn-w4qK33CRWWGMyDTQv8dV1yRS7hYRNYoBnk6bkqg7nKgKXmCWyJbCQwtxjqB_DV59pDNoW8VLy0CwLi7dkUiKdzgAhvstKg1S1_s3jaRgpW9pYu688NghrfvdcRUqqpPXABBtupFcx6MKWWTWheL3OsNyKK0Ctrl3nI-B1oOlco9oFzBPYwq8jdkJ3FU6ejUourL_3p0](https://lh3.googleusercontent.com/aida-public/AB6AXuBlDlxT5AVTMCXdPLomeUHEgUePJdwzVVYww7p17ogk2kkzO3lJi190fX5JZhEb3QXoJ2xn-w4qK33CRWWGMyDTQv8dV1yRS7hYRNYoBnk6bkqg7nKgKXmCWyJbCQwtxjqB_DV59pDNoW8VLy0CwLi7dkUiKdzgAhvstKg1S1_s3jaRgpW9pYu688NghrfvdcRUqqpPXABBtupFcx6MKWWTWheL3OsNyKK0Ctrl3nI-B1oOlco9oFzBPYwq8jdkJ3FU6ejUourL_3p0)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Tech 3" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="A stylized overhead view of minimalist tech gadgets including a phone, wireless earbuds, and a smartwatch on a matte black surface. The lighting is moody yet clear, highlighting the refined textures and premium design of the objects." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuCaQpooKC2IAiMUrKAijzIcAKz0bVwyk0i895uACLYMb_ZqR0Qq9vUN09lAk5XqBdBvk3f0RocQjQBDzONWIy4s0aL2c_LlYKQ6d5FG080UBs8_zg1D72bA91vrxkp_3Z3cGZiMmZROJwb8KFijACJ4p7M4QXbrND58AEY5fFaR8NK8eKZE0ZT_xHh6An_FfXL-4t0P3IYbqkJW4jNi4JzTZBMAf1XYoLssh6_Q4IUgN7SieFd4rnXLqBQKmpGocGXYBvMBS4YbJS7r](https://lh3.googleusercontent.com/aida-public/AB6AXuCaQpooKC2IAiMUrKAijzIcAKz0bVwyk0i895uACLYMb_ZqR0Qq9vUN09lAk5XqBdBvk3f0RocQjQBDzONWIy4s0aL2c_LlYKQ6d5FG080UBs8_zg1D72bA91vrxkp_3Z3cGZiMmZROJwb8KFijACJ4p7M4QXbrND58AEY5fFaR8NK8eKZE0ZT_xHh6An_FfXL-4t0P3IYbqkJW4jNi4JzTZBMAf1XYoLssh6_Q4IUgN7SieFd4rnXLqBQKmpGocGXYBvMBS4YbJS7r)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Tech 4" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="A dark digital background featuring flowing streams of green data bits, reminiscent of a futuristic database. The composition is clean and orderly, emphasizing data security and advanced AI systems within a modern interface." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuDZ5oty48cOC27jiTKoSnrj2hHCvTHsEcW8sxJe8_VcnJAnqI_pVZualnKQiD3cwot_ctFyrVqUHdElkfPRbG6x0wW-pdhS5lPHKrtQa0qMxoqszp9QCMiHJ2m5KDGpS5QOlNUUyPcQmLZWTu9NlYwGkZXjodI3JY870LW3DSGttlheF7U6CfZbhNKP1NJuio8XByk2N6nl18sEYELBFL49y6lecdFaKo_4SN3LeUV8JKg0bEoiDKqoCh6TilbRSvcQI7xbmSJ0-wte](https://lh3.googleusercontent.com/aida-public/AB6AXuDZ5oty48cOC27jiTKoSnrj2hHCvTHsEcW8sxJe8_VcnJAnqI_pVZualnKQiD3cwot_ctFyrVqUHdElkfPRbG6x0wW-pdhS5lPHKrtQa0qMxoqszp9QCMiHJ2m5KDGpS5QOlNUUyPcQmLZWTu9NlYwGkZXjodI3JY870LW3DSGttlheF7U6CfZbhNKP1NJuio8XByk2N6nl18sEYELBFL49y6lecdFaKo_4SN3LeUV8JKg0bEoiDKqoCh6TilbRSvcQI7xbmSJ0-wte)"/>
</div>
</div>
</div>
<div class="px-base">
<h3 class="font-headline-md text-headline-md text-on-surface">Tech Articles</h3>
<div class="flex items-center space-x-sm mt-base">
<span class="text-label-sm font-label-sm text-on-surface-variant">12 Items</span>
<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
<span class="text-label-sm font-label-sm text-on-surface-variant">Updated Yesterday</span>
</div>
</div>
</div>
<div class="group cursor-pointer transition-premium">
<div class="aspect-[4/5] bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden mb-sm relative card-hover transition-premium">
<div class="grid grid-cols-2 grid-rows-2 h-full gap-[2px] bg-surface-container">
<div class="overflow-hidden bg-surface-container-high">
<img alt="Design 1" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="A serene, minimalist beach scene with pale sand and calm turquoise water under a soft overcast sky. The palette is dominated by light teals and warm whites, evoking a sense of tranquility and effortless calm." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuDx4IWiU_UoaHyNUt0UyUS8baRZV2La_T-dOCIL4XJrTK82eblMBJ0HcJcJV2KfEZQCLvD8ioRLlxM5IiCi6m1AmF6ixXlpvQ6_C9RdfZZG0LLY7Mc4EyNNQ02ravrWGdGomSakt_PrxsygR0l9Op435YRJ4BCw8y7oE-eEPB2xodldIhGWUAFfs4RMsh_caesagzKH_oK2DXhK9gJWrZuDkXwz0XCUZyVCnqex4dB4R7MjKu_JRsvmRL_BeVfMv3fjvLs8-h7ripNG](https://lh3.googleusercontent.com/aida-public/AB6AXuDx4IWiU_UoaHyNUt0UyUS8baRZV2La_T-dOCIL4XJrTK82eblMBJ0HcJcJV2KfEZQCLvD8ioRLlxM5IiCi6m1AmF6ixXlpvQ6_C9RdfZZG0LLY7Mc4EyNNQ02ravrWGdGomSakt_PrxsygR0l9Op435YRJ4BCw8y7oE-eEPB2xodldIhGWUAFfs4RMsh_caesagzKH_oK2DXhK9gJWrZuDkXwz0XCUZyVCnqex4dB4R7MjKu_JRsvmRL_BeVfMv3fjvLs8-h7ripNG)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Design 2" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="A single Monstera leaf in a simple white ceramic vase against a clean, light-grey background. The image is a study in minimalist botanical design, with soft shadows and a high-key, airy photographic style." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuBQDA9iRs_pWTR04qNOpq0yIRQfb4wAR8E0WvfPKKH_FhWGx5Pdphxz3athFswkpN3Ox1E9V4kXfZJpVGmZWeS_yd2_88gMG9aaH45KxOWmxV1mNpm5xHhj7qKvSAfmA1iKPPXfxuaOYO1Gt3ZFrbGC3k1MVdSBeaoB990J2YHf3kkf5FlUa3iCaEs-luCTYvjgYD0KeqDxA8rzWE7h0E5vZM4YtW25GQ4_pW4TIiBTrhRHKrFreE19Z9idbdwfb3wpfYM8WpUehvbK](https://lh3.googleusercontent.com/aida-public/AB6AXuBQDA9iRs_pWTR04qNOpq0yIRQfb4wAR8E0WvfPKKH_FhWGx5Pdphxz3athFswkpN3Ox1E9V4kXfZJpVGmZWeS_yd2_88gMG9aaH45KxOWmxV1mNpm5xHhj7qKvSAfmA1iKPPXfxuaOYO1Gt3ZFrbGC3k1MVdSBeaoB990J2YHf3kkf5FlUa3iCaEs-luCTYvjgYD0KeqDxA8rzWE7h0E5vZM4YtW25GQ4_pW4TIiBTrhRHKrFreE19Z9idbdwfb3wpfYM8WpUehvbK)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Design 3" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="A minimalist composition of a designer lamp on a plain wooden table. The lighting creates subtle gradients on the wall behind, focusing on form and function in a high-end, uncluttered interior space." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuBwR_b-h8HWo4xhTAsNenPMo2KhN9lSueYfsR1DoBkGtbHMXKbWyH6buVt3-PF-HWcaGui5AxnMn-7hNWQibGsAy9W1qwfITMTXSUBdsYMmhpdt16mUyMw8lsB13lxJVRG8-8iHQ4T7XX28LhdTtCjwqK29ejTQdhrBKi-9BaaHcA7pQyd4oaIhwidUBqiygSP5r25zL8TWi3kOHadR_HhxbzUkOV0bBm_GvyFG6EdYnFCa2L7EUT2KuDoa3Zi_SL2nQv2Y93Uh74uz](https://lh3.googleusercontent.com/aida-public/AB6AXuBwR_b-h8HWo4xhTAsNenPMo2KhN9lSueYfsR1DoBkGtbHMXKbWyH6buVt3-PF-HWcaGui5AxnMn-7hNWQibGsAy9W1qwfITMTXSUBdsYMmhpdt16mUyMw8lsB13lxJVRG8-8iHQ4T7XX28LhdTtCjwqK29ejTQdhrBKi-9BaaHcA7pQyd4oaIhwidUBqiygSP5r25zL8TWi3kOHadR_HhxbzUkOV0bBm_GvyFG6EdYnFCa2L7EUT2KuDoa3Zi_SL2nQv2Y93Uh74uz)"/>
</div>
<div class="overflow-hidden bg-surface-container-high">
<img alt="Design 4" class="w-full h-full object-cover group-hover:scale-105 transition-premium" data-alt="An abstract art piece consisting of subtle white-on-white textures and geometric embossed lines. The work is sophisticated and quiet, serving as the ultimate expression of the invisible UI philosophy in a digital gallery." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuCMInSLay_ye26zdeh_8Bbkwyw4jEXHSfIhdoTCLn59VUkQSC7PgNdc5O0oB5oAk9k8fVR4EHgUjktdTsn3j1ploAO53arM71VAs_D7Bl6OFnCDfD88VoJFqui5KIAttcn56YQpPPppfsT_LedQ-PRSKiPx4SNEeQcw2yqEMkRIxIa9VeELH44dLVAP_KBL5roOGbgtXpRM1c141bYUn8ODoi8wsn5sf_F73KIm-KuLX0L8GqhOssBbxJT9JioWC-aPomQp3Lr1cyRZ](https://lh3.googleusercontent.com/aida-public/AB6AXuCMInSLay_ye26zdeh_8Bbkwyw4jEXHSfIhdoTCLn59VUkQSC7PgNdc5O0oB5oAk9k8fVR4EHgUjktdTsn3j1ploAO53arM71VAs_D7Bl6OFnCDfD88VoJFqui5KIAttcn56YQpPPppfsT_LedQ-PRSKiPx4SNEeQcw2yqEMkRIxIa9VeELH44dLVAP_KBL5roOGbgtXpRM1c141bYUn8ODoi8wsn5sf_F73KIm-KuLX0L8GqhOssBbxJT9JioWC-aPomQp3Lr1cyRZ)"/>
</div>
</div>
</div>
<div class="px-base">
<h3 class="font-headline-md text-headline-md text-on-surface">Minimalist Design</h3>
<div class="flex items-center space-x-sm mt-base">
<span class="text-label-sm font-label-sm text-on-surface-variant">48 Items</span>
<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
<span class="text-label-sm font-label-sm text-on-surface-variant">Updated 3d ago</span>
</div>
</div>
</div>
<div class="group cursor-pointer transition-premium">
<div class="aspect-[4/5] border-2 border-dashed border-outline-variant/30 rounded-xl flex flex-col items-center justify-center space-y-sm hover:border-primary/40 transition-premium bg-surface-container-low/30 card-hover">
<div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-premium">
<span class="material-symbols-outlined" data-icon="add">add</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">Create New Collection</span>
</div>
</div>
</section>
</main>
<nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-xl border-t border-outline-variant/10 z-50 px-margin-mobile py-sm flex justify-around items-center">
<a class="flex flex-col items-center space-y-base text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="all_inclusive">all_inclusive</span>
<span class="text-[10px] font-label-sm">All</span>
</a>
<a class="flex flex-col items-center space-y-base text-primary" href="#">
<span class="material-symbols-outlined" data-icon="folder_copy" style="font-variation-settings: 'FILL' 1;">folder_copy</span>
<span class="text-[10px] font-label-sm">Collections</span>
</a>
<div class="mb-6">
<button class="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="add">add</span>
</button>
</div>
<a class="flex flex-col items-center space-y-base text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="search">search</span>
<span class="text-[10px] font-label-sm">Search</span>
</a>
<a class="flex flex-col items-center space-y-base text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="text-[10px] font-label-sm">Profile</span>
</a>
</nav>
<div class="fixed inset-0 z-[100] bg-surface/60 backdrop-blur-3xl hidden flex flex-col items-center justify-start pt-[153px] px-margin-mobile" id="search-overlay">
<div class="w-full max-w-2xl">
<input class="w-full bg-transparent border-none focus:ring-0 text-display font-display text-on-surface placeholder:text-on-surface-variant/30 text-center" placeholder="Search archive..." type="text"/>
<div class="mt-lg flex flex-wrap justify-center gap-sm">
<span class="px-md py-sm bg-surface-container-high rounded-full text-label-md cursor-pointer hover:bg-primary hover:text-on-primary transition-premium">#architecture</span>
<span class="px-md py-sm bg-surface-container-high rounded-full text-label-md cursor-pointer hover:bg-primary hover:text-on-primary transition-premium">#minimalism</span>
<span class="px-md py-sm bg-surface-container-high rounded-full text-label-md cursor-pointer hover:bg-primary hover:text-on-primary transition-premium">#typography</span>
</div>
</div>
<button class="absolute top-margin-desktop right-margin-desktop p-sm" onclick="toggleSearch()">
<span class="material-symbols-outlined text-display" data-icon="close">close</span>
</button>
</div>
<script>
        function toggleSearch() {
            const overlay = document.getElementById('search-overlay');
            overlay.classList.toggle('hidden');
            if (!overlay.classList.contains('hidden')) {
                overlay.querySelector('input').focus();
            }
        }

        // Add interaction to search icon in nav
        document.querySelector('[data-icon="search"]').parentElement.addEventListener('click', toggleSearch);

        // Simple parallax on scroll for cards
        window.addEventListener('scroll', () => {
            const cards = document.querySelectorAll('.card-hover');
            const scrolled = window.pageYOffset;
            cards.forEach((card, index) => {
                const speed = 0.05 + (index * 0.01);
                card.style.transform = `translateY(${scrolled * speed * -1}px)`;
            });
        });
    </script>
</body></html>

```

### 2.5 Search & Filter Results

```html
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Unidrop - Search Results</title>
<script src="[https://cdn.tailwindcss.com?plugins=forms,container-queries](https://cdn.tailwindcss.com?plugins=forms,container-queries)"></script>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Geist', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-auto-rows: 10px;
        }
        .masonry-item {
            grid-row-end: span 20;
        }
        .item-small { grid-row-end: span 18; }
        .item-medium { grid-row-end: span 26; }
        .item-large { grid-row-end: span 34; }

        /* Custom Bezier for Premium Feel */
        .premium-transition {
            transition: all 500px cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-blur {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-fixed": "#dce2f7",
                        "outline-variant": "#c6c6cd",
                        "on-tertiary-container": "#828486",
                        "surface": "#f9f9f9",
                        "primary-fixed-dim": "#c0c6db",
                        "on-surface-variant": "#45464c",
                        "on-surface": "#1a1c1c",
                        "tertiary-container": "#191c1e",
                        "primary-container": "#141b2b",
                        "on-secondary-fixed-variant": "#404754",
                        "on-secondary": "#ffffff",
                        "surface-container": "#eeeeee",
                        "secondary": "#585f6c",
                        "on-tertiary-fixed": "#191c1e",
                        "on-primary-fixed": "#141b2b",
                        "surface-bright": "#f9f9f9",
                        "secondary-fixed": "#dce2f3",
                        "error": "#ba1a1a",
                        "on-secondary-container": "#5e6572",
                        "outline": "#76777d",
                        "tertiary-fixed-dim": "#c5c6c8",
                        "on-secondary-fixed": "#151c27",
                        "surface-container-high": "#e8e8e8",
                        "surface-container-lowest": "#ffffff",
                        "on-error": "#ffffff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed-variant": "#404758",
                        "on-tertiary": "#ffffff",
                        "inverse-surface": "#2f3131",
                        "surface-variant": "#e2e2e2",
                        "on-primary": "#ffffff",
                        "secondary-fixed-dim": "#c0c7d6",
                        "tertiary": "#000000",
                        "on-error-container": "#93000a",
                        "on-background": "#1a1c1c",
                        "inverse-primary": "#c0c6db",
                        "on-tertiary-fixed-variant": "#444749",
                        "on-primary-container": "#7d8497",
                        "background": "#f9f9f9",
                        "surface-container-low": "#f3f3f4",
                        "inverse-on-surface": "#f0f1f1",
                        "tertiary-fixed": "#e1e2e4",
                        "surface-container-highest": "#e2e2e2",
                        "surface-dim": "#dadada",
                        "secondary-container": "#dce2f3",
                        "primary": "#000000",
                        "surface-tint": "#575e70"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "xs": "8px",
                        "xl": "64px",
                        "gutter": "16px",
                        "lg": "40px",
                        "md": "24px",
                        "margin-mobile": "20px",
                        "sm": "16px",
                        "margin-desktop": "60px",
                        "base": "4px"
                    },
                    "fontFamily": {
                        "label-md": ["Geist"],
                        "headline-md": ["Geist"],
                        "headline-lg": ["Geist"],
                        "label-sm": ["Geist"],
                        "body-md": ["Geist"],
                        "display": ["Geist"],
                        "body-lg": ["Geist"]
                    },
                    "fontSize": {
                        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "headline-md": ["20px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "400"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "display": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-background text-on-surface min-h-screen">
<nav class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-none">
<div class="flex justify-between items-center px-margin-desktop py-md max-w-[1440px] mx-auto">
<div class="flex items-center gap-xl">
<span class="font-display text-display text-on-surface tracking-tighter">Unidrop</span>
<div class="hidden md:flex items-center gap-lg">
<button class="text-primary font-medium transition-opacity duration-300 hover:opacity-70 font-body-md text-body-md">All Drops</button>
<button class="text-on-surface-variant transition-opacity duration-300 hover:opacity-70 font-body-md text-body-md">Notes</button>
<button class="text-on-surface-variant transition-opacity duration-300 hover:opacity-70 font-body-md text-body-md">Images</button>
<button class="text-on-surface-variant transition-opacity duration-300 hover:opacity-70 font-body-md text-body-md">Links</button>
</div>
</div>
<div class="flex items-center gap-sm bg-surface-container-low px-md py-xs rounded-full min-w-[320px] transition-all duration-500 ease-in-out">
<span class="material-symbols-outlined text-on-surface-variant">search</span>
<input class="bg-transparent border-none focus:ring-0 w-full font-body-md text-body-md placeholder-on-surface-variant/50" placeholder="Search your archive..." type="text" value="Spatial"/>
<span class="material-symbols-outlined text-on-surface-variant/50 text-[18px]">close</span>
</div>
<div class="flex items-center gap-sm">
<button class="p-xs hover:opacity-70 transition-opacity duration-300">
<span class="material-symbols-outlined">add</span>
</button>
<div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant/20">
<img alt="User Avatar" class="w-full h-full object-cover" src="[https://lh3.googleusercontent.com/aida-public/AB6AXuC9dIKdyRAkz7cS-jJm5Pvbnlefi8ShOJ2c6IL6_FJvZ3WBuR22LzSQJoSMuLpohPQ2DigeSDrg8_VfGYumaIY2FNJ7KOUuKfO1fo2X1MEMbZJ47S0hWve7IplkA8u4GsvSkqtPE_A2CZd7Sy0XukTlJynR1yby1ps_-IlPumXLlt5-m9UkgG-E1eKp-W_k-OmhMouxdxzjqxWtP0VrtmH5yOn9oS0vwL7HvD-0nglyA2xx5FY7EW1QvPArI-x9KCcauJtnCrPAVAaA](https://lh3.googleusercontent.com/aida-public/AB6AXuC9dIKdyRAkz7cS-jJm5Pvbnlefi8ShOJ2c6IL6_FJvZ3WBuR22LzSQJoSMuLpohPQ2DigeSDrg8_VfGYumaIY2FNJ7KOUuKfO1fo2X1MEMbZJ47S0hWve7IplkA8u4GsvSkqtPE_A2CZd7Sy0XukTlJynR1yby1ps_-IlPumXLlt5-m9UkgG-E1eKp-W_k-OmhMouxdxzjqxWtP0VrtmH5yOn9oS0vwL7HvD-0nglyA2xx5FY7EW1QvPArI-x9KCcauJtnCrPAVAaA)"/>
</div>
</div>
</div>
</nav>
<main class="pt-[120px] px-margin-desktop max-w-[1440px] mx-auto pb-xl">
<section class="mb-lg group">
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md shadow-sm relative overflow-hidden transition-all duration-500 hover:shadow-lg">
<div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
<div class="flex items-start gap-md">
<div class="bg-primary p-xs rounded-lg flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</div>
<div>
<h2 class="font-headline-md text-headline-md text-on-surface mb-base">Grok Insight</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">
                            You have <span class="text-primary font-medium">12 items</span> related to <span class="italic">Spatial Interfaces</span> saved over the last 3 months.
                        </p>
</div>
</div>
<div class="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-110">
<span class="material-symbols-outlined text-[160px]">bubble_chart</span>
</div>
</div>
</section>
<div class="flex items-center gap-xs mb-md">
<button class="bg-primary text-on-primary px-sm py-xs rounded-full font-label-md text-label-md">All Results</button>
<button class="bg-surface-container-low text-on-surface-variant px-sm py-xs rounded-full font-label-md text-label-md hover:bg-surface-variant transition-colors">Visuals</button>
<button class="bg-surface-container-low text-on-surface-variant px-sm py-xs rounded-full font-label-md text-label-md hover:bg-surface-variant transition-colors">Documentation</button>
<button class="bg-surface-container-low text-on-surface-variant px-sm py-xs rounded-full font-label-md text-label-md hover:bg-surface-variant transition-colors">Concepts</button>
</div>
<div class="masonry-grid gap-gutter">
<div class="masonry-item item-large group cursor-pointer relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/20 premium-transition hover:scale-[1.02] hover:shadow-xl">
<img class="w-full h-full object-cover" data-alt="A high-definition photograph of a futuristic spatial computing headset resting on a polished marble surface. The lighting is ethereal and soft, emphasizing the sleek glass and metallic curves of the device. The color palette is strictly monochromatic with deep blacks and bright white highlights, echoing a premium, minimalist tech aesthetic. The overall mood is silent, focused, and advanced." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuBgvc2XsuaO1PRNkB1aEdL0qQW1aWWrIym0_SDTiFIpWKbVPdemKkOYsp8s9hAbtA2pu8SsVUiaLWjwilO_m5jozztDdjTZmYlV9w9Ikw6mri-hfGD5_UKcp8t_Ta0ondhc0nHy1fIguxnXA1ZikFZk3Qj43k1H9xToOP6aWAgDNrhq6QaS1AeazkuBB1pnLqZS1FYYFphCONzmryTDAav-TafNWDm4bEfJbuQmfiPu_3HYVk49ICHpjN6eP4DERaJHUdojhYmuk8LF](https://lh3.googleusercontent.com/aida-public/AB6AXuBgvc2XsuaO1PRNkB1aEdL0qQW1aWWrIym0_SDTiFIpWKbVPdemKkOYsp8s9hAbtA2pu8SsVUiaLWjwilO_m5jozztDdjTZmYlV9w9Ikw6mri-hfGD5_UKcp8t_Ta0ondhc0nHy1fIguxnXA1ZikFZk3Qj43k1H9xToOP6aWAgDNrhq6QaS1AeazkuBB1pnLqZS1FYYFphCONzmryTDAav-TafNWDm4bEfJbuQmfiPu_3HYVk49ICHpjN6eP4DERaJHUdojhYmuk8LF)"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-md">
<span class="text-white font-label-md text-label-md mb-xs">Augmented Reality</span>
<h3 class="text-white font-headline-md text-headline-md">Spatial Depth Study 01</h3>
</div>
</div>
<div class="masonry-item item-medium p-md bg-surface-container-lowest border border-outline-variant/20 rounded-xl premium-transition hover:scale-[1.02] hover:shadow-xl flex flex-col">
<div class="flex items-center gap-xs mb-sm text-on-surface-variant">
<span class="material-symbols-outlined text-sm">description</span>
<span class="font-label-sm text-label-sm">Note • 2 days ago</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">Interaction Axioms</h3>
<p class="font-body-md text-body-md text-on-surface-variant line-clamp-4">
                    Spatial interfaces should prioritize proprioception. When objects react to physical gaze and movement, the cognitive load is reduced. Elements should have 'weight' and 'friction' defined by their digital mass.
                </p>
<div class="mt-auto pt-md flex gap-base">
<span class="bg-surface-container px-xs py-base rounded-full font-label-sm text-label-sm text-on-surface-variant">#ux</span>
<span class="bg-surface-container px-xs py-base rounded-full font-label-sm text-label-sm text-on-surface-variant">#spatial</span>
</div>
</div>
<div class="masonry-item item-small group p-md bg-surface-container-lowest border border-outline-variant/20 rounded-xl premium-transition hover:scale-[1.02] hover:shadow-xl">
<div class="flex flex-col h-full">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-sm">
<span class="material-symbols-outlined text-primary">link</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs truncate">linear.app/spatial-release</h3>
<p class="font-body-md text-body-md text-on-surface-variant line-clamp-2">The engineering specs for the new 3D viewport canvas.</p>
<div class="mt-auto flex items-center justify-between">
<span class="font-label-sm text-label-sm text-outline">Internal Docs</span>
<span class="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity">arrow_outward</span>
</div>
</div>
</div>
<div class="masonry-item item-medium group cursor-pointer relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/20 premium-transition hover:scale-[1.02] hover:shadow-xl">
<img class="w-full h-full object-cover" data-alt="A minimalist digital illustration of a 3D interface grid floating in a dark, atmospheric void. Thin, glowing white lines form a perspective grid that recedes into the distance. Soft ambient light illuminates the scene, creating a sense of infinite digital space. The visual style is clean and architectural, utilizing a monochromatic palette of greys and sharp whites for a serene, high-end feel." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuD33tzhDVv3lOT7yxImExCUiRPZlKgL8qBqQoVLqdcmU_t5xbYUgi-BjynfzG5nRgparFXxobCTyMFTGGUuQfTu33Yf_0BtfX00db5-0iS-TgKP88x6JAJvSJF_l_OejYWyLDMM3qewjjbT7cIDdyHq1MJhC5ZVN1t6rN92zrFEGl4xMmSIPClGKl6w6R_WgJ0hgXDRC1HOSX6npp4MepaMPuFEwye4wrJ2h1iclJcP05vVU3jx7imuGmlIrVvehxTh5PoFwTPNg9L](https://lh3.googleusercontent.com/aida-public/AB6AXuD33tzhDVv3lOT7yxImExCUiRPZlKgL8qBqQoVLqdcmU_t5xbYUgi-BjynfzG5nRgparFXxobCTyMFTGGUuQfTu33Yf_0BtfX00db5-0iS-TgKP88x6JAJvSJF_l_OejYWyLDMM3qewjjbT7cIDdyHq1MJhC5ZVN1t6rN92zrFEGl4xMmSIPClGKl6w6R_WgJ0hgXDRC1HOSX6npp4MepaMPuFEwye4wrJ2h1iclJcP05vVU3jx7imuGmlIrVvehxTh5PoFwTPNg9L)_"/>
<div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
</div>
<div class="masonry-item item-large p-md bg-surface-container-lowest border border-outline-variant/20 rounded-xl premium-transition hover:scale-[1.02] hover:shadow-xl">
<div class="flex items-center gap-xs mb-sm text-on-surface-variant">
<span class="material-symbols-outlined text-sm">sticky_note_2</span>
<span class="font-label-sm text-label-sm">Idea • Last month</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-md">Zenith Archive: Spatial Layer</h3>
<div class="space-y-sm">
<div class="flex items-center gap-sm">
<div class="w-2 h-2 rounded-full bg-primary"></div>
<p class="font-body-md text-body-md text-on-surface">Z-axis sorting based on frequency</p>
</div>
<div class="flex items-center gap-sm">
<div class="w-2 h-2 rounded-full bg-primary"></div>
<p class="font-body-md text-body-md text-on-surface">Gaussian blur on background layers</p>
</div>
<div class="flex items-center gap-sm">
<div class="w-2 h-2 rounded-full bg-primary"></div>
<p class="font-body-md text-body-md text-on-surface">Haptic feedback on item selection</p>
</div>
<div class="flex items-center gap-sm">
<div class="w-2 h-2 rounded-full bg-primary"></div>
<p class="font-body-md text-body-md text-on-surface">Audio spatialization for notifications</p>
</div>
</div>
</div>
<div class="masonry-item item-small group p-md bg-surface-container-lowest border border-outline-variant/20 rounded-xl premium-transition hover:scale-[1.02] hover:shadow-xl">
<div class="flex flex-col h-full">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-sm">
<span class="material-symbols-outlined text-primary">video_library</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">Spatial Design Principles</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant">[vimeo.com/72348123](https://vimeo.com/72348123)</p>
</div>
</div>
<div class="masonry-item item-medium group cursor-pointer relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/20 premium-transition hover:scale-[1.02] hover:shadow-xl">
<img class="w-full h-full object-cover" data-alt="A clean, minimalist workspace featuring a high-end desktop computer displaying a complex 3D modeling interface. The room is filled with soft, natural daylight from a large window. The furniture is mid-century modern, and the overall color palette is composed of warm whites, soft greys, and natural wood tones. The mood is calm, professional, and conducive to deep creative work." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuB-x3f91_91jY7m2r6_qAO2aOl-SHKAcypT7VKOEnoO3aW782hbnFC2vhoVwZ_FQA8RbxU-GGD8UJT43dh8o14bWYGZgc0r0UqAejzEmMZc6eTE5lMOcAjA0gUJZNVnQhA39LdowmfyaeDgafyiHZhtIYMfjXmTXimhcr5t12WMs4R16m6PpDRzeGey1T78D-LsInTqoJlKHP4h1OcNaHzwQm05N62yZfIBbiACzcgi5Qu1y1-ehRNx5ZKcjuV96vzTjdYOJS9fRm58](https://lh3.googleusercontent.com/aida-public/AB6AXuB-x3f91_91jY7m2r6_qAO2aOl-SHKAcypT7VKOEnoO3aW782hbnFC2vhoVwZ_FQA8RbxU-GGD8UJT43dh8o14bWYGZgc0r0UqAejzEmMZc6eTE5lMOcAjA0gUJZNVnQhA39LdowmfyaeDgafyiHZhtIYMfjXmTXimhcr5t12WMs4R16m6PpDRzeGey1T78D-LsInTqoJlKHP4h1OcNaHzwQm05N62yZfIBbiACzcgi5Qu1y1-ehRNx5ZKcjuV96vzTjdYOJS9fRm58)"/>
</div>
<div class="masonry-item item-large group cursor-pointer relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/20 premium-transition hover:scale-[1.02] hover:shadow-xl">
<img class="w-full h-full object-cover" data-alt="A mesmerizing close-up of a digital fluid simulation in shades of white and charcoal grey. The liquid forms elegant, organic curves and ripples that suggest movement and depth within a spatial environment. The lighting is dramatic and high-contrast, highlighting the intricate details and smooth surfaces of the fluid. The aesthetic is sophisticated, modern, and perfectly aligned with a high-end, minimalist design system." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuBfOw05zRWMdN1QuImBhnLe-U0ck2WjE9e_a-H9DgxrLPNWDzzreArmDLlrokWWlkq1FV6qw5Y0cD99ro53eeb5usobmDHUtOD-Ekp9-qT8KlPfO_nLYc3kdlgseuVqGeVF19djf6F5Xh8ssvQm8QPt27h8-SHaMvyao0E4Zl6r-4rLr9x6BeHMY5OAQ9m_y4GFMdUHIMzo4SSdbE85M6Owr33c6tbTW9PFrcvsxU8-sZA8QhlO42eHsXA3yxJ1bl1CdSIstxv5pi9D](https://lh3.googleusercontent.com/aida-public/AB6AXuBfOw05zRWMdN1QuImBhnLe-U0ck2WjE9e_a-H9DgxrLPNWDzzreArmDLlrokWWlkq1FV6qw5Y0cD99ro53eeb5usobmDHUtOD-Ekp9-qT8KlPfO_nLYc3kdlgseuVqGeVF19djf6F5Xh8ssvQm8QPt27h8-SHaMvyao0E4Zl6r-4rLr9x6BeHMY5OAQ9m_y4GFMdUHIMzo4SSdbE85M6Owr33c6tbTW9PFrcvsxU8-sZA8QhlO42eHsXA3yxJ1bl1CdSIstxv5pi9D)"/>
</div>
</div>
</main>
<button class="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50">
<span class="material-symbols-outlined" style="font-variation-settings: 'wght' 600;">add</span>
</button>
<script>
        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.querySelector('input');
            const masonryItems = document.querySelectorAll('.masonry-item');

            // Simple real-time filter simulation
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                masonryItems.forEach(item => {
                    const text = item.innerText.toLowerCase();
                    if (text.includes(term) || term === "") {
                        item.style.display = "block";
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.95)";
                        setTimeout(() => {
                            if (item.style.opacity === "0") item.style.display = "none";
                        }, 500);
                    }
                });
            });

            // Smooth scale on hover for premium feel
            masonryItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.zIndex = "10";
                });
                item.addEventListener('mouseleave', () => {
                    item.style.zIndex = "1";
                });
            });
        });
    </script>
</body></html>

```

### 2.6 Full View Detail Modal

```html
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Unidrop - Spatial Interfaces Detail</title>
<script src="[https://cdn.tailwindcss.com?plugins=forms,container-queries](https://cdn.tailwindcss.com?plugins=forms,container-queries)"></script>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<style>
        @font-face {
            font-family: 'Geist';
            src: url('[https://cdn.jsdelivr.net/gh/vercel/geist-font@main/packages/fonts/src/Geist-Regular.woff2](https://cdn.jsdelivr.net/gh/vercel/geist-font@main/packages/fonts/src/Geist-Regular.woff2)') format('woff2');
            font-weight: 400;
        }
        @font-face {
            font-family: 'Geist';
            src: url('[https://cdn.jsdelivr.net/gh/vercel/geist-font@main/packages/fonts/src/Geist-Medium.woff2](https://cdn.jsdelivr.net/gh/vercel/geist-font@main/packages/fonts/src/Geist-Medium.woff2)') format('woff2');
            font-weight: 500;
        }
        @font-face {
            font-family: 'Geist';
            src: url('[https://cdn.jsdelivr.net/gh/vercel/geist-font@main/packages/fonts/src/Geist-SemiBold.woff2](https://cdn.jsdelivr.net/gh/vercel/geist-font@main/packages/fonts/src/Geist-SemiBold.woff2)') format('woff2');
            font-weight: 600;
        }
        body { font-family: 'Geist', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            grid-auto-rows: 10px;
        }
        .masonry-item {
            grid-row-end: span 20;
        }
        .masonry-item-tall {
            grid-row-end: span 32;
        }
        .backdrop-blur-custom {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "outline-variant": "#c6c6cd",
                      "on-surface-variant": "#45464c",
                      "surface-dim": "#dadada",
                      "surface-container-low": "#f3f3f4",
                      "on-background": "#1a1c1c",
                      "surface-container-lowest": "#ffffff",
                      "on-secondary-fixed": "#151c27",
                      "on-secondary-fixed-variant": "#404754",
                      "tertiary-fixed": "#e1e2e4",
                      "primary-fixed": "#dce2f7",
                      "on-primary": "#ffffff",
                      "secondary-fixed-dim": "#c0c7d6",
                      "primary-fixed-dim": "#c0c6db",
                      "on-tertiary": "#ffffff",
                      "on-secondary-container": "#5e6572",
                      "background": "#f9f9f9",
                      "on-error": "#ffffff",
                      "error-container": "#ffdad6",
                      "surface-variant": "#e2e2e2",
                      "surface-container": "#eeeeee",
                      "on-secondary": "#ffffff",
                      "surface-container-high": "#e8e8e8",
                      "secondary": "#585f6c",
                      "on-primary-container": "#7d8497",
                      "on-tertiary-fixed": "#191c1e",
                      "secondary-container": "#dce2f3",
                      "on-primary-fixed-variant": "#404758",
                      "surface": "#f9f9f9",
                      "on-surface": "#1a1c1c",
                      "surface-bright": "#f9f9f9",
                      "error": "#ba1a1a",
                      "on-error-container": "#93000a",
                      "on-tertiary-container": "#828486",
                      "inverse-surface": "#2f3131",
                      "inverse-on-surface": "#f0f1f1",
                      "surface-container-highest": "#e2e2e2",
                      "tertiary-fixed-dim": "#c5c6c8",
                      "surface-tint": "#575e70",
                      "secondary-fixed": "#dce2f3",
                      "inverse-primary": "#c0c6db",
                      "tertiary-container": "#191c1e",
                      "outline": "#76777d",
                      "primary-container": "#141b2b",
                      "primary": "#000000",
                      "tertiary": "#000000"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "xs": "8px",
                      "margin-mobile": "20px",
                      "margin-desktop": "60px",
                      "gutter": "16px",
                      "sm": "16px",
                      "base": "4px",
                      "md": "24px",
                      "xl": "64px",
                      "lg": "40px"
              },
              "fontFamily": {
                      "headline-md": ["Geist"],
                      "label-md": ["Geist"],
                      "headline-lg": ["Geist"],
                      "body-md": ["Geist"],
                      "display": ["Geist"],
                      "label-sm": ["Geist"],
                      "headline-lg-mobile": ["Geist"],
                      "body-lg": ["Geist"]
              },
              "fontSize": {
                      "headline-md": ["20px", {"lineHeight": "1.4", "fontWeight": "500"}],
                      "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.01em", "fontWeight": "500"}],
                      "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                      "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                      "display": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600"}],
                      "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "400"}],
                      "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "500"}],
                      "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
              }
            },
          },
        }
      </script>
</head>
<body class="bg-background text-on-surface overflow-hidden">
<div class="fixed inset-0 z-0 opacity-40 blur-sm pointer-events-none">
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-margin-desktop py-md max-w-[1440px] left-1/2 -translate-x-1/2">
<div class="font-display text-display text-on-surface tracking-tighter">Unidrop</div>
<div class="flex gap-md">
<span class="material-symbols-outlined text-primary">add</span>
<span class="material-symbols-outlined text-primary">search</span>
</div>
</header>
<main class="pt-[120px] px-margin-desktop max-w-[1440px] mx-auto">
<div class="masonry-grid gap-gutter">
<div class="masonry-item-tall bg-white rounded-xl border border-outline-variant overflow-hidden">
<img alt="Spatial Interface" class="w-full h-full object-cover" src="[https://lh3.googleusercontent.com/aida-public/AB6AXuA23qd0iVMWBnUB5alWUkao37v7jcv0F-gQvIX-n3wdbmFK__e7V3jggi3Z1aNWm6mHrAtgJ3tkIRlkbt7kf8KNOnBbIWTQT9T5oudv1kGzig67Ii3VwyWM70AhnlQBvFPmaZ7Z7cfflxglLDXb5U-67xhnna9KKhbWlE40crAfqFq4sy0uacXM6Pp11AqT6d66_kD1T07iBXqjI-FxGTB2hFuvF4sH8pRBn8MF16HBixpxVc63bDZpadyqo6FrbLB5FUvbcFVEqGk7](https://lh3.googleusercontent.com/aida-public/AB6AXuA23qd0iVMWBnUB5alWUkao37v7jcv0F-gQvIX-n3wdbmFK__e7V3jggi3Z1aNWm6mHrAtgJ3tkIRlkbt7kf8KNOnBbIWTQT9T5oudv1kGzig67Ii3VwyWM70AhnlQBvFPmaZ7Z7cfflxglLDXb5U-67xhnna9KKhbWlE40crAfqFq4sy0uacXM6Pp11AqT6d66_kD1T07iBXqjI-FxGTB2hFuvF4sH8pRBn8MF16HBixpxVc63bDZpadyqo6FrbLB5FUvbcFVEqGk7)"/>
</div>
<div class="masonry-item bg-white rounded-xl border border-outline-variant p-md flex flex-col justify-end">
<div class="font-headline-md text-headline-md">The Minimalist Manifesto</div>
</div>
<div class="masonry-item bg-white rounded-xl border border-outline-variant">
<img alt="Tech" class="w-full h-full object-cover" src="[https://lh3.googleusercontent.com/aida-public/AB6AXuB_2mfL89yW540X9NewH6LU9AbJEq3rkSsreQzgL5JMyx-3xupLSz5nXgAEULcs9lI_V79oc96MOm6uXmkvlrw175nU_DdW19whZyTypNfIKgAzomq0wTu36hNeRMtnRam4BeLjRK_AxsrgZbTsH6WodIDGdfykk6971lvOcYpEbH1fsuVeKP7mfYOcr7dO5PRVJlnbcPZdNSxAD_rO6oo7yMCW3boDtq4cTMqvHtI5f66nUXha51rVr1ahgc9jFJiHrg-7lmpSWMCs](https://lh3.googleusercontent.com/aida-public/AB6AXuB_2mfL89yW540X9NewH6LU9AbJEq3rkSsreQzgL5JMyx-3xupLSz5nXgAEULcs9lI_V79oc96MOm6uXmkvlrw175nU_DdW19whZyTypNfIKgAzomq0wTu36hNeRMtnRam4BeLjRK_AxsrgZbTsH6WodIDGdfykk6971lvOcYpEbH1fsuVeKP7mfYOcr7dO5PRVJlnbcPZdNSxAD_rO6oo7yMCW3boDtq4cTMqvHtI5f66nUXha51rVr1ahgc9jFJiHrg-7lmpSWMCs)"/>
</div>
<div class="masonry-item-tall bg-white rounded-xl border border-outline-variant p-md">
<div class="font-body-md text-body-md text-on-surface-variant">Architecture of the future involves digital layers integrated into physical walls.</div>
</div>
<div class="masonry-item bg-white rounded-xl border border-outline-variant">
<img alt="Code" class="w-full h-full object-cover" src="[https://lh3.googleusercontent.com/aida-public/AB6AXuD7QgIwkQJJoRTCeC5mjM74owWzJtWS3ck0BEOoGzVBAZn_IjO6iXNRB9-zGBy4Fm-Gg_0HTImVZ5cKEwebUrrbPk1edIrgFRwFqrFY5zDAWD0gUiwyjJqqa1xh56ncySR_Ijlze3nZNfBqbmw9beeVRaJ7_7MjOXBfrrqQT9dODlIHoNjY7uqwyYLRj7JmGfYr6rJM0p4mppKwNfboGu7RUUCSTJbsVMGAPuIHEeyKIbcN6ORgcWlrf2DVh-11eGSovWChVl1A7at1](https://lh3.googleusercontent.com/aida-public/AB6AXuD7QgIwkQJJoRTCeC5mjM74owWzJtWS3ck0BEOoGzVBAZn_IjO6iXNRB9-zGBy4Fm-Gg_0HTImVZ5cKEwebUrrbPk1edIrgFRwFqrFY5zDAWD0gUiwyjJqqa1xh56ncySR_Ijlze3nZNfBqbmw9beeVRaJ7_7MjOXBfrrqQT9dODlIHoNjY7uqwyYLRj7JmGfYr6rJM0p4mppKwNfboGu7RUUCSTJbsVMGAPuIHEeyKIbcN6ORgcWlrf2DVh-11eGSovWChVl1A7at1)"/>
</div>
</div>
</main>
</div>
<div class="fixed inset-0 z-50 flex items-center justify-center p-margin-mobile md:p-lg transition-all duration-500 ease-in-out" id="modal-container">
<div class="absolute inset-0 bg-black/5 backdrop-blur-custom" onclick="closeModal()"></div>
<div class="relative w-full max-w-6xl h-[870px] bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col md:flex-row transition-transform duration-500 scale-100 opacity-100">
<button class="absolute top-md right-md z-[60] w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors duration-300" onclick="closeModal()">
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">close</span>
</button>
<div class="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden bg-surface-container-high">
<img class="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out" data-alt="A sophisticated digital artwork illustrating spatial computing concepts with transparent glass-like interface layers floating in a serene, brightly lit minimalist room. The lighting is soft and high-key, emphasizing a clean white and monochromatic aesthetic with deep obsidian black shadows. The composition is airy and futuristic, reflecting a professional high-end gallery vibe with extreme clarity and intentional whitespace." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuDTF57RzF4taw4hvhmgHBockkPubUudpG-npb8j5O7JER3KctDbMPO_D0lQQt-DUZguZZZ0PR9lGB0Yf3F4QPCnRpDjjBCEmU69SWzKnFxBdCv9AEw76aV4zmetHIL8q_8fDIByOr4w627rMOntE4w55sDdHOEF9uYVshYHLJd2JDgTB90e6h8TNCKIpVhdyLcAt0rJgkMMPrf_VqRffYnlaoe6DadT12my8IfoDjQ8Coei4FyEjwst2cUFFbltFLAPF3Fpo3YNDZzW](https://lh3.googleusercontent.com/aida-public/AB6AXuDTF57RzF4taw4hvhmgHBockkPubUudpG-npb8j5O7JER3KctDbMPO_D0lQQt-DUZguZZZ0PR9lGB0Yf3F4QPCnRpDjjBCEmU69SWzKnFxBdCv9AEw76aV4zmetHIL8q_8fDIByOr4w627rMOntE4w55sDdHOEF9uYVshYHLJd2JDgTB90e6h8TNCKIpVhdyLcAt0rJgkMMPrf_VqRffYnlaoe6DadT12my8IfoDjQ8Coei4FyEjwst2cUFFbltFLAPF3Fpo3YNDZzW)"/>
</div>
<div class="w-full md:w-2/5 h-1/2 md:h-full flex flex-col p-md md:p-xl overflow-y-auto">
<div class="flex items-center gap-xs mb-sm">
<div class="w-5 h-5 bg-primary-container rounded-sm flex items-center justify-center overflow-hidden">
<img class="w-full h-full object-cover" onerror="this.src='[https://www.google.com/s2/favicons?domain=uxdesign.cc&sz=32](https://www.google.com/s2/favicons?domain=uxdesign.cc&sz=32)'" src="[https://lh3.googleusercontent.com/aida-public/AB6AXuA7Di2hAk3janiizbILzkGit_MLYx8QGDrOJbKCpABaTXAKU6Ttlfrze7yswGDVkgfgPsoh_URLD4PRltsdO1mVmTr7RPg5VYB9d6cJFJpb91cStXW7RC7yIfoQkzeA-AOUMnKj9ezZMfhuZGn7KgrtwsdupcFHk-098Z851E5LX3zo60jdEYxOwh1ZhhzLEgpeu3xqvfuDzHyoExiLLCAEctBc7xjylb8sWNpVPDOdsZq2ZVQUxykbi10xseXWL8PuhVchkr1eH_5G](https://lh3.googleusercontent.com/aida-public/AB6AXuA7Di2hAk3janiizbILzkGit_MLYx8QGDrOJbKCpABaTXAKU6Ttlfrze7yswGDVkgfgPsoh_URLD4PRltsdO1mVmTr7RPg5VYB9d6cJFJpb91cStXW7RC7yIfoQkzeA-AOUMnKj9ezZMfhuZGn7KgrtwsdupcFHk-098Z851E5LX3zo60jdEYxOwh1ZhhzLEgpeu3xqvfuDzHyoExiLLCAEctBc7xjylb8sWNpVPDOdsZq2ZVQUxykbi10xseXWL8PuhVchkr1eH_5G)"/>
</div>
<span class="font-label-md text-label-md text-on-surface-variant tracking-wide">uxdesign.cc</span>
</div>
<h1 class="font-display text-display text-on-surface mb-md leading-tight">Spatial Interfaces: The Next Paradigm</h1>
<section class="mt-lg pt-lg border-t border-surface-variant">
<div class="flex items-center gap-xs mb-md">
<span class="material-symbols-outlined text-[18px] text-primary" data-weight="fill">smart_toy</span>
<h2 class="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">Grok Insights</h2>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed">
                        This piece explores the convergence of physical environments and digital overlays. It posits that the cursor is dead; spatial awareness and depth perception are the new foundational layers for human-computer interaction in the coming decade.
                    </p>
<div class="flex flex-wrap gap-xs mb-xl">
<span class="px-sm py-base bg-surface-container-high text-on-surface-variant rounded-full font-label-sm text-label-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">Architecture</span>
<span class="px-sm py-base bg-surface-container-high text-on-surface-variant rounded-full font-label-sm text-label-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">Spatial Design</span>
<span class="px-sm py-base bg-surface-container-high text-on-surface-variant rounded-full font-label-sm text-label-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">Future Tech</span>
<span class="px-sm py-base bg-surface-container-high text-on-surface-variant rounded-full font-label-sm text-label-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">Interaction</span>
</div>
</section>
<div class="mt-auto pt-md flex items-center justify-between">
<div class="flex gap-md">
<button class="group flex items-center gap-xs hover:opacity-70 transition-opacity">
<span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary">ios_share</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Share</span>
</button>
<button class="group flex items-center gap-xs hover:opacity-70 transition-opacity">
<span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary">link</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Copy Link</span>
</button>
</div>
<button class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-error-container hover:text-error transition-all">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
</div>
</div>
</div>
<script>
        function closeModal() {
            const container = document.getElementById('modal-container');
            container.style.opacity = '0';
            container.style.transform = 'scale(0.98)';
            setTimeout(() => {
                window.history.back();
            }, 300);
        }

        // Simple entrance animation
        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('modal-container');
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        });
    </script>
</body></html>

```

### 2.7 Account & AI Settings

```html
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Settings - Zenith Archive</title>
<script src="[https://cdn.tailwindcss.com?plugins=forms,container-queries](https://cdn.tailwindcss.com?plugins=forms,container-queries)"></script>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<link href="[https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap)" rel="stylesheet"/>
<style>
        @font-face {
            font-family: 'Geist';
            src: url('[https://fonts.cdnfonts.com/css/geist](https://fonts.cdnfonts.com/css/geist)');
        }
        body {
            font-family: 'Geist', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 16px;
        }
        .settings-transition {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-fixed": "#dce2f7",
                        "outline-variant": "#c6c6cd",
                        "on-tertiary-container": "#828486",
                        "surface": "#f9f9f9",
                        "primary-fixed-dim": "#c0c6db",
                        "on-surface-variant": "#45464c",
                        "on-surface": "#1a1c1c",
                        "tertiary-container": "#191c1e",
                        "primary-container": "#141b2b",
                        "on-secondary-fixed-variant": "#404754",
                        "on-secondary": "#ffffff",
                        "surface-container": "#eeeeee",
                        "secondary": "#585f6c",
                        "on-tertiary-fixed": "#191c1e",
                        "on-primary-fixed": "#141b2b",
                        "surface-bright": "#f9f9f9",
                        "secondary-fixed": "#dce2f3",
                        "error": "#ba1a1a",
                        "on-secondary-container": "#5e6572",
                        "outline": "#76777d",
                        "tertiary-fixed-dim": "#c5c6c8",
                        "on-secondary-fixed": "#151c27",
                        "surface-container-high": "#e8e8e8",
                        "surface-container-lowest": "#ffffff",
                        "on-error": "#ffffff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed-variant": "#404758",
                        "on-tertiary": "#ffffff",
                        "inverse-surface": "#2f3131",
                        "surface-variant": "#e2e2e2",
                        "on-primary": "#ffffff",
                        "secondary-fixed-dim": "#c0c7d6",
                        "tertiary": "#000000",
                        "on-error-container": "#93000a",
                        "on-background": "#1a1c1c",
                        "inverse-primary": "#c0c6db",
                        "on-tertiary-fixed-variant": "#444749",
                        "on-primary-container": "#7d8497",
                        "background": "#f9f9f9",
                        "surface-container-low": "#f3f3f4",
                        "inverse-on-surface": "#f0f1f1",
                        "tertiary-fixed": "#e1e2e4",
                        "surface-container-highest": "#e2e2e2",
                        "surface-dim": "#dadada",
                        "secondary-container": "#dce2f3",
                        "primary": "#000000",
                        "surface-tint": "#575e70"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "xs": "8px",
                        "xl": "64px",
                        "gutter": "16px",
                        "lg": "40px",
                        "md": "24px",
                        "margin-mobile": "20px",
                        "sm": "16px",
                        "margin-desktop": "60px",
                        "base": "4px"
                    },
                    "fontFamily": {
                        "headline-lg-mobile": ["Geist"],
                        "label-md": ["Geist"],
                        "headline-md": ["Geist"],
                        "headline-lg": ["Geist"],
                        "label-sm": ["Geist"],
                        "body-md": ["Geist"],
                        "display": ["Geist"],
                        "body-lg": ["Geist"]
                    },
                    "fontSize": {
                        "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "500"}],
                        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "headline-md": ["20px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "500"}],
                        "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "400"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "display": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-surface text-on-surface selection:bg-primary-fixed">
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl transition-all duration-500 ease-in-out">
<div class="flex justify-between items-center px-margin-desktop py-md max-w-[1440px] mx-auto">
<div class="flex items-center gap-md">
<span class="font-display text-display text-on-surface tracking-tighter">Unidrop</span>
</div>
<div class="flex items-center gap-sm">
<button class="material-symbols-outlined text-on-surface-variant hover:opacity-70 transition-opacity duration-300 p-base" data-icon="search">search</button>
<button class="material-symbols-outlined text-on-surface-variant hover:opacity-70 transition-opacity duration-300 p-base" data-icon="add">add</button>
<div class="w-8 h-8 rounded-full bg-surface-container-high ml-xs overflow-hidden border border-outline-variant">
<img alt="Profile" class="w-full h-full object-cover" data-alt="A clean and professional headshot of a person with a serene expression, set against a solid, neutral gray background. The lighting is soft and even, highlighting the minimalist and modern aesthetic of the overall UI. The person has a modern hairstyle and the focus is sharp and clear." src="[https://lh3.googleusercontent.com/aida-public/AB6AXuDKDimq8u72IwMyAsSS1tjAI1LMCCbTNSsytPgAqjx57yMhzphY1_56QKvAfqvwI4uRoGTML1xnnT-czaazJI0YLRZr5j6xdl_aSrX5z65ikguJTQTtpkOUsc90WuHFTMWXBrgSD-wgm-fR7i-JhUTNC2pysvJewQbph-GQ60rrQocUIc3tBXrJuxH01IpD3RDaDizA8GcRrGwYn-sfAzWzIyaFQnYnQo5TzDUWeNcPSHwat5pVUkPY9j8e4Z8tULOtFJWMWOBrILp2](https://lh3.googleusercontent.com/aida-public/AB6AXuDKDimq8u72IwMyAsSS1tjAI1LMCCbTNSsytPgAqjx57yMhzphY1_56QKvAfqvwI4uRoGTML1xnnT-czaazJI0YLRZr5j6xdl_aSrX5z65ikguJTQTtpkOUsc90WuHFTMWXBrgSD-wgm-fR7i-JhUTNC2pysvJewQbph-GQ60rrQocUIc3tBXrJuxH01IpD3RDaDizA8GcRrGwYn-sfAzWzIyaFQnYnQo5TzDUWeNcPSHwat5pVUkPY9j8e4Z8tULOtFJWMWOBrILp2)"/>
</div>
</div>
</div>
</header>
<main class="pt-[120px] pb-xl px-margin-desktop max-w-[1440px] mx-auto flex flex-col md:flex-row gap-xl min-h-screen">
<aside class="w-full md:w-64 flex flex-col space-y-xs">
<div class="mb-lg px-sm">
<h1 class="font-headline-md text-headline-md text-on-surface">Library</h1>
<p class="font-label-sm text-label-sm text-on-surface-variant">Organized by AI</p>
</div>
<nav class="flex flex-col space-y-base">
<a class="flex items-center gap-sm px-sm py-md text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="all_inclusive">all_inclusive</span>
<span>All Drops</span>
</a>
<a class="flex items-center gap-sm px-sm py-md text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span>Notes</span>
</a>
<a class="flex items-center gap-sm px-sm py-md text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="image">image</span>
<span>Images</span>
</a>
<a class="flex items-center gap-sm px-sm py-md text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="link">link</span>
<span>Links</span>
</a>
<a class="flex items-center gap-sm px-sm py-md bg-secondary-container text-on-secondary-container font-medium font-label-md text-label-md rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</a>
<a class="flex items-center gap-sm px-sm py-md text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant transition-colors rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="archive">archive</span>
<span>Archive</span>
</a>
</nav>
<div class="pt-lg px-sm">
<button class="w-full bg-primary text-on-primary py-sm px-md rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity">
                    New Collection
                </button>
</div>
</aside>
<section class="flex-1 max-w-3xl">
<header class="mb-xl">
<h2 class="font-headline-lg text-headline-lg mb-xs">Settings</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Manage your digital archive and AI preferences.</p>
</header>
<div class="space-y-xl">
<section id="account">
<h3 class="font-label-md text-label-md text-outline mb-md uppercase tracking-widest">Account</h3>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md space-y-md">
<div class="flex items-center justify-between">
<div>
<p class="font-label-md text-label-md">Email Address</p>
<p class="font-body-md text-body-md text-on-surface-variant">alex.rivera@zenitharchive.io</p>
</div>
<button class="text-primary font-label-md text-label-md hover:underline">Change</button>
</div>
<div class="h-px bg-outline-variant/20 w-full"></div>
<div class="flex items-center justify-between">
<div>
<p class="font-label-md text-label-md">Password</p>
<p class="font-body-md text-body-md text-on-surface-variant">••••••••••••</p>
</div>
<button class="text-primary font-label-md text-label-md hover:underline">Reset</button>
</div>
</div>
</section>
<section id="ai-analysis">
<div class="flex items-center justify-between mb-md">
<h3 class="font-label-md text-label-md text-outline uppercase tracking-widest">AI Analysis Settings</h3>
<span class="px-xs py-base bg-primary-fixed text-on-primary-fixed rounded font-label-sm text-label-sm">BETA</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden">
<div class="p-md flex items-start justify-between hover:bg-surface-container-low transition-colors group">
<div class="max-w-[80%]">
<p class="font-label-md text-label-md">Grok Feature: Automatic Categorization</p>
<p class="font-body-md text-body-md text-on-surface-variant mt-xs">Use AI to automatically sort new drops into themed folders based on content and context.</p>
</div>
<label class="relative inline-flex items-center cursor-pointer mt-base">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div class="h-px bg-outline-variant/20 w-full"></div>
<div class="p-md flex items-start justify-between hover:bg-surface-container-low transition-colors group">
<div class="max-w-[80%]">
<p class="font-label-md text-label-md">Grok Feature: Semantic Search Enhancement</p>
<p class="font-body-md text-body-md text-on-surface-variant mt-xs">Deep-index image content and document text for more accurate retrieval through natural language queries.</p>
</div>
<label class="relative inline-flex items-center cursor-pointer mt-base">
<input checked="" class="sr-only peer" type="checkbox"/>
<div class="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</section>
<section id="integrations">
<h3 class="font-label-md text-label-md text-outline mb-md uppercase tracking-widest">Integrations</h3>
<div class="masonry-grid">
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex flex-col justify-between h-[160px] hover:shadow-lg transition-shadow duration-500">
<div class="flex items-center justify-between">
<span class="material-symbols-outlined text-display" data-icon="extension">extension</span>
<span class="px-xs py-base bg-on-tertiary-container/10 text-on-tertiary-container rounded font-label-sm text-label-sm">Active</span>
</div>
<div>
<p class="font-label-md text-label-md">Browser Extension</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Version 2.4.1</p>
</div>
</div>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex flex-col justify-between h-[160px] hover:shadow-lg transition-shadow duration-500">
<div class="flex items-center justify-between">
<span class="material-symbols-outlined text-display" data-icon="smartphone">smartphone</span>
<button class="text-primary font-label-sm text-label-sm">Connect</button>
</div>
<div>
<p class="font-label-md text-label-md">Mobile App</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Not Linked</p>
</div>
</div>
</div>
</section>
<section id="export">
<h3 class="font-label-md text-label-md text-outline mb-md uppercase tracking-widest">Export Data</h3>
<div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md">
<div class="flex items-center gap-md">
<div class="p-sm bg-surface-container-low rounded-lg">
<span class="material-symbols-outlined" data-icon="download">download</span>
</div>
<div class="flex-1">
<p class="font-label-md text-label-md">Download Archive</p>
<p class="font-body-md text-body-md text-on-surface-variant mt-xs">Download all your stored drops, notes, and metadata in a structured JSON format.</p>
</div>
<button class="bg-tertiary text-on-tertiary py-xs px-md rounded-lg font-label-md text-label-md hover:opacity-80 transition-opacity">
                                Generate Export
                            </button>
</div>
</div>
</section>
<section class="pt-xl border-t border-outline-variant/20" id="danger">
<h3 class="font-label-md text-label-md text-error mb-md uppercase tracking-widest">Danger Zone</h3>
<div class="bg-error-container/20 border border-error/20 rounded-xl p-md flex items-center justify-between">
<div>
<p class="font-label-md text-label-md text-error">Delete Account</p>
<p class="font-body-md text-body-md text-on-surface-variant">Permanently remove all data and metadata. This action cannot be undone.</p>
</div>
<button class="border border-error text-error py-xs px-md rounded-lg font-label-md text-label-md hover:bg-error hover:text-on-error transition-colors">
                            Delete
                        </button>
</div>
</section>
</div>
</section>
</main>
<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
<div class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-fixed/20 blur-[120px] rounded-full"></div>
<div class="absolute bottom-[5%] right-[-10%] w-[35%] h-[35%] bg-secondary-fixed/20 blur-[100px] rounded-full"></div>
</div>
<script>
        // Simple Interaction: Smooth Scroll for internal navigation (if needed)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Atmospheric effect: Subtle parallax on background blur
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const blurs = document.querySelectorAll('.blur-\\[120px\\], .blur-\\[100px\\]');
            blurs.forEach((blur, index) => {
                const multiplier = (index + 1) * 20;
                blur.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
            });
        });
    </script>
</body></html>

```