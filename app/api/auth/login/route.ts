import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AuthUtils } from '@/app/lib/auth/utils'
import { SessionManager } from '@/app/lib/auth/session'
import { db } from '@/app/lib/db/client'

const loginSchema = z.object({
    email: z.email({ message: 'Invalid email' }),
    password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = loginSchema.parse(body)

        // Find user
        const user = await db.user.findUnique({
            where: { email: validatedData.email },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Verify password
        const isValidPassword = await AuthUtils.verifyPassword(
            validatedData.password,
            user.password
        )

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Create session
        const { session, token } = await SessionManager.createSession(user.id)

        return NextResponse.json({
            user: session.user,
            token,
            expires: session.expires,
        })

    } catch (error) {
        console.error('Login error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.issues },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        )
    }
}

// Add other HTTP methods if needed
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}