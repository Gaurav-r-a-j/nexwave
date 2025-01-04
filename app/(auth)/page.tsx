'use client'

import { DataTable } from '@/components/custom/table/data-table'
import PageHeading from '@/components/layout/page-heading'
import { columns } from '@/components/tables/employee/columns'
import { Button } from '@/components/ui/button'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Plus, Trash, XIcon } from 'lucide-react'
import { useState, Suspense } from 'react'
import { useEmployeeContext } from '@/context/employee-context'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { useRouter, useSearchParams } from 'next/navigation'
import { EmployeeForm } from '@/components/forms/employee-form'

const EmployeePage = () => {
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
    const selectedEmployee =
        employees.find((emp) => emp.id === selectedEmployeeId) || null

    const isDialogOpen = Boolean(selectedEmployeeId)

    return (
        <div className="space-y-4">
            <PageHeading heading={'Address Book | Employee'} />

            <div className="min-h-[calc(100vh_-_160px)] w-full">
                {/* Filters Section */}
                <div className="flex items-center justify-between gap-4 overflow-x-auto rounded-t-lg bg-white px-5 py-[17px]">
                    <div id="search-table"></div>

                    <div className="flex items-center gap-4">
                        <Select value={city} onValueChange={setCity}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="City" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Cities</SelectItem>
                                <SelectItem value="hyderabad">
                                    Hyderabad
                                </SelectItem>
                                <SelectItem value="bangalore">
                                    Bangalore
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            variant={'black'}
                            onClick={() => router.push('/employees/?id=new')}
                            className="flex items-center"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Employee
                        </Button>
                    </div>
                </div>

                {/* Employee Table */}
                <DataTable
                    columns={columns}
                    data={filteredEmployees}
                    filterField="email"
                />
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="bg-gray-100 md:rounded-2xl">
                    <DialogTitle className="flex items-center justify-start gap-3 text-black">
                        <Trash className="h-6 w-6" />
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
        <EmployeePage />
    </Suspense>
)

export default EmployeePageWithSuspense
