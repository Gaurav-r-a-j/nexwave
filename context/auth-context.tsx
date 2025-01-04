'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface AuthContextType {
    user: { email: string } | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()

    // Check for token on initial load
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken')
        if (savedToken) {
            setToken(savedToken)
            // Mock API call to validate token and fetch user
            setUser({ email: 'demo@example.com' }) // Replace with actual user data from API
            router.push('/employees') // Redirect to home page if token is valid
        } else {
            router.push('/login') // Redirect to login page if no token
        }
    }, [router])

    const login = async (email: string, password: string) => {
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
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('authToken')
        toast.success('Logged out successfully')
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}
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
