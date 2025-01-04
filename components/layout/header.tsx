'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    ChevronDown,
    Headphones,
    LogOut,
    Menu,
    MessageSquareText,
    UserCog,
} from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

const Header = () => {
    const pathName = usePathname()
    const { logout } = useAuth()
    const toggleSidebar = () => {
        document.getElementById('sidebar')?.classList.toggle('open')
        document.getElementById('overlay')?.classList.toggle('open')
    }

    return (
        <header className="fixed inset-x-0 top-0 z-30 bg-white px-4 py-[15px] shadow-sm lg:px-5">
            <div className="flex items-center justify-between gap-5">
                <Link
                    href="/"
                    className="flex w-[150px] shrink-0 items-center justify-center lg:ml-2.5"
                >
                    <Image
                        // src="/images/logo.svg"
                        src={
                            'https://utfs.io/f/qPlpyBmwd8UNl1LmsrxLbCsX2qVv347KQg6U1yphnIT50GZr'
                        }
                        width={150}
                        height={34}
                        alt="Logo"
                        className="h-auto w-[80px]"
                    />
                </Link>

                <div className="inline-flex items-center gap-3 sm:gap-5">
                    <Link
                        href="/"
                        target="_blank"
                        className="hidden duration-300 hover:opacity-80 lg:block"
                    >
                        <MessageSquareText className="h-5 w-5" />
                    </Link>

                    <div className="hidden lg:block">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="group flex cursor-pointer items-center gap-2.5 rounded-lg [&[data-state=open]>button>svg]:rotate-180">
                                    <div className="size-8 shrink-0 overflow-hidden rounded-full">
                                        <Image
                                            src="https://utfs.io/f/qPlpyBmwd8UNPbc9FxGlVM3NEqZ7jpx50IDA4k1BdKvhnmQG"
                                            width={32}
                                            height={32}
                                            className="h-full w-full object-cover"
                                            alt="Profile Img"
                                        />
                                    </div>
                                    <div className="hidden space-y-1 lg:block">
                                        <h5 className="line-clamp-1 text-[10px]/3 font-semibold">
                                            Welcome back 👋
                                        </h5>
                                        <h2 className="line-clamp-1 text-xs font-bold text-black">
                                            Gaurav raj
                                        </h2>
                                    </div>
                                    <button
                                        type="button"
                                        className="-ml-1 mt-auto text-black transition group-hover:opacity-70"
                                    >
                                        <ChevronDown className="h-4 w-4 shrink-0 duration-300" />
                                    </button>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                sideOffset={12}
                                className="min-w-[200px] space-y-1 rounded-lg p-1.5 text-sm font-medium"
                            >
                                <DropdownMenuItem className="p-0">
                                    <Link
                                        href="#"
                                        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 ${pathName === '/setting' && '!bg-gray-400 !text-black'}`}
                                    >
                                        <UserCog className="size-[18px] shrink-0" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-0">
                                    <Link
                                        href="#"
                                        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 ${pathName === '/contact-us' && '!bg-gray-400 !text-black'}`}
                                    >
                                        <Headphones className="size-[18px] shrink-0" />
                                        Help Center
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-0">
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 ${pathName === '/login' && '!bg-gray-400 !text-black'}`}
                                    >
                                        <LogOut className="size-[18px] shrink-0" />
                                        Sign out
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <button
                        type="button"
                        className="order-3 duration-300 hover:opacity-80 lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
