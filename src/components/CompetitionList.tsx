'use client'
import React, { useState, useEffect } from 'react'
import { CompetitionCard, CompetitionProps } from './CompetitionCard'
import CompetitionCardPlaceHolder from './CompetitionCardPlaceHolder'

export interface CompetitionsListProps {
    competitions: CompetitionProps['data'][]
    userCompetitions: string[]
    limit: string
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
    const {
        limit,
        competitions: initialCompetitions,
        userCompetitions: initialUserCompetitions,
    } = props
    const [competitions, setCompetitions] =
        useState<CompetitionProps['data'][]>(initialCompetitions)
    const [userJoinedCompetitions, setUserJoinedCompetitions] = useState(
        initialUserCompetitions
    )
    const [isLoading, setIsLoading] = useState(true)

    const customLimit = limit // Declare a new variable to store the value of props.limit

    useEffect(() => {
        setCompetitions(initialCompetitions)
        if (initialCompetitions.length > 0) setIsLoading(false)

        setUserJoinedCompetitions(initialUserCompetitions)
    }, [initialCompetitions])

    return (
        <div className="grid grid-flow-row-dense grid-cols-3 justify-items-start gap-2 transition-all ease-linear">
            {isLoading
                ? Array.from({ length: parseInt(customLimit) }, (_, index) => (
                      <CompetitionCardPlaceHolder key={index} />
                  ))
                : competitions.map((competition) => (
                      <CompetitionCard
                          key={competition.competitionId}
                          data={competition}
                          userInComp={userJoinedCompetitions.includes(
                              competition.competitionId
                          )}
                      />
                  ))}
        </div>
    )
}
