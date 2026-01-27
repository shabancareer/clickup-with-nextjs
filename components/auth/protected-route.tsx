'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/hooks/use-auth'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
    children: React.ReactNode
    fallback?: React.ReactNode
    redirectTo?: string
}

export function ProtectedRoute({
    children,
    fallback,
    redirectTo = '/login'
}: ProtectedRouteProps) {
    const { user, loading, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push(redirectTo)
        }
    }, [loading, isAuthenticated, router, redirectTo])

    if (loading) {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}