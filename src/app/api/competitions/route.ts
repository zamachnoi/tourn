import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db'
import { competition, competitionPlayer } from '@/schema'
import { v4 as uuidv4 } from 'uuid'
import { users } from '@/schema'
import { count, eq, sql } from 'drizzle-orm'

export async function POST(req: Request) {
    const payload = await req.json()
    const { userId } = auth()

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const userRes = await db
        .select({
            userId: users.userId,
            clerkId: users.clerkId,
            creatorName: users.name,
            creatorProfilePic: users.profilePic,
        })
        .from(users)
        .where(eq(users.clerkId, userId))

    const competitionId = uuidv4()
    const userUuid = userRes[0].userId
    // create timestamp with tz
    const dateCreated = new Date().toISOString()

    let comp = await db
        .insert(competition)
        .values({
            competitionId: competitionId,
            name: payload.name,
            teamSize: payload.teamSize,
            numTeams: payload.numTeams,
            creatorId: userUuid,
            numSubs: payload.numSubs,
            dateCreated: dateCreated,
        })
        .returning()
        .execute()

    const userCopy = { ...userRes[0], playerCount: 0 }

    // Create a deep copy of comp[0]
    let res = JSON.parse(JSON.stringify(comp[0]))

    // Merge userCopy into res
    for (const [key, value] of Object.entries(userCopy)) {
        res[key] = value
    }

    return new NextResponse(JSON.stringify(res), {
        headers: {
            'content-type': 'application/json',
        },
    })
}

export async function GET(req: NextRequest) {
    const { userId } = auth()
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    const clerkId = userId

    const url = new URL(req.url)

    if (url == null) {
        return new NextResponse('Bad Request', { status: 400 })
    }

    // Retrieve query parameters
    const pageParam = url.searchParams.get('page')
    const limitParam = url.searchParams.get('limit')
    const userQueryParam = url.searchParams.get('userId') // Retrieve the userId query parameter
    const page = pageParam !== null ? parseInt(pageParam, 10) : 1
    const limit = limitParam !== null ? parseInt(limitParam, 10) : 10
    const offset = (page - 1) * limit

    // innerJoin users table to get the creator's name and profile pic
    let query = userQueryParam
        ? db
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
              })
              .from(competition)
              .innerJoin(users, eq(users.userId, competition.creatorId))
              .where(eq(competition.creatorId, userQueryParam))
        : db
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
                    WHERE ${competitionPlayer.competitionId} = ${competition.competitionId})`,
              })
              .from(competition)
              .innerJoin(users, eq(users.userId, competition.creatorId))

    const competitions = await query.limit(limit).offset(offset).execute()

    let userCompetitions = []
    // TODO: Only do this if userQueryParam is null if null, then just add all competitions to userCompetitions
    userCompetitions = await db
        .select({
            competitionId: competitionPlayer.competitionId,
        })
        .from(competitionPlayer)
        .innerJoin(users, eq(users.userId, competitionPlayer.userId))
        .where(eq(users.clerkId, clerkId))
        .execute()

    const totalRecords = await db
        .select({
            count: sql<number>`cast(count(${competition.competitionId}) as int)`,
        })
        .from(competition)
        .execute()
        .then((result) => result[0].count)

    const totalPages = Math.ceil(totalRecords / limit)

    return new NextResponse(
        JSON.stringify({
            competitions,
            userCompetitions,
            pagination: {
                currentPage: page,
                totalPages,
                limit,
                totalRecords,
            },
        }),
        {
            headers: { 'content-type': 'application/json' },
        }
    )
}
