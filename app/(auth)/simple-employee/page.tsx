// src/pages/employees/index.tsx

'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog'
import { EmployeeForm } from '@/components/forms/employee-form'
import {
    RefreshCw,
    Download,
    Plus,
    Pencil,
    Trash,
    Trash2Icon,
    XIcon,
} from 'lucide-react'
// import { useEmployeeContext } from '@/context/EmployeeContext'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { useEmployeeContext } from '@/context/employee-context'
import { Suspense } from 'react'

function EmployeesPage() {
    const {
        employees,
        setEmployees,
        search,
        setSearch,
        city,
        setCity,
        filteredEmployees,
        handleAddEmployee,
        handleEditEmployee,
        handleDeleteEmployee,
        openDeleteDialog,
        closeDeleteDialog,
        isDeleteDialogOpen,
        employeeToDelete,
    } = useEmployeeContext()

    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedEmployeeId = searchParams.get('id')
    const isDialogOpen = Boolean(selectedEmployeeId)
    const selectedEmployee =
        employees.find((emp) => emp.id === selectedEmployeeId) || null

    return (
        <div className="rounded-2xl bg-white p-6">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Address Book | Employee</h1>
                <div className="flex gap-2">
                    <Button
                        variant="outline-general"
                        size="default"
                        onClick={() => router.refresh()}
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline-general" size="default">
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button
                        onClick={() => router.push('/employees?id=new')}
                        className="flex items-center"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Employee
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Employee Table */}
            <div className="rounded-lg border-gray-500 shadow-sm">
                <Table className="rounded-lg border-danger shadow-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Employee ID</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Employee Type</TableHead>
                            <TableHead>Email ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEmployees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.phoneNumber}</TableCell>
                                <TableCell>{employee.employeeType}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            employee.status === 'Active'
                                                ? 'green'
                                                : 'red'
                                        }
                                    >
                                        {employee.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline-general"
                                            size="small"
                                            onClick={() =>
                                                router.push(
                                                    `/employees?id=${employee.id}`,
                                                )
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline-general"
                                            size="small"
                                            onClick={() =>
                                                openDeleteDialog(employee)
                                            }
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="bg-gray-100 md:rounded-2xl">
                    <DialogTitle className="flex items-center justify-start gap-3 text-black">
                        <Trash2Icon className="h-6 w-6" />
                        Delete Entry?
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this entry?
                    </DialogDescription>
                    <DialogFooter className="mt-3 md:mt-5">
                        <Button
                            size={'large'}
                            variant={'outline'}
                            onClick={closeDeleteDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            size={'large'}
                            variant="destructive"
                            className="bg-danger text-white"
                            onClick={() =>
                                handleDeleteEmployee(employeeToDelete!)
                            }
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add/Edit Employee Form */}
            <Sheet
                open={isDialogOpen}
                onOpenChange={() => router.push('/employees')}
            >
                <SheetContent className="w-full max-w-3xl overflow-y-auto bg-white p-0 md:min-w-[700px]">
                    <SheetHeader className="sticky top-0 z-20 flex w-full flex-row items-center justify-between bg-gray-200 p-4 px-6">
                        <DialogTitle className="text-black">
                            {selectedEmployeeId === 'new'
                                ? 'Add Employee'
                                : 'Edit Employee'}
                        </DialogTitle>
                        <div className="flex items-center justify-center gap-2">
                            <Button
                                size="small"
                                className="inline-flex items-center"
                                onClick={() => router.push('/employees')}
                            >
                                <XIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </SheetHeader>

                    <EmployeeForm
                        initialData={selectedEmployee || undefined}
                        onSubmit={
                            selectedEmployeeId === 'new'
                                ? handleAddEmployee
                                : handleEditEmployee
                        }
                        onDelete={
                            selectedEmployeeId !== 'new'
                                ? () => handleDeleteEmployee(selectedEmployee!)
                                : undefined
                        }
                        onCancel={() => router.push('/employees')}
                    />
                </SheetContent>
            </Sheet>
        </div>
    )
}

const EmployeePageWithSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <EmployeesPage />
    </Suspense>
)

export default EmployeePageWithSuspense
