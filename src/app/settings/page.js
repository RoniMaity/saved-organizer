import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJWT } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import { Puzzle, Smartphone, Download } from 'lucide-react'

export default async function SettingsPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) redirect('/signin')
    const user = verifyJWT(token)
    if (!user) redirect('/signin')

    const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });

    return (
        <main className="md:ml-64 pt-32 pb-24 px-4 md:px-12 min-h-screen max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12">
            
            {/* Atmospheric Background Blurs from Design Spec */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[5%] right-[-10%] w-[35%] h-[35%] bg-secondary-container/30 blur-[100px] rounded-full"></div>
            </div>

            <section className="flex-1 max-w-3xl">
                <header className="mb-12">
                    <h2 className="font-display text-4xl font-semibold mb-2 tracking-tighter">Settings</h2>
                    <p className="font-body-md text-on-surface-variant">Manage your digital archive and AI preferences.</p>
                </header>
                
                <div className="space-y-12">
                    {/* Account Section */}
                    <section id="account">
                        <h3 className="text-xs font-semibold text-outline-variant mb-4 uppercase tracking-widest">Account</h3>
                        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 space-y-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Email Address</p>
                                    <p className="text-sm text-on-surface-variant mt-1">{dbUser?.email}</p>
                                </div>
                                <button className="text-primary text-sm font-medium hover:underline">Change</button>
                            </div>
                            <div className="h-px bg-outline-variant/20 w-full"></div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Password</p>
                                    <p className="text-sm text-on-surface-variant mt-1">••••••••••••</p>
                                </div>
                                <button className="text-primary text-sm font-medium hover:underline">Reset</button>
                            </div>
                        </div>
                    </section>
                    
                    {/* AI Analysis Settings */}
                    <section id="ai-analysis">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-semibold text-outline-variant uppercase tracking-widest">AI Analysis Settings</h3>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold tracking-wider">BETA</span>
                        </div>
                        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6 flex items-start justify-between hover:bg-surface-container-low transition-colors group">
                                <div className="max-w-[80%]">
                                    <p className="text-sm font-medium">Grok Feature: Automatic Categorization</p>
                                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Use AI to automatically sort new drops into themed folders based on content and context.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer mt-1">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="h-px bg-outline-variant/20 w-full"></div>
                            <div className="p-6 flex items-start justify-between hover:bg-surface-container-low transition-colors group">
                                <div className="max-w-[80%]">
                                    <p className="text-sm font-medium">Grok Feature: Semantic Search Enhancement</p>
                                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Deep-index image content and document text for more accurate retrieval through natural language queries.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer mt-1">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Integrations */}
                    <section id="integrations">
                        <h3 className="text-xs font-semibold text-outline-variant mb-4 uppercase tracking-widest">Integrations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 flex flex-col justify-between h-[150px] hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center justify-between">
                                    <Puzzle className="w-8 h-8 text-primary opacity-80" />
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-medium tracking-wide">Active</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Browser Extension</p>
                                    <p className="text-xs text-on-surface-variant mt-1">Version 2.4.1</p>
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 flex flex-col justify-between h-[150px] hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center justify-between">
                                    <Smartphone className="w-8 h-8 text-primary opacity-80" />
                                    <button className="text-primary text-xs font-medium hover:underline">Connect</button>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Mobile App</p>
                                    <p className="text-xs text-on-surface-variant mt-1">Not Linked</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Export Data */}
                    <section id="export">
                        <h3 className="text-xs font-semibold text-outline-variant mb-4 uppercase tracking-widest">Export Data</h3>
                        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                <div className="p-4 bg-surface-container-low rounded-xl shrink-0">
                                    <Download className="w-6 h-6 text-on-surface-variant" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Download Archive</p>
                                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Download all your stored drops, notes, and metadata in a structured JSON format.</p>
                                </div>
                                <button className="bg-primary text-white py-2 px-5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shrink-0">
                                    Generate Export
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Danger Zone */}
                    <section id="danger" className="pt-8 border-t border-outline-variant/20">
                        <h3 className="text-xs font-semibold text-error mb-4 uppercase tracking-widest">Danger Zone</h3>
                        <div className="bg-error/5 border border-error/20 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-error">Delete Account</p>
                                <p className="text-sm text-on-surface-variant mt-1">Permanently remove all data and metadata. This action cannot be undone.</p>
                            </div>
                            <button className="border border-error text-error py-2 px-6 rounded-lg text-sm font-medium hover:bg-error hover:text-white transition-colors shrink-0">
                                Delete
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    )
}
