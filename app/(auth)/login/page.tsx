import { LoginForm } from '@/components/auth/LoginForm'
import { AuthHeader } from '@/components/auth/AuthHeader'
import { AuthCard } from '@/components/auth/AuthCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In | NextAuth',
    description: 'Sign in to your NextAuth account',
}

export default function LoginPage() {
    return (
        <div className="py-12">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Left Side - Hero Content */}
                <div className="lg:w-1/2 max-w-lg">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                            Welcome back to{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                NextAuth
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Secure, scalable authentication for modern applications. Sign in to access your dashboard and continue your journey.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">Enterprise-grade security</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">Lightning fast performance</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">Built with privacy in mind</span>
                            </div>
                        </div>

                        <div className="pt-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Trusted by thousands of developers worldwide
                            </p>
                            <div className="flex items-center space-x-4 mt-3">
                                {['Company A', 'Company B', 'Company C', 'Company D'].map((company) => (
                                    <div
                                        key={company}
                                        className="h-10 w-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
                                    >
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{company}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="lg:w-1/2 max-w-md">
                    <AuthHeader
                        title="Sign in to your account"
                        description="Don't have an account?"
                        linkText="Sign up for free"
                        linkHref="/register"
                    />

                    <div className="mt-8">
                        <AuthCard
                            title=""
                            subtitle=""
                        >
                            <LoginForm />
                        </AuthCard>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Having trouble signing in?{' '}
                            <a href="/support" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                Contact support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}