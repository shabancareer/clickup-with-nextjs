import { NextRequest, NextResponse } from 'next/server'
import { SessionManager } from '@/app/lib/auth/session'

export async function GET(request: NextRequest) {
    try {
        const session = await SessionManager.getSession()

        if (!session) {
            return NextResponse.json(
                { user: null, authenticated: false },
                { status: 200 }
            )
        }

        return NextResponse.json({
            user: session.user,
            authenticated: true,
            expires: session.expires,
        })

    } catch (error) {
        console.error('Get session error:', error)

        return NextResponse.json(
            { error: 'Failed to get session', user: null, authenticated: false },
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