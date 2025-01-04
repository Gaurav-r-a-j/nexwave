'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Employee } from '@/types/employee'
import { ColumnDef, Row } from '@tanstack/react-table'
import {
    ArrowUpDown,
    Edit,
    MoreHorizontal,
    MoveDown,
    MoveUp,
    Trash,
    Trash2,
} from 'lucide-react'
import Image from 'next/image'
import SortButton from '../sort-button'
import { useRouter } from 'next/navigation'
import { useEmployeeContext } from '@/context/employee-context'

export const columns: ColumnDef<Employee>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'firstName',
        header: ({ column }) => (
            <SortButton column={column} label="First Name" />
        ),
        cell: ({ row }) => <div>{row.getValue('firstName')}</div>,
    },
    {
        accessorKey: 'lastName',
        header: ({ column }) => (
            <SortButton column={column} label="Last Name" />
        ),
        cell: ({ row }) => <div>{row.getValue('lastName')}</div>,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <SortButton column={column} label="Email" />,
        cell: ({ row }) => <div>{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'phoneNumber',
        header: ({ column }) => (
            <SortButton column={column} label="Phone Number" />
        ),
        cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
    },
    {
        accessorKey: 'whatsApp',
        header: ({ column }) => <SortButton column={column} label="WhatsApp" />,
        cell: ({ row }) => <div>{row.getValue('whatsApp')}</div>,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <SortButton column={column} label="Status" />,
        cell: ({ row }) => (
            <Badge
                variant={row.getValue('status') === 'Active' ? 'green' : 'red'}
                className="capitalize"
            >
                {row.getValue('status')}
            </Badge>
        ),
    },
    {
        accessorKey: 'alternatePhone',
        header: ({ column }) => (
            <SortButton column={column} label="Alternate Phone" />
        ),
        cell: ({ row }) => <div>{row.getValue('alternatePhone')}</div>,
    },

    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <EditDeleteActions row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
]

const EditDeleteActions = ({ row }: { row: Row<Employee> }) => {
    const { handleEditEmployee, openDeleteDialog } = useEmployeeContext()
    const router = useRouter()

    return (
        <div className="flex gap-2">
            <Button
                // onClick={() => handleEditEmployee(row.original)}
                variant="outline"
                onClick={() => {
                    console.log('row.original', row.original)
                    router.push(`/employees/?id=${row.original.id}`)
                }}
            >
                <Edit size={16} />
            </Button>
            <Button
                onClick={() => openDeleteDialog(row.original)}
                variant="outline"
                className="text-danger ring-1 ring-danger"
            >
                <Trash size={16} />
            </Button>
        </div>
    )
}



