// src/context/EmployeeContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Employee } from '@/types/employee'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { EMPLOYEES } from '@/lib/constants/employees'

// Define types for the context
interface EmployeeContextType {
    employees: Employee[]
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    city: string
    setCity: React.Dispatch<React.SetStateAction<string>>
    filteredEmployees: Employee[]
    handleAddEmployee: (newEmployee: Partial<Employee>) => void
    handleEditEmployee: (updatedEmployee: Partial<Employee>) => void
    handleDeleteEmployee: (employeeToDelete: Employee) => void
    openDeleteDialog: (employee: Employee) => void
    closeDeleteDialog: () => void
    isDeleteDialogOpen: boolean
    employeeToDelete: Employee | null
}

// Create the context with default values
const EmployeeContext = createContext<EmployeeContextType | undefined>(
    undefined,
)

// Create the provider component
export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
    const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES)
    const [search, setSearch] = useState('')
    const [city, setCity] = useState('all')
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
        null,
    )
    const router = useRouter()

    const filteredEmployees = employees.filter(
        (employee) =>
            (
                employee.firstName.toLowerCase() +
                ' ' +
                employee.lastName.toLowerCase()
            ).includes(search.toLowerCase()) &&
            (city === 'all' ||
                employee.address.city?.toLowerCase() === city.toLowerCase()),
    )

    const handleAddEmployee = (newEmployee: Partial<Employee>) => {
        const employee = {
            ...newEmployee,
            id: `${Math.floor(Math.random() * 100000)}`,
        } as Employee
        setEmployees([employee, ...employees])
        toast.success('Employee added successfully')
        router.push('/employees')
    }

    const handleEditEmployee = (updatedEmployee: Partial<Employee>) => {
        console.log(updatedEmployee)

        const updatedEmployees = employees.map((emp) =>
            emp.id === updatedEmployee.id
                ? { ...emp, ...updatedEmployee }
                : emp,
        )
        setEmployees(updatedEmployees)

        toast.success('Employee updated successfully')
        router.push('/employees')
    }

    const handleDeleteEmployee = (employeeToDelete: Employee) => {
        if (employeeToDelete) {
            setEmployees(
                employees.filter((emp) => emp.id !== employeeToDelete.id),
            )
            setDeleteDialogOpen(false)
            toast.success('Employee deleted successfully')
            router.push('/employees')
        }
    }

    const openDeleteDialog = (employee: Employee) => {
        setEmployeeToDelete(employee)
        setDeleteDialogOpen(true)
    }

    const closeDeleteDialog = () => setDeleteDialogOpen(false)

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                setEmployees,
                search,
                setSearch,
                city,
                setCity,
                filteredEmployees,
                handleAddEmployee,
                handleEditEmployee,
                handleDeleteEmployee,
                openDeleteDialog,
                closeDeleteDialog,
                isDeleteDialogOpen,
                employeeToDelete,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    )
}

// Create a custom hook to access the context
export const useEmployeeContext = (): EmployeeContextType => {
    const context = useContext(EmployeeContext)
    if (!context) {
        throw new Error(
            'useEmployeeContext must be used within an EmployeeProvider',
        )
    }
    return context
}
