import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomInput from '@/components/custom/input-with-label'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { Employee } from '@/types/employee'
import { TrashIcon } from 'lucide-react'
import CustomSelect from '../custom/select-with-label'
import { Badge } from '../ui/badge'
import { EMPLOYEES } from '@/lib/constants/employees'

interface EmployeeFormProps {
    initialData?: Partial<Employee>
    // onSubmit: (values: Partial<Employee>) => Promise<void>
    // onDelete?: () => Promise<void>
    onSubmit: (values: Partial<Employee>) => void
    onDelete?: () => void
    onCancel?: () => void
}

export function EmployeeForm({
    initialData,
    onSubmit,
    onDelete,
    onCancel,
}: EmployeeFormProps) {
    const formik = useFormik({
        initialValues: {
            id: initialData?.id || '',
            firstName: initialData?.firstName || '',
            lastName: initialData?.lastName || '',
            email: initialData?.email || '',
            phoneNumber: initialData?.phoneNumber || '',
            whatsApp: initialData?.whatsApp || '',
            alternatePhone: initialData?.alternatePhone || '',
            gender: initialData?.gender || '',
            employeeType: initialData?.employeeType || 'Permanent',
            status: initialData?.status || 'Active',
            address: {
                line1: initialData?.address?.line1 || '',
                line2: initialData?.address?.line2 || '',
                zipCode: initialData?.address?.zipCode || '',
                city: initialData?.address?.city || '',
                state: initialData?.address?.state || '',
            },
            adhaarNumber: initialData?.adhaarNumber || '',
            panNumber: initialData?.panNumber || '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            phoneNumber: Yup.string().required('Required'),
            gender: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            await onSubmit(values)
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-2">
            {initialData && (
                <Badge
                    variant={
                        formik.values.status === 'Active' ? 'green' : 'red'
                    }
                    className="fixed right-24 top-7 z-20 capitalize"
                >
                    {formik.values.status}
                </Badge>
            )}

            <div className="px-4 pb-0 pt-3 md:px-7 md:pb-0">
                <div className="space-y-2">
                    <h3 className="pb-3 text-base font-semibold text-black">
                        Basic Details
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <CustomInput
                            id="firstName"
                            label="First Name*"
                            {...formik.getFieldProps('firstName')}
                            touched={formik.touched.firstName}
                            error={formik.errors.firstName}
                        />
                        <CustomInput
                            id="lastName"
                            label="Last Name*"
                            {...formik.getFieldProps('lastName')}
                            touched={formik.touched.lastName}
                            error={formik.errors.lastName}
                        />

                        <CustomSelect
                            id="gender"
                            label="Gender*"
                            value={formik.values.gender}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                            ]}
                            onChange={(value) =>
                                formik.setFieldValue('gender', value)
                            }
                            placeholder="Select Gender"
                            touched={formik.touched.gender}
                            error={formik.errors.gender}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            id="phoneNumber"
                            label="Phone Number*"
                            {...formik.getFieldProps('phoneNumber')}
                            touched={formik.touched.phoneNumber}
                            error={formik.errors.phoneNumber}
                        />
                        <CustomInput
                            id="alternatePhone"
                            label="Alternate Phone Number*"
                            {...formik.getFieldProps('alternatePhone')}
                            touched={formik.touched.alternatePhone}
                            error={formik.errors.alternatePhone}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            id="whatsApp"
                            label="WhatsApp"
                            {...formik.getFieldProps('whatsApp')}
                        />
                        <CustomInput
                            id="email"
                            label="Email*"
                            type="email"
                            {...formik.getFieldProps('email')}
                            touched={formik.touched.email}
                            error={formik.errors.email}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="pb-3 text-base font-semibold text-black">
                        Identity Information
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            id="adhaarNumber"
                            label="Adhaar Number"
                            {...formik.getFieldProps('adhaarNumber')}
                        />
                        <CustomInput
                            id="panNumber"
                            label="PAN Number"
                            {...formik.getFieldProps('panNumber')}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="pb-3 text-base font-semibold text-black">
                        Employee Type
                    </h3>
                    <RadioGroup
                        value={formik.values.employeeType}
                        onValueChange={(value) =>
                            formik.setFieldValue('employeeType', value)
                        }
                        className="flex items-center justify-start gap-5 pb-6 pt-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Permanent" id="permanent" />
                            <Label htmlFor="permanent">Permanent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Contract" id="contract" />
                            <Label htmlFor="contract">Contract</Label>
                        </div>
                    </RadioGroup>
                </div>

                {initialData && (
                    <div className="space-y-2">
                        <h3 className="pb-3 text-base font-semibold text-black">
                            Status
                        </h3>
                        <div className="flex items-center space-x-2 pb-6 pt-2">
                            <Checkbox
                                id="status"
                                className="h-4 w-4"
                                checked={formik.values.status === 'Active'}
                                onCheckedChange={(checked) =>
                                    formik.setFieldValue(
                                        'status',
                                        checked ? 'Active' : 'In-Active',
                                    )
                                }
                            />
                            <Label htmlFor="status">Active</Label>
                        </div>
                    </div>
                )}

                <div className="space-y-5">
                    <h3 className="pb-3 text-base font-semibold text-black">
                        Address
                    </h3>
                    <CustomInput
                        id="address.line1"
                        label="Line 1"
                        {...formik.getFieldProps('address.line1')}
                    />
                    <CustomInput
                        id="address.line2"
                        label="Line 2"
                        {...formik.getFieldProps('address.line2')}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            id="address.zipCode"
                            label="Zip Code"
                            {...formik.getFieldProps('address.zipCode')}
                        />

                        <div>
                            <CustomSelect
                                id="address.city"
                                label="City"
                                value={formik.values.address.city}
                                options={[
                                    { value: 'hyderabad', label: 'Hyderabad' },
                                    { value: 'bangalore', label: 'Bangalore' },
                                ]}
                                onChange={(value) =>
                                    formik.setFieldValue('address.city', value)
                                }
                                touched={formik.touched.address?.city}
                                error={formik.errors.address?.city}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 z-10 flex justify-between gap-4 border-t border-dashed border-gray-300 bg-white p-4 px-6">
                {onDelete && (
                    <Button
                        type="button"
                        variant="destructive"
                        className="bg-none !text-danger ring-1 ring-danger"
                        onClick={onDelete}
                    >
                        <TrashIcon className="h-3 w-3" />
                        Delete
                    </Button>
                )}
                <div className="flex w-full items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel || (() => window.history.back())}
                    >
                        Cancel
                    </Button>
                    {!initialData && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                formik.setValues({
                                    ...EMPLOYEES[0],
                                    gender: 'male',
                                })
                            }}
                        >
                            Fill Sample Data
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant={'black'}
                        size={'large'}
                        className="px-4 md:px-6"
                        disabled={formik.isSubmitting}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </form>
    )
}
