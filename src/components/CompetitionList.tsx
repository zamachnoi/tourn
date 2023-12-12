'use client'
import React, { useState, useEffect } from 'react'
import { getCompetitions } from '@/app/competitions/page'
import { Comp, CompetitionProps } from './Competition'

export interface CompetitionsListProps {
    competitions: CompetitionProps['data'][]
    userCompetitions: string[]
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
    const [competitions, setCompetitions] = useState(props.competitions)
    const [userCompetitions, setUserCompetitions] = useState(
        props.userCompetitions
    )

    useEffect(() => {
        setCompetitions(props.competitions)
        setUserCompetitions(props.userCompetitions)
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
        setUserCompetitions(userComps)
    }

    return (
        <div className="flex w-full flex-row justify-center gap-2">
            {competitions.map((competition) => (
                <Comp
                    key={competition.competitionId}
                    data={competition}
                    userInComp={userCompetitions.includes(
                        competition.competitionId
                    )}
                    onCompetitionDeleted={refreshCompetitions}
                />
            ))}
        </div>
    )
}
