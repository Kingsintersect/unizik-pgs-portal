"use client";

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { baseUrl } from '@/config';
import { useAppContext } from '@/contexts/AppContext';
import { notify } from '@/contexts/ToastProvider';
import { useRouter } from 'next/navigation';
import useToken from '@/hook/useToken';
import { ApplyForAdmission, UploadPassport } from '@/app/actions/student';
import { CompleteApplicationFormData, CompleteApplicationFormSchema } from '../studentApplication.types';
import UploadPassportForm from './forms/UploadPassportForm';
import OtherPersonalDetails from './forms/OtherPersonalDetails';
import NextOfKinForm from './forms/NextOfKinForm';
import ExamSittingForm from './forms/ExamSittingForm';
import Button from '@/components/ui/application/Button';
import { CenteredSection } from '@/components/ui/application/sections/Section';

const CompleteApplicationForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      reset,
   } = useForm<CompleteApplicationFormData>({
      resolver: zodResolver(CompleteApplicationFormSchema),
      defaultValues: { awaiting_result: false },
   });

   const { state } = useAppContext()
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [passportError, setPassportError] = useState(false);
   const [firstResultError, setFirstResultError] = useState(false);
   const [secondResultError, setSecondResultError] = useState(false);
   const router = useRouter();
   const { token } = useToken();

   const onSubmit: SubmitHandler<CompleteApplicationFormData> = async (formdata) => {
      const { awaiting_result } = getValues();
      let compiledData: any;
      formdata.image_url = state.passportUrl ?? undefined;

      if (state.passportUrl === null) {
         setPassportError(true);
         notify({ message: 'Upload your passport and your qaulification', variant: "error", timeout: 5000 });
         return;
      } else { setPassportError(false) }

      if (!awaiting_result) {
         if (state.firstSittingGrade.length === 0) {
            notify({ message: 'Your must select your exam subjects and its corresponding grades', variant: "error", timeout: 5000 });
            return;
         }

         if (state.firstSittingResultUrl === null) {
            setFirstResultError(true);
            notify({ message: 'Your results must be uploaded', variant: "error", timeout: 5000 });
            return;
         } else { setPassportError(false) }

         compiledData = {
            ...formdata,
            ...((formdata.dis === "no")) ? { disability: "None" } : {},
            first_sitting: {
               first_sitting_result: state.firstSittingResultUrl,
               type: formdata.first_sitting_type,
               exam_number: formdata.first_sitting_exam_number,
               year: formdata.first_sitting_year,
               first_sitting_grade: state.firstSittingGrade
            },
            ...((state.secondSittingGrade !== null) ? {
               second_sitting: {
                  second_sitting_result: state.secondSittingResultUrl,
                  type: formdata.second_sitting_type,
                  exam_number: formdata.second_sitting_exam_number,
                  year: formdata.second_sitting_year,
                  second_sitting_grade: state.secondSittingGrade
               }
            } : { second_sitting: null })
         }
      } else {
         compiledData = {
            ...formdata,
            ...((formdata.dis === "no")) ? { disability: "None" } : {},
         }
      }

      const {
         first_sitting_type,
         first_sitting_exam_number,
         first_sitting_year,

         second_sitting_type,
         second_sitting_exam_number,
         second_sitting_year,
         ...rest
      } = compiledData;

      // SUBMIT DATA
      setIsLoading(true);
      // console.log('rest', rest)
      // return;
      if (token) {
         const { error, success } = await ApplyForAdmission(rest, token);
         if (success) {
            setIsLoading(false);
            notify({ message: 'Your have successfully Applied For Admission', variant: "success", timeout: 5000 });
            router.push(`${baseUrl}/dashboard/student`);
            router.refresh();
            return;
         }
         if (error) {
            setIsLoading(false);
            notify({ message: 'Your Application Failed. Please Try Again.', variant: "error", timeout: 5000 });
            console.log(error.message);
            return;
         }
      } else {
         setIsLoading(false); router.push(`${baseUrl}/auth/student`)
            router.refresh();
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-10 relative pb-20'>
         <CenteredSection
            title='Upload passport photograph'
            titleClass='text-orange-800'
            subtitle='Select the passport file from the saved location, then click next to continue, when you have completed the form.'
            classList='space-y-7'
         >
            <p className="mt-7 text-blue-800">Please note that the passport background should be plain
               <span className='text-orange-700'> (white or clear) </span>
               <br />and size should  <span className='text-orange-700'> not be more than 50kb</span> , <br />with file format <span className='text-orange-700'> in either .gif, .jpeg, .jpg or .png</span>
            </p>
            <UploadPassportForm register={register} errors={errors} fileKey={'passport'} uploadMethod={UploadPassport} />
            {passportError && (<p className="text-sm text-red-400">Please upload your passport</p>)}
         </CenteredSection>

         <CenteredSection
            classList='space-y-7'
            titleClass='text-orange-800'
            title='Other personal detail'
            description='Provide your other personal details. Fields in red highlight are compulsory, and must be provided before clicking the next button. '
         >
            <div className="form-content text-left">
               <OtherPersonalDetails register={register} errors={errors} />
            </div>
         </CenteredSection>

         <CenteredSection
            classList='space-y-7'
            titleClass='text-orange-800'
            title='Next of Kin or Sponsor '
            subtitle='Provide valuable information about your sponsor'
            subtitleClass='text-blue-800'
         >
            <div className="form-content text-left">
               <NextOfKinForm register={register} errors={errors} />
            </div>
         </CenteredSection>

         <CenteredSection
            classList=''
            title='O-Level result'
            titleClass='text-orange-800'
            subtitle=' Provide your correct O-Level result detail for 1st/2nd or both sitting, depending on the number of result you want to use for this admission '
            subtitleClass='text-blue-800 px-[15%]'
            description=' Note that the school will verify the result provided with the appropriate body. And you will be disqualified in case of any discrepancy'
            descriptionClass='text-orange-500'
         >
            <ExamSittingForm register={register} errors={errors} firstResultError={firstResultError} secondResultError={secondResultError} />
         </CenteredSection>

         <div className="w-full grid grid-cols-1">
            <div className="flex w-full justify-center mt-7">
               <Button isLoading={isLoading} type="submit" className='px-24 bg-[#efb5a2] text-white'>Update Profile To Database</Button>
            </div>
         </div>
      </form>
   )
}

export default CompleteApplicationForm