import { NextRequest, NextResponse } from 'next/server'
import { SessionManager } from '@/app/lib/auth/session'

export async function POST(request: NextRequest) {
    try {
        await SessionManager.deleteSession()

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        })

    } catch (error) {
        console.error('Logout error:', error)

        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}