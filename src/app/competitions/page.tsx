'use client'
import { CompetitionProps } from '@/components/CompetitionCard'
import { CompetitionList, CompetitionData } from '@/components/CompetitionList'
import CreateCompetition from '@/components/CreateCompetition'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

export async function getCompetitions() {
    console.log('called fetch')
    const res = await fetch('/api/competitions', {
        cache: 'no-store',
    })

    const competitions = await res.json()
    return competitions
}

export default function Page() {
    const [userJoinedCompetitions, setUserJoinedCompetitions] = useState<
        string[]
    >([])
    const [competitions, setCompetitions] = useState<CompetitionData>({
        competitions: [],
        pagination: {
            currentPage: 0,
            totalPages: 0,
            limit: 1,
            totalRecords: 0,
        },
    })

    const { isLoading } = useQuery('competitions', getCompetitions, {
        onSuccess: (data) => {
            setCompetitions(data)
            const userComps = data.userCompetitions.map(
                (competition: any) => competition.competitionId
            )
            setUserJoinedCompetitions(userComps)
        },
    })

    const removeCompetition = (competitionId: string) => {
        setCompetitions((prevState) => ({
            ...prevState,
            competitions: prevState.competitions.filter(
                (comp) => comp.competitionId !== competitionId
            ),
            pagination: {
                ...prevState.pagination,
                totalRecords: prevState.pagination.totalRecords - 1,
            },
        }))
    }

    const onCompetitionCreated = (newCompetition: CompetitionProps['data']) => {
        setCompetitions((prevState) => {
            // Check if the new competition is already in the state
            const isAlreadyPresent = prevState.competitions.some(
                (comp) => comp.competitionId === newCompetition.competitionId
            )
            if (isAlreadyPresent) {
                return prevState // Return the current state if it's already present
            }
            return {
                ...prevState,
                competitions: [...prevState.competitions, newCompetition],
                pagination: {
                    ...prevState.pagination,
                    totalRecords: prevState.pagination.totalRecords + 1,
                },
            }
        })
    }

    return (
        <div className="flex h-[calc(100vh-74px)] flex-col overflow-auto bg-gradient-to-t from-slate-950 to-slate-900">
            {!isLoading && (
                <div className="sticky top-0 z-10 flex h-0 w-full justify-end">
                    <div className="mr-10">
                        <CreateCompetition
                            onCompetitionCreated={onCompetitionCreated}
                        />
                    </div>
                </div>
            )}

            <div className="top-0 flex w-full justify-center">
                <CompetitionList
                    competitions={competitions.competitions}
                    userCompetitions={userJoinedCompetitions}
                    onCompetitionDeleted={removeCompetition}
                />
            </div>
        </div>
    )
}
