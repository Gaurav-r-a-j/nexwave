'use client'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/lib/constants/side-links'
import { useAuth } from '@/context/auth-context'

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathName = usePathname()
    // const router = useRouter()
    const {logout} = useAuth()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
        const mainContent = document.getElementById('main-content')
        if (mainContent) {
            mainContent.style.marginLeft = isSidebarOpen ? '260px' : '60px'
        }
    }

    const toggleSidebarResponsive = () => {
        document.getElementById('sidebar')?.classList.remove('open')
        document.getElementById('overlay')?.classList.toggle('open')
    }

    return (
        <>
            <div
                id="overlay"
                className="fixed inset-0 z-30 hidden bg-black/50"
                onClick={toggleSidebarResponsive}
            ></div>
            <Card
                id="sidebar"
                className={`sidebar fixed -left-[260px] top-0 z-40 flex h-screen w-[260px] flex-col rounded-none transition-all duration-300 lg:left-0 lg:top-16 lg:h-[calc(100vh_-_64px)] ${isSidebarOpen ? 'closed' : ''}`}
            >
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="absolute -right-2.5 -top-3.5 hidden size-6 place-content-center rounded-full border border-gray-300 bg-white text-black lg:grid"
                >
                    <ChevronDown
                        className={`h-4 w-4 ${isSidebarOpen ? '-rotate-90' : 'rotate-90'}`}
                    />
                </button>

                <div className="flex h-full flex-col">
                    <div className="flex-1 space-y-6 px-3 py-4">
                        {sidebarLinks.map((section, index) => (
                            <div key={index} className="space-y-2">
                                <h3 className="text-muted-foreground px-4 text-xs font-medium">
                                    {section.section}
                                </h3>
                                <nav className="space-y-1">
                                    {section.links.map((link, linkIndex) => (
                                        <Link
                                            key={linkIndex}
                                            href={link.href}
                                            className={cn(
                                                'hover:bg-muted flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors',
                                                pathName === link.href
                                                    ? 'text-foreground bg-gray-200 font-medium'
                                                    : 'text-muted-foreground',
                                            )}
                                        >
                                            <link.icon className="h-4 w-4" />
                                            {link.title}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto border-t p-4">
                        <div className="flex items-center gap-3 px-2">
                            <Avatar>
                                <AvatarImage
                                    src="https://utfs.io/f/qPlpyBmwd8UNPbc9FxGlVM3NEqZ7jpx50IDA4k1BdKvhnmQG"
                                    alt="Olivia Rhye"
                                    className='object-cover'
                                />
                                <AvatarFallback>GR</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium leading-none">
                                    Gaurav raj
                                </p>
                                <p className="text-muted-foreground truncate text-xs">
                                    raj@untitledui.com
                                </p>
                            </div>
                            <Button
                                variant="outline-black"
                                size="small"
                                className="ml-auto h-8 w-8"
                                onClick={logout}
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="sr-only">Log out</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Sidebar
