'use client'
import { Competition, CompetitionProps } from './Competition'
import React, { useState } from 'react'
import { getCompetitions } from '@/app/competitions/page'

export interface CompetitionsListProps {
    competitions: CompetitionProps['data'][]
}

export function CompetitionsList(props: CompetitionsListProps) {
    // Initialize state with competitions from props
    const [competitions, setCompetitions] = useState(props.competitions)

    // Function to refresh the list of competitions
    const refreshCompetitions = async () => {
        // Fetch new competitions data
        const updatedCompetitions = await getCompetitions(null)
        setCompetitions(updatedCompetitions.competitions)
    }

    return (
        <div className="flex flex-row justify-center">
            {competitions.map((competition) => (
                <Competition
                    key={competition.competitionId}
                    data={competition}
                    onCompetitionDeleted={refreshCompetitions}
                />
            ))}
        </div>
    )
}
