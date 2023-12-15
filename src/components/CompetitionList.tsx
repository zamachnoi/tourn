'use client'
import React, { useState, useEffect } from 'react'
import { CompetitionCard, CompetitionProps } from './CompetitionCard'
import CompetitionCardPlaceHolder from './CompetitionCardPlaceHolder'

export interface CompetitionsListProps {
    competitions: CompetitionProps['data'][]
    userCompetitions: string[]
    onCompetitionDeleted: (competitionId: string) => void
}

async function getCompetitions() {
    console.log('called fetch')
    const res = await fetch('/api/competitions', {
        cache: 'no-store',
    })

    const competitions = await res.json()
    return competitions
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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setCompetitions(props.competitions)
        if (props.competitions.length > 0) setIsLoading(false)

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

    return (
        <div className="grid grid-flow-row-dense grid-cols-3 justify-items-start gap-2 transition-all ease-linear">
            {isLoading
                ? Array.from({ length: 9 }, (_, index) => (
                      <CompetitionCardPlaceHolder key={index} />
                  ))
                : competitions.map((competition) => (
                      <CompetitionCard
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
