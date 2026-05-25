import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJWT } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function CollectionsPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) redirect('/signin')
    const user = verifyJWT(token)
    if (!user) redirect('/signin')

    const items = await prisma.item.findMany({
      where: { userId: user.userId },
      include: { tags: true },
      orderBy: { createdAt: 'desc' }
    });

    const tagsMap = new Map();
    items.forEach(item => {
      item.tags?.forEach(tag => {
        if (!tagsMap.has(tag.name)) {
          tagsMap.set(tag.name, { count: 1, items: [item] });
        } else {
          const t = tagsMap.get(tag.name);
          t.count++;
          t.items.push(item);
        }
      });
    });
    
    const uniqueTags = Array.from(tagsMap.entries()).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.count - a.count);

    return (
        <main className="md:ml-64 pt-32 pb-24 px-4 md:px-12 min-h-screen max-w-[1440px] mx-auto">
            <header className="mb-12 max-w-[1440px] mx-auto">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl font-semibold text-on-surface tracking-tighter">Collections</h1>
                        <p className="text-on-surface-variant mt-2 opacity-70">Curated by AI intelligence from your recent drops.</p>
                    </div>
                    <div className="hidden md:flex space-x-2">
                        <span className="px-4 py-1.5 bg-surface-container rounded-full text-xs cursor-pointer hover:bg-surface-variant transition-all font-medium">Recent</span>
                        <span className="px-4 py-1.5 text-xs cursor-pointer hover:opacity-60 transition-all font-medium">A-Z</span>
                    </div>
                </div>
            </header>
            
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {uniqueTags.map(tag => (
                    <Link key={tag.name} href={`/dashboard?tag=${tag.name}`} className="group cursor-pointer transition-all duration-500">
                        <div className="aspect-[4/5] bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden mb-3 relative hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                            <div className="grid grid-cols-2 grid-rows-2 h-full gap-[2px] bg-surface-container">
                                {tag.items.slice(0, 4).map((item, i) => (
                                    <div key={i} className="overflow-hidden bg-surface-container-high h-full w-full relative">
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center p-3 text-xs overflow-hidden text-on-surface-variant break-words text-center bg-surface-container-low group-hover:scale-105 transition-transform duration-700">
                                                <span className="line-clamp-4">{item.title || item.content}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {/* Fill empty slots if < 4 items */}
                                {Array.from({ length: Math.max(0, 4 - tag.items.length) }).map((_, i) => (
                                    <div key={`empty-${i}`} className="bg-surface-container-low h-full w-full"></div>
                                ))}
                            </div>
                        </div>
                        <div className="px-2">
                            <h3 className="font-semibold text-lg text-on-surface capitalize">{tag.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-on-surface-variant font-medium">{tag.count} Items</span>
                                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                                <span className="text-xs text-on-surface-variant">Updated recently</span>
                            </div>
                        </div>
                    </Link>
                ))}
                
                {/* Create New Collection Tile */}
                <div className="group cursor-pointer transition-all duration-500">
                    <div className="aspect-[4/5] border-2 border-dashed border-outline-variant/50 rounded-xl flex flex-col items-center justify-center space-y-4 hover:border-primary/40 transition-all duration-500 bg-surface-container-low/30 hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">
                            <span className="text-2xl font-light">+</span>
                        </div>
                        <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">Create New Collection</span>
                    </div>
                </div>
            </section>
        </main>
    )
}
