"use client";
import Stepper from "@/components/Stepper";
import { FormFieldSet, InputFormField, RadiobuttonFormField, SelectFormField } from '@/components/ui/inputs/FormFields';
import { Loader2, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useSignInMultiStepViewModel, { SignupSchema } from "@/hook/use-signin-multistep-view-model";
import { z } from "zod";
import { Key } from "react";


type SignupFormData = z.infer<typeof SignupSchema>;
export default function SignupPage() {
    const {
        currentStep,
        nextStep,
        prevStep,
        NewGender,
        NewNationality,
        NewState,
        register,
        handleSubmit,
        onSubmit,
        control,
        errors,
        isSubmitting,
        departmentFaculty,
        programme,
        handleDepartmentSelect,
        steps,
        delta
    } = useSignInMultiStepViewModel();

    return (
        <div className="block w-full space-y-1 text-left">
            <Stepper steps={steps} currentStep={currentStep} />
            
            <form onSubmit={handleSubmit(onSubmit)} className={`block max-h-[450px] overflow-y-scroll overflow-x-hidden pr-5`}>
                {currentStep == 1 && (
                    <motion.div
                        initial={{ x: delta >= 1 ? '80%' : '-80%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <FormFieldSet classList={`bg-white border-0 py-2`} >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 my-4 gap-y-4">
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
                                    classList=""
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
                                    options={NewGender}
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
                                    options={NewNationality}
                                />
                                <SelectFormField<SignupFormData>
                                    name="state"
                                    label={"State of origin"}
                                    control={control}
                                    error={errors.state}
                                    options={NewState}
                                />
                                <InputFormField<SignupFormData>
                                    type="text"
                                    id={'hometown_address'}
                                    label="Home Town Address"
                                    name="hometown_address"
                                    register={register}
                                    error={errors.hometown_address}
                                />
                                <InputFormField<SignupFormData>
                                    type="text"
                                    id={'residential_address'}
                                    label="Residential Address"
                                    name="residential_address"
                                    register={register}
                                    error={errors.residential_address}
                                />
                            </div>
                        </FormFieldSet>
                    </motion.div>
                )}
                {currentStep == 2 && (
                    <motion.div
                        initial={{ x: delta >= 1 ? '80%' : '-80%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <FormFieldSet classList={`bg-white border-0`} >
                            <div className="mb-4">
                                <SelectFormField<SignupFormData>
                                name="program"
                                label={"Select Programme of Study"}
                                control={control}
                                error={errors.program}
                                options={programme}
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
                    </motion.div>
                )}
                {currentStep == 3 && (
                    <motion.div
                        initial={{ x: delta >= 1 ? '80%' : '-80%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    > 
                        <FormFieldSet classList={`bg-white border-0`} >
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
                    </motion.div>
                )}

                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`px-4 py-1 bg-gray-300 rounded-md ${currentStep === 1? "hidden": "block"}`}
                    >
                        ← Previous
                    </button>
                    <Button
                        type="button"
                        onClick={nextStep}
                        className={`px-4 py-1 bg-[#23628d] text-white rounded-md ml-auto ${currentStep === steps.length ? "w-[50%] text-lg font-bold": ""}`}
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
                                    : <span className="flex items-center gap-3">{"Submit"} <SaveAll size={36} strokeWidth={2.75} /></span>
                                }
                                </>)
                            : "Continue →"
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}
