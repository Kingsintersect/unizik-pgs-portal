"use client";
import Image from 'next/image';
import { Card } from 'flowbite-react'
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useAppContext } from '@/contexts/AppContext';
import AppPayTuition from '../app/AppPayTuition';
import { SkeletonCard } from '../application/suspence/CardSkeleton';
import AdmissionDeniedBanner from './AdmissionDeniedBanner';
import { useEffect } from 'react';

type ExtendedStudent = StudentType & {
  installment?: boolean; // Optional property
};

const TuitionPayment = () => {
   const { state } = useAppContext();
   const student = state.student;

   return (
      <>
         {(!student) ?
            <>
               <div className="flex items-center justify-center w-full h-[500px]">
                  <SkeletonCard />
               </div>
            </>
            :
            <>
               {student.admission_status === "not admitted" ?
                  <AdmissionDeniedBanner statement={student.reason_for_denial as string} />
                  :
                  <>

                     {(student.tuition_payment_status === 0) ?
                        <Card className="w-full sm:w-3/4 md:w-3/5 lg:w-5/7 flex-1">
                           <h5 className="flex flex-col justify-between items-center mb-5 space-y-5">
                              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-cyan-800 capitalize ">
                                 {Number(student.tuition_amount_paid)>0 ? 'Outstanding Tuition Fee' : 'Tuition Fee'}
                              </div>
                              <div className="text-orange-800 text-3xl">
                                 {Number(student.tuition_amount_paid)>0 ? ((195000) - Number(student.tuition_amount_paid)).toLocaleString() : '195,000'}
                              </div>
                           </h5>
                           <div className="relative w-full h-52 bg-green-500/25 rounded-md my-5">
                              <Image src={'/random/rand1.jpg'} alt={'Acceptance image'} fill style={{ objectFit: "cover" }} />
                           </div>
                           <p className="font-light text-xl md:tracking-widest md:leading-loose text-center text-cyan-600">
                                 {Number(student.tuition_amount_paid)>0 ? 'Click the button below clear your outstanding Tuition fee...' : 'Click the button below procced with your Tuition fee...'}
                           </p>
                           <div className="flex justify-center my-3">
                              <AppPayTuition studentData={student} modalSize={"2xl"} />
                           </div>
                        </Card>
                        :
                        <Card className="w-full sm:w-3/4 md:w-3/5 lg:w-5/7 flex-1">
                           <h5 className="flex flex-col justify-between items-center mb-5 space-y-5">
                              <HiOutlineCheckCircle className="h-14 w-14 text-green-400 dark:text-green-200" />
                              <div className="text-cyan-700 text-xl sm:text-2xl md:text-4xl font-bold">Tuition Fee Paid</div>
                           </h5>
                           <div className="relative w-full h-52 bg-green-500/25 rounded-md my-5">
                              <Image src={'/random/rand2.jpg'} alt={'Acceptance image'} fill style={{ objectFit: "cover" }} />
                           </div>
                        </Card>
                     }
                  </>
               }
            </>
         }
      </>

   )
}

export default TuitionPayment
