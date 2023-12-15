import { CompetitionProps } from '@/components/CompetitionCard'
import { getCompData } from '@/app/api/competitions/[id]/route'
import CompetitionView from '@/components/CompetitionView'

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id as string
    if (!id) {
        return <div>No competition ID found.</div>
    }

    const competitionData = (await getCompData(id)) as CompetitionProps['data']

    if (!competitionData) {
        return <div>No competition data found.</div>
    }

    return (
        <>
            <CompetitionView
                data={competitionData}
                userInComp={false}
                // onCompetitionDeleted={() => {}}
            />
        </>
    )
}
