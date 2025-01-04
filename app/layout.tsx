import type { Metadata } from 'next'
import '@/app/globals.css'
import Providers from '@/lib/providers'

export const metadata: Metadata = {
    title: 'NexMove',
    description: 'Build by NexMove',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="bg-gray font-plus-jakarta text-sm/[22px] font-normal text-secondary antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
