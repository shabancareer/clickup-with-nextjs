import { ReactNode } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                NextAuth
                            </span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            <nav className="hidden md:flex items-center space-x-6">
                                <Link
                                    href="/"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/features"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Features
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Contact
                                </Link>
                            </nav>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            © {new Date().getFullYear()} NextAuth. All rights reserved.
                        </p>
                        <div className="mt-4 flex justify-center space-x-6">
                            <Link
                                href="/privacy"
                                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            >
                                Cookie Policy
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}