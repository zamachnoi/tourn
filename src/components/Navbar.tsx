export default function Navbar() {
    const loggedIn = false
    return (
        <nav className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between bg-slate-950 px-8 py-2">
            <a href="/" className="flex flex-row items-center gap-2">
                <img src="beatbank.png" className="h-12" />
                <h1 className="text-2xl font-semibold text-white">beatbank</h1>
            </a>

            {loggedIn ? (
                <div></div>
            ) : (
                <div className="flex flex-row items-center justify-center gap-8">
                    <a href="/login" className="hover:text-blue-500">
                        Log in
                    </a>
                    <a
                        href="/signup"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 font-semibold text-white shadow-2xl"
                    >
                        <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-900 via-purple-700 to-blue-400 opacity-0 transition duration-300 ease-out group-hover:opacity-100"></span>
                        <span className="absolute left-0 top-0 h-1/3 w-full bg-gradient-to-b from-white to-transparent opacity-5"></span>
                        <span className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-white to-transparent opacity-5"></span>
                        <span className="absolute bottom-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent opacity-5"></span>
                        <span className="absolute bottom-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent opacity-5"></span>
                        <span className="absolute inset-0 h-full w-full rounded-md border border-white opacity-10"></span>
                        <span className="absolute h-0 w-0 rounded-full bg-white opacity-5 transition-all duration-300 ease-out group-hover:h-56 group-hover:w-56"></span>
                        <span className="relative">Sign Up</span>
                    </a>
                </div>
            )}
        </nav>
    )
}
