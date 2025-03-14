"use client";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { useEffect, useState } from "react";

const StudentBanner = ({ student }: { student: StudentType | null }) => {
   const [isClient, setIsClient] = useState(false);
   const [copied, setCopied] = useState(false);

   useEffect(() => {
      if (typeof window !== "undefined") {
         setIsClient(true);
      }
   }, [])


   const handleCopy = () => {
      if (isClient && student?.reg_number) {
         navigator.clipboard.writeText(student.reg_number);
         setCopied(true);
         setTimeout(() => {
            setCopied(false)
         }, 5000)
      }
   }
   return (
      <>
         <Banner>
            <div className="flex w-full flex-col justify-center border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row my-10 px-10 py-16 rounded-md">
               <div className="mb-4 md:mb-0 md:mr-4 text-center sm:w-full md:w-4/5 lg:w-3/6 space-y-5">
                  <h2 className="mb-1 text-3xl font-semibold text-gray-90 text-[#23628d]">Education, Talent, And Career Opportunities. <span className="text-[#d35401]"> All in one place...</span> </h2>
                  <p className="flex items-center font-normal text-gray-500 text-lg">
                     Ready yourself with direct and knowledge rich online courses and make your career dreams a reality
                  </p>
               </div>
            </div>
         </Banner>
      </>

   );
}

export default StudentBanner

const Banner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return <div>{children}</div>;
}
