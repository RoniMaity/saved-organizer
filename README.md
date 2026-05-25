# Unidrop (Zenith Archive)

**A cross-platform, minimalist memory hub.**

Unidrop is designed to be the ultimate, frictionless repository for your digital life. Whether it's a link, an image, a note, or an article, drop it here and let the system organize it for you. 

## 🏗️ Hub and Spoke Architecture

Unidrop utilizes a "Hub and Spoke" architecture:
- **The Hub (Central API):** A robust Next.js serverless API acts as the central brain. It handles authentication, data ingestion, database transactions, and AI processing.
- **The Spokes (Clients):** 
  - **Web Dashboard:** A Minimalist Zen interface for browsing and searching your archive.
  - **Browser Extension:** (Planned) For instant saving while browsing the web.
  - **Mobile App:** (Planned) For saving on-the-go via the native iOS/Android share sheet.

Every Spoke talks to the same universal `/api/save` endpoint on the Hub.

## 🤖 100% Automated Categorization (Zero Folders)

We believe manual organization is a waste of time. Unidrop uses zero manual folders. 
When a link or text is saved, the system automatically:
1. **Scrapes** the content using **Apify** (for complex sites like Instagram or Twitter).
2. **Analyzes** the raw text/images.
3. **Categorizes & Tags** the item instantly using **Grok API** (fast, open-source AI inference).

Your library is automatically sorted into intelligent "Collections" without you lifting a finger.

## 💻 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL managed by Prisma ORM
- **Authentication:** Custom JWT with HttpOnly cookies
- **AI / Scraping:** Grok API + Apify

## 🚀 Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Set up your `.env` file with your database and API credentials (see `.env.example`).
3. Run the Prisma migrations:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy
Unidrop follows a strictly minimalist aesthetic. The UI should be invisible until needed, ensuring the user's saved content remains the primary focus. We use generous whitespace, crisp Geist typography, and subtle glassmorphic effects to create a serene digital environment.
