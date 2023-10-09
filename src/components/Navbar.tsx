'use client'
import { useUser, UserButton } from '@clerk/nextjs'
export default function Navbar() {
    const { user } = useUser()

    return (
        <nav className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between bg-slate-950 px-8 py-2">
            <a href="/" className="flex flex-row items-center gap-2">
                <img src="tourn.png" className="h-12" />
                <h1 className="text-2xl font-semibold text-white">tourn</h1>
            </a>

            {user === undefined ? null : user ? (
                <div>
                    <UserButton afterSignOutUrl="/" />
                </div>
            ) : (
                <div className="flex flex-row items-center justify-center gap-8">
                    <a href="/sign-in" className="hover:text-blue-500">
                        Log in
                    </a>
                    <a
                        href="/sign-up"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 font-semibold text-white shadow-2xl"
                    >
                        {/* ... rest of your code ... */}
                        <span className="relative">Sign Up</span>
                    </a>
                </div>
            )}
        </nav>
    )
}
