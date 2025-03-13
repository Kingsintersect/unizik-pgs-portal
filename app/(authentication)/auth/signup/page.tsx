"use client";

import { Key, useEffect, useState } from "react";
import Stepper from "@/components/Stepper";
import { FieldName, SubmitHandler, useForm } from "react-hook-form";
import { SignupFormData, SignupSchema } from "./signup.types.";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetAllActiveFacultiesWithDepartments } from "@/app/actions/server.admin";
import { FormFieldSet, InputFormField, RadiobuttonFormField, SelectFormField } from '@/components/ui/inputs/FormFields';
import { Gender, Nationality, Program, State } from "@/config";
import { Loader2 } from "lucide-react";
import { notify } from "@/contexts/ToastProvider";
import { Signup } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const steps = [
    {
        id: 1,
        label: "Personal Info",
        fields: ["first_name", "last_name", "phone", "gender", "national", "state"],
    },
    {
        id: 2,
        label: "Account Credentials",
        fields: ["program", "faculty_id", "department_id"],
    },
    {
        id: 3,
        label: "Application Data",
        fields: ["email", "username", "password", "password_confirmation"],
    },
];
    
export default function SignupPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [departmentFaculty, setDepartmentFaculty] = useState<any[]>([]);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(SignupSchema),
        mode: "onBlur",
    });


    useEffect(() => {
        const loadData = async () => {
            const { error, success }: any = await GetAllActiveFacultiesWithDepartments();
            if (success) setDepartmentFaculty(success.data);
        };

        loadData();
    }, []);
    
    const handleDepartmentSelect = (faculityId: number, departmentId: number) => {
        setValue("faculty_id", faculityId);
    };

    const nextStep = async () => {
        const fields = steps[currentStep - 1].fields;
        const isFieldsValid = await trigger(fields as FieldName<SignupFormData>[], { shouldFocus: true });

        if (!isFieldsValid) return;
        if (currentStep < steps.length) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        }

        if (currentStep === steps.length) {
            await handleSubmit(onSubmit)(); 
        }
    }
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(step => Math.max(step - 1, 1));
        }
    }

    const onSubmit: SubmitHandler<SignupFormData> = async (data: any) => {
        console.log("Form Submitted", data);
        const { error, success } = await Signup(data);
        if (error) {
            notify({ message: 'Application Fialed. Pleae Try Again', variant: "error", timeout: 5000 });
        }
        if (success) {
            notify({ message: 'Successfully Created Account', variant: "success", timeout: 5000 });
            reset();
            setCurrentStep(1);
            router.push("/auth/signin");
        }
    };

    return (
        <div className="block w-full space-y-1 text-left">
            <Stepper steps={steps} currentStep={currentStep} />

            <form onSubmit={handleSubmit(onSubmit)} className={`block max-h-[450px] overflow-y-scroll pr-5`}>
                <FormFieldSet classList={`bg-white border-0 py-2 ${
                    currentStep == 1 ? "block" : "hidden"
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
                            classList="col-span-full"
                            type="text"
                            id={'phone'}
                            label="Phone Number"
                            name="phone"
                            register={register}
                            error={errors.phone}
                        />
                        <SelectFormField<SignupFormData>
                            name="gender"
                            label={"Your Gender"}
                            control={control}
                            error={errors.gender}
                            options={Gender}
                        />
                        <InputFormField<SignupFormData>
                            classList={"col-span-full"}
                            type="date"
                            id={'dob'}
                            label={"Your date of birth"}
                            name="dob"
                            register={register}
                            error={errors.dob}
                        />
                        <SelectFormField<SignupFormData>
                            name="country"
                            label={"Country of origin"}
                            control={control}
                            error={errors.country}
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
                                
                <FormFieldSet classList={`bg-white border-0 ${
                    currentStep == 2 ? "block" : "hidden"
                }`} >
                    <div className="mb-4">
                        <SelectFormField<SignupFormData>
                        name="program"
                        label={"Select Programme of Study"}
                        control={control}
                        error={errors.program}
                        options={Program}
                    />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
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
                                    // validationRules={{
                                    //     setValueAs: (value: any) => parseInt(value, 10),
                                    // }}
                                    // valueAsNumber={true}
                                    error={errors.department_id}
                                />
                            ))}
                        </div>
                        ))}
                    </div>
                </FormFieldSet>
                        
                <FormFieldSet classList={`bg-white border-0 ${
                    currentStep == 3 ? "block" : "hidden"
                  }`} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                        
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
                            classList={"col-span-full"}
                            type="text"
                            id={'username'}
                            label="Username"
                            name="username"
                            register={register}
                            error={errors.username}
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
                    </div>
                </FormFieldSet>

                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="px-4 py-1 bg-gray-300 rounded-md"
                    >
                        ← Previous
                    </button>
                    <Button
                        type="button"
                        onClick={nextStep}
                        className="px-4 py-1 bg-[#23628d] text-white rounded-md"
                    >
                        {currentStep === steps.length
                            ? (<>
                                {isSubmitting
                                    ? (
                                    <>
                                        <span>{"Processing"}</span>
                                        <Loader2 fontSize={20} size={20} className="animate-spin text-lg" />
                                    </>
                                    )
                                    : <span>{"Submit →"}</span>
                                }
                                </>)
                            : "Continue"
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}
