import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { title } from 'process'

type FormWrapperProps = {
    children: React.ReactNode
    open: boolean
    onClose: () => void
    title: string
    description: string
}

export function FormWrapper({
    children,
    open,
    title,
    description,
    onClose,
}: FormWrapperProps) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    )
}
