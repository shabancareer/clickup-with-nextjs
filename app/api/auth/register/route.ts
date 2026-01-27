import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AuthUtils } from '@/app/lib/auth/utils'
import { SessionManager } from '@/app/lib/auth/session'
import { db } from '@/app/lib/db/client'
import { cleanRegex } from 'zod/v4/core/util.cjs'

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email({ message: 'Invalid email' }),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .refine(AuthUtils.isStrongPassword, {
            message: 'Password must contain uppercase, lowercase, number, and special character',
        }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export async function POST(request: NextRequest) {
    console.log("register route hit")
    try {
        const body = await request.json()
        const validatedData = registerSchema.parse(body)

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email: validatedData.email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            )
        }

        // Hash password
        const hashedPassword = await AuthUtils.hashPassword(validatedData.password)

        // Create user
        const user = await db.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        })

        // Create session
        const { session, token } = await SessionManager.createSession(user.id)

        return NextResponse.json({
            user: session.user,
            token,
            expires: session.expires,
        }, { status: 201 })

    } catch (error) {
        console.error('Registration error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.issues },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Registration failed' },
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