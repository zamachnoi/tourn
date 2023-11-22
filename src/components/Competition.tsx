import React from 'react'
import Avatar from './Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export interface CompetitionProps {
    data: {
        competitionId: string
        name: string
        teamSize: number
        numTeams: number
        creatorId: string
        numSubs: number
        creatorName: string
        creatorProfilePic: string
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
            console.error('Error deleting competition')
        }
    }

    return (
        <div className="m-4 w-1/5 rounded-lg bg-slate-950 p-4 drop-shadow-2xl">
            <div className="mx-4 mb-4 flex items-center gap-4">
                <Avatar imageUrl={data.creatorProfilePic} size={12} />
                <h3 className="text-lg font-semibold text-white">
                    {data.name}
                </h3>
            </div>
            <div className="ml-8 text-sm text-gray-400">
                <p className="p-0 text-xs text-slate-600">
                    {data.competitionId}
                </p>
                <div className="mt-2 flex items-center gap-2">
                    <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: '#828da1' }}
                    />
                    <p>Teams:</p>
                    {data.teamSize}
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: '#828da1' }}
                    />
                    <p>Players:</p>0
                </div>
                <div>Date</div>

                <p>Teams: {data.teamSize}</p>
                <p>Number of Subs: {data.numSubs}</p>
            </div>
            <button
                onClick={handleDelete}
                className=" rounded-md bg-red-600 p-2 transition-colors duration-200 hover:bg-slate-900"
            >
                Delete Competition
            </button>
        </div>
    )
}
