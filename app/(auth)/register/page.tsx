import { RegisterForm } from '@/components/auth/RegisterForm'
import { AuthHeader } from '@/components/auth/AuthHeader'
import { AuthCard } from '@/components/auth/AuthCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Up | NextAuth',
    description: 'Create your NextAuth account',
}

export default function RegisterPage() {
    return (
        <div className="py-12">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Left Side - Registration Form */}
                <div className="lg:w-1/2 max-w-md">
                    <AuthHeader
                        title="Create your account"
                        description="Already have an account?"
                        linkText="Sign in instead"
                        linkHref="/login"
                    />

                    <div className="mt-8">
                        <AuthCard
                            title=""
                            subtitle="Start your 14-day free trial"
                        >
                            <RegisterForm />
                        </AuthCard>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">No credit card required</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Cancel anytime</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Features & Benefits */}
                <div className="lg:w-1/2 max-w-lg">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Everything you need for secure authentication
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Join thousands of developers who trust NextAuth for their authentication needs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: 'Multi-Factor Auth',
                                    description: 'Add an extra layer of security with 2FA and biometric authentication.',
                                    icon: '🔒',
                                    color: 'bg-blue-100 dark:bg-blue-900'
                                },
                                {
                                    title: 'Team Management',
                                    description: 'Invite team members and manage roles with granular permissions.',
                                    icon: '👥',
                                    color: 'bg-green-100 dark:bg-green-900'
                                },
                                {
                                    title: 'Advanced Analytics',
                                    description: 'Track user activity and get insights with detailed analytics.',
                                    icon: '📊',
                                    color: 'bg-purple-100 dark:bg-purple-900'
                                },
                                {
                                    title: 'API Access',
                                    description: 'Full REST API access for seamless integration with your apps.',
                                    icon: '⚡',
                                    color: 'bg-orange-100 dark:bg-orange-900'
                                }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200"
                                >
                                    <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                        <span className="text-2xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Testimonials */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                                        "NextAuth has revolutionized how we handle authentication. The developer experience is incredible and the security features are top-notch."
                                    </p>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">CTO at TechCorp</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-900 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Simple, transparent pricing</h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Only pay for what you use</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-800">
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">$0</span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400">/month</span>
                                </div>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Free for up to 1,000 monthly active users. No hidden fees.
                                </p>
                                <div className="mt-6 space-y-2">
                                    {['✓ Up to 1,000 MAUs', '✓ Basic security features', '✓ 99.9% uptime SLA', '✓ Community support'].map((item, i) => (
                                        <div key={i} className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}