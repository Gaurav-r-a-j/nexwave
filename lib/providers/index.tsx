import { AuthProvider } from '@/context/auth-context'
import { EmployeeProvider } from '@/context/employee-context'
import React from 'react'
import { Toaster } from 'sonner'

type Props = {
    children: React.ReactNode
}

const Providers = ({ children }: Props) => {
    return (
        <>
            <Toaster position="top-center" richColors />
            <AuthProvider>
                <EmployeeProvider>{children}</EmployeeProvider>
            </AuthProvider>
        </>
    )
}

export default Providers
