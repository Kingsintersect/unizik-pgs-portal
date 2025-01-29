"use client";

import AuthSection from '@/components/ui/application/sections/AuthSection'
import React, { Key, useEffect, useState } from 'react'
import { notify } from '@/contexts/ToastProvider';
import { applicationPurchase } from '@/app/actions/student';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StudentAdmissionFormData, StudentAdmissionSchema } from './application.types.';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { GetAllActiveFacultiesWithDepartments } from '@/app/actions/server.admin';
import { FormFieldSet, InputFormField, RadiobuttonFormField, SelectFormField } from '@/components/ui/inputs/FormFields';
import { Nationality, State } from '@/config';

const Application = () => {   
       const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        setValue,
        
    } = useForm<StudentAdmissionFormData>({ resolver: zodResolver(StudentAdmissionSchema), });
    const router = useRouter();
    const [departmentFaculty, setDepartmentFaculty] = useState<any[]>([]);

    const handleDepartmentSelect = (faculityId: number, departmentId: number) => {
        setValue("faculty_id", faculityId);
    };

    const onSubmit: SubmitHandler<StudentAdmissionFormData> = async (data, event: any) => {
        event.preventDefault();
        if (data.password !== data.password_confirmation) {
            console.log("Passwords don't match");
            notify({ message: "Passwords did't match", variant: "error", timeout: 5000 });
            return;
        }
        const { error, success } = await applicationPurchase(data);
        if (error) {
            notify({ message: 'Application Fialed. Pleae Try Again', variant: "error", timeout: 5000 });
        }
        if (success) {
            notify({ message: 'Application Was Successful', variant: "success", timeout: 5000 });
            localStorage.setItem('application_data', success.data)
            router.push(success.data.authorizationUrl);
            router.refresh();
        }
    };

    useEffect(() => {
        const loadData = async () => {
            const { error, success }: any = await GetAllActiveFacultiesWithDepartments();
            if (success) setDepartmentFaculty(success.data);
            setValue('amount', 10000);
        };

        loadData();
    }, [setValue]);
   
   return (
      <AuthSection classList='' title="Student Admission Form" subtitle='Fill the form below with appropriate values to apply for your admission'>
         {/* <AdmissionForm></AdmissionForm> */}
         <form onSubmit={handleSubmit(onSubmit)} className="block w-full space-y-4 md:space-y-10 mt-10 pb-20">
            <div className="mx-auto space-y-10">
               <FormFieldSet legend={'Personal Information'} classList={'bg-white'} >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 my-7 gap-y-7">
                        <InputFormField<StudentAdmissionFormData>
                           type="text"
                           id={'first_name'}
                           label={"Your First Name"}
                           name="first_name"
                           register={register}
                           error={errors.first_name}
                        />
                        <InputFormField<StudentAdmissionFormData>
                           type="text"
                           id={'last_name'}
                           label="Your Last Name"
                           name="last_name"
                           register={register}
                           error={errors.last_name}
                        />
                        <InputFormField<StudentAdmissionFormData>
                           classList={""}
                           type="text"
                           id={'other_name'}
                           label="Other Names"
                           name="other_name"
                           register={register}
                           error={errors.other_name}
                        />
                        <InputFormField<StudentAdmissionFormData>
                           type="text"
                           id={'phone_number'}
                           label="Phone Number"
                           name="phone_number"
                           register={register}
                           error={errors.phone_number}
                        />
                        <SelectFormField<StudentAdmissionFormData>
                           classList={""}
                           id={'nationality'}
                           name="nationality"
                           label={"Country of origin"}
                           register={register}
                           error={errors.nationality}
                        >
                           <option value={""}>Country Option</option>
                           {Nationality && Nationality.map((item: any, i: any) => (
                              <option key={i} value={item.value}>{item.label}</option>
                           ))}
                        </SelectFormField>
                        <SelectFormField<StudentAdmissionFormData>
                           id={'state'}
                           name="state"
                           label={"State of origin"}
                           register={register}
                           error={errors.state}
                        >
                           <option value={""}>State Option</option>
                           {State && State.map((item: any, i: any) => (
                              <option key={i} value={item.value}>{item.label}</option>
                           ))}
                        </SelectFormField>
                        <InputFormField<StudentAdmissionFormData>
                           classList={"md:col-span-2"}
                           type="text"
                           id={'email'}
                           label="Email address"
                           name="email"
                           register={register}
                           error={errors.email}
                        />
                        <InputFormField<StudentAdmissionFormData>
                           type="password"
                           id={'password'}
                           label="Your password"
                           name="password"
                           register={register}
                           error={errors.password}
                        />
                        <InputFormField<StudentAdmissionFormData>
                           type="password"
                           id={'password_confirmation'}
                           label="Confirm your password"
                           name="password_confirmation"
                           register={register}
                           error={errors.password_confirmation}
                        />


                  </div>
               </FormFieldSet>

               <FormFieldSet legend={'Admission Application Data'} classList={'bg-white'} >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 my-7 gap-y-7">
                        {departmentFaculty && departmentFaculty.map((fac, i) => (
                           <div key={i} className='border rounded-lg p-5'>
                              <div className="flex gap-2">
                                    <span className="font-bold text-xl text-orange-800 mb-5">{fac.faculty_name}</span>
                              </div>
                              {fac.departments && fac.departments.map((dept: any, j: Key | null | undefined) => (
                                    <RadiobuttonFormField<StudentAdmissionFormData>
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
                        <InputFormField<StudentAdmissionFormData>
                           classList='col-span-full'
                           type="text"
                           id={'amount'}
                           label="Payment amount"
                           name="amount"
                           register={register}
                           error={errors.amount}
                           valueAsNumber
                           value={10000}
                        />
                  </div>
               </FormFieldSet>
            </div>
            <div className="w-full ">
               <button
                    type="submit"
                    disabled={!isValid}
                    className="mt-4 w-full font-semibold text-2xl bg-[#9a3412] text-white px-4 py-2 rounded hover:bg-[#702003] flex gap-3 justify-center items-center disabled:bg-gray-600  disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Processing..." : "Procced to payment"}
                </button>
            </div>
         </form>
      </AuthSection>
   )
}

export default Application