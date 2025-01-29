"use client";
import cn from '@/lib/cn';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateAccount } from '@/app/actions/student';
import useToken from '@/hook/useToken';
import Button from '../application/Button';
import { useAppContext } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { notify } from '@/contexts/ToastProvider';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputFormField } from '../inputs/FormFields';

const StudentCreateAccount = ({ classList }: { classList?: string }) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const { token } = useToken();
   const router = useRouter();
   const { state } = useAppContext();
   const student = state.student
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<StudentCreateAccountFormData>({
      resolver: zodResolver(StudentCreateAccountSchema),
      // defaultValues: {
      //    first_name: student?.first_name || '',
      //    last_name: student?.last_name || '',
      //    email: student?.email || '',
      //    phone: student?.phone_number || '',
      //    login: '',
      //    reg_number: student?.reg_number || '',
      //    level: student?.level || '',
      // },
   });

   useEffect(() => {
      if (student) {
         reset({
            first_name: student.first_name || '',
            last_name: student.last_name || '',
            email: student.email || '',
            phone: student.phone_number || '',
            login: '',
            reg_number: student.reg_number || '',
            level: student.level || '',
         });
      }
   }, [student, reset]);

   const onSubmit: SubmitHandler<StudentCreateAccountFormData> = async (data, event: any) => {
      setIsLoading(true);
      event.preventDefault();

      if (token) {
         data.reg_number = student.reg_number as string;
         const { error, success } = await CreateAccount(data, token);
         if (error) {
            console.log('error', error.message)
            setIsLoading(false);
            notify({ message: "Account Creation Failed...", variant: "error", timeout: 5000 });
            return;
         }
         if (success) {
            notify({ message: "Account Has been created succefully", variant: "success", timeout: 5000 });
            setIsLoading(false);
            handleFullReload();
            router.refresh();
         }
      } else {
         console.log('token not set');
         notify({ message: "Login to gain access", variant: "error", timeout: 5000 });
      }
   };

   const handleFullReload = () => {
      if (typeof window !== 'undefined') {
         window.location.reload();
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn(`space-y-4 md:space-y-6 text-left text-gray-700 dark:text-gray-400`, classList)}>
         <div className="gap-5 space-y-5 max-w-screen-md mx-auto">
            <InputFormField<StudentCreateAccountFormData>
               type="hidden"
               id={'first_name'}
               label="First Name"
               name="first_name"
               register={register}
               // value={student.first_name ?? ''}
               error={errors.first_name}
            />

            <InputFormField<StudentCreateAccountFormData>
               type="hidden"
               id={'last_name'}
               label="Last Name"
               name="last_name"
               register={register}
               error={errors.last_name}
            />

            <InputFormField<StudentCreateAccountFormData>
               type="hidden"
               id={'email'}
               label="Email Address"
               name="email"
               register={register}
               error={errors.email}
            />

            <InputFormField<StudentCreateAccountFormData>
               type="hidden"
               id={'phone'}
               label="Phone Number"
               name="phone"
               register={register}
               error={errors.phone}
            />

            <InputFormField<StudentCreateAccountFormData>
               type="text"
               id={'login'}
               label="Username"
               name="login"
               register={register}
               error={errors.login}
            />
            <InputFormField<StudentCreateAccountFormData>
               type="hidden"
               id={'level'}
               label="Study Level"
               name="level"
               register={register}
               error={errors.level}
            />

            <InputFormField<StudentCreateAccountFormData>
               type="text"
               id={'reg_number'}
               label="Registration Number"
               name="reg_number"
               register={register}
               error={errors.reg_number}
            />
            <div className="flex justify-center">
               <Button isLoading={isLoading} type="submit" className='px-24 bg-cyan-700 text-white: hover:bg-orange-700'>Create Account</Button>
            </div>
         </div>
      </form>
   )
}

export default StudentCreateAccount


type StudentCreateAccountFormData = {
   first_name: string,
   last_name: string,
   email: string,
   phone: string,
   login: string,
   reg_number: string,
   level: string,
};
export const StudentCreateAccountSchema: ZodType<StudentCreateAccountFormData> = z
   .object({
      first_name: z.string({ message: "First name is required" }).min(3, "First name should be at least 3 characters"),
      last_name: z.string({ message: "Last name is required" }).min(3, "Last name should be at least 3 characters"),
      email: z.string({ message: "email is required" }).email({ message: "Enter correct email address" }),
      phone: z.string({ message: "phone number is required" }).min(3, "Phone numbershould be at least 3 characters"),
      login: z.string({ message: "Username is required" }).min(3, "Username should be at least 3 characters"),
      reg_number: z.string({ message: "Registration number is required" }).min(3, "Registration number should be at least 3 characters"),
      level: z.string({ message: "Study Level is required" }).min(3, "Study Level should be at least 3 characters"),
   })