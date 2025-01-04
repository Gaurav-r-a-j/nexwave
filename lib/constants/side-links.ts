import {
    ChevronDown,
    X,
    Home,
    Users,
    Building2,
    UserCircle,
    Headphones,
    ClipboardList,
    UserCircle2,
    LogOut,
} from 'lucide-react'

export const sidebarLinks = [
    {
        section: 'PRIMARY',
        links: [
            { title: 'Employee', icon: Users, href: '/employees' },
            { title: 'Entities', icon: Building2, href: '#' },
            { title: 'Individuals', icon: UserCircle, href: '#' },
            { title: 'Customers', icon: Headphones, href: '#' },
            { title: 'Vendors', icon: ClipboardList, href: '#' },
        ],
    },
    {
        section: 'GENERAL',
        links: [
            { title: 'Home', icon: Home, href: '#' },
            { title: 'Account', icon: UserCircle2, href: '#' },
        ],
    },
]
