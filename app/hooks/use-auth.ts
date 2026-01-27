'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'


export interface User {
    id: string
    email: string
    name: string | null
    role: string
    avatar?: string | null
}

export interface Session {
    user: User
    expires: Date
    authenticated: boolean
}

export function useAuth() {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkSession()
    }, [])

    const checkSession = async () => {
        try {
            const response = await fetch('/api/auth/session')
            const data = await response.json()

            if (data.authenticated) {
                setSession(data.session)
            } else {
                setSession(null)
            }
        } catch (error) {
            console.error('Failed to check session:', error)
            setSession(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Login failed')
            }

            await checkSession()
            return { success: true, data }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Login failed'
            }
        } finally {
            setLoading(false)
        }
    }

    // const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    //     setLoading(true)
    //     try {
    //         const response = await fetch('/api/auth/register', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ name, email, password, confirmPassword }),
    //         })

    //         const data = await response.json()

    //         if (!response.ok) {
    //             throw new Error(data.error || 'Registration failed')
    //         }

    //         await checkSession()
    //         return { success: true, data }
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error instanceof Error ? error.message : 'Registration failed'
    //         }
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const logout = async () => {
        setLoading(true)
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            setSession(null)
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return {
        session,
        user: session?.user,
        loading,
        login,
        register,
        logout,
        checkSession,
        isAuthenticated: session?.authenticated || false,
    }
}

interface RegisterData {
    name?: string
    email: string
    password: string
    confirmPassword: string
}

interface RegisterResponse {
    success: boolean
    data?: {
        user: {
            id: string
            email: string
            name?: string
            createdAt: string
        }
        token: string
    }
    error?: string
    details?: Array<{
        field: string
        message: string
    }>
    field?: string
}

async function registerUser(data: RegisterData): Promise<RegisterResponse> {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
    }

    return result
}

export function useRegister() {
    const router = useRouter()
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data.success) {
                // Clear any previous errors
                setFormErrors({})

                // Redirect to dashboard or login page
                router.push('/dashboard')
                router.refresh()

                // Optional: Show success message
                alert('Registration successful! Welcome aboard!')
            }
        },
        onError: (error: any) => {
            // Handle API errors
            if (error.details) {
                const errors: Record<string, string> = {}
                error.details.forEach((detail: any) => {
                    errors[detail.field] = detail.message
                })
                setFormErrors(errors)
            } else if (error.field) {
                setFormErrors({ [error.field]: error.message })
            } else {
                setFormErrors({ general: error.message })
            }
        },
    })

    const register = async (data: RegisterData) => {
        // Clear previous errors
        setFormErrors({})

        // Validate passwords match
        if (data.password !== data.confirmPassword) {
            setFormErrors({
                confirmPassword: "Passwords don't match",
            })
            return
        }

        // Validate password strength
        const passwordErrors = validatePassword(data.password)
        if (Object.keys(passwordErrors).length > 0) {
            setFormErrors(passwordErrors)
            return
        }

        // Call mutation
        return mutation.mutateAsync(data)
    }

    const validatePassword = (password: string): Record<string, string> => {
        const errors: Record<string, string> = {}

        if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters'
        }
        if (!/[A-Z]/.test(password)) {
            errors.password = 'Password must contain at least one uppercase letter'
        }
        if (!/[a-z]/.test(password)) {
            errors.password = 'Password must contain at least one lowercase letter'
        }
        if (!/[0-9]/.test(password)) {
            errors.password = 'Password must contain at least one number'
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            errors.password = 'Password must contain at least one special character'
        }

        return errors
    }

    return {
        register,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        formErrors,
        reset: mutation.reset,
        data: mutation.data,
    }
}