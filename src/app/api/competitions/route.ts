import { currentUser, auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import db from '@/db'
import { competition } from '@/schema'
import { v4 as uuidv4 } from 'uuid'
import { users } from '@/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
    const payload = await req.json()
    const { userId } = auth()

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const result = await db
        .select({
            userId: users.userId,
        })
        .from(users)
        .where(eq(users.clerkId, userId))

    const competitionId = uuidv4()

    const comp = await db
        .insert(competition)
        .values({
            competitionId: competitionId,
            name: payload.name,
            teamSize: payload.teamSize,
            numTeams: payload.numTeams,
            creatorId: result[0].userId,
            numSubs: payload.numSubs,
        })
        .returning()
        .execute()

    return new NextResponse(JSON.stringify(comp), {
        headers: {
            'content-type': 'application/json',
        },
    })
}
