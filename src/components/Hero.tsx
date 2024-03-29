import { auth } from '@clerk/nextjs'

export default function Hero() {
    return (
        <section className="flex h-[calc(100vh-74px)] flex-col overflow-auto bg-gradient-to-t from-slate-950 to-slate-900">
            <div className="flex max-h-full flex-row justify-around">
                <div className="ml-20 mt-16 flex w-max flex-col justify-center pl-12">
                    <div className="flex flex-col text-6xl font-bold">
                        <h3 className="">Put your game nights</h3>
                        <h3 className="text-green-400">under the spotlight</h3>
                    </div>
                    <div className="mt-2 flex flex-col text-xl font-light text-gray-200">
                        <p>
                            Create tournaments, draft teams, and track scores.
                        </p>
                        <p>
                            Tourn is the place to compete with your community.
                        </p>
                    </div>
                    <div className="mr-20 flex flex-row justify-center pt-4">
                        <a
                            href={auth().userId ? '/competitions' : '/sign-in'}
                            className="group relative inline-block text-lg"
                        >
                            <span className="relative z-10 block overflow-hidden rounded-lg border-2 border-green-400 px-5 py-3 font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out group-hover:text-white">
                                <span className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 px-5 py-3"></span>
                                <span className="ease absolute left-0 -ml-2 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-green-400 transition-all duration-300 group-hover:-rotate-180"></span>
                                <span className="relative">Get Started</span>
                            </span>
                            <span
                                className="absolute bottom-0 right-0 -mb-1 -mr-1 h-12 w-full rounded-lg bg-green-400 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
                                data-rounded="rounded-lg"
                            ></span>
                        </a>
                    </div>
                </div>
                <div className="mr-20 mt-20 flex flex-col justify-center">
                    <img
                        src="/trophy.webp"
                        alt="Tourn Hero"
                        className="aspect-square h-[500px] w-[500px]"
                    />
                </div>
            </div>
        </section>
    )
}
