import type { IncomingHttpHeaders } from 'http'
import type { WebhookRequiredHeaders } from 'svix'
import type { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { NextResponse, NextRequest } from 'next/server'
import db from '@/db'

const webhookSecret: string = process.env.WEBHOOK_SECRET as string

async function handler(req: NextRequestWithSvixRequiredHeaders) {
    const payload = await req.text()
    const headers = req.headers

    const svix_id = headers.get('svix-id')
    const svix_timestamp = headers.get('svix-timestamp')
    const svix_signature = headers.get('svix-signature')

    // Create a new Webhook instance with your webhook secret
    const wh = new Webhook(webhookSecret)

    let evt: WebhookEvent
    try {
        // Verify the webhook payload and headers
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

    const eventType = evt.type
    if (eventType === 'user.created') {
        // TODO: use drizzle to insert into db
        return NextResponse.json({}, { status: 201 })
    }
}

type NextRequestWithSvixRequiredHeaders = NextRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders
}

export const GET = handler
export const POST = handler
export const PUT = handler
