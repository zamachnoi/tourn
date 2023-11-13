import { CompetitionData } from '@/components/Competition'
import { CompetitionsList } from '@/components/CompetitionList'
import CreateCompetition from '@/components/CreateCompetition'
import { auth } from '@clerk/nextjs'

export async function getCompetitions(token: string | null) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    }

    // Add Authorization header only if token is not null
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch('http://localhost:3000/api/competitions', {
        headers: headers,
        cache: 'no-store',
    })

    const competitions = await res.json()

    return competitions
}

export default async function Page() {
    const { getToken } = auth()
    const competitions = (await getCompetitions(
        await getToken()
    )) as CompetitionData

    return (
        <div>
            <CompetitionsList competitions={competitions.competitions} />
            <CreateCompetition />
        </div>
    )
}
