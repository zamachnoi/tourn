'use client'
import React, { useState, useEffect } from 'react'
import { getCompetitions } from '@/app/competitions/page'
import { Competition, CompetitionProps } from './CompetitionInList'

export interface CompetitionsListProps {
    competitions: CompetitionProps['data'][]
    userCompetitions: string[]
    onCompetitionDeleted: (competitionId: string) => void
}
export interface CompetitionData {
    competitions: CompetitionProps['data'][]
    pagination: {
        currentPage: number
        totalPages: number
        limit: number
        totalRecords: number
    }
}

export function CompetitionList(props: CompetitionsListProps) {
    // Initialize state with competitions from props

    const [competitions, setCompetitions] = useState<
        CompetitionProps['data'][]
    >(props.competitions)
    const [userJoinedCompetitions, setUserJoinedCompetitions] = useState(
        props.userCompetitions
    )

    useEffect(() => {
        setCompetitions(props.competitions)
        setUserJoinedCompetitions(props.userCompetitions)
    }, [props.competitions])

    // Function to refresh the list of competitions
    const refreshCompetitions = async () => {
        // Fetch new competitions data
        const updatedCompetitions = await getCompetitions()
        setCompetitions(updatedCompetitions.competitions)

        // Update user competitions
        const userComps = updatedCompetitions.competitions.map(
            (competition: any) => competition.competitionId
        )
        setUserJoinedCompetitions(userComps)
    }

    const removeCompetition = (competitionId: string) => {
        setCompetitions((prevState) => {
            // Filter out the competition with the given ID
            const updatedCompetitions = prevState.filter(
                (comp) => comp.competitionId !== competitionId
            )

            return updatedCompetitions // Return the updated array
        })
        props.onCompetitionDeleted(competitionId)
    }
    return (
        <div className="grid grid-flow-row-dense grid-cols-3 justify-items-start gap-2 transition-all ease-linear">
            {competitions.map((competition) => (
                <Competition
                    key={competition.competitionId}
                    data={competition}
                    userInComp={userJoinedCompetitions.includes(
                        competition.competitionId
                    )}
                    // onCompetitionDeleted={() => {}}
                />
            ))}
        </div>
    )
}
