"use client";
import Image from 'next/image';
import { useAppContext } from "@/contexts/AppContext";
import { Card } from "flowbite-react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import CompleteApplicationForm from './components/CompleteApplicationForm';

const StudentApplicationPage = () => {
   const { state } = useAppContext();
   const student = state.student;
   return (
      <>{(student.is_applied === 0) ?
         <CompleteApplicationForm />
         :
         <div className="flex flex-col items-center justify-center py-10">
            <Card className="w-full sm:w-3/4 md:w-3/5 lg:w-5/7 flex-1">
               <h5 className="flex flex-col justify-between items-center mb-5 space-y-5">
                  <HiOutlineCheckCircle className="h-14 w-14 text-green-400 dark:text-green-200" />
                  <div className="text-cyan-700 text-xl sm:text-2xl md:text-4xl font-bold text-center">You have applied for admission</div>
               </h5>
               <p className="font-light text-xl tracking-widest leading-loose text-center text-orange-700">
                  Visit your dashboard to check your admission status...
               </p>
               <div className="relative w-full h-52 bg-green-500/25 rounded-md my-5">
                  <Image src={'/random/rand2.jpg'} alt={'Acceptance image'} fill style={{ objectFit: "cover" }} />
               </div>
            </Card>
         </div>
      }</>
   )
}

export default StudentApplicationPage