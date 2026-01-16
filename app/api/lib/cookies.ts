import { NextResponse } from 'next/server'

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    domain: process.env.COOKIE_DOMAIN || 'localhost'
}

export class CookieService {
    // Set access token cookie
    static setAccessToken(response: NextResponse, token: string) {
        response.cookies.set('access-token', token, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 // 15 minutes
        })
    }

    // Set refresh token cookie
    static setRefreshToken(response: NextResponse, token: string) {
        response.cookies.set('refresh-token', token, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 // 7 days
        })
    }

    // Clear all auth cookies
    static clearAuthCookies(response: NextResponse) {
        response.cookies.delete('access-token')
        response.cookies.delete('refresh-token')
        response.cookies.delete('session-id')
    }

    // Get token from cookies
    static getTokensFromCookies(request: Request) {
        const cookieHeader = request.headers.get('cookie') || ''
        const cookies = Object.fromEntries(
            cookieHeader.split(';').map(cookie => {
                const [name, ...value] = cookie.trim().split('=')
                return [name, value.join('=')]
            })
        )

        return {
            accessToken: cookies['access-token'],
            refreshToken: cookies['refresh-token']
        }
    }

    // Create response with tokens
    static createAuthResponse(
        user: { id: string; email: string; name?: string | null },
        accessToken: string,
        refreshToken: string
    ) {
        const response = NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            accessToken,
            refreshToken
        })

        this.setAccessToken(response, accessToken)
        this.setRefreshToken(response, refreshToken)

        return response
    }
}