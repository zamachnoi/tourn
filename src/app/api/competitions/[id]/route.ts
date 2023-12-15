// File: app/api/competitions/[id].ts

import { NextRequest, NextResponse } from 'next/server'
import db from '@/db'
import { competition, users, competitionPlayer } from '@/schema'
import { eq, and, sql } from 'drizzle-orm'
import { auth } from '@clerk/nextjs'

export async function getCompData(id: string) {
    const competitionData = await db
        .select({
            competitionId: competition.competitionId,
            name: competition.name,
            teamSize: competition.teamSize,
            numTeams: competition.numTeams,
            creatorId: competition.creatorId,
            numSubs: competition.numSubs,
            creatorName: users.name,
            creatorProfilePic: users.profilePic,
            clerkId: users.clerkId,
            playerCount: sql`(
          SELECT COUNT(*)::int
          FROM ${competitionPlayer}
          WHERE ${competitionPlayer.competitionId} = ${id})`,
        })
        .from(competition)
        .innerJoin(users, eq(users.userId, competition.creatorId))
        .where(eq(competition.competitionId, id))
    if (competitionData.length === 0) {
        return null
    }

    return competitionData[0]
}

export async function GET(req: NextRequest) {
    // Extracting the competition ID from the URL
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
        return new NextResponse('Competition ID is required', { status: 400 })
    }

    const competitionData = await getCompData(id)

    if (!competitionData) {
        return new NextResponse('Competition not found', { status: 404 })
    }

    return new NextResponse(JSON.stringify(competitionData), {
        headers: {
            'content-type': 'application/json',
        },
    })
}

export async function DELETE(req: NextRequest) {
    // ADD CASCADING DELETE
    const { userId } = auth()

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
        return new NextResponse('Competition ID is required', { status: 400 })
    }

    const res = await db
        .select()
        .from(competition)
        .innerJoin(users, eq(users.userId, competition.creatorId))
        .where(
            and(eq(competition.competitionId, id), eq(users.clerkId, userId))
        )
        .execute()

    if (res.length === 0) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    await db
        .delete(competition)
        .where(eq(competition.competitionId, id))
        .execute()

    return new NextResponse(null, {
        status: 204,
    })
}
