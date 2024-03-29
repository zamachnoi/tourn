/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/wPAThRF42rN
 */
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
    CardTitle,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

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
        clerkId: string
        playerCount: number
    }
    userInComp: boolean
}

export function CompetitionCard(props: CompetitionProps) {
    const { data, userInComp } = props
    const [userInCompBool, setUserInCompBool] = useState(userInComp)
    const [competitionPlayerCount, setCompetitionPlayerCount] = useState(
        data.playerCount
    )
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false) // New state to track if the competition is deleted
    const [isExiting, setIsExiting] = useState(false) // New state to handle exit transition

    const clerkUser = useUser().user

    let currUserClerkId = ''
    if (clerkUser) {
        currUserClerkId = clerkUser.id
    }

    const isCreator = data.clerkId === currUserClerkId

    const handleAction = async () => {
        setIsLoading(true)
        if (isCreator) {
            setIsExiting(true)
            try {
                const response = await fetch(
                    `/api/competitions/${data.competitionId}`,
                    {
                        method: 'DELETE',
                    }
                )
                if (response.ok) {
                    setIsDeleted(true)
                } else {
                    console.error('Error deleting competition')
                }
            } catch (error) {
                console.error('Error deleting competition', error)
            }
        } else if (!userInCompBool) {
            const response = await fetch(
                `/api/competitions/${data.competitionId}/join`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        clerkAssignId: currUserClerkId,
                    }),
                }
            )
            if (response.ok) {
                setCompetitionPlayerCount(competitionPlayerCount + 1)
                setUserInCompBool(true)
            } else {
                console.error('Error joining competition')
            }
        } else {
            const response = await fetch(
                `/api/competitions/${data.competitionId}/leave`,
                {
                    method: 'DELETE',
                    body: JSON.stringify({
                        clerkAssignId: currUserClerkId,
                    }),
                }
            )
            if (response.ok) {
                setCompetitionPlayerCount(competitionPlayerCount - 1)
                setUserInCompBool(false)
            } else {
                console.error('Error leaving competition')
            }
        }
        setIsLoading(false)
    }
    if (isDeleted) {
        return null
    }

    // TODO: FIX WIDTH OF CARD WHEN LENGTH GETS TOO LONG
    const cardClasses = `m-4 w-full rounded-lg bg-gray-800 p-6 shadow-lg transition-all duration-300 ${
        isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`

    const getCardTitleClasses = () => {
        if (data.name.length > 20) {
            return 'text-sm font-semibold text-white'
        }
        return 'text-lg font-semibold text-white'
    }

    const routeToCompetition = () => {
        window.location.href = `/competitions/${data.competitionId}`
    }

    return (
        <Card className={cardClasses}>
            <CardHeader className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center gap-4">
                    <CardTitle className={getCardTitleClasses()}>
                        {data.name}
                    </CardTitle>
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                            alt="Creator Profile"
                            className="rounded-full"
                            src={data.creatorProfilePic}
                        />
                        <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                </div>
            </CardHeader>
            <CardContent className="mt-4 grid gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                    <svg
                        className=" h-5 w-5 text-gray-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <p className="text-sm">Teams: {data.numTeams}</p>
                </div>
                <div className="flex items-center gap-2">
                    <svg
                        className=" h-5 w-5 text-gray-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" x2="8" y1="13" y2="13" />
                        <line x1="16" x2="8" y1="17" y2="17" />
                        <line x1="10" x2="8" y1="9" y2="9" />
                    </svg>
                    <p className="text-sm">Players: {competitionPlayerCount}</p>
                </div>
                <div className="flex items-center gap-2">
                    <svg
                        className=" h-5 w-5 text-gray-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            height="18"
                            rx="2"
                            ry="2"
                            width="18"
                            x="3"
                            y="4"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <p className="text-sm">Date: November 19, 2023</p>
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex justify-center gap-2">
                {isLoading ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-white"></div>
                ) : (
                    <Button
                        onClick={handleAction}
                        className={`outline-none transition duration-300 ease-in-out ${
                            isCreator
                                ? 'bg-red-600 hover:bg-gray-700'
                                : userInCompBool
                                ? 'bg-yellow-600 hover:bg-gray-700'
                                : 'bg-green-500 hover:bg-gray-700'
                        }`}
                    >
                        {isCreator
                            ? 'Delete'
                            : userInCompBool
                            ? 'Leave'
                            : 'Join'}
                    </Button>
                )}
                <Button
                    onClick={routeToCompetition}
                    className="bg-gray-700 outline-none transition duration-300 ease-in-out hover:bg-gray-800"
                >
                    View
                </Button>
            </CardFooter>
        </Card>
    )
}
