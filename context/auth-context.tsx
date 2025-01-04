'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface AuthContextType {
    user: { email: string } | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    token: string | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true) // Tracks loading state
    const router = useRouter()

    // Check for token on initial load
    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true) // Start loading
            try {
                const savedToken = localStorage.getItem('authToken')
                if (savedToken) {
                    setToken(savedToken)
                    // Mock API call to validate token and fetch user
                    setUser({ email: 'demo@example.com' }) // Replace with actual API response
                    router.push('/employees') // Redirect to home page if token is valid
                } else {
                    router.push('/login') // Redirect to login page if no token
                }
            } catch (error) {
                router.push('/login') // Redirect to login page if no token
                toast.error('Error initializing authentication')
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            }
        }

        initializeAuth()
    }, [router])

    const login = async (email: string, password: string) => {
        setLoading(true) // Start loading during login
        try {
            // Mock login - replace with actual API call
            if (email === 'demo@example.com' && password === 'demo123') {
                const mockToken = 'sample_token_123' // Replace with actual token from API
                localStorage.setItem('authToken', mockToken)
                setToken(mockToken)
                setUser({ email })

                toast.success('Login successful')
                router.push('/employees')
            } else {
                toast.error('Invalid credentials')
                throw new Error('Invalid credentials')
            }
        } catch (error) {
            // toast.error(error.message || 'Login failed')
            toast.error('Login failed')
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const logout = async () => {
        setLoading(true) // Start loading during logout
        try {
            setUser(null)
            setToken(null)
            localStorage.removeItem('authToken')
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error) {
            toast.error('Error logging out')
        } finally {
            setLoading(false) // Stop loading
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, token, loading }}>
            {loading && !user ? (
                <div className="flex h-screen items-center justify-center">
                    <p className="animate-pulse text-lg font-semibold">
                        <Image
                            // src="/images/logo.svg"
                            src={
                                'https://utfs.io/f/qPlpyBmwd8UNl1LmsrxLbCsX2qVv347KQg6U1yphnIT50GZr'
                            }
                            width={150}
                            height={34}
                            alt="Logo"
                            className="h-auto w-[150px]"
                        />
                    </p>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
