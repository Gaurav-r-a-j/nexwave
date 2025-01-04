import React, { FC } from 'react'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Option {
    value: string | number
    label: string
}

interface CustomSelectProps {
    label: string
    id: string
    placeholder?: string
    error?: string
    touched?: boolean
    value?: string | number
    options: Option[]
    onChange: (value: string) => void
}

const CustomSelect: FC<CustomSelectProps> = ({
    label,
    id,
    placeholder,
    error,
    touched,
    value,
    options,
    onChange,
}) => {
    return (
        <div className="group relative mb-4">
            <Label
                htmlFor={id}
                className={cn(
                    'absolute start-3 top-0 z-[1] block -translate-y-1/2 bg-gray px-2 text-xs font-medium transition-colors',
                    touched && error
                        ? 'text-danger'
                        : 'text-secondary group-focus-within:text-[#8B1D1D]',
                )}
            >
                {label}
            </Label>
            <Select
                value={value?.toString()}
                onValueChange={onChange}
                defaultValue=""
            >
                <SelectTrigger
                    className={cn(
                        'text-secondary h-12 border border-gray-300 transition-colors',
                        touched && error
                            ? 'border-danger'
                            : 'focus-visible:border-[#8B1D1D]',
                    )}
                >
                    <SelectValue
                        placeholder={placeholder ?? 'Select an option'}
                    />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value.toString()}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {touched && error && (
                <div className="mt-2 text-sm text-danger">{error}</div>
            )}
        </div>
    )
}

export default CustomSelect
