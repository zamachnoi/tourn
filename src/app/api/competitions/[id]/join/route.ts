import db from '@/db'
import { competition, competitionPlayer, users } from '@/schema'
import { NextResponse } from 'next/server'
import { eq, sql } from 'drizzle-orm'

type JoinCompetitionPayload = {
    clerkAssignId: string
}

export async function POST(req: Request) {
    const payload: JoinCompetitionPayload = await req.json()

    const { clerkAssignId: clerkId } = payload

    if (!clerkId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const url = new URL(req.url)
    const id = url.pathname.split('/')[3]

    if (!id) {
        return new NextResponse('Competition ID is required', { status: 400 })
    }

    const selectedCompetitons = await db
        .select()
        .from(competition)
        .where(eq(competition.competitionId, id))
        .execute()

    if (selectedCompetitons.length === 0 || selectedCompetitons.length > 1) {
        return new NextResponse('Competition not found', { status: 404 })
    }

    const comp = selectedCompetitons[0]

    const clerkToUser = await db
        .select({ userId: users.userId })
        .from(users)
        .where(eq(users.clerkId, clerkId))
        .execute()

    if (clerkToUser.length === 0 || clerkToUser.length > 1) {
        return new NextResponse('User not found', { status: 404 })
    }

    const userId = clerkToUser[0].userId

    if (comp.creatorId === userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const ins = await db
        .insert(competitionPlayer)
        .values({
            userId: userId,
            competitionId: id,
            teamId: null,
        })
        .execute()

    return new NextResponse(JSON.stringify(ins), {
        headers: {
            'content-type': 'application/json',
        },
    })
}
