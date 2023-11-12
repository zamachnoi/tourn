// File: app/api/competitions/[id].ts

import { NextRequest, NextResponse } from 'next/server'
import db from '@/db'
import { competition } from '@/schema'
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest) {
    // Extracting the competition ID from the URL
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
        return new NextResponse('Competition ID is required', { status: 400 })
    }

    // Fetch competition data by ID
    const competitionData = await db
        .select()
        .from(competition)
        .where(eq(competition.competitionId, id))
        .execute()

    if (competitionData.length === 0) {
        return new NextResponse('Competition not found', { status: 404 })
    }

    return new NextResponse(JSON.stringify(competitionData[0]), {
        headers: {
            'content-type': 'application/json',
        },
    })
}
