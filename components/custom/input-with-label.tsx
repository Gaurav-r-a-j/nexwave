import React, { FC } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    id: string
    error?: string
    labelClassName?: string
    touched?: boolean
}

const CustomInput: FC<CustomInputProps> = ({
    label,
    id,
    error,
    touched,
    className,
    labelClassName,
    ...props
}) => {
    return (
        <div className="group relative mb-4">
            <Label
                htmlFor={id}
                className={cn(
                    'absolute start-3 top-0 z-[1] block -translate-y-1/2 bg-gray px-2 text-xs font-medium transition-colors',
                    labelClassName,
                    touched && error
                        ? 'text-danger'
                        : 'text-secondary group-focus-within:text-[#8B1D1D]',
                )}
            >
                {label}
            </Label>
            <Input
                id={id}
                {...props}
                className={cn(
                    'h-12 border border-gray-300 pl-4 transition-colors focus-visible:ring-0',
                    touched && error
                        ? 'border-danger'
                        : 'focus-visible:border-[#8B1D1D]',
                    className,
                )}
            />
            {touched && error && (
                <div className="mt-2 text-sm text-danger">{error}</div>
            )}
        </div>
    )
}

export default CustomInput
