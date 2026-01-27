"use client"
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { useRegister } from '@/app/hooks/use-auth'

export default function RegisterPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/dashboard'

    // const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',

    })
    const { register, isLoading, formErrors } = useRegister()
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     setError('')

    //     try {
    //         const response = await fetch('/api/auth/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData),
    //         })

    //         const data = await response.json()

    //         if (!response.ok) {
    //             throw new Error(data.error || 'Login failed')
    //         }

    //         // Redirect to intended page or dashboard
    //         router.push(redirect)
    //         router.refresh()

    //     } catch (err) {
    //         setError(err instanceof Error ? err.message : 'An error occurred')
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await register(formData)
    }
    console.log(formErrors)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        // Calculate password strength when password changes
        if (name === 'password') {
            calculatePasswordStrength(value)
        }
    }
    const calculatePasswordStrength = (password: string) => {
        let strength = 0

        // Length check
        if (password.length >= 8) strength += 25
        if (password.length >= 12) strength += 25

        // Character type checks
        if (/[A-Z]/.test(password)) strength += 25
        if (/[a-z]/.test(password)) strength += 25
        if (/[0-9]/.test(password)) strength += 25
        if (/[^A-Za-z0-9]/.test(password)) strength += 25

        // Cap at 100
        strength = Math.min(strength, 100)
        setPasswordStrength(strength)
    }

    const getStrengthColor = () => {
        if (passwordStrength < 40) return 'bg-red-500'
        if (passwordStrength < 70) return 'bg-yellow-500'
        return 'bg-green-500'
    }

    const getStrengthText = () => {
        if (passwordStrength < 40) return 'Weak'
        if (passwordStrength < 70) return 'Medium'
        return 'Strong'
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="email"
                                name="name"
                                type="text"
                                placeholder="Your Full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            // disabled={isLoading}
                            // error={formErrors.email}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            // disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Register
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}


