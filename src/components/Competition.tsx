import React from 'react'

export interface CompetitionProps {
    data: {
        competitionId: string
        name: string
        teamSize: number
        numTeams: number
        creatorId: string
        numSubs: number
    }
    onCompetitionDeleted: () => void
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

export function Competition(props: CompetitionProps) {
    const { data } = props

    const handleDelete = async () => {
        const response = await fetch(
            `/api/competitions/${data.competitionId}`,
            {
                method: 'DELETE',
            }
        )
        if (response.ok) {
            props.onCompetitionDeleted()
        } else {
            // Handle error (e.g., display error message)
        }
    }

    return (
        <div className="m-4 w-2/6 rounded-lg bg-slate-900 p-4">
            <div className="flex flex-row items-center justify-between">
                <h3 className="text-2xl font-bold">{data.name}</h3>
                <p className="text-xs">
                    Creator ID:
                    {/* {data.creatorId} */}
                </p>
            </div>
            <p className="p-0 text-xs text-slate-600">{data.competitionId}</p>
            <p>Team Size: {data.teamSize}</p>
            <p>Number of Teams: {data.numTeams}</p>
            <p>Number of Subs: {data.numSubs}</p>
            <button
                onClick={handleDelete}
                className="rounded bg-red-500 p-2 text-white"
            >
                Delete Competition
            </button>
        </div>
    )
}
