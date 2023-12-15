import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between bg-slate-950 px-8 py-2">
            <a href="/" className="flex flex-row items-center gap-2">
                <Image src="/tourn.png" height={48} width={48} alt="tourn" />
                <h1 className="text-2xl font-semibold text-white">tourn</h1>
            </a>
            {auth().userId ? (
                <div className="flex flex-row items-center justify-center gap-8">
                    <a href="/competitions" className="hover:text-green-400">
                        Competitions
                    </a>
                    <UserButton afterSignOutUrl="/" />
                </div>
            ) : (
                <div className="flex flex-row items-center justify-center gap-8">
                    <a href="/sign-in" className="hover:text-green-400">
                        Log in
                    </a>
                    <a
                        href="/sign-up"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 font-semibold text-white shadow-2xl"
                    >
                        <span className="relative">Sign Up</span>
                    </a>
                </div>
            )}
        </nav>
    )
}
