'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Image from 'next/image'
import { Eye, EyeOff, HelpCircle, InfoIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/auth-context'
import CustomInput from '@/components/custom/input-with-label'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    const { login } = useAuth()

    const formik = useFormik({
        initialValues: {
            email: 'demo@example.com',
            password: 'demo123',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                await login(values.email, values.password)
                // router.push('/employees');
            } catch (error) {
                console.log(error)
                formik.setErrors({ password: 'Invalid email or password' })
            }
        },
    })

    return (
        <div className="relative flex min-h-screen">
            {/* Left Section */}
            <div className="flex flex-1 flex-col justify-center px-8 sm:px-12 lg:px-16">
                <div className="mx-auto w-full max-w-[400px]">
                    <div className="mb-12">
                        <Image
                            src="https://utfs.io/f/qPlpyBmwd8UN4ot2NT3oL1RYwJXGU3fNbBzSnsiWEMhPq8v2"
                            alt="NEX MOVE"
                            width={200}
                            height={50}
                            className="h-[50px] w-auto object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-11">
                        <h2 className="text-2xl font-extrabold text-black md:text-3xl">
                            Business Management Tool
                        </h2>

                        <form
                            onSubmit={formik.handleSubmit}
                            className="flex flex-col gap-3"
                        >
                            <p className="mb-3 text-base font-bold md:text-xl">
                                Sign in to your account
                            </p>

                            <CustomInput
                                id="email"
                                type="email"
                                label="Email Address"
                                {...formik.getFieldProps('email')}
                                error={formik.errors.email}
                                touched={formik.touched.email}
                            />

                            <div className="relative w-full">
                                <CustomInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    {...formik.getFieldProps('password')}
                                    error={formik.errors.password}
                                    touched={formik.touched.password}
                                    className="w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                                    //   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            <button
                                type="button"
                                className="text-secondary flex w-full items-center justify-start gap-1 text-sm hover:underline"
                            >
                                <InfoIcon className="h-4 w-4" />
                                Forgot Password?
                            </button>

                            <Button
                                type="submit"
                                className="mt-1 h-12 w-full bg-[#B92F12] text-base font-bold hover:bg-[#b92e12]"
                                disabled={formik.isSubmitting}
                            >
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="relative hidden flex-1 bg-[#8B1D1D] lg:block">
                <Image
                    src="https://utfs.io/f/qPlpyBmwd8UNvC5KTzRZ61O7DsQc4Sa5Hoi90MwJbkA8fBGL"
                    alt="background"
                    layout="fill"
                    className="object-cover"
                />
            </div>

            <Image
                src="https://utfs.io/f/qPlpyBmwd8UN7bMYdI3kcUNfLbaGgyzpSCAm1PHF8sindeEY"
                alt="Delivery professional"
                // layout="fill"
                width={847}
                height={959}
                // objectFit="cover"
                className="absolute bottom-0 right-0 z-[1] hidden max-h-screen w-max object-contain md:h-[500px] lg:flex lg:h-[700px] 2xl:h-[93%]"
            />

            <div className="absolute bottom-4 left-6">
                <button
                    type="button"
                    className="hover:text-gray-900 text-secondary inline-flex items-center gap-2 text-sm font-bold"
                >
                    <HelpCircle className="h-4 w-4" />
                    Need help?
                </button>
            </div>
        </div>
    )
}
