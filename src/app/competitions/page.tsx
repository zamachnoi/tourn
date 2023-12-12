'use client'
import { CompetitionList, CompetitionData } from '@/components/CompetitionList'
import CreateCompetition from '@/components/CreateCompetition'
import { useState, useEffect } from 'react'

export async function getCompetitions() {
    const res = await fetch('/api/competitions', {
        cache: 'no-store',
    })

    const competitions = await res.json()
    return competitions
}

export default function Page() {
    const [userCompetitions, setUserCompetitions] = useState<string[]>([])
    const [competitions, setCompetitions] = useState<CompetitionData>({
        competitions: [],
        pagination: {
            currentPage: 0,
            totalPages: 0,
            limit: 1,
            totalRecords: 0,
        },
    })

    const refreshCompetitionList = async () => {
        const fetchedCompetitions = await getCompetitions()
        setCompetitions(fetchedCompetitions)
        const userComps = fetchedCompetitions.userCompetitions.map(
            (competition: any) => competition.competitionId
        )
        setUserCompetitions(userComps)
    }

    useEffect(() => {
        refreshCompetitionList()
    }, [])

    return (
        <div className="flex h-[calc(100vh-74px)] flex-col items-center overflow-auto bg-gradient-to-t from-slate-950 to-slate-900">
            <CompetitionList
                competitions={competitions.competitions}
                userCompetitions={userCompetitions}
            />
            <CreateCompetition onCompetitionCreated={refreshCompetitionList} />
        </div>
    )
}
