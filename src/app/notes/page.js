import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJWT } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import { Sparkles, FileText } from 'lucide-react'

export default async function NotesPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) redirect('/signin')
    const user = verifyJWT(token)
    if (!user) redirect('/signin')

    const notes = await prisma.item.findMany({
      where: { userId: user.userId, type: 'TEXT' },
      include: { tags: true },
      orderBy: { createdAt: 'desc' }
    });

    const colors = [
        'bg-[#f0f4f9]', // Blue tint
        'bg-surface-container-low', // Gray
        'bg-[#faf7f2]', // Warm tint
        'bg-[#eff6ff]', // Light blue
        'bg-[#fdfaf2]', // Light yellow
    ];

    return (
        <main className="md:ml-64 pt-24 min-h-screen px-4 md:px-8 max-w-[1440px] mx-auto pb-24">
            <header className="py-12 max-w-[1200px] mx-auto">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl font-semibold text-on-surface mb-3 tracking-tighter">Notes</h1>
                        <p className="font-body-lg text-lg text-on-surface-variant max-w-xl">Your digital subconscious, captured as text-based memes and ephemeral thoughts.</p>
                    </div>
                    <div className="hidden lg:block">
                        <div className="flex -space-x-2">
                            <div className="h-8 w-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">AI</div>
                            <div className="h-8 w-8 rounded-full border-2 border-surface bg-primary text-on-primary flex items-center justify-center">
                                <Sparkles className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-[1200px] mx-auto pb-12">
                {notes.map((note, index) => {
                    const bgClass = colors[index % colors.length];
                    const isShort = note.content.length < 60;
                    
                    return (
                        <div key={note.id} className={`inline-block w-full break-inside-avoid mb-6 p-6 rounded-2xl ${bgClass} border border-outline-variant/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                            <p className={`${isShort ? 'font-display text-2xl md:text-3xl text-primary font-medium tracking-tight leading-tight' : 'font-body-md text-base leading-relaxed text-on-surface-variant'}`}>
                                {isShort ? `"${note.content}"` : note.content}
                            </p>
                            <div className="flex items-center justify-between mt-6 opacity-40">
                                <span className="font-label-sm text-xs font-medium">#{note.tags?.[0]?.name || 'note'}</span>
                                <FileText className="w-4 h-4" />
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {notes.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-20 text-on-surface-variant max-w-[1200px] mx-auto">
                    <FileText className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-lg font-medium">No notes found.</p>
                    <p className="text-sm opacity-60">Paste some text in the dashboard to save notes.</p>
                </div>
            )}
        </main>
    )
}
