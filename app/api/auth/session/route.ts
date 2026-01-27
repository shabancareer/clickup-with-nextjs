import { NextRequest, NextResponse } from 'next/server'
import { SessionManager } from '@/app/lib/auth/session'

export async function GET(request: NextRequest) {
    try {
        // Try to get existing session
        let session = await SessionManager.getSession()

        // If no session but has refresh token, try to refresh
        if (!session) {
            session = await SessionManager.updateSession()
        }

        if (!session) {
            return NextResponse.json(
                { session: null, authenticated: false },
                { status: 200 }
            )
        }

        return NextResponse.json({
            session,
            authenticated: true,
        })

    } catch (error) {
        console.error('Session error:', error)

        return NextResponse.json(
            { error: 'Session error', session: null, authenticated: false },
            { status: 200 }
        )
    }
}

export async function POST() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}