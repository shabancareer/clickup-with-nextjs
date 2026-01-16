'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LoginInput, RegisterInput } from '@/app/lib/validation'

interface User {
    id: string
    email: string
    name: string | null
    createdAt: Date
}

interface AuthResponse {
    user: User
    accessToken: string
    refreshToken: string
}

interface AuthCheckResponse {
    user: User | null
    valid: boolean
    refreshed?: boolean
}

async function loginUser(data: LoginInput): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Login failed')
    }

    return response.json()
}

async function registerUser(data: RegisterInput): Promise<AuthResponse> {
    const response = await fetch('../api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Registration failed')
    }

    return response.json()
}

async function logoutUser(): Promise<void> {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Logout failed')
    }
}

async function refreshTokens(): Promise<AuthResponse> {
    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Token refresh failed')
    }

    return response.json()
}

async function fetchCurrentUser(): Promise<AuthCheckResponse> {
    const response = await fetch('/api/auth/me', {
        credentials: 'include'
    })
    return response.json()
}

export function useAuth() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const {
        data: authData,
        isLoading,
        error: authError,
        refetch: refetchAuth
    } = useQuery({
        queryKey: ['auth'],
        queryFn: fetchCurrentUser,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
        refetchOnWindowFocus: true
    })

    // Auto-refresh token before expiration
    useEffect(() => {
        if (!authData?.valid) return

        const refreshInterval = setInterval(async () => {
            try {
                await refetchAuth()
            } catch (error) {
                console.error('Auto-refresh failed:', error)
            }
        }, 14 * 60 * 1000) // Every 14 minutes

        return () => clearInterval(refreshInterval)
    }, [authData?.valid, refetchAuth])

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            router.push('/dashboard')
            router.refresh()
        }
    })

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            router.push('/dashboard')
            router.refresh()
        }
    })

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(['auth'], { user: null, valid: false })
            router.push('/login')
            router.refresh()
        }
    })

    const refreshMutation = useMutation({
        mutationFn: refreshTokens,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        }
    })

    return {
        user: authData?.user || null,
        isLoading,
        isAuthenticated: authData?.valid || false,
        authError,

        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,

        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,

        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
        logoutError: logoutMutation.error,

        refresh: refreshMutation.mutate,
        isRefreshing: refreshMutation.isPending,
        refreshError: refreshMutation.error,

        refetchAuth
    }
}