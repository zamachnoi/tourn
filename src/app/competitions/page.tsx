import CreateCompetition from '@/components/CreateCompetition'
export default function Page() {
    return (
        <div className="flex h-[calc(100vh-74px)] flex-col items-center overflow-auto bg-gradient-to-t from-slate-950 to-slate-900">
            <h2 className="my-4 text-4xl font-semibold">Competitions</h2>
            <CreateCompetition />
        </div>
    )
}
