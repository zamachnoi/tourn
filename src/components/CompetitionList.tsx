'use client'
import { Competition, CompetitionProps } from './Competition'
import React, { useState, useEffect } from 'react'
import { getCompetitions } from '@/app/competitions/page'

export interface CompetitionsListProps {
    competitions: CompetitionProps['data'][]
}

export function CompetitionList(props: CompetitionsListProps) {
    // Initialize state with competitions from props
    const [competitions, setCompetitions] = useState(props.competitions)

    useEffect(() => {
        setCompetitions(props.competitions)
    }, [props.competitions])

    // Function to refresh the list of competitions
    const refreshCompetitions = async () => {
        // Fetch new competitions data
        const updatedCompetitions = await getCompetitions()
        setCompetitions(updatedCompetitions.competitions)
    }

    return (
        <div className="flex w-full flex-row justify-center">
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
