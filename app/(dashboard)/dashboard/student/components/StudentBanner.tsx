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

{/* <Banner>
   <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row my-10 px-10 py-16 rounded-md">
      <div className="mb-4 md:mb-0 md:mr-4">
         <h2 className="mb-1 text-3xl font-semibold text-gray-90">Welcome <span className="text-cyan-600 inline-block ml-5">{student.first_name}</span></h2>
         <p className="flex items-center font-normal text-gray-500 text-lg">
            Process your admission with ease...
         </p>
      </div>

      <div className="flex shrink-0 items-center">
         <div className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
            <div className="group min-h-40 min-w-40 grid grid-cols-1 gap-3 content-between p-5">
               {(student.reg_number) ?
                  <>
                     <div className="">
                        <div className="text-center text-xl text-orange-800 font-bold">REG-NUMBER</div>
                        <div className="text-center text-2xl mt-3 mb-4 px-7 group-hover:text-orange-600">{student.reg_number}</div>
                     </div>
                     <Button onClick={handleCopy} variant={"outline"} size={"sm"}>
                        <ClipboardCopy className="mr-2 h-4 w-4" /> {copied ? "copied" : "click to copy"}
                     </Button>
                  </> :
                  <>
                     <div className="text-2xl">NO REG-NUMBER</div>
                     <Button size={"sm"}>
                        click to continue registration
                     </Button>
                  </>
               }
            </div>
         </div>
      </div>
   </div>
</Banner> */}