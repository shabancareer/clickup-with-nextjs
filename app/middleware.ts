import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TokenService } from '@/app/lib/auth/tokens'

// Define public and protected routes
const publicRoutes = ['/login', '/register', '/', '/api/auth/login', '/api/auth/register']
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/api/protected']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    )

    // Check if route is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    // Get session token
    const token = request.cookies.get('session-token')?.value

    // Redirect to login if accessing protected route without token
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Verify token for protected routes
    if (isProtectedRoute && token) {
        const payload = TokenService.verifyToken(token)
        if (!payload) {
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.delete('session-token')
            response.cookies.delete('refresh-token')
            return response
        }
    }

    // Redirect to dashboard if accessing public auth route with valid token
    if ((pathname === '/login' || pathname === '/register') && token) {
        const payload = TokenService.verifyToken(token)
        if (payload) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
}