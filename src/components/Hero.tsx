import { UserButton } from '@clerk/nextjs'

export default function () {
    return (
        <section className="flex h-[calc(100vh-74px)] flex-col overflow-auto bg-gradient-to-t from-slate-950 to-slate-900">
            <div className="mt-32 flex flex-col items-center justify-center">
                <div className="w-2/5 text-center text-6xl font-semibold">
                    <h3 className="">
                        Turn game nights into{' '}
                        <span className="text-blue-400">spotlights</span>
                    </h3>
                </div>
            </div>
        </section>
    )
}
