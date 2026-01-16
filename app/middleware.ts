import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register', '/']
const protectedRoutes = ['/dashboard', '/profile', '/settings']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const accessToken = request.cookies.get('access-token')?.value

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    )

    // Check if route is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    // Redirect to login if accessing protected route without token
    if (isProtectedRoute && !accessToken) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Redirect to dashboard if accessing public route with token
    if (isPublicRoute && accessToken && pathname !== '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}