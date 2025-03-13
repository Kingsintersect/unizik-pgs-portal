'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import {cn}from '@/lib/utils';
import { Nationality, State } from '@/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormFieldSet, InputFormField, RadiobuttonFormField, SelectFormField } from '@/components/ui/inputs/FormFields';
import { Fragment, Key, useEffect, useState } from 'react';
import { SignupFormData, SignupSchema } from './signup.types.';
import { GetAllActiveFacultiesWithDepartments } from '@/app/actions/server.admin';

const steps = ["Personal Info", "Account Credentials", "Application Data"];

export default function SignupPage() {
    const [step, setStep] = useState(0);
    const [departmentFaculty, setDepartmentFaculty] = useState<any[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
    });
    const handleDepartmentSelect = (faculityId: number, departmentId: number) => {
        setValue("faculty_id", faculityId);
    };

    useEffect(() => {
        const loadData = async () => {
            const { error, success }: any = await GetAllActiveFacultiesWithDepartments();
            if (success) setDepartmentFaculty(success.data);
        };

        loadData();
    }, []);

    const onSubmit: SubmitHandler<SignupFormData> = (data: any) => {
        console.log("Form Submitted", data);
    };

    return (
        <div className={cn(`block w-full space-y-4 text-left`)}>

            <div className="flex items-center space-x-4 mb-2">
                {steps.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        step >= index ? "bg-orange-500" : "bg-gray-300"
                    }`}
                    >
                    {index + 1}
                    </div>
                    <span className={`text-sm ${step >= index ? "text-gray-900" : "text-gray-400"}`}>
                    {item}
                    </span>
                </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={cn(`block space-y-2 max-h-[400px] overflow-y-scroll`)}>
                <FormFieldSet legend={'Personal Information'} classList={`bg-white border-0 pr-10 py-2 mt-5 ${
                    step == 0 ? "block" : "hidden"
                  }`} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 my-2 gap-y-4">
                        <InputFormField<SignupFormData>
                            type="text"
                            id={'first_name'}
                            label={"Your First Name"}
                            name="first_name"
                            register={register}
                            error={errors.first_name}
                        />
                        <InputFormField<SignupFormData>
                            type="text"
                            id={'last_name'}
                            label="Your Last Name"
                            name="last_name"
                            register={register}
                            error={errors.last_name}
                        />
                        <InputFormField<SignupFormData>
                            classList={"col-span-full"}
                            type="text"
                            id={'other_name'}
                            label="Other Names"
                            name="other_name"
                            register={register}
                            error={errors.other_name}
                        />
                        <SelectFormField<SignupFormData>
                            name="nationality"
                            label={"Country of origin"}
                            control={control}
                            error={errors.nationality}
                            options={Nationality}
                        />
                        <SelectFormField<SignupFormData>
                            name="state"
                            label={"State of origin"}
                            control={control}
                            error={errors.state}
                            options={State}
                        />
                    </div>
                </FormFieldSet>
                        
                <FormFieldSet legend={'Account Credentials'} classList={`bg-white border-0 pr-10 ${
                    step == 1 ? "block" : "hidden"
                  }`} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 my-7 gap-y-7">
                        
                        <InputFormField<SignupFormData>
                            classList={"md:col-span-2"}
                            type="text"
                            id={'email'}
                            label="Email address"
                            name="email"
                            register={register}
                            error={errors.email}
                        />
                        <InputFormField<SignupFormData>
                            type="password"
                            id={'password'}
                            label="Your password"
                            name="password"
                            register={register}
                            error={errors.password}
                        />
                        <InputFormField<SignupFormData>
                            type="password"
                            id={'password_confirmation'}
                            label="Confirm your password"
                            name="password_confirmation"
                            register={register}
                            error={errors.password_confirmation}
                        />
                        <InputFormField<SignupFormData>
                            type="text"
                            id={'phone_number'}
                            label="Phone Number"
                            name="phone_number"
                            register={register}
                            error={errors.phone_number}
                        />
                    </div>
                </FormFieldSet>
                
                <FormFieldSet legend={'Admission Application Data'} classList={`bg-white border-0 pr-10 ${
                    step == 2 ? "block" : "hidden"
                }`} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 my-7 gap-y-7">
                        {departmentFaculty && departmentFaculty.map((fac, i) => (
                        <div key={i} className='border rounded-lg p-5'>
                            <div className="flex gap-2">
                                    <span className="font-bold text-xl text-orange-800 mb-5">{fac.faculty_name}</span>
                            </div>
                            {fac.departments && fac.departments.map((dept: any, j: Key | null | undefined) => (
                                <RadiobuttonFormField<SignupFormData>
                                    key={j}
                                    label={dept.department_name}
                                    data-faculty_id={fac.id}
                                    name={'department_id'}
                                    value={dept.id}
                                    register={register}
                                    onChange={() => handleDepartmentSelect(fac.id, dept.id)}
                                    validationRules={{
                                        setValueAs: (value: any) => parseInt(value, 10),
                                    }}
                                    valueAsNumber={true}
                                    error={errors.department_id}
                                />
                            ))}
                        </div>
                        ))}
                    </div>
                </FormFieldSet>

                {/* BUTTON AREA */}
                <div className="flex justify-between px-10">
                    <button
                        type="button"
                        disabled={step === 0}
                        onClick={() => setStep(step - 1)}
                        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                    >
                        ← Previous
                    </button>
                    <button
                        type={step === steps.length - 1 ? "submit" : "button"}
                        onClick={() => step < steps.length - 1 && setStep(step + 1)}
                        className="bg-orange-500 px-4 py-2 text-white rounded"
                    >
                        {step === steps.length - 1 ? "Submit" : "Next →"}
                    </button>
                </div>
            </form>
        </div>
    );
}
