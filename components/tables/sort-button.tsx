import { MoveDown, MoveUp } from 'lucide-react'

interface SortButtonProps {
    column: any // Accept column prop to handle sorting behavior
    label: string // Column name or label
}

const SortButton = ({ column, label }: SortButtonProps) => {
    return (
        <button
            type="button"
            className="flex items-center gap-1.5"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            <span className="inline-flex items-center -space-x-[5px]">
                <MoveDown
                    className={`size-2.5 shrink-0 text-black ${column.getIsSorted() === 'asc' && 'text-gray-500'}`}
                />
                <MoveUp
                    className={`size-2.5 shrink-0 text-gray-500 ${column.getIsSorted() === 'asc' && '!text-black'}`}
                />
            </span>
            {label}
        </button>
    )
}

export default SortButton
