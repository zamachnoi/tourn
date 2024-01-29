'use client'

import useSWR from 'swr'
import CompetitionView from '@/components/CompetitionView'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id as string
    if (!id) {
        return <div>No competition ID found.</div>
    }

    const competitionData = await fetch(
        `localhost:3000/api/competitions/${id}`
    ).then((res) => res.json())

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
