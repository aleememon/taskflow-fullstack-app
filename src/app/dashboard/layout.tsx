import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col text-zinc-100">
            {/* Dashboard Top Header */}
            <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold text-zinc-100">
                    TaskFlow <span className="text-orange-500">Workspace</span>
                </h1>
                <div className="text-sm text-zinc-400 font-medium">Server-Side Rendering SSR Page</div>
            </header>

            {/* Main Container */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-6">
                {children}
            </main>
        </div>
    )
}