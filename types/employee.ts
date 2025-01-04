export interface Employee {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    whatsApp: string
    alternatePhone: string
    gender: string
    employeeType: 'Permanent' | 'Contract'
    status: 'Active' | 'In-Active'
    address: {
        line1: string
        line2: string
        zipCode: string
        city: string
        state: string
    }
    adhaarNumber: string
    panNumber: string
}

export interface User {
    email: string
    password: string
}
