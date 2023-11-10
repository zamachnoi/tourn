import type { IncomingHttpHeaders } from 'http'
import type { WebhookRequiredHeaders } from 'svix'
import type { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { NextResponse, NextRequest } from 'next/server'
import db from '@/db'
import { users } from '@/schema'
import { v4 as uuidv4 } from 'uuid'

const webhookSecret: string = process.env.WEBHOOK_SECRET as string

async function handler(req: NextRequestWithSvixRequiredHeaders) {
    const payload = await req.text()
    const headers = req.headers

    const svix_id = headers.get('svix-id')
    const svix_timestamp = headers.get('svix-timestamp')
    const svix_signature = headers.get('svix-signature')

    const wh = new Webhook(webhookSecret)

    let evt: WebhookEvent
    try {
        const svixHeaders = {
            'svix-id': svix_id as string,
            'svix-timestamp': svix_timestamp as string,
            'svix-signature': svix_signature as string,
        }

        evt = wh.verify(payload, svixHeaders) as WebhookEvent
    } catch (e) {
        console.log(e)
        // If the verification fails, return a 400 error
        return NextResponse.json({}, { status: 400 })
    }
    const { id } = evt.data
    const data = JSON.parse(payload).data

    const eventType = evt.type
    if (eventType === 'user.created') {
        const clerkId = data.id
        const name = data.first_name
        const profilePic = data.image_url
        const userId = uuidv4()

        await db
            .insert(users)
            .values({
                name: name,
                userId: userId,
                clerkId: clerkId,
                profilePic: profilePic,
                role: 'user',
            })
            .execute()
        return NextResponse.json({}, { status: 201 })
    }
}

type NextRequestWithSvixRequiredHeaders = NextRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders
}

export const GET = handler
export const POST = handler
export const PUT = handler
